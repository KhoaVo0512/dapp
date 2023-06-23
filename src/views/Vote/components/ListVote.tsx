import React from "react";
import { Flex, Text,OpenNewIconInvest } from "@pancakeswap/uikit";
import styled, { useTheme } from "styled-components";
import { getBlockExploreLink } from "utils";
import BigNumber from 'bignumber.js'
import { BASE_BSC_URL } from "config";
import useActiveWeb3React from 'hooks/useActiveWeb3React'

interface Props {
    address?:string
    txAddress?:string
    status?:boolean
    balance?:string
    rowId?:number
}

const ListVote:React.FC<Props> = ({
    address,
    txAddress,
    status,
    balance,
    rowId,
}) => {

    const TXHashLinkBsc = `${BASE_BSC_URL}/tx/${txAddress}`
    const { chainId } = useActiveWeb3React() 
    // function hanldClickLinkTX(){
    //     window.open(TXHashLinkBsc)
    // }
    function handleOpenLink(){
        window.open(getBlockExploreLink(txAddress, 'transaction', chainId))
     }

    function sAccount (dataAddress) {
        if ( dataAddress ) {
            return `${dataAddress.substring(0, 4)}...${dataAddress.substring(dataAddress.length - 4)}`
        }
        return ""
    }
    const converAmount = new BigNumber(balance)
    const partAmount = converAmount.decimalPlaces(2,1)
    const theme = useTheme();
    return (
        <Container>
            <BodyTable>
                <FlexData>
                    <CustomLink style={{cursor: 'pointer'}} width='100%' justifyContent='center' alignItems='center' onClick={handleOpenLink}>
                        {sAccount(txAddress)} <CustomOpenNewIconInvest/>
                    </CustomLink>
                </FlexData>
                <FlexData justifyContent='center'>
                  <Text color="#000" fontWeight="600"> {status ? "Agree" : "Disagree"} </Text> 
                </FlexData>
                <FlexData>
                    <Flex width='100%' justifyContent='center' alignItems='center'>
                        {Number(partAmount).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Flex>
                </FlexData>
            </BodyTable>
        </Container>
    )
}

export default ListVote

const Container = styled(Flex)`
    width: 100%;
    flex-direction: column;
`
const BodyTable = styled(Flex)`
    width: 100%;
    height: 80px;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    gap: 10px;
    color:${({theme})=>theme.colors.text};
    @media screen and (max-width: 1024px){
        gap: 10px;
    }
    @media screen and (max-width: 768px){
        gap: 20px;
    }
    @media screen and (max-width: 600px){
        gap: 0px;
    }
`
const FlexData = styled(Flex)`
    width: 33.33%;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const CustomOpenNewIconInvest = styled(OpenNewIconInvest)`
    margin-left: 10px;
    margin-top: 4px;
    @media screen and (max-width: 600px){
        margin-left: 5px;
    }
`
const CustomLink = styled(Flex)`
    @media screen and (max-width: 600px){
        margin-left: 20px;
    }
`