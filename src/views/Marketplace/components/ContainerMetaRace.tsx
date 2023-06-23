import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GetBalanceNftInMarket } from 'state/multiBuyBox/hook/fetchdata'
import ReactPaginate from 'react-paginate'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from '@pancakeswap/localization'
import { usePriceRunBusd } from 'state/farms/hooks'
import { Flex, Text } from '@pancakeswap/uikit'
import { useMediaQuery } from 'react-responsive'
import { ChainId } from '@pancakeswap/sdk'
import ConditionCard from './ConditionCard'
import CardAdmin from './AdminCard'

interface Props {
  listItems: any
}

const dataAdmin = [
  {
    id: 1,
    name: 'MetaRush',
  },
  {
    id: 2,
    name: 'MetaRun',
  },
  {
    id: 3,
    name: 'MetaRace',
  },
  {
    id: 4,
    name: 'MetaRich',
  },
]

const ContainerCardMetaRace: React.FC<Props> = ({ listItems }) => {
  const ChainShowCardAdmin = [ChainId.BSC_TESTNET, ChainId.ONUS_TESTNET]
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const { t } = useTranslation()
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [currentItems, setCurrentItems] = useState([...listItems])
  const { chainId } = useActiveWeb3React()
  const isShowCardAdmin = ChainShowCardAdmin.find(e => e === chainId) ?? false
  const itemsPerPage = itemOffset === 0 && isShowCardAdmin ? (isTabletOrMobile ? 9 : 8) : (isTabletOrMobile ? 10 : 9)

  const runBusdPrice = usePriceRunBusd().toNumber()
  // panigate
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listItems.length
    setItemOffset(newOffset)
  }
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(listItems.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(listItems.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, listItems])

  const [nftBalance] = GetBalanceNftInMarket(chainId)

  const totalNftInMarket = nftBalance.totalNftMetaRace+nftBalance.totalNftMetaRich+nftBalance.totalNftMetaRun+nftBalance.totalNftMetaRush
  return (
    <Flex width="100%" flexDirection="column" mt="1rem" height="auto" minHeight="50vh">
        {totalNftInMarket === 0 && currentItems.length === 0 ? (
          <Flex justifyContent='space-around'>
            <Text>{t('No Data')}</Text>
          </Flex>
        ) : (
          <>
            {currentItems.length !== 0 ? (
              <CsFlex>
                {itemOffset === 0 && isShowCardAdmin && <CardAdmin boxName={dataAdmin} totalNftInMarket={totalNftInMarket} />}
                {currentItems.map((item) => {
                  return (
                    <ConditionCard
                      key={item.nftId}
                      isStore={!false}
                      nftId={item.nftId}
                      saleId={item.saleId}
                      nftType={item.boxType}
                      price={item.priceListing}
                      seller={item.seller}
                      runBusdPrice={runBusdPrice}
                    />
                  )
                })}
              </CsFlex>
            ) : (
              <Flex justifyContent='space-around'>
                <Text>{t('No Data')}</Text>
              </Flex>              
            )}
          </>
        )}
      <CustomFlex width="100%" mt="1rem" justifyContent="center" height="62px">
     { currentItems.length !== 0 ? <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
        /> : ""
     }
      </CustomFlex>
    </Flex>
  )
}
export default ContainerCardMetaRace

const CustomFlex = styled(Flex)`
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
  // width:100%;
  flex-wrap: wrap;
  justify-content: flex-start;  
  column-gap: 52px;
  @media screen and (min-width: 821px) and (max-width: 1024px) {
    padding: 0px 50px 0px 50px;
  }
  @media screen and (max-width: 1024px) {
    justify-content: space-between; 
    column-gap: 0px;
  }
  @media screen and (max-width: 600px) {
    justify-content: space-around; 
    column-gap: 0px;
  }
`
