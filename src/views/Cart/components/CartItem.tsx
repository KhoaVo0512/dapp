import { useState } from 'react';
import { Button, Checkbox, Flex, Input, MinusIcon, PlusIcon, Text, useModal } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import ModalSelctBoxType from "./ModalSelectBoxType"

interface Props{
  price?:string,
  instock?:string,
  img?:string,
  shoeName?:string,
  totalSelectItems?:number,
  onUpdateTotalBuy?:(newValue) => void,
  onRemoveTotalBuy?:(newValue) => void,
  onChangeInputBuy?:(newValue) => void
}
const CartItem: React.FC<Props> = ({ price, instock, img, onUpdateTotalBuy, onRemoveTotalBuy , shoeName, totalSelectItems,onChangeInputBuy }) => {
  const { t } = useTranslation()
  const [ selectedBoxType, setSelectedBoxType ] = useState(1)
  const [ openModal ] = useModal(<ModalSelctBoxType onSelectBoxType={(newValue)=>setSelectedBoxType(newValue)} activeIndex={selectedBoxType} />)

  const handlePlus = () => {
    onUpdateTotalBuy(totalSelectItems+1)
  }

  const handleMinus = () => {
    if (totalSelectItems > 0) {
      onRemoveTotalBuy(totalSelectItems-1)
    }
  }  
  const handleChangeInput = (e) =>{
    const {value} = e.target;         
     if ( (/^\d+$/.test(value) || value === '' )){
      let convertNumber = Number(value) 
       if (convertNumber > Number (instock)){
         convertNumber  =  Number(instock)      
      }
       if (convertNumber <0) {
        convertNumber = 0
      }
      onChangeInputBuy(convertNumber)
    }
  }
  return (
    <ContainerCart>
      <ItemProcuct>
        <ColProduct>
          <ContainerFlex>
              <Img width="96px" src={img} />
              <WrapInfo>
                <TextName color="#23262F" fontWeight="600" fontSize="18px">
                  {shoeName}
                </TextName>
              </WrapInfo>
          </ContainerFlex>
        </ColProduct>
        <ColQuantity>
          <TitleMobile>{t('Quantity')}</TitleMobile>
          <WrapCount>
            <ButtonQuanlity onClick={handleMinus}>
              <MinusIcon />
            </ButtonQuanlity>          
            <CustomInput 
              type="text"
              scale="lg"
              inputMode="numeric"
              value={totalSelectItems + 1}   
              onChange={handleChangeInput}                                   
            />
            <ButtonQuanlity onClick={handlePlus}>
              <PlusIcon />
            </ButtonQuanlity>
          </WrapCount>
        </ColQuantity>
        <ColInStock>
          <TitleMobile>{t('In Stock')}</TitleMobile>
          <CustomTextStock bold>{instock}</CustomTextStock>
        </ColInStock>
        <ColPrice>
          <TitleMobile>{t('Price')}</TitleMobile>
          <CustomTextPrice bold style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {price}
            <img
              src="/images/coins/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png"
              alt="logo runtogether"
              style={{ width: '30px', height: '30px' }}
            />
          </CustomTextPrice>
        </ColPrice>
      </ItemProcuct>
    </ContainerCart>
  )
}

export default CartItem

const ContainerCart = styled.div`
  width: 100%;
  /* margin-top: 24px; */
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (max-width: 500p) {
    margin-top: 0px;
  }
`

const ItemProcuct = styled(Flex)`
  justify-content: space-between;
  border-top: 1px solid #e4e4e4;
  padding-top: 30px;
  display: grid;
  grid-template-columns: 40% 20% 20% 20%;

  &:last-child {
    padding-bottom: 30px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
    display: flex;
    flex-direction: column;
  }
`

const ColProduct = styled(Flex)`
  gap: 16px;
  align-items: center;
`

const ColQuantity = styled(Flex)`
  gap: 10px;
  align-items: center;
  justify-content:flex-start;
  @media screen and (max-width: 600px) {
    justify-content: space-between;
  }
`

const ColInStock = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content:center;
  @media screen and (max-width: 600px) {
    justify-content: space-between;
  }
`

const TitleMobile = styled(Text)`
  display: none;
  @media screen and (max-width: 600px) {
    display: block;
    color: #b1b5c3;
  }
`

const ColPrice = styled(Flex)`
  gap: 10px;
  align-items: center;
  justify-content:center;
  @media screen and (max-width: 600px) {
    justify-content: space-between;
  }
`
const WrapInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`

const Img = styled.img``

export const CsCheckbox = styled(Checkbox)`
  border: 2px solid #e4e4e4;
  width: 20px;
  height: 20px;
  border: 2px solid #e4e4e4;
  border-radius: 4px;
`
export const CsButton = styled(Button)`
  background: transparent;
  box-shadow: none;
  border: 2px solid #e6e8ec;
  border-radius: 90px;
  color: #23262f;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`
const TextName = styled(Text)`
  font-size: 16px;
`
const ButtonQuanlity = styled(Button)`
  border: 2px solid #E6E8EC;
  background: transparent;
  border-radius: 100px;
  box-shadow: none;
  padding: 4px;
  height: 42px;
  width: 42px;
`
const ContainerFlex = styled(Flex)`
  gap:20px;
  cursor:pointer;
`
const WrapCount = styled(Flex)`
 align-items:center;
 gap:10px;
`
const CustomTextStock = styled(Text)`
 @media(max-width:600px){
    padding-right:62px;
 }
`
const CustomTextPrice = styled(Text)`
 @media(max-width:600px){
    padding-right:27px;
 }
`
const CustomInput = styled(Input)`
   background: none;
    color: black;
    width: 100%;
    padding: 0;
    width: 30px;
    text-align: center;
    border: none;
    box-shadow: none;
`