
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { useTranslation } from '@pancakeswap/localization'
import { Flex, Text, Progress, Heading, Box, Button, Input, Skeleton  } from '@pancakeswap/uikit'
import Container from 'components/Layout/Container'
import Page from 'components/Layout/Page'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useBalance } from 'wagmi'
import { ChainId } from '@pancakeswap/sdk'
import { formatBigNumber } from 'utils/formatBalance'
import RingLoader from 'react-spinners/RingLoader'
import { useFastRefreshEffect } from 'hooks/useRefreshEffect'
import PageHeader from 'components/PageHeader'
import CardOffChain from './components/CardOffChain'
import CardOnChain from './components/CardOnChain'
import ContainerOnChain from "./components/ContainerOffChain"
import { useClaimPresale, useBuyPresale } from './hook/useBuy';
import { GetPaidToken, GetPresaleInfo } from './hook/fetchData'

function getDateNow(event?: any) {
    let today: any
    if(event) {
        today = new Date(event);
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
    }
    else {
        today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); 
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
    }    
    return today;
}

interface Props {
    start?: number 
    now?: number 
    end?: number 
}
const Status:React.FC<Props> = ({start, end}) => {
    const now = Math.floor(Date.now() / 1000);
    if (now > end) {
        return  <Heading mb="8px" size="md" >Status: End</Heading>
    }
    if (now > start && now < end) {
        return  <Heading mb="8px" size="md" >Status: Live</Heading>
    } 
    return  <Heading mb="8px" size="md" >Status: Coming soon</Heading>
}

const Launchpad = () => {
    const { t } = useTranslation()
    const [ invalidBuyTime, setInvalidBuyTime ] = useState(false)
    const { account, chainId } = useActiveWeb3React()
    const coreBalance = useBalance({ addressOrName: account,chainId: ChainId.CORE, cacheTime: 10000 })
    const [ refresh, setRefresh ] = useState(0)
    function onRefresh(newValue:number){
        setRefresh(newValue)
    }

    const [ cdc, setCdc ] = useState(800)
    const [ balance, setBalance ] = useState('10')
    const [ purchasePercent, setPurchasePercent ] = useState(0)

    const { handleBuy, requestedBuy, pendingBuy, isCloseBuy } = useBuyPresale(chainId, onRefresh, balance)
    const { handleClaim, requestedClaim, pendingClaim } = useClaimPresale(chainId, onRefresh)

    const [ invalidInput, setInvalidInput ] = useState(false)
    const { paidToken } =  GetPaidToken(chainId, account, refresh)
    const { presaleInfo } =  GetPresaleInfo(chainId, refresh)
    const maxAllocation = presaleInfo?.maxAllocation ?? 0;

    useFastRefreshEffect(() => {
        const getSimpleSellIetms = async () => {
            try {
                const currentTimeStamp = Math.floor(Date.now() / 1000);
                if (presaleInfo?.startBuyTime < currentTimeStamp && currentTimeStamp < presaleInfo?.endBuyTime) {
                    setInvalidBuyTime(false)
                } else {
                    setInvalidBuyTime(true)
                }
            }
            catch(error) {
                console.log(error)
            }
        }
        getSimpleSellIetms()
        console.log(`invalidBuyTime`,invalidBuyTime);
        
      }, [refresh, chainId])
    
    function onInputPurchase (event: React.ChangeEvent<HTMLInputElement>) {
        const value = Number(event.target.value)
        setBalance(value.toString())
        setCdc(Number(value) * 80)
        if (value < 10 || value > 200) {
            setInvalidInput(true)
        } else {
            setInvalidInput(false)
        }
    }

    function buyPresale() {
        handleBuy(balance)
    }

    function processPercent( value) {
        return (value * 100) / maxAllocation;
    }

    const vestingArray = [
        {index: 1, name: 'TGE', vesting: '50%', time: '24 April 2023 15:00:00 UTC' , amount: (paidToken?.paidBalance * 50)/100, claimable: paidToken?.nextStageIndex === 0 },
        {index: 2, name: 'Stage 1', vesting: '25%', time: '24 May 2023 15:00:00 UTC' , amount: (paidToken?.paidBalance * 25)/100, claimable: paidToken?.nextStageIndex=== 1},
        {index: 3, name: 'Stage 2', vesting: '25%', time: '24 June 2023 15:00:00 UTC' , amount: (paidToken?.paidBalance * 25)/100, claimable: paidToken?.nextStageIndex === 2}
    ];

    console.log(paidToken);

    return (
        <Page>
            <PageHeader mt="1rem">
                <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
                <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
                    <Heading as="h1" scale="xxl" mb="24px">
                    {t('Pre-Sale')}
                    </Heading>
                    <Heading scale="md" color="text">
                    {t('CoreDoge - A Multi GameFi for CoreDAO Enthusiasts')}
                    </Heading>
                </Flex>
                </Flex>
            </PageHeader>
            <CustomContainer>
                <Flex width="100%" flexWrap="wrap" mt="1rem" mb="1rem">
                    <Box mb="16px"  width="100%" >
                        <Status start={presaleInfo?.startBuyTime} end={presaleInfo?.endBuyTime}/>
                        <Progress bgcolor="#3E54AC" primaryStep={processPercent(presaleInfo?.totalOfPaid ?? 0)} variant="round"/>
                    </Box>
                    <Box mb="16px"  width="100%" >
                        <Text fontSize="12px">Purchased: {presaleInfo?.totalOfPaid ? (presaleInfo?.totalOfPaid).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0} $CDC</Text>
                        <Text fontSize="12px">Available: {presaleInfo?.maxAllocation ? (presaleInfo?.maxAllocation - (presaleInfo?.totalOfPaid)).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0} $CDC</Text>
                    </Box>
                </Flex>
                <Flex width="100%" flexWrap="wrap" mt="1rem" mb="2.25rem">
                    <ContainerCard>
                        <CardOnChain/>
                    </ContainerCard>
                    <ContainerCard>
                        <CardOffChain/>
                    </ContainerCard>
                </Flex>

                {
                    paidToken?.isWhitelist ?
                    <>
                        <Flex width="100%" justifyContent='center' flexWrap="wrap" mt="1rem" mb="1rem">
                            <Input disabled={pendingBuy || invalidBuyTime} min="10" max="200" width="500px" type="number" scale="md" onChange={onInputPurchase} value={balance} />
                        </Flex>
                        <Flex width="100%" justifyContent='center' flexWrap="wrap" mt="1rem" mb="1rem">
                            <Button disabled={invalidInput || pendingBuy || invalidBuyTime} onClick={buyPresale}>
                                PURCHASE {Number(balance).toLocaleString(undefined, { minimumFractionDigits: 2 })} CORE ~ {cdc.toLocaleString(undefined, { minimumFractionDigits: 2 })} $CDC
                                <RingLoader color="white" loading={pendingBuy} size={30} />
                            </Button>
                        </Flex>
                        <Flex width="100%" justifyContent='center' flexWrap="wrap" mt="1rem" mb="1rem">
                            <Text color='#12575e' fontSize="16px">You are in whitelist</Text>
                        </Flex>
                    </>
                    :
                    <Flex width="100%" justifyContent='center' flexWrap="wrap" mt="1rem" mb="1rem">
                        <Text color='#FF0000' fontSize="16px">You are not in whitelist</Text>
                        {/* <Skeleton height="22px" width="60px" /> */}
                    </Flex>
                }
                <Flex width="100%" justifyContent='center' flexWrap="wrap" mt="1rem" mb="1rem">
                    {invalidInput && <Text color='#FF0000' fontSize="12px">Your input invalid, amount have to greater 10 and less than 200 CORE</Text>}
                </Flex>
                <Flex width="100%" justifyContent='center' flexWrap="wrap" mt="1rem" mb="1rem">
                    {!coreBalance.isFetched ? (
                        <Skeleton height="22px" width="60px" />
                    ) : (
                        <Text fontSize="16px">Your balance: {formatBigNumber(coreBalance.data.value, 2)} CORE</Text>
                    )}
                </Flex>
                <Flex width="100%" mt="1rem" height="fit-content"> 
                    <ContainerOnChain currentIndex={paidToken?.nextStageIndex ?? 0} allowanceVesting={vestingArray}/>
                </Flex>
            </CustomContainer>
        </Page>
    )
}
export default Launchpad

