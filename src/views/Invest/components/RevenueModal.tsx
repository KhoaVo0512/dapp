import { useTranslation } from "@pancakeswap/localization";
import { Flex, Modal, Text } from "@pancakeswap/uikit";
import React from "react";
import styled from "styled-components";
import { GetSnapshotList } from "../hook/fetchDataPoolStore";
import { GetDataPoolLength } from "../hook/fetchPoolLength";
import RowRevenue from "./RowHistoryRevenue";

interface RevenueProps {
    onDismiss?: () => void
    poolStoreAddress:string
    chainId:number
}

const RevenueModal: React.FC<RevenueProps> = ({onDismiss, poolStoreAddress, chainId}) => {
    const { t } = useTranslation()
    const {poolLength} = GetDataPoolLength(poolStoreAddress, chainId)

    const { snapshotList } = GetSnapshotList(poolStoreAddress, poolLength, chainId)
    
    return (
        <CustomModal title="" onDismiss={onDismiss}>
            <Container>
                <Text textAlign="center" fontSize="22px" bold>{t("History Revenue")}</Text>
                <HeaderTable>
                    <ColTime>
                        <CsText color="textDisabled" textTransform="uppercase">TIME</CsText>
                    </ColTime>
                    <ColBlock>
                        <CsText color="textDisabled" textTransform="uppercase">Block Number</CsText>
                    </ColBlock>
                    <ColToken>
                        <CsTextAmount color="textDisabled" textTransform="uppercase">Token a snapshot</CsTextAmount>
                    </ColToken>
                </HeaderTable>
                <ContainerRevenue isScroll={snapshotList.length > 3 ? !false : false} isSrollDesktop={snapshotList.length > 6 ? !false : false}>
                    { snapshotList.length === 0 ?
                        <Text width="100%" textAlign="center" mt="1.5rem">No Data</Text>
                    :
                        <>
                            {snapshotList.map((item) => (
                                <RowRevenue 
                                    blockNumber={item.lastRewardBlock}
                                    amount={item.totalProfitAmount}
                                    timeStamp={item.lastTimestamp}
                                    isScroll={snapshotList.length > 3 ? !false : false}
                                />
                            ))}
                        </>
                    }
                </ContainerRevenue>
                
            </Container>
        </CustomModal>
    )
}
export default RevenueModal
const CustomModal = styled(Modal)`
    padding:0px;
`
const Container = styled(Flex)`
    width: 500px;
    flex-direction:column;
    @media screen and (max-width: 600px) {
        width: 310px !important;
    }
`
const ColTime = styled(Flex)`
    width: 30%;
    @media screen and (max-width: 600px) {
        width: 25%;
    }
`
const ColBlock = styled(Flex)`
    width: 30%;
    @media screen and (max-width: 600px) {
        width: 35%;
    }
`
const ColToken = styled(Flex)`
    width: 40%;
    @media screen and (max-width: 600px) {
        width: 40%;
    }
`
const HeaderTable = styled(Flex)`
    height: 50px;
    width: 100%;
    align-items: center;
    margin-top:1.5rem;
    padding-left:10px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.cardBorder};
    @media screen and (max-width: 600px) {
        display: none;
    }
`
const CsText = styled(Text)`
    @media screen and (max-width: 600px) {
        text-align: left;
        width: 100%;
        font-size: 13px;
        font-weight:bold;
    }
`
const CsTextAmount = styled(Text)`
    width: 100%;
    text-align: right;
    @media screen and (max-width: 600px) {
        text-align: left;
        width: 100%;
        font-size: 13px;
        font-weight:bold;
    }
`
const ContainerRevenue = styled(Flex)<{isScroll?:boolean, isSrollDesktop?:boolean}>`
    width: 100%;
    height: 100%;
    max-height:60vh;
    flex-direction:column;
    overflow-y: scroll;
    @media screen and (max-width: 600px) {
        overflow-y: ${({ isScroll }) => (isScroll ? 'scroll' : 'hidden')};
        margin-bottom:10px;
    }
    @media screen and (min-width: 600px) {
        padding-right:${({ isSrollDesktop }) => (isSrollDesktop ? '5px' : '0px')};
    }
    
`