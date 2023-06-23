import React, { useEffect, useState } from "react";
import { Text, Flex, Button } from "@pancakeswap/uikit";
import { GetBalanceNft, GetNftInfo, GetTokenIds } from "state/marketplace";
import ReactPaginate from 'react-paginate';
import styled from "styled-components";
import { useTranslation } from "@pancakeswap/localization";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { ChainId } from '@pancakeswap/sdk';
import { useMediaQuery } from 'react-responsive'
import { bscTokens, ethwTokens, bscTestnetTokens, onusTestnetTokens, onusMainnetTokens } from '@pancakeswap/tokens';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from "state"
import { fetchPageNumberCount } from "state/inventory/actions";
import Card from "./Card";


interface Props{
    filterBoxType?:number
    query?: string
}
const Inwallet:React.FC<Props> = ({filterBoxType, query}) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })

    function renderTokenByChain(chainId){
        if( chainId === ChainId.BSC ) {
            return bscTokens.runtogetherBoxNft.address
        } if (chainId === ChainId.ETHW_MAINNET) {
            return ethwTokens.runtogetherBoxNft.address
        } if (chainId === ChainId.BSC_TESTNET) {
            return bscTestnetTokens.runtogetherBoxNft.address
        }
        if (chainId === ChainId.ONUS) {
            return onusMainnetTokens.runtogetherBoxNft.address
        }
        if (chainId === ChainId.ONUS_TESTNET) {
            return onusTestnetTokens.runtogetherBoxNft.address
        }
        return ""
    }
    const { account, chainId } = useActiveWeb3React()
    // const itemsPerPage = 9
    const itemsPerPage = isTabletOrMobile ? 10 : 9
    const { t } = useTranslation()
    const tokenAddress = renderTokenByChain(chainId)
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(1)
    // const [currentItems, setCurrentItems] = useState([])
    const [ balance ] = GetBalanceNft(tokenAddress, account, chainId)
    const [ tokenIds ] = GetTokenIds(tokenAddress, account, balance, chainId) 
    const [ nftInfo ] = GetNftInfo(tokenAddress, tokenIds, chainId)
    const [currentItems, setCurrentItems] = useState([...nftInfo])   
    const [ listNft, setListNft ] = useState([...nftInfo])
    const valSelector = useSelector((state: any) => state.inventory.pagenumbercount)
    const dispatch = useDispatch<AppDispatch>()
    const [pageActive, setPageActive] = useState(0);
    useEffect(() => {
        let listFilter = [...nftInfo]
        if(filterBoxType !== 0)  {
            listFilter = listFilter.filter((data) => data.nftType === filterBoxType)  
            dispatch(fetchPageNumberCount({pagenumbercount:0}))  
        }
        if ( query !== "" && listFilter) {
            listFilter = listFilter.filter((data) => (data.nftId.toString()).includes(query))
        }
        setListNft(listFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nftInfo, filterBoxType, query])

    function MovetoTop(){
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    const handlePageClick = (event) => {
        setPageActive(event.selected);
        const newOffset = (event.selected * itemsPerPage) % listNft.length || 0;
        setItemOffset(newOffset);    
        dispatch(fetchPageNumberCount({pagenumbercount:event.selected}))  
    };

    useEffect(() => {
        if(query !== "") {
            const newOffset = (itemsPerPage % listNft.length) || 0;
            const endOffset = newOffset + itemsPerPage;
            setCurrentItems(listNft?.slice(newOffset, endOffset));
            setPageCount(Math.ceil(listNft.length / itemsPerPage));
            setPageActive(valSelector);       
        }
        else {
            const newOffset = (valSelector * itemsPerPage) % listNft.length || 0;
            // const endOffset = itemOffset + itemsPerPage;
            const endOffset = newOffset + itemsPerPage;
            setCurrentItems(listNft?.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(listNft.length / itemsPerPage));   
            setItemOffset(newOffset);
            setPageActive(valSelector);           
        }      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemOffset, itemsPerPage, listNft]);
    
    return (
        <CsFlexContainer width="100%" flexDirection="column" mt="1rem" height="auto" minHeight="70vh">
            <CsFlex>
                {currentItems?.length !== 0 ?
                    <>
                        {currentItems?.map((item) => {
                            return (
                                <Card 
                                    ID={item.nftId}
                                    boxType={item.nftType}
                                    IsHaving={!false}
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
                    // initialPage={filterBoxType === 0 ?? valSelector}
                    forcePage={pageActive}
                />
            </CustomFlex>
        </CsFlexContainer>
    )
}
export default Inwallet

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