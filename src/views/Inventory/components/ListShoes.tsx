import ReactPaginate from 'react-paginate'
import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Text, Flex, Button } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from '@pancakeswap/localization'
import { GetNftBalance, FetchTokenOfOwnerByIndex, FetDataNft } from '../hook/fetchDataMysteryBox'
import CardShoes from './CardShoes'

// Loading

export const Loading = () => {
  const rotation = keyframes`
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    `

  const Spinner = styled.div`
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-top-color: #07d669;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${rotation} 1s ease-in-out infinite;
    margin: 0 auto;
  `

  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `

  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  )
}

// Pagination

function Items({ currentItems }) {
  return (
    <>
      <CsFlexContainer width="100%" flexDirection="column" mt="3rem" height="auto" minHeight="50vh">
        <CsFlex>
          {currentItems?.map((item) => {
            return (
              <CardShoes
                key={item.token_id}
                ID={item.token_id}
                nftName={item.name}
                nftImage={item.image}
                nftType={item.nftType}
                quantity={item.quantity}
              />
            )
          })}
        </CsFlex>
      </CsFlexContainer>
    </>
  )
}

function PaginatedItems({ itemsPerPage, listCurrentItems }) {
  const [itemOffset, setItemOffset] = useState(0)

  const endOffset = itemOffset + itemsPerPage
  const listItems = listCurrentItems.reverse()
  const currentItems = listCurrentItems.slice(itemOffset, endOffset)
  
  const pageCount = Math.ceil(listItems.length / itemsPerPage)
  console.log(listItems)
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listCurrentItems.length
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
    setItemOffset(newOffset)
  }

  return (
    <>
      <Items currentItems={currentItems} />
      <PaginationWrapper>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
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
        />
      </PaginationWrapper>
    </>
  )
}

interface Props {
  filter?: number
  query?: string
}
const ListShoes: React.FC<Props> = () => {
  const { account, chainId } = useActiveWeb3React()
  const { nftBalance } = GetNftBalance(account, chainId)
  const { tokenOfOwnerByIndex } = FetchTokenOfOwnerByIndex(account, nftBalance, chainId)
  const { listNfts } = FetDataNft(tokenOfOwnerByIndex)
  const [listCurrentItems, setListCurrentItems] = useState([])
  useEffect(() => {
    setListCurrentItems(listNfts)
  }, [nftBalance, tokenOfOwnerByIndex, listNfts])

  return (
    <>
      {listCurrentItems.length === 0 ? (
        <Flex width="100%" justifyContent="center">
          <Text mt="2rem">{nftBalance === 0 ? 'No NFT' : <Loading />}</Text>
        </Flex>
      ) : (
        <PaginatedItems itemsPerPage={9} listCurrentItems={listCurrentItems} />
      )}
    </>
  )
}
export default ListShoes

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
  justify-content: flex-start;
  flex-wrap: wrap;
  column-gap: 80px;
  padding: 0px 20px;
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 80%;
    justify-content: space-between;
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

const PaginationWrapper = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    li {
      margin: 0 5px;
      display: inline-block;

      a {
        color: #000;
        text-decoration: none;
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 3px;

        &:hover {
          background-color: #f7f7f7;
        }
      }

      &.active a {
        background-color: #007bff;
        color: #fff;
        border-color: #007bff;
        cursor: default;

        &:hover {
          background-color: #007bff;
          color: #fff;
          border-color: #007bff;
        }
      }

      &.disabled a {
        color: #6c757d;
        pointer-events: none;
        cursor: default;
      }
    }
  }
`
