import React, { useEffect, useState } from "react";
import { Flex, Text, Button } from "@pancakeswap/uikit";
import styled from "styled-components";
import ReactPaginate from 'react-paginate';
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { useTranslation } from "@pancakeswap/localization";
import { GetListItems, GetTotalSellItems, GetSellItemsByUser } from 'state/marketplace'
import { useMediaQuery } from 'react-responsive'
import Card from "./Card";

interface Props{
    filterBoxType?:number
    query?: string
}

const OnSale:React.FC<Props> = ({filterBoxType, query}) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const { t } = useTranslation()
    const { account, chainId } = useActiveWeb3React()
    const [ totalSell ] = GetTotalSellItems(chainId)
    const [ listItems ] = GetSellItemsByUser(chainId, totalSell, account)
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);
    // const itemsPerPage = 9
    const itemsPerPage = isTabletOrMobile ? 10 : 9
    const [pageActive, setPageActive] = useState(0);
    // panigate
    const [ listNft, setListNft ] = useState([...listItems])
    useEffect(() => {
        let listFilter = [...listItems]
        if(filterBoxType !== 0)  {
            listFilter = listFilter.filter((data) => data.boxType === filterBoxType)
        }
        if ( query !== "" && listFilter) {
            listFilter = listFilter.filter((data) => (data.nftId.toString()).includes(query))
        }
        setListNft(listFilter)
    }, [listItems, filterBoxType, query])
    function MovetoTop(){
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    const handlePageClick = (event) => {
        setPageActive(event.selected);
        const newOffset = (event.selected * itemsPerPage) % listNft.length;
          setItemOffset(newOffset);
    };
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(listNft.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(listNft.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, listNft]);
    useEffect(() => {
            setItemOffset(0);
            setPageActive(0);
    }, [listNft]);
    return (
        <CsFlexContainer width="100%" flexDirection="column" mt="1rem" height="auto" minHeight="70vh">
            <CsFlex>
                {currentItems.length !== 0 ?
                    <>
                        {currentItems.map((item) => {
                            return (
                                <Card 
                                    ID={item.nftId}
                                    boxType={item.boxType}
                                    saleId={item.saleId}
                                    price={item.priceListing}
                                    IsHaving={false}
                                    onChain={!false}
                                /> 
                            )
                        })}
                    </>
                :
                                <Flex width='100%' justifyContent='center'>
                                    <Text mt="2rem">{t("No Data")}</Text>
                                </Flex>
                }
            </CsFlex>
            <CustomFlex width="100%" mt="1rem" justifyContent="center" height="62px">
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    onClick={MovetoTop}
                    forcePage={pageActive}
                />
            </CustomFlex>
        </CsFlexContainer>
    )
}

export default OnSale
const CustomFlex = styled(Flex)`
    margin-bottom:1.5rem;
    .pagination{
        display:flex;
        flex-direction: row;
        width:500px;
        justify-content:space-around;
        align-items:center;
        @media screen and (max-width: 600px){
            width: 100%;
        }
        *{
            list-style-type: none;
        }
    }
    .page-link {
        background:${({ theme }) => theme.colors.tertiary};
        padding:12px;
        border-radius:5px !important;
        border:none !important;
        color:${({ theme }) => theme.colors.text};
        &:focus {
            box-shadow:none !important;
        }
        &:hover{
            background:${({ theme }) => theme.colors.backgroundTab};
        }
    }
    .page-item.disabled .page-link{
        background:${({ theme }) => theme.colors.disabled};
        cursor: not-allowed! important;
        opacity: 0.7;
        pointer-events:none;
    }
    .page-item.active .page-link{
        background:${({ theme }) => theme.colors.primaryBright};
        color:#fff;
    }
`
const CsFlex = styled(Flex)`
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
    column-gap: 16px;
    padding: 0px 70px;
@media screen and (min-width: 769px) and (max-width: 1024px){
    width: 80%;
    justify-content: space-between;
    column-gap: 0px;
    padding: 10px;
}
@media screen and (max-width: 768px){
    justify-content: space-between;
    column-gap: 0px;
    padding: 0px;
}
@media screen and (max-width: 600Px){
    justify-content: center;
    gap: 0px;
    padding: 0px 10px;
}
`
const CsFlexContainer = styled(Flex)`
    justify-content: center;
    @media screen and (min-width: 769px) and (max-width: 1024px){
        align-items: center;
    }
`