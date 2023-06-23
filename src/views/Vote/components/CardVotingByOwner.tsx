import { useTranslation } from "@pancakeswap/localization";
import { AutoRenewIcon, Button, Flex, Text } from "@pancakeswap/uikit";
import ConnectWalletButton from "components/ConnectWalletButton";
import React from "react";
import { usePriceRunBusd } from "state/farms/hooks";
import { GetAmountMintToVote } from 'state/poolProposals';
import styled from "styled-components";
import { FetchDataVoting } from "../hook/fetchDataVoting";
import { useUnStakeChair } from "../hook/unStakeChair";


interface Props {
    votingId?:number
    refresh?:number
    account:string|undefined
    chainId:number
  }
const CardVoteByOwner: React.FC<Props> = ({votingId, refresh, account, chainId}) => {
    const { t } = useTranslation()
    const runPriceUsd = usePriceRunBusd().toNumber()
    const { handleUnStakeChair, requestedUnStakeChair, pendingUnStakeChair } = useUnStakeChair(votingId,chainId)
    const { dataVoting } = FetchDataVoting(votingId, refresh,chainId,account, requestedUnStakeChair)
    const currentTime = Date.now()
    const [ minAmountToVote ] = GetAmountMintToVote(chainId)
    const isTimeCanUnStake = currentTime > dataVoting.endDate*1000 
    const isTimeOwnerCanUnStake = currentTime > dataVoting.endTimeLockChairPerson*1000 
    
    return(
        <Container>
            <CustomFlex>
                <ColLeft>
                    <Text fontSize="14px" bold >Your RUN staked for create vote</Text>
                    <Flex alignItems="center" style={{gap:"10px"}} width="100%" justifyContent="space-between">
                        { dataVoting?.isUnStaked ?
                            <Text bold >0.00</Text>
                        :
                            <Text bold >{minAmountToVote.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        }
                        <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px", height:"30px"}}/>
                    </Flex>
                    { dataVoting?.isUnStaked ?
                        <Text fontSize="14px" bold color="textSubtle" >~ 0.00</Text>
                    :
                        <Text fontSize="14px" bold color="textSubtle">~ {(minAmountToVote*runPriceUsd).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ~ BUSD</Text>
                        
                    }
                 </ColLeft>
            </CustomFlex>
           
            <Flex width="100%" justifyContent="center" mt="1rem">
            { account ?
                <CustomButton
                    disabled={pendingUnStakeChair || dataVoting?.isUnStaked === true || !isTimeCanUnStake || !isTimeOwnerCanUnStake}
                    onClick={handleUnStakeChair}
                    endIcon={pendingUnStakeChair ? <AutoRenewIcon spin color="textDisable" /> : null}
                >
                    { dataVoting?.isUnStaked ?
                        t("Unstaked")
                    :
                        t("Unstake")
                    }
                    
                </CustomButton>
                :
                <ConnectWalletButton/>
            }
            </Flex>
        </Container>
    )
}

export default CardVoteByOwner

const Container = styled(Flex)`
    border-radius:12px;
    flex-direction: column;
    width:550px;
    @media screen and (max-width: 768px){
        width:100%;
        padding: 20px 0px 0px 0px;
    }
`
export const ColLeft = styled.div`
    width: 100%;
    gap: 10px;
    display: grid;
`;
export const ColRight = styled(Flex)`
   width: 100%;
`;
export const CustomFlex = styled(Flex)`
    justify-content:space-between;
    width:100%;
    border:2px solid ${({ theme }) => theme.colors.success};
    border-radius: 20px;
    padding: 20px 20px;
`;
const CustomButton = styled(Button)`
    border-radius:90px;
    min-width:172px;
    width: auto;
    box-shadow:none;
    background-color: ${({ theme }) => theme.colors.primaryBright};
    color: #fff;
    @media screen and (max-width: 600px){
        width:100%;
    }
`