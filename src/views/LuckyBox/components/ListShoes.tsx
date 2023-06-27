/* eslint-disable react-hooks/exhaustive-deps */
import { Loading } from 'views/Inventory/components/ListShoes'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Text, Flex, Button, useToast } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from '@pancakeswap/localization'
import { selectAmountGoldBox, selectAmountRubyBox, selectAmountSilverBox } from 'state/luckyBox/actions'
import { AppDispatch, AppState } from 'state'
import {
  GetAllowance,
  GetPriceNfts,
  GetBalanceOfToken,
  SetPricesMaxTotalAndTotalSupplyNft,
  GetTotalSupplyNft,
  GetMaxSupplyNft,
} from '../hook/fetchDataMysteryBox'
import CardShoes from './CardShoes'
import { useBuyNFT } from '../hook/useBuyNft'
import { useApprove } from '../hook/useApprove'

interface Props {
  filter?: number
  query?: string
}
const ListShoes: React.FC<Props> = () => {
  const { account, chainId } = useActiveWeb3React()
  const [refresh, setRefresh] = useState(0)
  function onRefresh(newValue: number) {
    setRefresh(newValue)
  }
  const [listTotalBox, setListTotalBox] = useState([1, 1, 1])

  const { toastError } = useToast()
  const { t } = useTranslation()
  const [balance, setBalance] = useState(-1)
  const [totalSelectItem, setTotalSelectItem] = useState(1)
  const [totalNftPrice, setTotalNftPrice] = useState(0)
  const [approved, setApproved] = useState(false)
  const { handleApprove, requestedApproval } = useApprove(1116, '0x585b34473CEac1D60BD9B9381D6aBaF122008504', approved)
  const { ListPrices } = GetPriceNfts(chainId)
  const { listTotalSupplyNft } = GetTotalSupplyNft(chainId)
  const { listMaxSupplyNft } = GetMaxSupplyNft(chainId)
  const { allowance } = GetAllowance(account, chainId, requestedApproval)
  const { balanceOfToken } = GetBalanceOfToken(account, chainId)
  const [currentItems, setCurrentItems] = useState([])
  const { handleBuy, requestedBuy, pendingBuy, totalNfts, isCloseBuy } = useBuyNFT(
    chainId,
    onRefresh,
    balance,
    listTotalSupplyNft,
    totalSelectItem,
  )
  const luckyBox = useSelector<AppState, AppState['luckyBox']>((state) => state.luckyBox)
  // eslint-disable-next-line prefer-destructuring
  const totalSilverBox = luckyBox.totalSilverBox
  // eslint-disable-next-line prefer-destructuring
  const totalGoldBox = luckyBox.totalGoldBox
  // eslint-disable-next-line prefer-destructuring
  const totalRubyBox = luckyBox.totalRubyBox
  const dispatch = useDispatch<AppDispatch>()
  function onUpdateAmountBox(value, boxType) {
    try {
      if (boxType === 0) {
        if (value === 0)
          // eslint-disable-next-line no-param-reassign
          value = ''
        dispatch(selectAmountSilverBox({ totalSilverBox: value }))
      }
      if (boxType === 1) {
        if (value === 0)
          // eslint-disable-next-line no-param-reassign
          value = ''
        dispatch(selectAmountGoldBox({ totalGoldBox: value }))
      }
      if (boxType === 2) {
        if (value === 0)
          // eslint-disable-next-line no-param-reassign
          value = ''
        dispatch(selectAmountRubyBox({ totalRubyBox: value }))
      }
    } catch (e) {
      console.log(e)
    }
  }
  const onHandleApprove = () => {
    setApproved(true)
  }

  const HandleBuyNft = ({ ID, totalSelectItems, nftPrice }) => {
    setBalance(ID)
    // eslint-disable-next-line no-param-reassign
    if (Number(totalSelectItems === '')) totalSelectItems = 1
    setTotalSelectItem(totalSelectItems)
    setTotalNftPrice(nftPrice)
  }
  useEffect(() => {
    setListTotalBox([totalSilverBox, totalGoldBox, totalRubyBox])
  }, [totalSilverBox, totalGoldBox, totalRubyBox, luckyBox])
  useEffect(() => {
    const Items = SetPricesMaxTotalAndTotalSupplyNft(ListPrices, listTotalSupplyNft, listMaxSupplyNft)
    setCurrentItems([...Items])
    setBalance(-1)
  }, [
    ListPrices,
    totalNfts,
    listTotalSupplyNft,
    listMaxSupplyNft,
    allowance,
    balanceOfToken,
    account,

    requestedBuy,
    pendingBuy,
  ])

  useEffect(() => {
    if (balance > -1) {
      const maxTotalNft = listMaxSupplyNft[balance]
      const totalSupplyNft = listTotalSupplyNft[balance]
      if (maxTotalNft === totalSupplyNft) {
        toastError(t('Error'), t('The number of NFTs has reached the limit!'))
        setBalance(-1)
      } else if (balanceOfToken < totalNftPrice) {
        toastError(
          t('Error'),
          t('Please try again. The amount of money you have is not sufficient to perform this transaction!'),
        )
        setBalance(-1)
      } else {
        handleBuy()
        onUpdateAmountBox(1, balance)
        const Items = SetPricesMaxTotalAndTotalSupplyNft(ListPrices, totalNfts, listMaxSupplyNft)
        setCurrentItems([...Items])
        setBalance(-1)
      }
    } else {
      const Items = SetPricesMaxTotalAndTotalSupplyNft(ListPrices, listTotalSupplyNft, listMaxSupplyNft)
      setCurrentItems([...Items])
    }
  }, [balance])
  useEffect(() => {
    handleApprove()
    setApproved(false)
    if (requestedApproval === true) {
      const Items = SetPricesMaxTotalAndTotalSupplyNft(ListPrices, listTotalSupplyNft, listMaxSupplyNft)
      setCurrentItems([...Items])
    }
  }, [approved, requestedApproval])
  return (
    <CsFlexContainer width="100%" flexDirection="column" mt="3rem" height="auto" minHeight="50vh">
      <CsFlex>
        {currentItems?.length !== 0 ? (
          <>
            {currentItems?.map((item) => {
              return (
                <CardShoes
                  balanceOfToken={balanceOfToken}
                  ID={item.id}
                  allowance={allowance}
                  key={item.id}
                  nftName={item.name}
                  nftImage={item.image}
                  nftPrice={
                    String(listTotalBox[item.id]) === ''
                      ? Number(item.price)
                      : Number(item.price) * Number(listTotalBox[item.id])
                  }
                  nftDesc={item.desc}
                  nftType={item.nftType}
                  onHandleBuyNft={HandleBuyNft}
                  handleApprove={onHandleApprove}
                  pendingBuy={pendingBuy}
                  totalSupplyNft={item.totalSupplyNft}
                  maxSupplyNft={item.maxSupplyNft}
                  totalSelectItems={listTotalBox[item.id]}
                  onUpdateTotalBuy={(newValue) => onUpdateAmountBox(newValue, item.id)}
                  onRemoveTotalBuy={(newValue) => onUpdateAmountBox(newValue, item.id)}
                  onChangeInputBuy={(newValue) => onUpdateAmountBox(newValue, item.id)}
                />
              )
            })}
          </>
        ) : (
          <Flex width="100%" justifyContent="center">
            <Text mt="2rem">
              <Loading />
            </Text>
          </Flex>
        )}
      </CsFlex>
    </CsFlexContainer>
  )
}
export default ListShoes

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomFlex = styled(Flex)`
  margin-bottom: 1.5rem;
  .pagination {
    display: flex;
    flex-direction: row;
    width: 500px;
    justify-content: space-around;
    align-items: center;
    @media screen and (max-width: 600px) {
      width: 100%;
    }
    * {
      list-style-type: none;
    }
  }
  .page-link {
    background: ${({ theme }) => theme.colors.tertiary};
    padding: 12px;
    border-radius: 5px !important;
    border: none !important;
    color: ${({ theme }) => theme.colors.text};
    &:focus {
      box-shadow: none !important;
    }
    &:hover {
      background: ${({ theme }) => theme.colors.backgroundTab};
    }
  }
  .page-item.disabled .page-link {
    background: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed !important;
    opacity: 0.7;
    pointer-events: none;
  }
  .page-item.active .page-link {
    background: ${({ theme }) => theme.colors.primaryBright};
    color: #fff;
  }
`
const CsFlex = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 30px;
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 80%;
    justify-content: space-evenly;
    column-gap: 0px;
    padding: 0px;
  }
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    column-gap: 0px;
    padding: 0px;
  }
  @media screen and (max-width: 600px) {
    justify-content: center;
    gap: 0px;
    padding: 0px 10px;
  }
`
const CsFlexContainer = styled(Flex)`
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    align-items: center;
  }
`
