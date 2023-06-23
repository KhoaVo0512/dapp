import { FixedNumber, BigNumber as BigNumberEther } from '@ethersproject/bignumber'
import BigNumber from 'bignumber.js'
import { formatUnits } from '@ethersproject/units'
import { MultiCallV2 } from '@pancakeswap/multicall'
import { BIG_ZERO } from 'utils/bigNumber'
import { ChainId } from '@pancakeswap/sdk'
import { FIXED_TWO, FIXED_ZERO } from './const'
import { getFarmsPrices } from './farmPrices'
import { fetchPublicFarmsData } from './fetchPublicFarmData'
import { fetchStableFarmData } from './fetchStableFarmData'
import { isStableFarm, SerializedFarmConfig } from './types'
import { getFullDecimalMultiplier } from './getFullDecimalMultiplier'

export const getTokenAmount = (balance: FixedNumber, decimals: number) => {
  const tokenDividerFixed = FixedNumber.from(getFullDecimalMultiplier(decimals))
  return balance.divUnsafe(tokenDividerFixed)
}

export type FetchFarmsParams = {
  farms: SerializedFarmConfig[]
  multicallv2: MultiCallV2
  isTestnet: boolean
  masterChefAddress: string
  chainId: number
  totalRegularAllocPoint: BigNumberEther
}

export async function farmV2FetchFarms({
  farms,
  multicallv2,
  isTestnet,
  masterChefAddress,
  chainId,
  totalRegularAllocPoint,
}: FetchFarmsParams) {
  const stableFarms = farms.filter(isStableFarm)
  
  const [stableFarmsResults, poolInfos, lpDataResults] = await Promise.all([
    fetchStableFarmData(stableFarms, chainId, multicallv2),
    fetchMasterChefData(farms, isTestnet, multicallv2, masterChefAddress, chainId),
    fetchPublicFarmsData(farms, chainId, multicallv2, masterChefAddress),
  ])
  const stableFarmsData = (stableFarmsResults as StableLpData[]).map(formatStableFarm)

  const stableFarmsDataMap = stableFarms.reduce<Record<number, FormatStableFarmResponse>>((map, farm, index) => {
    return {
      ...map,
      [farm.pid]: stableFarmsData[index],
    }
  }, {})

  const lpData = lpDataResults.map(formatClassicFarmResponse)

  const farmsData = farms.map((farm, index) => {
    try {
      return {
        ...farm,
        ...(stableFarmsDataMap[farm.pid]
          ? getStableFarmDynamicData({
              ...lpData[index],
              ...stableFarmsDataMap[farm.pid],
              token0Decimals: farm.token.decimals,
              token1Decimals: farm.quoteToken.decimals,
              price1: stableFarmsDataMap[farm.pid].price1,
            })
          : getClassicFarmsDynamicData({
              ...lpData[index],
              ...stableFarmsDataMap[farm.pid],
              token0Decimals: farm.token.decimals,
              token1Decimals: farm.quoteToken.decimals,
            })),
        ...getFarmAllocation({
          pool:poolInfos[index],
          totalRegularAllocPoint,
          chainId
        }),
      }
    } catch (error) {
      console.error(error, farm, index, {
        allocPoint: poolInfos[index]?.allocPoint,
        isRegular: poolInfos[index]?.isStopPool,
        token0Decimals: farm.token.decimals,
        token1Decimals: farm.quoteToken.decimals,
        totalRegularAllocPoint,
      })
      throw error
    }
  })

  const farmsDataWithPrices = getFarmsPrices(farmsData, chainId)

  return farmsDataWithPrices
}

