/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-await-in-loop */
import { getAddress } from 'utils/addressHelpers'
import contracts from 'config/constants/contracts'
import multicall, { multicallv2 } from 'utils/multicall'
import marketPlaceAbi from 'config/abi/marketPlaceAbi.json'
import bighunterToken from 'config/abi/bighunterToken.json'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'

export const FetchDataRunBoxIsOpen = (idMysteryBox, chainId: number) => {
  const [dataBox, setDataBox] = useState({
    tokenId: 0,
    type: 0,
  })
  useEffect(() => {
    const fetchDataBox = async () => {
      try {
        const callBoxId = [
          {
            address: getAddress(contracts.mysteryBox, chainId),
            name: 'mysteryBoxNftMap',
            params: [idMysteryBox],
          },
        ]
        const idRunBox = await multicall(marketPlaceAbi, callBoxId, chainId)
        const index = new BigNumber(idRunBox.toString()).toNumber()
        const callBoxType = [
          {
            address: getAddress(contracts.mysteryBox, chainId),
            name: 'getBoxTypeRunTogether',
            params: [index],
          },
        ]
        const boxType = await multicall(marketPlaceAbi, callBoxType, chainId)
        setDataBox({
          tokenId: new BigNumber(idRunBox.toString()).toNumber(),
          type: new BigNumber(boxType.toString()).toNumber(),
        })
      } catch (e) {
        console.log(e)
      }
    }
    fetchDataBox()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idMysteryBox])
  return { dataBox }
}

export const FetchDataNft = (account: string, chainId: number) => {
  const [nftBalance, setNftBalance] = useState(0)
  useEffect(() => {
    const fetchDataBox = async () => {
      try {
        const callBoxId = [
          {
            address: getAddress(contracts.coreMarketPlace, chainId),
            name: 'balanceOf',
            params: [account],
          },
        ]
        const idRunBox = await multicall(marketPlaceAbi, callBoxId, chainId)
        const index = new BigNumber(idRunBox.toString()).toNumber()

        setNftBalance(index)
      } catch (e) {
        console.log(e)
      }
    }
    if (account) {
      fetchDataBox()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  return { nftBalance }
}

export const GetAllowance = (account: string, chainId, getRequestApproval: any) => {
  const [allowance, setAllowance] = useState(0)
  const spender = getAddress(contracts.coreMarketPlace, chainId)
  useEffect(() => {
    const fetchDataBox = async () => {
      try {
        const callBoxId = [
          {
            address: '0x585b34473CEac1D60BD9B9381D6aBaF122008504',
            name: 'allowance',
            params: [account, spender],
          },
        ]
        const idRunBox = await multicall(bighunterToken, callBoxId, chainId)
        const index = new BigNumber(idRunBox.toString()).toNumber()

        setAllowance(index / 1e18)
      } catch (e) {
        console.log(e)
      }
    }
    if (account && !getRequestApproval) {
      fetchDataBox()
    }
    if (getRequestApproval) {
      fetchDataBox()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, getRequestApproval])
  return { allowance }
}

export const GetBalanceOfToken = (account: string, chainId) => {
  const [balanceOfToken, setBalanceOfToken] = useState(0)
  useEffect(() => {
    const fetchDataBox = async () => {
      try {
        const callBoxId = [
          {
            address: '0x585b34473CEac1D60BD9B9381D6aBaF122008504',
            name: 'balanceOf',
            params: [account],
          },
        ]
        const idRunBox = await multicall(bighunterToken, callBoxId, chainId)
        const index = new BigNumber(idRunBox.toString()).toNumber()

        setBalanceOfToken(index / 1e18)
      } catch (e) {
        console.log(e)
      }
    }
    if (account) {
      fetchDataBox()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  return { balanceOfToken }
}

export const GetPriceNfts = (chainId: number) => {
  const [ListPrices, setListPrices] = useState([])
  useEffect(() => {
    const fetchDataBox = async () => {
      const data = []
      for (let i = 0; i < 3; i++) {
        try {
          const callBoxId = [
            {
              address: getAddress(contracts.coreMarketPlace, chainId),
              name: 'NFT_PRICE',
              params: [i],
            },
          ]
          const idRunBox = await multicall(marketPlaceAbi, callBoxId, chainId)
          const index = new BigNumber(idRunBox.toString()).toNumber()
          data.push(index / 1e18)
        } catch (e) {
          console.log('try catch error')
          console.log(e)
        }
      }
      setListPrices(() => {
        return [...data]
      })
    }
    fetchDataBox()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return { ListPrices }
}
// get NFTToTalSupply
export const GetTotalSupplyNft = (chainId: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [listTotalSupplyNft, setListTotalSupplyNft] = useState([])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchDataBox = async () => {
      const data = []
      for (let i = 0; i < 3; i++) {
        try {
          const callBoxId = [
            {
              address: getAddress(contracts.coreMarketPlace, chainId),
              name: 'NFT_TYPE_TOTAL_SUPPLY',
              params: [i],
            },
          ]
          const idRunBox = await multicall(marketPlaceAbi, callBoxId, chainId)
          const totalTypeNft = new BigNumber(idRunBox.toString()).toNumber()
          data.push(totalTypeNft)
        } catch (e) {
          console.log('error in get contract NFT total supply type')
          console.log(e)
        }
      }
      setListTotalSupplyNft(() => {
        return [...data]
      })
    }
    fetchDataBox()
  }, [])
  return { listTotalSupplyNft }
}
export const GetMaxSupplyNft = (chainId: number) => {
  const [listMaxSupplyNft, setListMaxSupplyNft] = useState([])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchDataBox = async () => {
      const data = []
      for (let i = 0; i < 3; i++) {
        try {
          const callBoxId = [
            {
              address: getAddress(contracts.coreMarketPlace, chainId),
              name: 'NFT_TYPE_MAX_SUPPLY',
              params: [i],
            },
          ]
          const idRunBox = await multicall(marketPlaceAbi, callBoxId, chainId)
          const totalTypeNft = new BigNumber(idRunBox.toString()).toNumber()
          data.push(totalTypeNft)
        } catch (e) {
          console.log('error in get contract NFT total supply type')
          console.log(e)
        }
      }
      setListMaxSupplyNft(() => {
        return [...data]
      })
    }
    fetchDataBox()
  }, [])
  return { listMaxSupplyNft }
}
export const SetPricesMaxTotalAndTotalSupplyNft = (ListPrices: any, ListTotalSupplyNft: any, ListMaxSupplyNft: any) => {
  const boxName = ['Silver', 'Gold', 'Ruby']
  const Items = []
  if (ListPrices.length > 0) {
    for (let i = 0; i < ListPrices.length; i++) {
      Items.push({
        id: i,
        name: `${boxName[i]} Box`,
        image: `/images/luckybox/box${i}.png`,
        desc: 'Box NFT',
        price: ListPrices[i],
        nftType: i,
        totalSupplyNft: ListTotalSupplyNft[i],
        maxSupplyNft: ListMaxSupplyNft[i],
      })
    }
  }

  return Items
}
