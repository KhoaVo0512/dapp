import { useTranslation } from '@pancakeswap/localization';
import { ChainId, Native } from '@pancakeswap/sdk';
import { AlertIcon, ArrowDownIcon, AutoRenewIcon, Button, Flex, Input, MinusIcon, PlusIcon, Progress, Text } from '@pancakeswap/uikit';
import ConnectWalletButton from 'components/ConnectWalletButton';
import PageFullWidth from 'components/Layout/PageFullWidth';
import tokens from 'config/constants/tokens';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetAmountSold, GetBalanceMysteryBox, GetBalanceMysteryToken, GetCoinChain, GetStartEndTime } from 'state/mysterybox';
import { fetchMysteryBox } from 'state/mysterybox/actions';
import { fetchBalanceMysteryBox } from 'state/mysterybox/fetchMysteryBox';
import { useMediaQuery } from 'react-responsive'
import styled from 'styled-components';
import Header from './components/Header';
import StartEndTimeCol from './components/startEndTime';
import { GetPriceBox } from './hook/fetchData';
import { useApprove } from './hook/useApprove';
import { useBuyBSC } from './hook/useBuyBSC';
import { useBuyChainETHW } from './hook/useBuyChainETHW';
import { useBuyChainOnus } from './hook/useBuyChainOnus';

