import { useTranslation } from "@pancakeswap/localization";
import { AutoRenewIcon, Button, ChevronRightIcon, Flex, Skeleton, Text } from "@pancakeswap/uikit";
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface VotingProps {
    endTimeVoting?:number
    votingId:number
    status?:string
    voteCounterAgree?:string
    voteCounterDisAgree?:string
    chainId:number
    countMinToWin:number
}
const VotingCard: React.FC<VotingProps> = ({endTimeVoting, votingId,status, voteCounterAgree, voteCounterDisAgree, chainId, countMinToWin}) => {
    const { t } = useTranslation()
    const [ isPending, setIsPending] = useState(true)
    // 
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsPending(false)
          }, 700)
    }, []) 
    function convertDate (date:number){
        if (date) {
            const today:any = new Date(date*1000);
            const seconnd = String(today.getSeconds()).padStart(2, '0');
            const minutes = String(today.getMinutes()).padStart(2, '0');
            const hours = String(today.getHours()).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); 
            const yyyy = today.getFullYear();
            return <Flex alignItems="center">
                <Text bold lineHeight='20px' color='primaryBright'>{hours}:{minutes}:{seconnd}</Text>
                <Text ml="10px" bold lineHeight='20px' color='primaryBright'>{dd}/{mm}/{yyyy}</Text>
            </Flex>;
          } return <Skeleton width={60} />
    }
    function handleClick () {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
    const linkDetailsVoting = `/vote/${votingId}`

    const checkCancel = (agree:string, disAgree:string) => {        
        const convertTotalVote = new BigNumber(agree).plus(new BigNumber(disAgree));        
        if(convertTotalVote.isLessThan(new BigNumber(countMinToWin))) {
            return false;
        }
        return true;
    }

    const checkResult = (agree: string, refuse: string) => {
        const convertAgree = new BigNumber(agree)
        const convertRefuse = new BigNumber(refuse)
        const resultAgree = convertAgree.dividedBy(convertAgree.plus(convertRefuse));
        if(resultAgree.isGreaterThan(new BigNumber(0.5))) {
            return true;
        }
        return false;
    }
    return (
            <OfferCard>
                <Flex alignItems="center" justifyContent="space-between">                                       
                     <CustomId>
                        <Text bold >#{votingId}</Text>
                    </CustomId>
                    <Link href={linkDetailsVoting}>
                        <CustomButtonDetail onClick={handleClick}>Detail <ChevronRightIcon /></CustomButtonDetail> 
                    </Link>
                                                                    
                </Flex>
                <TextTitle >{t("Proposal to open a Run shoe store")}</TextTitle> 
                <Flex alignItems="center">
                    <TextDate mr='10px'>End date:</TextDate>
                    {convertDate(endTimeVoting)}
                </Flex>
                <Flex>
                {status === "open" ? 
                 <Link href={linkDetailsVoting} passHref legacyBehavior>
                    <CsButton onClick={handleClick} > Vote now </CsButton> 
                 </Link>    
                    : 
                    <>
                    {
                        isPending ? 
                        <>
                            <ButtonLoading 
                                isLoading={isPending} 
                                endIcon={isPending ? <AutoRenewIcon spin color="currentColor" /> : null}
                                disabled={isPending}
                            > 
                                LOADING 
                            </ButtonLoading>
                        </>
                        :
                        <>
                            {checkCancel(voteCounterAgree, voteCounterDisAgree) ? 
                                <>
                                {checkResult(voteCounterAgree, voteCounterDisAgree) ? 
                                    <FlexCusAgree> AGREE </FlexCusAgree> 
                                    :
                                    <FlexCusDisagree> DISAGREE </FlexCusDisagree> 
                                }   
                                </>
                                :
                                <FlexCusCancel> CANCEL </FlexCusCancel> 
                            }
                        </>
                    }                                            
                    </>                    
                } 
                </Flex>
            </OfferCard>
    )
}
export default VotingCard

const OfferCard = styled(Flex)`
  border: 1px solid ${({ theme }) => theme.colors.colorborder};
  border-radius: 10px;
  flex-direction: column;
  padding: 20px 35px;  
  gap: 10px;  
  width:48%;
  margin-bottom:21px; 
  margin-top:21px;   
  @media (max-width:600px) {
    padding: 20px 15px;
    width: fit-content;
    margin-bottom:15px; 
    margin-top:15px; 
    &:first-child{
        margin-top:30px;
    }
}
`

const TextTitle = styled(Text)`
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    color:${({ theme }) => theme.colors.text};    
    @media (max-width:600px) {
        margin-right:10px;
    }
`
const TextDate = styled(Text)`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    letter-spacing: -0.02em;
    color:${({ theme }) => theme.colors.text}; 
`
const CsButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.primaryBright}; 
    color:${({ theme }) => theme.colors.backgroundAlt}; 
    border-radius: 90px;
    width: 107px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    flex-wrap: nowrap;
    padding: 0;
`
const CustomButtonDetail = styled(Button)`
    background:none;
    border:none;
    cursor:pointer;
    display:flex;
    align-items:center;
    font-weight:900;
    font-size: 18px;
    color: #000000;
`
const CustomId = styled(Flex)`
    background: ${({theme})=>theme.colors.success19};
    border-radius: 6px;
    width: auto;
    height: 32px;
    padding:0px 10px 0px 10px;
    justify-content: center;
    align-items: center;
`

const FlexCusAgree = styled(Flex)`
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 10px;
    width: 97px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 10px;
`

const FlexCusDisagree = styled(Flex)`
    background-color: #0269FC;
    color: ${({ theme }) => theme.colors.white};
    border-radius: 10px;
    width: 97px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 10px;
`

const FlexCusCancel = styled(Flex)`
    background-color: ${({ theme }) => theme.colors.primaryBright};
    color: ${({ theme }) => theme.colors.white}; 
    border-radius: 10px;
    width: 97px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 10px;
`

const ButtonLoading = styled(Button)`
    background-color: ${({ theme }) => theme.colors.textDisabled};
    color:${({ theme }) => theme.colors.white}; 
    border-radius: 10px;
    width: 130px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 10px;
`