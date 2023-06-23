import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { renderBGCardMystery, renderBoxName, renderImgUnboxGif } from 'utils/renderBGCardV1'
import { FetchDataRunBoxIsOpen } from 'views/Inventory/hook/fetchDataMysteryBox'
import { Button, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import ModalUnbox from '@pancakeswap/uikit/src/widgets/Modal/ModalUnbox'

interface Props {
  onDismiss?: () => void
  nftId?: number,
  chainId?: number
}

const ModalUnboxSuccess: React.FC<Props> = ({ onDismiss, nftId, chainId }) => {
  const { t } = useTranslation()
  const { dataBox } = FetchDataRunBoxIsOpen(nftId, chainId);
 
  return (
   <>
    {dataBox.type !== 0 &&
      <>
      <CustomModal title="" onDismiss={onDismiss} maxWidth="550px" minWidth="370px">
        <WrapBodyComplete>
            <ContainerBoxComplete background={renderBGCardMystery(dataBox?.type)}>
                <ImgUnbox src={renderImgUnboxGif(dataBox?.type)} alt="images-box" />
            </ContainerBoxComplete>
            <WrapContent>
                <CsText bold width="100%" textAlign="center">
                    {t('Congrats you got it')}
                </CsText>
                <Text mt={2} color="#000" bold fontSize='13px' width="100%" textAlign="center">
                    {t('Opened the mystery box')} <span style={{color: '#FF592C'}}>#{nftId}</span>
                </Text>                
            </WrapContent>
            <WrapContentNameBox justifyContent="space-between" width="100%">
                    <ContainerBoxName>
                            <Text bold color='#30B38C'>{renderBoxName(dataBox?.type)}</Text>
                    </ContainerBoxName>
                    <CustomId>
                        <Text bold >#{dataBox?.tokenId}</Text>
                    </CustomId>
            </WrapContentNameBox>
        </WrapBodyComplete>
      </CustomModal> 
    </>   
    }
   </>
  )
}

export default ModalUnboxSuccess

const CustomModal = styled(ModalUnbox)`
  padding: 20px 0px;
  /* width: 475px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1024px) {
  }
  @media only screen and (max-width: 600px) {
    width: 360px;
  }

  @media only screen and (max-width: 375px) {
    padding: 10px;
    width: 320px;
    min-width: 320px !important;

    & > div {
    }
  }

  & > div {
    overflow-y: auto;
    /* padding: 24px 0px; */
    max-height: 90vh;
    &:-webkit-scrollbar {
      width: 6px;
      background-color: #f5f5f5;
    }
    &:-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #ef0c0c;
    }
  }
`


const CustomButton = styled(Button)`
  height: 48px;
  background: #ff592c;
  border-radius: 90px;
  box-shadow:none;
  margin-top:1rem;
`
const WrapBodyNft = styled(Flex)`
  width: 370px; 
  padding: 0px;
  flex-direction: column;
`

const WrapBodyComplete = styled(Flex)`
  width: 400px; 
  padding: 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const WrapContent = styled(Flex)`
    padding: 0 20px 20px 20px;
    flex-direction: column;
`
const WrapContentNameBox = styled(Flex)`
    padding: 0 20px 30px 20px;
    @media screen and (max-width: 600px) {
        padding: 0 40px 10px 40px;
    }
`
const ContainerBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 350px;
  position: relative;
`
const ContainerBoxComplete = styled.div<{ background: string }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 380px;
  background: url(${({ background }) => background}) no-repeat;
  position: relative;
`

const CustomId = styled(Flex)`
  background: rgba(48, 179, 140, 0.25);
  border-radius: 6px;
  width: 61px;
  height: 32px;
  padding: 0px 10px 0px 10px;
  justify-content: center;
  align-items: center;
`
const ContainerBoxName = styled(Flex)`
  width: 100px;
  height: 32px;
  border: 2px solid rgba(48, 179, 140, 0.25);
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`

const ImgUnbox = styled.img`
    width: 100%;
    height: 100%;
`
const CsText = styled(Text)`
    font-size: 25px;
`