const MysteryBox:React.FC<React.PropsWithChildren> = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const router = useRouter()
    const { account, chainId } = useActiveWeb3React()
    const [ amount, setAmount ] = useState(1);
    const [ isEndsIn, setIsEndsIn ] = useState(false);
    const [ isOverTimeBuy, setIsOverTimeBuy ] = useState(false);
    const [ isSoldOut, setIsSoldOut ] = useState(false);
    const [ isBSCChain, setIsBSCChain ] = useState(false);
    const [ isONUSChain, setisONUSChain ] = useState(false);
    const [ refresh, setRefresh ] = useState(Date.now());

    const { handleApprove, requestedApproval, pendingTx } = useApprove();  
    const [balanceMysteryBox] = GetBalanceMysteryBox(account, chainId);
    const [balanceMysteryBUSD, balanceMysteryApprove] = GetBalanceMysteryToken(account, chainId);
    const { price } = GetPriceBox();
    const [selectedCurrencyBalance] = GetCoinChain(account);
    const [inforSold] = GetAmountSold(refresh, chainId);
    const [startEndTime] = GetStartEndTime(chainId);
    
    const currentTime = Date.now();
    
    const onRefresh = (value) => {
        setRefresh(value);
        setAmount(1); 
    }    

    const { handleBuyBSC, pendingBuyBSC } = useBuyBSC(amount, onRefresh, account, chainId);
    const { handleBuyChainOnus, pendingBuyOnus} = useBuyChainOnus(amount, price, onRefresh, account, chainId);
    const { handleBuyChainETHW, pendingBuyETHW} = useBuyChainETHW(amount, price, onRefresh, account, chainId);

    const fetchData = async () => {
        const result = await fetchBalanceMysteryBox(account, chainId)
        dispatch(fetchMysteryBox(result))
    }

    useEffect( () => {
        if(price){
            fetchData()
        }
    }, [price])

    useEffect( () => {
        if(chainId === 56 || chainId === 97){
            setIsBSCChain(true)
            setisONUSChain(false)
        }
        if(chainId === 1975 || chainId === 1945){
            setisONUSChain(true)
            setIsBSCChain(false)
        }
    }, [chainId])  
     
    const handleMinus = () => {
        if (amount > 0) {
            setAmount(amount - 1);
        }
    } 
    const handlePlus = () => {
        if (amount < Number((inforSold.maxSell - inforSold.sold))) {
            setAmount(amount + 1);
        }
    }
    const handleChangeInput = (e) =>{
        const {value} = e.target;         
        if ((/^\d+$/.test(value) || value === '' )) {
            let convertNumber = Number(value) 
            if ( convertNumber > Number((inforSold.maxSell - inforSold.sold))) {
                convertNumber  =  Number((inforSold.maxSell - inforSold.sold))      
            }
            if (convertNumber < 0) {
                convertNumber = 0
            } 
            setAmount(convertNumber); 
        }              
    }

    useEffect(() => {
        if( startEndTime.startIn*1000 < currentTime && startEndTime.startIn !== 0 ) { // check over startIn
            setIsEndsIn(true);
        }
    }, [currentTime, startEndTime.startIn]);   
    useEffect(() => {
        if( startEndTime.endIn*1000 < currentTime && startEndTime.endIn !== 0 ) {
            setIsOverTimeBuy(true);
        }
    }, [currentTime, startEndTime.endIn]);
    useEffect(() => {
        if(inforSold.sold === inforSold.maxSell && inforSold.maxSell !== 0) {
            setIsSoldOut(true);
        }
    }, [inforSold]);
    return (
        <PageFullWidth>
            <Container>
                <Header/>
                <Wrapper>
                    <PageBox>
                        <TableBox>
                            <Box src="/images/mysterybox/MysteryBox.png" alt='Image Mystery Box' />
                        </TableBox>
                    </PageBox>
                    <PageInformation>
                        <Flex flexDirection="column">
                            {!isTabletOrMobile && <Text bold color="#23262F" fontSize='40px'>{t("Mystery Box")}</Text>}
                            <Flex alignItems="center" style={{gap:"10px"}}>
                                <Text 
                                    style={{ marginTop: "5px" }} 
                                    bold fontSize='20px'
                                >
                                    {price.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                                </Text>
                                <img src={`/images/chains/${chainId}.png`} alt="logo token earn" style={{height:"30px", width:"30px"}}/>
                            </Flex>                            
                        </Flex>
                        <QuantityBox>
                            <Progress variant="round" bgcolor="#4B19F5" primaryStep={(inforSold.sold*100)/inforSold.maxSell} scale="sm"/>
                            <InforSold justifyContent="space-between">
                                <Text>{t("Sold")} {inforSold.sold} {t("boxes")}</Text>
                                <Text>{inforSold.maxSell} {t("boxes")}</Text>
                            </InforSold>
                        </QuantityBox>
                        {
                            (isSoldOut && !isOverTimeBuy ) &&
                            <AlertOverTimeBuy style={{ marginTop: "20px" }}>
                                <AlertIcon style={{marginRight: "5px"}}/>
                                <Text>{t("Sold out")}</Text>                            
                            </AlertOverTimeBuy>                        
                        }
                        <InforTime justifyContent="space-between">
                            {
                                isOverTimeBuy ? 
                                <>
                                    <AlertOverTimeBuy>
                                        <AlertIcon style={{marginRight: "5px"}}/>
                                        <Text>{t("Time to buy a mystery box is over")}</Text>                            
                                    </AlertOverTimeBuy>
                                </>
                                :
                                <>  
                                    {
                                        !isEndsIn ? 
                                            <>
                                                <Text bold>{t("Start in")}</Text>
                                                <StartEndTimeCol startEndDate={startEndTime.startIn*1000}/>                                        
                                            </>
                                            
                                        : 
                                            <>
                                                <Text bold>{t("Ends in")}</Text>
                                                <StartEndTimeCol startEndDate={startEndTime.endIn*1000}/>
                                            </>                                    
                                    }
                                </>
                            }                            
                        </InforTime>
                        <InforAmountBuy justifyContent="space-between">
                            <Text style={{marginTop: "12px"}}>{t("Quantity")}</Text>
                            <WrapCount>
                                <ButtonQuanlity onClick={ handleMinus } disabled={ amount <= 1 || isOverTimeBuy || isSoldOut}>
                                    <MinusIcon />
                                </ButtonQuanlity>
                                <CustomInput 
                                    type="text"
                                    inputMode="numeric"
                                    scale="lg"
                                    value={amount}
                                    onChange={handleChangeInput}   
                                    readOnly={isOverTimeBuy || isSoldOut}                                
                                />
                                <ButtonQuanlity onClick={ handlePlus } disabled={ amount >= Number((inforSold.maxSell - inforSold.sold)) || isOverTimeBuy || isSoldOut}>
                                    <PlusIcon />
                                </ButtonQuanlity>
                            </WrapCount>
                        </InforAmountBuy>
                        {amount < 1 &&
                            <AlertOverTimeBuy>
                                <AlertIcon style={{marginRight: "5px"}}/>
                                <Text>{t("Amount must be greater than 0")}</Text>                            
                            </AlertOverTimeBuy>
                        }
                        <Flex mt="1rem" mb="1rem">
                            { account ?
                                <>
                                    <WrapBuyApprove flexDirection="column">
                                        {(ChainId.ETHW_MAINNET === chainId || ChainId.ONUS === chainId || ChainId.ONUS_TESTNET === chainId) ?
                                        <></>
                                        :
                                         <>
                                            <CustomButtonBuy 
                                            onClick={handleApprove}
                                            endIcon={pendingTx ? <AutoRenewIcon spin color="textDisable" /> : null}
                                            disabled={ balanceMysteryApprove !== 0 || !isEndsIn || isOverTimeBuy || isSoldOut || pendingTx || isONUSChain}>
                                            {balanceMysteryApprove !== 0 ? t("Approved") : t("Approve")}
                                            </CustomButtonBuy>
                                            <ArrowIconCus/>
                                        </>
                                        }
                                       
                                        {(ChainId.BSC_TESTNET === chainId || ChainId.BSC === chainId) &&
                                           <>
                                                {
                                                    price > balanceMysteryBUSD ? 
                                                        <CustomButtonBuy disabled>
                                                            {t("Insufficient %symbol% balance", { symbol:tokens.busd.symbol})}
                                                        </CustomButtonBuy>
                                                    :
                                                        <CustomButtonBuy 
                                                            onClick={handleBuyBSC}
                                                            endIcon={pendingBuyBSC ? <AutoRenewIcon spin color="textDisable" /> : null}
                                                            disabled={ balanceMysteryApprove === 0 || !isEndsIn || isOverTimeBuy || isSoldOut || pendingBuyBSC || amount < 1   }
                                                        >
                                                            {t("Buy")}
                                                        </CustomButtonBuy>
                                                }
                                           </>
                                        }
                                        {(ChainId.ONUS_TESTNET === chainId || ChainId.ONUS === chainId) &&
                                            <>
                                                {
                                                    price >= Number(selectedCurrencyBalance?.toSignificant(6)) ? 
                                                        <CustomButtonBuy disabled>
                                                            {t("Insufficient %symbol% balance", { symbol: 'ONUS'})}
                                                        </CustomButtonBuy>
                                                    :
                                                        <CustomButtonBuy 
                                                            onClick={handleBuyChainOnus}
                                                            endIcon={pendingBuyOnus ? <AutoRenewIcon spin color="textDisable" /> : null}
                                                            disabled={!isEndsIn || isOverTimeBuy || isSoldOut || pendingBuyOnus || amount < 1   }
                                                        >
                                                            {t("Buy")}
                                                        </CustomButtonBuy>
                                                }
                                            </>
                                        }
                                        {ChainId.ETHW_MAINNET === chainId &&
                                            <>
                                                {
                                                    price >= Number(selectedCurrencyBalance?.toSignificant(6)) ? 
                                                        <CustomButtonBuy disabled>
                                                            {t("Insufficient %symbol% balance", { symbol: 'ETHW'})}
                                                        </CustomButtonBuy>
                                                    :
                                                        <CustomButtonBuy 
                                                            onClick={handleBuyChainETHW}
                                                            endIcon={pendingBuyETHW ? <AutoRenewIcon spin color="textDisable" /> : null}
                                                            disabled={!isEndsIn || isOverTimeBuy || isSoldOut || pendingBuyETHW || amount < 1   }
                                                        >
                                                            {t("Buy")}
                                                        </CustomButtonBuy>
                                                }
                                            </>
                                        }
                                       
                                    </WrapBuyApprove>
                                </>
                            :
                                <CustonButtonConnect/>
                            }
                        </Flex>
                            <CsInfoUserBuyBox>
                                {(ChainId.BSC_TESTNET === chainId || ChainId.BSC === chainId) ? 
                                    <Text>
                                        {t(`Your BUSD balance:`)}
                                    </Text>
                                    :
                                    <Text>
                                        {t(`Your ${Native.onChain(chainId).symbol} balance:`)}
                                    </Text>
                                }                                
                                <Flex alignItems="center" style={{gap:"10px"}}>
                                    <Text>
                                        {ChainId.ETHW_MAINNET === chainId && (selectedCurrencyBalance ? selectedCurrencyBalance?.toSignificant(6) : 0)}
                                        {(ChainId.ONUS === chainId || ChainId.ONUS_TESTNET === chainId) && (selectedCurrencyBalance ? selectedCurrencyBalance?.toSignificant(6) : 0)}
                                        {(ChainId.BSC_TESTNET === chainId || ChainId.BSC === chainId) && balanceMysteryBUSD.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </Text>
                                </Flex>                            
                            </CsInfoUserBuyBox>
                         <CsInfoUserBuyBox>
                            <Text>
                                {t("Your mystery boxes:")}
                            </Text>
                            <Flex alignItems="center" style={{gap:"10px"}}>
                                <Text>
                                    {balanceMysteryBox}
                                </Text>
                            </Flex>                            
                        </CsInfoUserBuyBox>
                        <Flex width='100%' mt='1rem'>
                            <CsButton width='100%' onClick={() => router.push('/inventory?tabactive=mystery')}>Go to Inventory</CsButton>
                        </Flex>      
                    </PageInformation>
                </Wrapper>
            </Container>
        </PageFullWidth>
    );
}

export default MysteryBox

const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    max-width: 1320px;
    flex-direction:column;
    padding-top:2rem;
    @media screen and (max-width: 600px) {
        flex-direction: column;
        width: 100%;
    }
        @media screen and (min-width: 601px) and (max-width: 768px) {
        flex-direction: column;
    }
`
const Wrapper = styled(Flex)`
    width: 100%;
    flex-direction: row;
    @media screen and (max-width: 768px) {
        flex-direction:column-reverse;
    }
`
const PageBox = styled.div`
    width: 50%;
    height: auto;
    padding: 3rem;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 600px) {
        width: 100%;
        margin-left: 0;
        padding: 15px;
    }
    @media screen and (min-width: 601px) and (max-width: 768px) {
        width: 100%;
        margin-left: 0;
        margin-top:0rem;
    }
    @media screen and (min-width: 769px) and (max-width: 1080px) {
        width: 50%;
        margin-left: 0;
        padding-top: 1rem;
        margin-top:0rem;
    }
