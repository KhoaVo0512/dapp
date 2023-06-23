import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text, Flex } from "@pancakeswap/uikit"
import ReactPaginate from 'react-paginate';
import { GetListBoxes } from "state/inventory";
import { useTranslation } from "@pancakeswap/localization";
import { GetUser } from "state/account";
import { useMediaQuery } from 'react-responsive'
import CardBoxesOffChain from "./CardBoxesOffChain";

interface Props {
    filter?:number
    query?: string
}

const ListBoxes:React.FC<Props> = ({filter, query}) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
    const [ user ] = GetUser()
    const [ listBoxes ] = GetListBoxes(user?.id !== null ? user?.id : null)
    const [ listNft, setListNft ] = useState([...listBoxes])
    // const itemsPerPage = 9
    const itemsPerPage = isTabletOrMobile ? 10 : 9
    const { t } = useTranslation()
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(1);
    const [currentItems, setCurrentItems] = useState([]);

    useEffect(() => {
        let listFilter = [...listBoxes]
        if(filter !== 0)  {
            listFilter = listFilter.filter((data) => data.type === filter)
        }
        if ( query !== "" && listFilter) {
            listFilter = listFilter.filter((data) => (data.token_id.toString()).includes(query))
        }
        setListNft(listFilter)
    }, [listBoxes, filter, query])
    // panigate
    function MovetoTop(){
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    const handlePageClick = (event) => {
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
    }, [listNft]);
    return (
        <CsFlexContainer width="100%" flexDirection="column" mt="3rem" height="auto" minHeight="50vh">
            <CsFlex>
                {currentItems.length !== 0 ?
                    <>
                        {currentItems.map((item) => {
                            return (
                                <CardBoxesOffChain 
                                    ID={item.token_id}
                                    boxName={item.name}
                                    boxImages={item.img_box}
                                    nftType={item.type}
                                    efficiency={item.efficiency}
                                    luck={item.luck}
                                    comfy={item.luck}
                                    sturdence={item.sturdence}
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
                />
            </CustomFlex>
        </CsFlexContainer>
    )
}
export default ListBoxes

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
    padding: 0px 100px;
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