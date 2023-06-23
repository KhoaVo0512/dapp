import { Flex, Text } from "@pancakeswap/uikit";
import styled from "styled-components";
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { PoolItemsProps } from "state/poolrunV2/type";
import HeaderFooter from "./Header";
import HavestAction from "./HavestAction";
import StakeAction from "./StakeActions";

interface FooterProps {
    poolInfo:PoolItemsProps
    onRefresh:(newValue:number) => void,
    refresh:number
    tvl:string,
    runPriceBUSD:number
}

const ListFooter: React.FC<FooterProps> = ({
    poolInfo,
    onRefresh,
    refresh,
    tvl,
    runPriceBUSD
}) => {
    const { chainId, account } = useActiveWeb3React()
    return (
        <ContainerFooter>
           <HeaderFooter
                depositFee={poolInfo.withdrawFee}
                depositDescription={poolInfo.widthdrawDescription}
                poolContract={poolInfo.poolContract}
                chainId={chainId}
           />
           <HavestAction
                tokenEarn={poolInfo.tokenEarn}
                poolContract={poolInfo.poolContract}
                chainId={chainId}
                account={account}
                refresh={refresh}
                onRefresh={onRefresh}
           />
           <StakeAction
                tokenStake={poolInfo.tokenStake}
                poolContract={poolInfo.poolContract}
                chainId={chainId}
                account={account}
                refresh={refresh}
                startTimeStake={poolInfo.startTimeStake}
                totalStakeAmount={poolInfo.amount}
                onRefresh={onRefresh}
                runPriceUsd={runPriceBUSD}
                tvl={tvl}
                endTimeStake={poolInfo.endTimeStake}
           />
        </ContainerFooter>
    )
}
export default ListFooter

const ContainerFooter = styled(Flex)`
    width:100%;
    flex-direction: row;
    height:180px;
    flex-wrap:wrap;
    margin-top:1.5rem;
    background: ${({ theme }) => theme.colors.background};
    border-radius: 16px;
    padding: 1rem;
    @media screen and (min-width:601px) and (max-width:1000px) {
        height: auto;
        padding: 2rem;
    }
    @media screen and (max-width:600px) {
        height: auto;
        margin-top:0rem;
        padding: 1rem;
    }
    
    @keyframes rotateZ {
        0% {
            opacity: 0;
            transform: translateZ(290px);
        }
        
        80% {
            transform: translateZ(10px);
        }

        100% {
            opacity: 1;
            transform: translateZ(0);
        }
    }
    transform-origin: top center;
    animation: rotateZ 0.75s ease-in-out forwards;
`