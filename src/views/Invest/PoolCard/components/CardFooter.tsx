/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { usePriceRunBusd } from "state/farms/hooks";
import { Text, Flex, Button, useModal, ChevronUpIcon, ChevronDownIcon, OpenNewIcon } from "@pancakeswap/uikit";
import styled from "styled-components";
import { useTranslation } from "@pancakeswap/localization";
import RevenueModal from "../../components/RevenueModal"

interface CardFooterProps {
    link?: string
    locations?:string
    totalProfitAmount?:number
    poolStoreAddress:string
    onRefresh?:(newValue) => void
    account:string,
    chainId:number
}
const CardFooter: React.FC<CardFooterProps> = ({link, locations, totalProfitAmount, poolStoreAddress, account, chainId }) => {
    const { t } = useTranslation()
    const [ isExpanded, setIsExpanded ] = useState(false)
    const runBusdPrice = usePriceRunBusd().toNumber()

    function handleClick(){
        window.open(`${link}`)
    }
    const convertRevenue = (totalProfitAmountInput) => {
        return ((totalProfitAmountInput / 0.3) * runBusdPrice)
    }
    const [openModal] = useModal(
        <RevenueModal 
            poolStoreAddress={poolStoreAddress}
            chainId={chainId}
        />
        )
    return (
        <Flex mt="1rem" width="100%" flexDirection="column">
            <Flex width="100%" justifyContent="center">
                <CustomButton onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ?  t('Hide') : t('Details')}
                    {isExpanded ? <ChevronUpIcon/> : <ChevronDownIcon/>}
                </CustomButton>
            </Flex>
            { isExpanded &&
                <Flex width="100%" flexDirection="column" mt="1.25rem" alignItems="end">
                    <Flex flexDirection='column' width='100%'>
                        <Flex mb='10px'>
                            <CsText textTransform="uppercase" color="textDisabled" width='50%'>location:</CsText>
                            <CsText width='50%' textAlign='end'>{locations}</CsText>
                        </Flex>
                        <Flex width="100%" justifyContent="space-between">
                            <CsText textTransform="uppercase" color="textDisabled">Last month's revenue:</CsText>
                            <CsText textAlign='end'>$ {convertRevenue(totalProfitAmount).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</CsText>
                        </Flex>
                    </Flex>
                    <Flex width="100%" justifyContent="flex-start">
                        <CustomLinkExternal onClick={openModal}>
                            <Text>History Revenue</Text>
                            <OpenNewIcon/>
                        </CustomLinkExternal>
                    </Flex>
                    <Flex width="100%" justifyContent="flex-start">
                        <CustomLinkExternal onClick={handleClick}>
                            <Text>View Contract</Text>
                            <OpenNewIcon/>
                        </CustomLinkExternal>
                    </Flex>
                </Flex>
            }
        </Flex>
    )
}
export default CardFooter

const CustomButton = styled.div`
    width:auto;
    gap:15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    font-weight:600;
    color:${({ theme }) => theme.colors.text};
`
const CustomLinkExternal = styled.div`
    margin-top: 10px;
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:10px;
    cursor: pointer;
    ${Text}{
            color:${({ theme }) => theme.colors.secondary};
            font-weight: 700;
        }
        > svg {
            fill:${({ theme }) => theme.colors.secondary};
        }
`
const CsText = styled(Text)`
    font-size: 14px;
`