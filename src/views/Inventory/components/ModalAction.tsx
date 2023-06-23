import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Modal, Button, Text, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { GetTotalSellItems } from 'state/marketplace'
import { fetchItemsSellByUser } from 'state/marketplace/hook/fetchDataMarketPlace'
import { fetchSellItemsByUser } from 'state/marketplace/actions'
import Delist from './Delist'

interface Props {
  title: string
  isDelist?: boolean
  onDismiss?: () => void
  nftId?: number
  saleId?: number
  price?: number
  boxType?: number
}

const ModalAction: React.FC<Props> = ({ onDismiss, title, nftId, saleId, price, boxType }) => {
  const { t } = useTranslation()
  const { account, chainId } = useActiveWeb3React()
  const [ isSold, setIsSold ] = useState(false)
  const renderTitle = ""
  const dispatch = useDispatch<AppDispatch>()
  const [ totalSell ] = GetTotalSellItems(chainId) 
  const fetchDataForUser = async () => {
    try {
      const result = await fetchItemsSellByUser(chainId, totalSell, account)
      dispatch(fetchSellItemsByUser(result))
    } catch (e) {
      console.log(e)
    }
  }
  const onRefreshFunction = (value) => {
    setIsSold(value);
    fetchDataForUser();
  }
  return (
    <CustomModal title={renderTitle} onDismiss={onDismiss} maxWidth="550px" minWidth="370px">
      {isSold === false ? (
        <Delist
          nftId={nftId}
          saleId={saleId}
          price={price}
          boxType={boxType}
          onDismiss={onDismiss}
          onRefresh={onRefreshFunction}
        />
      ) : (
        <WrapBody>
          <Flex width="100%" height="250px" justifyContent="center" alignItems="center" flexDirection="column">
            <Heading>{t("Complete")}</Heading>
            <Text width="100%" textAlign="center" mt="1.5rem">{t('You successfully delist boxes')}</Text>
            <CustomButton width="100%" mt="1.5rem" onClick={onDismiss}>
              Close
            </CustomButton>
          </Flex>
        </WrapBody>
      )}
    </CustomModal>
  )
}

export default ModalAction

const CustomModal = styled(Modal)`
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
`
const WrapBody = styled(Flex)`
  width: 370px; 
  padding: 0px;
  flex-direction: column;

  @media screen and (max-width: 600px) {
    width: 300px;
  }

  @media screen and (max-width: 320px) {
    width: 260px;
  }
`
const Heading = styled(Text)`
  font-weight: 700;
  font-size: 48px;
  line-height: 56px;
`