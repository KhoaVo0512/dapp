import { Flex, OpenNewIcon, Text } from "@pancakeswap/uikit";
import ConnectWalletButton from "components/ConnectWalletButton";
import ExpandableSectionButton from 'components/ExpandableSectionButton';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useCallback, useState } from "react";
import { PoolItemsProps } from "state/poolrunV2/type"; 
import styled from "styled-components";
import { GetTokenBalance } from "utils/getTokenBalance";
import { getBlockExploreLink } from "utils";
import { getAddress } from "utils/addressHelpers";
import APYRow from "./components/APYRow";
import CardHeading from "./components/CardHeading";
import DepositFeeRow from "./components/DepositFeeRow";
import HarvestAction from "./components/HarvestAction";
import StakeAction from "./components/StakeAction";
import TvlRow from "./components/TvlRow";
import StakedRow from "./components/StakedRow"


interface CardProps {
   poolInfo:PoolItemsProps,
   runPriceUsd:number
} 

const PoolCard: React.FC<CardProps> = ({
    poolInfo,
    runPriceUsd
}) => {
    const [ refresh, setRefresh ] = useState(0)
    const { chainId, account } = useActiveWeb3React()
    const { balance } = GetTokenBalance(poolInfo.tokenStake.address, getAddress(poolInfo.poolContract, chainId), chainId, refresh)
    const [showExpandableSection, setShowExpandableSection] = useState(false)
    const toggleExpandableSection = useCallback(() => {
        setShowExpandableSection((prev) => !prev)
    }, [])
    function handleClick(){
        window.open(getBlockExploreLink(getAddress(poolInfo.poolContract, chainId), 'address', chainId))
    }
    return (
        <PCard>
            <CardHeading
                tokenStakeAddress={poolInfo.tokenStake.address}
                tokenEarnAddress={poolInfo.tokenEarn.address}
                tokenStakeSymbol={poolInfo.tokenStake.symbol}
                tokenEarnSymbol={poolInfo.tokenEarn.symbol}
            />
            <APYRow apy={poolInfo.apy}/>
            <TvlRow
                poolContract={poolInfo.poolContract}
                tokenStake={poolInfo.tokenStake}
                chainId={chainId}
                refresh={refresh}
                tvl={balance.toString()}
                runPriceUsd={runPriceUsd}
            />
            <DepositFeeRow
                depositFee={poolInfo.withdrawFee}
                depositDescription={poolInfo.widthdrawDescription}
            />
            <HarvestAction
                tokenEarn={poolInfo.tokenEarn}
                poolContract={poolInfo.poolContract}
                chainId={chainId}
                account={account}
                refresh={refresh}
                onRefresh={(newValue)=> setRefresh(newValue)}
            />
            { account ?
                <StakeAction
                    tokenStake={poolInfo.tokenStake}
                    poolContract={poolInfo.poolContract}
                    chainId={chainId}
                    account={account}
                    refresh={refresh}
                    startTimeStake={poolInfo.startTimeStake}
                    totalStakeAmount={poolInfo.amount}
                    onRefresh={(newValue)=> setRefresh(newValue)}
                    runPriceUsd={runPriceUsd}
                    tvl={balance.toString()}
                    endTimeStake={poolInfo.endTimeStake}
                />
            :
                <ConnectWalletButton width="100%" mt="1rem"/>
            }
            <ExpandingWrapper>
                <ExpandableSectionButton onClick={toggleExpandableSection} expanded={showExpandableSection} />
                {showExpandableSection && (
                    <Flex width="100%" flexDirection="column" mt="1.25rem" alignItems="end" justifyContent="flex-end">
                        <CustomLinkExternal onClick={handleClick}>
                            <Text>View Contract</Text>
                            <OpenNewIcon/>
                        </CustomLinkExternal>
                    </Flex>
                )}
            </ExpandingWrapper>
        </PCard>
    )
}
export default PoolCard

const PCard = styled(Flex)`
    flex-direction: column;
    width: 396px;
    height: fit-content;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    padding:15px;
    margin-bottom:1.25rem;
`

const ExpandingWrapper = styled.div`
  padding: 24px;
  overflow: hidden;
`

const CustomLinkExternal = styled.div`
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:10px;
    cursor: pointer;
    ${Text}{
            color:${({ theme }) => theme.colors.secondary};
            font-weight:bold;
        }
        > svg {
            fill:${({ theme }) => theme.colors.secondary};
        }
`