`
const Box = styled.img`
    width: 50%;
    height: auto;
    @media screen and (max-width: 600px) {   
    }
        @media screen and (min-width: 601px) and (max-width: 768px) {

    }
`
const TableBox = styled.div`
    width: 100%;
    height: auto;
    background: #E8F6FF;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    @media screen and (max-width: 600px) {   
    }
        @media screen and (min-width: 601px) and (max-width: 768px) {

    }
`
const PageInformation = styled.div`
    padding: 3rem;
    width: 50%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 600px) {
        width: 100%;
        margin-left: 0;
        padding: 15px;
    }
    @media screen and (min-width: 601px) and (max-width: 768px) {
        width: 100%;
        margin-left: 0;
        margin-top:1rem;
    }
    @media screen and (min-width: 769px) and (max-width: 1080px) {
        width: 50%;
        margin-left: 0;
        padding-top: 0rem;
        margin-top:0rem;
    }
`
const QuantityBox = styled.div`
    width: 100%;
    margin-top: 30px;
`
const InforSold = styled(Flex)`
    margin-top: 10px;
`
const InforTime = styled(Flex)`
    margin-top: 25px;
`
const InforAmountBuy = styled(Flex)`
    margin-top: 25px;
`
const WrapCount = styled(Flex)`
    align-items:center;
    gap:10px;
