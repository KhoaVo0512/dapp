/* eslint-disable react/button-has-type */
import { Flex, Text, Button, MinusIcon, Input, PlusIcon } from '@pancakeswap/uikit'
import React, { useState } from 'react'
import styled from 'styled-components'

interface PropsCard {
  ID?: number
  nftName?: string
  nftImage?: string
  nftPrice?: any
  nftDesc?: any
  nftType?: string
  onHandleBuyNft?: any
  handleApprove?: any
  allowance?: number
  balanceOfToken?: number
  pendingBuy?: any
  totalSupplyNft?: number
  maxSupplyNft?: number
  totalSelectItems?: number
  onUpdateTotalBuy?: (newValue) => void
  onRemoveTotalBuy?: (newValue) => void
  onChangeInputBuy?: (newValue) => void
}
const CardShoes: React.FC<PropsCard> = ({
  ID,
  nftName,
  nftImage,
  nftPrice,
  nftDesc,
  onHandleBuyNft,
  handleApprove,
  allowance,
  totalSelectItems,
  pendingBuy,
  balanceOfToken,
  totalSupplyNft,
  maxSupplyNft,
  onUpdateTotalBuy,
  onRemoveTotalBuy,
  onChangeInputBuy,
}) => {
  const handlePlus = () => {
    if (totalSelectItems >= maxSupplyNft - totalSupplyNft) onUpdateTotalBuy(maxSupplyNft - totalSupplyNft)
    else {
      onUpdateTotalBuy(Number(totalSelectItems) + 1)
    }
  }

  const handleMinus = () => {
    if (totalSelectItems > 0) {
      if (totalSelectItems === 1) onRemoveTotalBuy(1)
      else onRemoveTotalBuy(totalSelectItems - 1)
    }
  }
  const handleChangeInput = (e) => {
    const { value } = e.target
    console.log(value)
    if (/^\d+$/.test(value) || value === '') {
      let convertNumber = Number(value)
      if (convertNumber >= Number(maxSupplyNft - totalSupplyNft)) {
        convertNumber = Number(maxSupplyNft - totalSupplyNft)
      }
      if (convertNumber < 0) {
        convertNumber = 1
      }
      onChangeInputBuy(convertNumber)
      
    } else onChangeInputBuy(1)
  }
  
  return (
    <>
      <Container>
        <Flex width="100%" flexDirection="column">
          <CustomCard>
            <ImgShoes src={nftImage} alt="Image Box" />
          </CustomCard>
          <CustomText>{nftName}</CustomText>
          <CustomText>{nftDesc}</CustomText>
          <CustomText>
            {totalSupplyNft}/{maxSupplyNft}
          </CustomText>
          <CustomText>Price: {nftPrice} USDT</CustomText>
        </Flex>
        {allowance >= 0 ? (
          balanceOfToken === 0 || allowance === 0 ? (
            <Button1 style={{ background: pendingBuy[ID] && '#e0e0e0' }} onClick={handleApprove}>
              Approve
            </Button1>
          ) : (
            <>
              <ColQuantity>
                <WrapCount>
                  <ButtonQuanlity
                    disabled={totalSelectItems === 1 || Number(totalSelectItems) === 0}
                    onClick={handleMinus}
                  >
                    <MinusIcon />
                  </ButtonQuanlity>
                  <CustomInput
                  style={{backgroundColor: '#f0f2ff'}}
                    disabled={maxSupplyNft - totalSupplyNft === 0}
                    type="text"
                    scale="lg"
                    inputMode="numeric"
                    value={maxSupplyNft - totalSupplyNft === 0 ? '0' : totalSelectItems}
                    onChange={handleChangeInput}
                    placeholder=""
                  />
                  <ButtonQuanlity disabled={totalSelectItems === maxSupplyNft - totalSupplyNft || maxSupplyNft - totalSupplyNft === 0} onClick={handlePlus}>
                    <PlusIcon />
                  </ButtonQuanlity>
                </WrapCount>
              </ColQuantity>
              {allowance < nftPrice ? (
                <Button1 style={{ background: pendingBuy[ID] && '#e0e0e0' }} onClick={handleApprove}>
                  Approve
                </Button1>
              ) : (
                <Button1
                  disabled={pendingBuy[ID] || Number(totalSelectItems)===0 || maxSupplyNft - totalSupplyNft === 0}
                  style={{ background: pendingBuy[ID] && '#e0e0e0' || Number(totalSelectItems)===0 && '#e0e0e0' || maxSupplyNft - totalSupplyNft === 0 && '#e0e0e0'}}
                  onClick={() => {
                    onHandleBuyNft({ ID, nftPrice, totalSelectItems })
                  }}
                >
                  Buy
                </Button1>
              )}
            </>
          )
        ) : (
          <CustomText>{nftPrice}</CustomText>
        )}
      </Container>
    </>
  )
}

export default CardShoes

const Container = styled.div<{ isHaving?: boolean; background?: string }>`
  width: 310px;
  height: auto;
  padding: 15px 10px 15px 10px;
  border-radius: 10px;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    padding: 15px 0px 15px 0px;
  }
  background-color: #f0f2ff;
  background-image: ${(props) => props.background};
`
const CustomCard = styled.div<{ background?: string }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 280px;
  border-radius: 8px;
  position: relative;
  justify-content: center;
  align-items: center;
`
const ImgShoes = styled.img`
  width: auto;
  height: 250px;
`
const CustomText = styled(Text)`
  color: #000000;
  display: flex;
  align-item: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
`
const ColQuantity = styled(Flex)`
  gap: 10px;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 600px) {
    justify-content: center;
  }
`
const WrapCount = styled(Flex)`
  align-items: center;
  gap: 10px;
`
const ButtonQuanlity = styled(Button)`
  border: 2px solid #e6e8ec;
  background: transparent;
  border-radius: 100px;
  box-shadow: none;
  padding: 4px;
  height: 42px;
  width: 42px;
`
const ContainerRow = styled.div`
  align-items: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  gap: 15px;
`
const ContainerProgress = styled.div`
  width: 100%;
`
const ContainerTags = styled(Flex)<{ background?: string }>`
  border-radius: 6px;
  width: 100%;
  height: auto;
  justify-content: start;
  padding: 6px 0px 6px 10px;
  align-items: center;
  margin-bottom: 10px;
  ${Text} {
    font-size: 16px;
    font-weight: bold;
  }
`

const Button1 = styled.button`
  width: 100%;
  padding: 8px;
  background-color: #f0f2ff;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 20px;
  &:hover {
    background-color: #8391e1;
    color: #000000;
  }
  font-size: 20px;
  border: 3px solid #8391e1;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  color: #000000;
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