const masterChefV2Abi = [
  {
    inputs: [{internalType: "uint256",name: "",type: "uint256"}],
    name: "poolInfo",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "lpToken",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "allocPoint",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "lastRewardBlock",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "accRewardPerShare",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "isStopPool",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "poolLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalAllocPoint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "rewardPerBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
]

const masterChefFarmCalls = (farm: SerializedFarmConfig, masterChefAddress: string) => {
  const { pid } = farm

  return pid || pid === 0
    ? {
        address: masterChefAddress,
        name: 'poolInfo',
        params: [pid],
      }
    : null
}

export const fetchMasterChefData = async (
  farms: SerializedFarmConfig[],
  isTestnet: boolean,
  multicallv2: MultiCallV2,
  masterChefAddress: string,
  chainId:number
): Promise<any[]> => {
  try {
    
    const masterChefCalls = farms.map((farm) => masterChefFarmCalls(farm, masterChefAddress))
    const masterChefAggregatedCalls = masterChefCalls.filter((masterChefCall) => masterChefCall !== null)

    const masterChefMultiCallResult = await multicallv2({
      abi: masterChefV2Abi,
      calls: masterChefAggregatedCalls,
      // chainId: isTestnet ? ChainId.BSC_TESTNET : ChainId.BSC,
      // eslint-disable-next-line object-shorthand
      chainId: chainId
    })

    let masterChefChunkedResultCounter = 0
    return masterChefCalls.map((masterChefCall) => {
      if (masterChefCall === null) {
        return null
      }
      const data = masterChefMultiCallResult[masterChefChunkedResultCounter]
      masterChefChunkedResultCounter++
      return data
    })
  } catch (error) {
    console.error('MasterChef Pool info data error', error)
    throw error
  }
}

export const fetchMasterChefV2Data = async ({
  isTestnet,
  multicallv2,
  masterChefAddress,
  chainId
}: {
  isTestnet: boolean
  multicallv2: MultiCallV2
  masterChefAddress: string
  chainId:number
}) => {
  try {
    const [[poolLength], [totalRegularAllocPoint], [cakePerBlock]] = await multicallv2<
      [[BigNumberEther], [BigNumberEther], [BigNumberEther]]
    >({
      abi: masterChefV2Abi,
      calls: [
        {
          address: masterChefAddress,
          name: 'poolLength',
        },
        {
          address: masterChefAddress,
          name: 'totalAllocPoint',
        },
        {
          address: masterChefAddress,
          name: 'rewardPerBlock',
          params: [],
        },
      ],
      // chainId: isTestnet ? ChainId.BSC_TESTNET : ChainId.BSC,
      // eslint-disable-next-line object-shorthand
      chainId: chainId
    })

    return {
      poolLength,
      totalRegularAllocPoint,
      cakePerBlock,
    }
  } catch (error) {
    console.error('Get MasterChef data error', error)
    throw error
  }
}

type StableLpData = [balanceResponse, balanceResponse, balanceResponse, balanceResponse]

type FormatStableFarmResponse = {
  tokenBalanceLP: FixedNumber
  quoteTokenBalanceLP: FixedNumber
  price1: BigNumberEther
}

const formatStableFarm = (stableFarmData: StableLpData): FormatStableFarmResponse => {
  const [balance1, balance2, _, _price1] = stableFarmData
  return {
    tokenBalanceLP: FixedNumber.from(balance1[0]),
    quoteTokenBalanceLP: FixedNumber.from(balance2[0]),
    price1: _price1[0],
  }
}

const getStableFarmDynamicData = ({
  lpTokenBalanceMC,
  lpTotalSupply,
  quoteTokenBalanceLP,
  tokenBalanceLP,
  token0Decimals,
  token1Decimals,
  price1,
}: FormatClassicFarmResponse & {
  token1Decimals: number
  token0Decimals: number
  price1: BigNumberEther
}) => {
  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = getTokenAmount(tokenBalanceLP, token0Decimals)
  const quoteTokenAmountTotal = getTokenAmount(quoteTokenBalanceLP, token1Decimals)

  // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
  const lpTokenRatio =
    !lpTotalSupply.isZero() && !lpTokenBalanceMC.isZero() ? lpTokenBalanceMC.divUnsafe(lpTotalSupply) : FIXED_ZERO

  const tokenPriceVsQuote = formatUnits(price1, token1Decimals)

  // Amount of quoteToken in the LP that are staked in the MC
  const quoteTokenAmountMcFixed = quoteTokenAmountTotal.mulUnsafe(lpTokenRatio)

  // Amount of token in the LP that are staked in the MC
  const tokenAmountMcFixed = tokenAmountTotal.mulUnsafe(lpTokenRatio)

  const quoteTokenAmountMcFixedByTokenAmount = tokenAmountMcFixed.mulUnsafe(FixedNumber.from(tokenPriceVsQuote))

  const lpTotalInQuoteToken = quoteTokenAmountMcFixed.addUnsafe(quoteTokenAmountMcFixedByTokenAmount)

  return {
    tokenAmountTotal: tokenAmountTotal.toString(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.toString(),
    lpTotalSupply: lpTotalSupply.toString(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toString(),
    tokenPriceVsQuote,
  }
}

type balanceResponse = [BigNumberEther]
type decimalsResponse = [number]

export type ClassicLPData = [
  balanceResponse,
  balanceResponse,
  balanceResponse,
  balanceResponse,
  decimalsResponse,
  decimalsResponse,
]

type FormatClassicFarmResponse = {
  tokenBalanceLP: FixedNumber
  quoteTokenBalanceLP: FixedNumber
  lpTokenBalanceMC: FixedNumber
  lpTotalSupply: FixedNumber
}

const formatClassicFarmResponse = (farmData: ClassicLPData): FormatClassicFarmResponse => {
  const [tokenBalanceLP, quoteTokenBalanceLP, lpTokenBalanceMC, lpTotalSupply] = farmData
  return {
    tokenBalanceLP: FixedNumber.from(tokenBalanceLP[0]),
    quoteTokenBalanceLP: FixedNumber.from(quoteTokenBalanceLP[0]),
    lpTokenBalanceMC: FixedNumber.from(lpTokenBalanceMC[0]),
    lpTotalSupply: FixedNumber.from(lpTotalSupply[0]),
  }
}

interface FarmAllocationParams {
  pool?: any
  totalRegularAllocPoint: any
  chainId?: number
}

const getFarmAllocation = ({
  pool,
  totalRegularAllocPoint,
  chainId
}: FarmAllocationParams) => {
  // const _allocPoint = allocPoint ? FixedNumber.from(allocPoint) : FIXED_ZERO
  // const totalAlloc = isRegular ? totalRegularAllocPoint : FIXED_ZERO
  // const totalAlloc = isRegular ? totalRegularAllocPoint : totalSpecialAllocPoint
  // tinh pool weight tai day
  // const poolWeight = !totalAlloc.isZero() && !_allocPoint.isZero() ? _allocPoint.divUnsafe(FixedNumber.from(totalAlloc)) : FIXED_ZERO
  // const poolWeight = totalRegularAllocPoint ? allocPoint.div(totalRegularAllocPoint) : BIG_ZERO

  const converAllocPoint = totalRegularAllocPoint ? new BigNumber(totalRegularAllocPoint.toString()) : BIG_ZERO
  let allocPoint = pool ? new BigNumber(pool?.allocPoint?._hex) : BIG_ZERO
  if(chainId === ChainId.ONUS || chainId === ChainId.BSC) {
      allocPoint = BIG_ZERO
  }
  const poolWeight = converAllocPoint ? allocPoint.div(converAllocPoint) : BIG_ZERO
  
  return {
    poolWeight: poolWeight.toJSON(),
    multiplier: `${allocPoint.div(100).toString()}X`,
  }
}

const getClassicFarmsDynamicData = ({
  lpTokenBalanceMC,
  lpTotalSupply,
  quoteTokenBalanceLP,
  tokenBalanceLP,
  token0Decimals,
  token1Decimals,
}: FormatClassicFarmResponse & {
  token0Decimals: number
  token1Decimals: number
}) => {
  // Raw amount of token in the LP, including those not staked
  const tokenAmountTotal = getTokenAmount(tokenBalanceLP, token0Decimals)
  const quoteTokenAmountTotal = getTokenAmount(quoteTokenBalanceLP, token1Decimals)

  // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
  const lpTokenRatio =
    !lpTotalSupply.isZero() && !lpTokenBalanceMC.isZero() ? lpTokenBalanceMC.divUnsafe(lpTotalSupply) : FIXED_ZERO

  // // Amount of quoteToken in the LP that are staked in the MC
  const quoteTokenAmountMcFixed = quoteTokenAmountTotal.mulUnsafe(lpTokenRatio)

  // // Total staked in LP, in quote token value
  const lpTotalInQuoteToken = quoteTokenAmountMcFixed.mulUnsafe(FIXED_TWO)

  return {
    tokenAmountTotal: tokenAmountTotal.toString(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.toString(),
    lpTotalSupply: lpTotalSupply.toString(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toString(),
    tokenPriceVsQuote:
      !quoteTokenAmountTotal.isZero() && !tokenAmountTotal.isZero()
        ? quoteTokenAmountTotal.divUnsafe(tokenAmountTotal).toString()
        : FIXED_ZERO.toString(),
  }
}