const CustomContainer = styled(Container)`
    width:100%;
    height: auto;
    @media only screen and (max-width: 768px) {
        padding-left:10px;
        padding-right: 10px;
    }
`
const ContainerCard = styled(Flex)`
    width: 50%;
    &:nth-child(1){
        padding-right:.5rem;
         @media (max-width:600px){
            padding-right:0
         }
    }
    &:nth-child(2){
        padding-left:.5rem;
        @media (max-width:600px){
            padding-left:0;
         }
    }
    @media only screen and (max-width: 600px) {
        width: 100%;
        margin-bottom:1rem;
    }
`
const CustomFlex = styled(Flex)`
    width:auto;
    @media only screen and (min-width: 600px) and (max-width: 1080px) {
        width: 50%;
    }
    @media only screen and (max-width: 600px) {
        width: 100%;
    }
`
const CustomCalendar = styled(DesktopDatePicker)`        
    cursor: pointer;      
    height: 48px!important; 
    width: 280px!important;  
    @media only screen and (max-width: 600px) {
        width: 100%!important;
    }       
    > div {       
        border-radius: 12px!important;
        height:100%!important; 
        width: 100%!important; 
        border:1px solid rgb(230, 232, 236)!important; 
        position: relative;
        box-sizing:border-box;
    }
    @media only screen and (max-width: 600px) {
        width: 100%;
    }
`
const CsContainer = styled(Flex)`
    // width="100%" flexWrap="wrap" justifyContent="space-around" mt="1.5rem" padding='0px 70px 0px 70px'
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 1.5rem;
    padding: 0px 70px 0px 70px;
    @media only screen and (max-width: 1024px) {
        justify-content: space-between;
        padding: 0px 0px 0px 0px;
    }
`