import { Flex, Heading, Text } from '@pancakeswap/uikit'
import { BigNumber } from 'bignumber.js'
import Balance from 'components/Balance'
import { ChainId } from '@pancakeswap/sdk'
import { useMemo } from 'react'
import { useLpTokenPrice } from 'state/farms/hooks'
import { formatLpBalance, getBalanceNumber } from 'utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

interface StackedLPProps {
  stakedBalance: BigNumber
  lpSymbol: string
  tokenSymbol: string
  quoteTokenSymbol: string
  lpTotalSupply: BigNumber
  tokenAmountTotal: BigNumber
  quoteTokenAmountTotal: BigNumber
  percentUserStaked:string
}

const StakedLP: React.FunctionComponent<React.PropsWithChildren<StackedLPProps>> = ({
  stakedBalance,
  lpSymbol,
  quoteTokenSymbol,
  tokenSymbol,
  lpTotalSupply,
  tokenAmountTotal,
  quoteTokenAmountTotal,
  percentUserStaked
}) => {
  const lpPrice = useLpTokenPrice(lpSymbol)
  const { chainId } = useActiveWeb3React()
  const displayBalance = useMemo(() => {
    return formatLpBalance(stakedBalance)
  }, [stakedBalance])
  function renderCurenccySymbol(){
    if ( chainId === ChainId.ONUS ) {
      return ` VNDC`
    }
    return ` USD`
  }
  return (
    <Flex flexDirection="column" alignItems="flex-start">
      <Flex style={{gap:"6px"}} flexWrap="wrap">
          <Heading color={stakedBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
          <Text>({percentUserStaked} of pool)</Text>
      </Flex>
      {stakedBalance.gt(0) && lpPrice.gt(0) && (
        <>
          <Balance
            fontSize="12px"
            color="textSubtle"
            decimals={2}
            value={getBalanceNumber(lpPrice.times(stakedBalance))}
            unit={renderCurenccySymbol()} 
            prefix="~"
          />
          
          <Flex style={{ gap: '4px' }}>
            <Balance
              fontSize="12px"
              color="textSubtle"
              decimals={2}
              value={stakedBalance.div(lpTotalSupply).times(tokenAmountTotal).toNumber()}
              unit={` ${tokenSymbol}`}
            />
            <Balance
              fontSize="12px"
              color="textSubtle"
              decimals={2}
              value={stakedBalance.div(lpTotalSupply).times(quoteTokenAmountTotal).toNumber()}
              unit={` ${quoteTokenSymbol}`}
            />
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default StakedLP
