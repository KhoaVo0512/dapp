import React from "react";
import styled from "styled-components";
import { Text, Flex, Button, AutoRenewIcon } from "@pancakeswap/uikit";
import BigNumber from "bignumber.js";
import { usePriceRunBusd } from "state/farms/hooks";
import { useTranslation } from "@pancakeswap/localization";
import ConnectWalletButton from 'components/ConnectWalletButton';
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { FetchDataVoting } from "../hook/fetchDataVoting";
import { useUnStake } from "../hook/useUnStake"


interface Props {
    votingId?:number
    refresh?:number 
    numberAgree?:string
    numberDisagree?:string
    account:string|undefined
    chainId:number
  }
const CardVote: React.FC<Props> = ({votingId, refresh,numberAgree,numberDisagree, account, chainId }) => {
    const { t } = useTranslation()
    const runPriceUsd = usePriceRunBusd().toNumber()
    const { handleUnStake, requestedUnStake, pendingUnStake } = useUnStake(votingId,chainId)
    const { dataVoting } = FetchDataVoting(votingId, refresh,chainId, account, requestedUnStake)
    const currentTime = Date.now()
    const totalVoting = new BigNumber(numberAgree).plus(new BigNumber(numberDisagree))
    const isTimeCanUnStake = currentTime > dataVoting.endDate*1000     
    const parsetotalVoting  = totalVoting.decimalPlaces(2,1)
    const convertnumberAgree= new BigNumber(numberAgree)
    const parseAgree  = convertnumberAgree.decimalPlaces(2,1)
    const convertnumberDisAgree = new BigNumber(numberDisagree)
    const parseDisagree  = convertnumberDisAgree.decimalPlaces(2,1)
   
    return(
        <Flex width="100%" flexWrap="wrap">     
            <WrapCard>
                <CustomFlex>
                    <ColLeft>
                        <Text fontSize="14px" bold >Your RUN staked for vote</Text>
                        <Flex alignItems="center" style={{gap:"10px"}} width="100%" justifyContent="space-between">
                            <Flex>
                                <Text bold mr="8px" fontSize="20px">{Number(parsetotalVoting.toString()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px", height:"30px"}}/>
                            </Flex>
                            {  account ?                         
                        <CustomButton
                            disabled={pendingUnStake || Number(totalVoting) === 0 || dataVoting?.isUnStaked || !isTimeCanUnStake}
                            onClick={handleUnStake}
                            endIcon={pendingUnStake ? <AutoRenewIcon spin color="textDisable" /> : null}
                        > 
                            { dataVoting?.isUnStaked ?
                                t("Unstaked")
                            :
                                t("Unstake")
                            }
                        </CustomButton>         
                    :
                        <CsConnectWalletButton/>
                }         
                        </Flex>
                        <Text fontSize="14px" bold color="textSubtle">~ {(Number(totalVoting)*runPriceUsd).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BUSD</Text>
                    </ColLeft>
                </CustomFlex>            
                <CustomFlex>
                    <ColLeft>
                        <Text fontSize="14px" bold >Your vote history</Text>
                        <Flex alignItems="center" width="100%" justifyContent="space-between">
                            <Text bold fontSize="14px">Agree</Text>
                            <Flex alignItems="center">
                                <Text bold fontSize="20px" pr="15px">{Number(parseAgree.toString()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px" }}/>
                            </Flex>                       
                        </Flex>   

                        <Flex alignItems="center" width="100%" justifyContent="space-between">
                            <Text bold fontSize="14px">Disagree</Text>
                            <Flex alignItems="center">
                                <Text bold fontSize="20px" pr="15px">{Number(parseDisagree.toString()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                <img src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" alt="logo runtogether" style={{width:"30px" }}/>
                            </Flex>
                        </Flex>                    
                    </ColLeft>
                </CustomFlex>   
            </WrapCard>                              
        </Flex>
    )
}

export default CardVote

const WrapCard = styled(Flex)`
    width: 100%;
    @media(max-width:600px){
        flex-direction:column;
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
    width: 50%;
    border: 2px solid ${({ theme }) => theme.colors.success};
    padding:20px;
    border-radius: 12px;
    &:first-child {
        margin-right:1rem;
    }
    &:last-child {
        margin-left:1rem;
    }
    @media screen and (max-width: 600px){
        width:100%;
        margin-bottom:1.25rem;
        &:first-child, &:last-child { 
            margin-left:0rem!important;
            margin-right:0rem!important;
        }
    }
    
`;
const CustomButton = styled(Button)`
    border-radius:90px;
    /* width:172px; */
    box-shadow:none;
    background-color: ${({ theme }) => theme.colors.primaryBright};
    color: #fff;
    @media screen and (max-width: 600px){
        // width:100%;
    }
`
const CsConnectWalletButton = styled(ConnectWalletButton)` 
  background-color: ${({ theme }) => theme.colors.primaryBright};
  color: #ffffff;
  border:none;
  @media (max-width:600px){
    display:none;
 }
`