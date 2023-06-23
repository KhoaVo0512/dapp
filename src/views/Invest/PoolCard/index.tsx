import { useTranslation } from '@pancakeswap/localization'
import { SerializedToken } from '@pancakeswap/sdk'
import { Flex } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { Address } from 'config/constants/types'
import { useState } from 'react'
import styled from 'styled-components'
import { getBlockExploreLink } from "utils"
import { getAddress } from 'utils/addressHelpers'
import { GetTotalProfitAmount } from "../hook/fetchDataPoolStore"
import APYRow from './components/APYRow'
import CardFooter from './components/CardFooter'
import CardHeading from './components/CardHeading'
import DepositFeeRow from './components/DepositFeeRow'
import EndsInRow from './components/endsin'
import HarvestAction from './components/HarvestAction'
import Renvennue from './components/Renvennue'
import StakeAction from './components/StakeAction'
import TvlRow from './components/TvlRow'

interface PoolCardProps {
  storeName:string,
  tokenStake:SerializedToken,
  tokenEarn:SerializedToken,
  contractPool:Address,
  penddingReward:number,
  revenue:string,
  apy:string,
  depositFee:string,
  totalStaked:number,
  contractStore:Address,
  storeAddress:string,
  endTimePool:number,
  startTimePool:number,
  depositFeeDescription:any,
  totalAmountStaked:string,
  account:string,
  chainId:number,
  runPriceUsd:number
}

const PoolCard: React.FC<PoolCardProps> = ({
  storeName,
  tokenStake,
  tokenEarn,
  contractPool,
  penddingReward,
  revenue,
  apy,
  depositFee,
  totalStaked,
  contractStore,
  storeAddress,
  endTimePool,
  startTimePool,
  depositFeeDescription,
  totalAmountStaked,
  account,
  chainId,
  runPriceUsd
}) => {
    const { t } = useTranslation()
    const [ refresh, setRefresh ] = useState(0)
    const { totalProfitAmount } = GetTotalProfitAmount(getAddress(contractStore, chainId),refresh, chainId)
    const currentTime = Date.now();
    const renderLink = `${getBlockExploreLink(getAddress(contractPool, chainId), 'address', chainId)}`
  return (
    <PCardInvestTogether>
        <CardHeading 
            tokenStake={tokenStake}
            tokenEarn={tokenEarn}
            storeName={storeName}
        />
        <APYRow apy={apy}/>
        <Renvennue 
          renvennue={revenue}
        />
        { currentTime < endTimePool && <EndsInRow endTime={endTimePool} startTime={startTimePool}/>}
        <TvlRow  
            tvl={Number(totalAmountStaked).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            tokenStakeAddress={tokenStake.address}
        />
        <DepositFeeRow depositFee={depositFee} depositFeeDescription={depositFeeDescription}/>
        <HarvestAction 
            refresh={refresh}
            contractPoolStore={contractStore}
            contractProposals={contractPool}
            onRefresh={(newValue)=>setRefresh(newValue)}
            tokenEarn={tokenEarn}
            tokenStake={tokenStake}
            totalstaked={Number(totalAmountStaked)}
            account={account}
            chainId={chainId}
        />
      { account ?
        <StakeAction
            tokenStakeSymbol={tokenStake.symbol}
            tokenStakeAddress={tokenStake.address}
            contractAddress={getAddress(contractPool, chainId)}
            onRefresh={(newValue)=>setRefresh(newValue)}
            refresh={refresh}
            totalStaked={totalStaked}
            tvlstake = {Number(totalAmountStaked).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            endTimePool = {endTimePool}
            totalTokenStake={totalAmountStaked}
            startTimePool={startTimePool}
            account={account}
            chainId={chainId}
            runPriceUsd={runPriceUsd}
        />
        :
            <ConnectWalletButton width="100%" mt="1rem"/>
        }

        <CardFooter 
            link={renderLink}
            totalProfitAmount={totalProfitAmount}
            locations={storeAddress}
            poolStoreAddress={getAddress(contractStore, chainId)}
            account={account}
            chainId={chainId}
        />
      </PCardInvestTogether>
  )
}

export default PoolCard

const PCardInvestTogether = styled(Flex)`
    flex-direction: column;
    width: 544px;
    height: fit-content;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    padding: 25px 20px;
    margin-bottom: 1.25rem;
    @media (max-width: 768px) {
      padding: 25px 15px;
      width: 100%;
    }
`