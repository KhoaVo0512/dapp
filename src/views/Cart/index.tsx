import React, { useEffect, useState } from 'react'
import PageHeader from 'components/Layout/PageHeader'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { AutoRenewIcon, Button, Flex,  SuccessIcon, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Header from 'components/HeaderGlobal/Header'
import Container from 'components/Layout/Container'
import Row from 'components/Layout/Row'
import tokens from 'config/constants/tokens'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import { fetchAllowanceMarketMultiBuy } from 'state/multiBuyBox'
import { fetchDataUser, selectAmountMetaRace, selectAmountMetaRich, selectAmountMetaRun, selectAmountMetaRush } from 'state/multiBuyBox/actions'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { GetBalanceNftInMarket, GetBoxBuyOfUser, GetDataUser, GetMaxNftTransfer, GetTotalBoxUserBuy } from 'state/multiBuyBox/hook/fetchdata'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import Page from "components/Layout/Page";
import CartItem from './components/CartItem'
import { useApprove } from "./hook/useApprove"
import { useBuy } from "./hook/useBuy"
import { useClaimNft } from "./hook/useClaim"

export const listSale = {
  INFO: "info",
  DANGER: "danger",
  SUCCESS: "success",
  WARNING: "warning",
} as const;

const Cart = () => {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const [ refresh, setRefresh ] = useState(0)
  function onRefresh(value){
    setRefresh(value)
  }
  const { chainId } = useActiveChainId()
  const [ maxNftTransfer ] = GetMaxNftTransfer(chainId)
  const [ nftBalance, nftPrice ] = GetBalanceNftInMarket(chainId)
  const [ dataUser ] = GetDataUser(account, chainId)
  const balanceOfUser = dataUser?.balanceOf
  const [ totalBoxUserBuy ] = GetTotalBoxUserBuy(account, chainId)

  const marketMultiBuy = useSelector<AppState, AppState['marketMultiBuy']>((state) => state.marketMultiBuy)
  console.log(marketMultiBuy)
  const totalAmountMetaRush = marketMultiBuy.totalMetaRush
  const totalAmountMetaRun = marketMultiBuy.totalMetaRun
  const totalAmountMetaRace = marketMultiBuy.totalMetaRace
  const totalAmountMetaRich = marketMultiBuy.totalMetaRich
  const dispatch = useDispatch<AppDispatch>()
   
  function onUpdateAmountMetaRush(value, boxType){
    try {
      if ( boxType === "MetaRush" ) {
        dispatch(selectAmountMetaRush({totalMetaRush:value}))
      }
      if ( boxType === "MetaRun" ) {
        dispatch(selectAmountMetaRun({totalMetaRun:value}))
      }
      if ( boxType === "MetaRace" ) {
        dispatch(selectAmountMetaRace({totalMetaRace:value}))

      }
      if ( boxType === "MetaRich" ) {
        dispatch(selectAmountMetaRich({totalMetaRich:value}))
      }
    } catch (e) {
        console.log(e)
    }      
  }

  const [ listBuyNft, setListBuyNft ] = useState([])
  const { handleApprove, pendingTx } = useApprove(chainId, account)
  const totalBuyMetaRush = new BigNumber(totalAmountMetaRush).multipliedBy(new BigNumber(nftPrice.totalNftMetaRush))
  const totalBuyMetaRun = new BigNumber(totalAmountMetaRun).multipliedBy(new BigNumber(nftPrice.totalNftMetaRun))
  const totalBuyMetaRace = new BigNumber(totalAmountMetaRace).multipliedBy(new BigNumber(nftPrice.totalNftMetaRace))
  const totalBuyMetaRich = new BigNumber(totalAmountMetaRich).multipliedBy(new BigNumber(nftPrice.totalNftMetaRich))
  const totalSelectItem = totalAmountMetaRush+totalAmountMetaRun+totalAmountMetaRace+totalAmountMetaRich
  function checkSalePercent(){
    let salePercent = 0
    if ( totalSelectItem >= 5 && totalSelectItem < 25) {
      salePercent = 0.03
    }
    if ( totalSelectItem >= 25 && totalSelectItem < 125) {
      salePercent = 0.06
    }
    if ( totalSelectItem >= 125 && totalSelectItem < 625 ) {
      salePercent = 0.1
    }
    if ( totalSelectItem >= 625 ) {
      salePercent = 0.15
    }
    return salePercent
  }

  const totalSale = (totalBuyMetaRush.plus(totalBuyMetaRun).plus(totalBuyMetaRace).plus(totalBuyMetaRich)).multipliedBy(checkSalePercent())
  const totalPrice = (totalBuyMetaRush.plus(totalBuyMetaRun).plus(totalBuyMetaRace).plus(totalBuyMetaRich))
  const totalBuy = Number((totalPrice.minus(totalSale)).toString())
  const isInsufficient = (new BigNumber(totalBuy)).isGreaterThan(new BigNumber(dataUser.balanceOf))
  const convertNumberPrice = Number(totalPrice.toString())
  const convertNumberSale = Number(totalSale.toString())
  
  useEffect(() => {
    setListBuyNft([totalAmountMetaRush, totalAmountMetaRun, totalAmountMetaRace, totalAmountMetaRich])
  }, [totalAmountMetaRush, totalAmountMetaRun, totalAmountMetaRace, totalAmountMetaRich])

  const { handleBuy, requestedBuy, pendingBuy } = useBuy(listBuyNft, onRefresh)
  const { handleClaimNft, requestedClaimNft, pendingClaimNft } = useClaimNft()
  const [ listBoxByUser ] = GetBoxBuyOfUser(account, chainId)

  useEffect(() => {
      try {
        dispatch(selectAmountMetaRush({totalMetaRush:0}))
        dispatch(selectAmountMetaRun({totalMetaRun:0}))
        dispatch(selectAmountMetaRace({totalMetaRace:0}))
        dispatch(selectAmountMetaRich({totalMetaRich:0}))
      } catch (e) {
        console.log(e)
    }    
  }, [requestedBuy]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
      const CallBackApprove = async () => {
          try {
            const result = await fetchAllowanceMarketMultiBuy(account, chainId)
            dispatch(fetchDataUser(result))
            } catch (e) {
              console.log(e)
          }    
        }
        CallBackApprove();
  }, [account, chainId, dispatch])

  return (
    <>
      <PageHeader
        nameTitle="RUN TOGETHER"
        namePlace="Buy"
        imgIcon="/images/runMarketplace/imgBanner.png"
        bgColor="#FF8B27"
      />
      <CustomPage>
        <CustomContainer width="100%">
          <Row>
            <CsFlex width="100%" flexWrap="wrap" alignItems="center" mt="1.25rem">
              <FlexGap>
                <TextAlign>{t('Product')}</TextAlign>
              </FlexGap>
              <FlexPc>
                <TextAlign>{t('Quantity')}</TextAlign>
              </FlexPc>
              <FlexPc>
                <TextAlign>{t('In Stock')}</TextAlign>
              </FlexPc>
              <FlexPc>
                <TextAlign>{t('Price')}</TextAlign>
              </FlexPc>
            </CsFlex>
          </Row>
          <CsRow mt="24px">
            <CartItem
              img="/images/runCard/boxYellow.png"
              instock={nftBalance.totalNftMetaRush.toString()}
              price={nftPrice.totalNftMetaRush.toString()}
              shoeName="MetaRush shoe box"
              totalSelectItems={totalAmountMetaRush}
              onUpdateTotalBuy={(newValue)=>onUpdateAmountMetaRush(newValue, "MetaRush")}
              onRemoveTotalBuy={(newValue)=>onUpdateAmountMetaRush(newValue, "MetaRush")}
              onChangeInputBuy={(newValue)=>onUpdateAmountMetaRush(newValue, "MetaRush")}
            />
            <CartItem
              img="/images/runCard/boxBlue.png"
              instock={nftBalance.totalNftMetaRun.toString()}
              price={nftPrice.totalNftMetaRun.toString()}
              shoeName="MetaRun shoe box"
              totalSelectItems={totalAmountMetaRun}
              onUpdateTotalBuy={(newValue)=>onUpdateAmountMetaRush(newValue, "MetaRun")}
              onRemoveTotalBuy={(newValue)=>onUpdateAmountMetaRush(newValue, "MetaRun")}
              onChangeInputBuy={(newValue)=>onUpdateAmountMetaRush(newValue, "MetaRun")}
            />
            <CartItem
              img="/images/runCard/boxOrigin.png"
              instock={nftBalance.totalNftMetaRace.toString()}
              price={nftPrice.totalNftMetaRace.toString()}
              shoeName="MetaRace shoe box"
              totalSelectItems={totalAmountMetaRace}
              onUpdateTotalBuy={(newValue)=>onUpdateAmountMetaRush(newValue, "MetaRace")}
              onRemoveTotalBuy={(newValue)=>onUpdateAmountMetaRush(newValue, "MetaRace")}
              onChangeInputBuy={(newValue)=>onUpdateAmountMetaRush(newValue, "MetaRace")}
            />
            <CartItem
              img="/images/runCard/boxPurple.png"
              instock={nftBalance.totalNftMetaRich.toString()}
              price={nftPrice.totalNftMetaRich.toString()}
              shoeName="MetaRich shoe box"
              totalSelectItems={totalAmountMetaRich}
              onUpdateTotalBuy={(newValue)=>onUpdateAmountMetaRush(newValue, "MetaRich")}
              onRemoveTotalBuy={(newValue)=>onUpdateAmountMetaRush(newValue, "MetaRich")}
              onChangeInputBuy={(newValue)=>onUpdateAmountMetaRush(newValue, "MetaRich")}
            />
          </CsRow>
          <WContainerBill isFlexEnd={totalBoxUserBuy > 0 ? false : !false}>
            { account ?
              <>
                { totalBoxUserBuy > 0 &&
                    <ContainerClaim>
                      <CSCOntainerBill>
                        <CustomRowImg>
                            <Tags src="/images/martketplace/11.png" alt="tag box"/>
                            <TextBox><div style={{fontWeight:900, color:'#000000'}}>{listBoxByUser?.totalBoxMetaRush}</div>&nbsp; <span style={{color:'#777E91'}}> MetaRush </span> </TextBox>
                        </CustomRowImg> 
                        <CustomRowImg>
                            <Tags src="/images/martketplace/22.png" alt="tag box"/>
                            <TextBox><div style={{fontWeight:900, color:'#000000'}}>{listBoxByUser?.totalBoxMetaRun}</div>&nbsp; <span style={{color:'#777E91'}}> MetaRun </span> </TextBox>
                        </CustomRowImg> 
                        <CustomRowImg>
                            <Tags src="/images/martketplace/33.png" alt="tag box"/>
                            <TextBox><div style={{fontWeight:900, color:'#000000'}}>{listBoxByUser?.totalBoxMetaRace}</div>&nbsp; <span style={{color:'#777E91'}}> MetaRace </span></TextBox>
                        </CustomRowImg> 
                        <CustomRowImg>
                            <Tags src="/images/martketplace/44.png" alt="tag box"/>
                            <TextBox><div style={{fontWeight:900, color:'#000000'}}>{listBoxByUser?.totalBoxMetaRich}</div>&nbsp; <span style={{color:'#777E91'}}> MetaRich </span> </TextBox>
                        </CustomRowImg> 
                      </CSCOntainerBill> 
                      <WrapBodyClaim>
                        <WrapTitle>
                          <HeaderTitle>
                            <SuccessIcon />
                            <Text bold>You have successfully buy your boxes. Claim now</Text>
                          </HeaderTitle>
                          <Text color="#B1B5C3" fontSize="14px" marginLeft="30px">
                            The maximum number of boxes 1 time to receive is {maxNftTransfer}
                          </Text>
                        </WrapTitle>
                        <BtnContainer>
                          <ButtonCheckout
                            onClick={handleClaimNft}
                            disabled={pendingClaimNft}
                            endIcon={pendingClaimNft ? <AutoRenewIcon spin color="textDisable" /> : null}
                          >
                            {t('Claim')}
                          </ButtonCheckout>
                        </BtnContainer>
                      </WrapBodyClaim>
                    </ContainerClaim>
                  }
                  <ContainerButtonApprove>
                    <TotalPrice>
                      <CustomFlexPrice>
                         <Text color='#B1B5C3'>Total:</Text>  
                         <CustomFlexChild>
                          <Text>{convertNumberPrice.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text> 
                          <img
                          src="/images/coins/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png"
                          alt="logo runtogether"
                          style={{ width: '30px', height: '30px' }}
                          />
                        </CustomFlexChild>  
                      </CustomFlexPrice>

                      <CustomFlexPrice>
                         <Text  color='#B1B5C3'>Discount:</Text>  
                         <CustomFlexChild>
                         <Text> - {convertNumberSale.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text> 
                          <img
                          src="/images/coins/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png"
                          alt="logo runtogether"
                          style={{ width: '30px', height: '30px' }}
                          />
                        </CustomFlexChild> 
                      </CustomFlexPrice>
                      <CustomFlexPrice>
                        <Text color='#B1B5C3'>Total after discount</Text> 
                        <CustomFlexChild> 
                        <Text bold fontSize='18px'>{totalBuy.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        <img
                          src="/images/coins/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png"
                          alt="logo runtogether"
                          style={{ width: '30px', height: '30px' }}
                        />
                        </CustomFlexChild>
                      </CustomFlexPrice>
                      <CustomFlexPricebalance>
                        <Text color='#B1B5C3'>Your BUSD balance</Text> 
                        <CustomFlexChild> 
                        <Text fontSize='18px'>{Number(balanceOfUser).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        <img
                          src="/images/coins/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png"
                          alt="logo runtogether"
                          style={{ width: '30px', height: '30px' }}
                        />
                        </CustomFlexChild>
                      </CustomFlexPricebalance>
                    </TotalPrice>
                    <BtnContainerBuy>
                      {Number(dataUser?.allowance) > 0 ?
                        <>
                          { isInsufficient ?
                              <ButtonBuy
                                  disabled
                              >
                                {t("Insufficient %symbol% balance", { symbol:tokens.Run.symbol})}
                              </ButtonBuy>
                            :
                              <ButtonBuy
                                  disabled={ totalBuy === 0 || pendingBuy}
                                  onClick={handleBuy}
                                  endIcon={pendingBuy ? <AutoRenewIcon spin color="textDisable" /> : null}
                              >
                                {t('Buy')}
                              </ButtonBuy>
                          }
                        </>
                      :
                        <ButtonBuy
                          onClick={handleApprove}
                          disabled={pendingTx}
                          endIcon={pendingTx ? <AutoRenewIcon spin color="textDisable" /> : null}
                        >
                          {t('Approve')}
                        </ButtonBuy>
                      }
                    </BtnContainerBuy>
                  </ContainerButtonApprove>
              </>
            :
              <WButtonConnect>
                <CustonButtonConnect/>
              </WButtonConnect>
            }
            
          </WContainerBill>
        </CustomContainer>
      </CustomPage>
    </>
  )
}

export default Cart

const CustomContainer = styled(Container)`
  @media only screen and (min-width: 600px) and (max-width: 1000px) {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
`

const CustomPage = styled(Page)`
  background: #FAF9FA;
  min-height: 50vh;
  padding-left: 0px !important;
  padding-right: 0px !important;
  @media only screen and (max-width: 600px) {
    padding-bottom: 0px;
  }
`

const CsRow = styled(Row)`
  display: flex;
  flex-direction: column;
`

const CsFlex = styled(Flex)`
  display: grid;
  grid-template-columns: 30% 30% 20% 20%;
`

const FlexGap = styled(Flex)`
  gap: 16px;
`

const FlexPc = styled(Flex)`
  justify-content:center;
  @media screen and (max-width: 500px) {
    display: none;
  }
`

const TextAlign = styled(Text)`
  display: flex;
  align-items: center;
  color: #b1b5c3;
`
const TotalPrice = styled(Flex)`
  margin-top:17px;
  align-items: center;
  justify-content: space-between;
  flex-direction:column;
  align-items:initial;
  gap: 14px;
  @media only screen and (min-width: 600px) and (max-width: 1000px) {
    width: 300px; 
    margin-right: 65px; 
  }
  @media screen and (max-width: 600px) {
    margin-right: 0px;
    width: 100%;
  }
`

const BtnContainer = styled(Flex)`
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width:600px) {
    width:100%;
  }
`
const BtnContainerBuy = styled(Flex)`
  justify-content: flex-end;
  /* margin-right:65px; */
  @media screen and (min-width: 600px) and (max-width:1023px) {
    justify-content: flex-start;
  }
  @media screen and (max-width:600px) {
    width:100%;
    justify-content: flex-end;
  }
`

const WContainerBill = styled(Row)<{isFlexEnd?:boolean}>`
  width: 100%;
  justify-content: ${({ isFlexEnd }) => isFlexEnd ? "flex-end" : "space-between"};
  border-top: 1px solid #e4e4e4;
  flex-wrap:wrap;
  margin-bottom: 1.5rem;
`
const ButtonCheckout = styled(Button)`
  background: #ff592c;
  border-radius: 90px;
  box-shadow: none;
  width: 120px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

// Claim
const ContainerClaim = styled(Flex)`
  justify-content: center;
  flex-direction: column;
  width: 70%;
  margin-top:0px;
  @media screen and (max-width: 1024px) {
    margin-top: 17px;
  }
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`

const WrapTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:17px;
  gap: 10px;
`

const HeaderTitle = styled.div`
  display: flex;
  gap: 10px;
`

const WrapBodyClaim = styled(Flex)`
  gap: 20px;
  flex-direction:column;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`
const ButtonBuy = styled(Button)`
  background: #ff592c;
  border-radius: 90px;
  box-shadow: none;
  min-width: 180px;
  @media screen and (max-width: 600px) {
    width: 100%;
    margin-top:10px;
  }
`
const ContainerButtonApprove = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 30%;
  @media screen and (max-width: 1000px) {
    width: 100%;
    flex-wrap:wrap;
    justify-content: space-between;
    margin-top:1rem;
  }
`

const CustonButtonConnect = styled(ConnectWalletButton)`
    // text-transform:uppercase;
    font-weight:bold;
    border-radius:90px;
    background: #FF592C;
    box-shadow:none;
    color:#fff;
    /* width: 180px; */
    width: 100%;
    padding: 0 10px;
    @media screen and (max-width: 600px) {
      width: 100%;
      margin-top:10px;
    }
`
const CSCOntainerBill = styled(Flex)`
  justify-content:flex-start;
  flex-wrap: wrap;
  gap:20px;
  @media (max-width:600px){
    justify-content:space-around;
  }
`
const Tags = styled.img`
  height: 35px;
  width: 35px;
  border-radius:50%;
  overflow:hidden;
`
const CustomRowImg = styled(Flex)`
 align-items:center;
 gap:10px;
`
const TextBox = styled(Flex)`
`
const CustomFlexPrice = styled(Flex)`
justify-content:space-between;
gap:5px;
`
const CustomFlexPricebalance = styled(Flex)`
  justify-content:space-between;
  gap:5px;
`
const CustomFlexChild = styled(Flex)`
gap:5px;
align-items:flex-start;
`
const WButtonConnect = styled.div`
  margin-top: 20px;
`