`
const WrapBuyApprove = styled(Flex)`
    width: 100%;
    margin-top: 20px;
`
const ButtonQuanlity = styled(Button)`
  background: transparent;
  box-shadow: none;
  border: 2px solid #E6E8EC;
  border-radius: 100px;
  width: 42px;
  height: 42px;
  padding: 4px;
`
const CustomInput = styled(Input)`
    background: none;
    color: black;
    width: 100%;
    padding: 0;
    width: 50px;
    text-align: center;
    border: none;
    box-shadow: none;
`
const CustonButtonConnect = styled(ConnectWalletButton)`
    text-transform:uppercase;
    font-weight:bold;
    border-radius:90px;
    width:100%;
    height: 54px;
    background:${({ theme }) => theme.colors.primaryBright};
    box-shadow:none;
    color:#fff;
`
const CustomButtonBuy = styled(Button)`
  text-transform:uppercase;
  font-weight:bold;
  border-radius:90px;
  width:100%;
  box-shadow:none;
`
const CustomButtonBack = styled(Button)`
  text-transform:uppercase;
  font-weight:bold;
  border-radius:90px;
  width:100%;
  box-shadow:none;
  background: transparent;
  color: #000;
  border: 2px solid #E6E8EC;
border-radius: 90px;

`
const ArrowIconCus = styled(ArrowDownIcon)`
   width: 30px;
   margin-top: 20px;
   margin-bottom: 20px;
`
const AlertOverTimeBuy = styled.div`
    border: 2px solid #FF592C;
    padding-top: 15px;
    padding-bottom: 15px;
    border-radius: 10px;
    margin-top: 25px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`
const CsInfoUserBuyBox = styled(Flex)`
    margin-top: 10px;
    justify-content: space-between;
    align-items: center;
`
const CsButton = styled(Button)`
    height: 48px;
    margin-top:1rem;
    border: 2px solid #E6E8EC;
    box-shadow:none;
    border-radius:90px;
    background:transparent;
    color: #000;
    &:hover{
        background:#FF592C;
        color: #FFF;
        opacity: 1;
    }
`