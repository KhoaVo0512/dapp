import React, { useState } from "react";
import { Text, Flex, Button, AutoRenewIcon } from "@pancakeswap/uikit";
import styled from "styled-components";
import useTheme from "hooks/useTheme";
import { useTranslation } from "@pancakeswap/localization";
import { SerializedToken } from "@pancakeswap/sdk";
import { Address } from "config/constants/types";
import { GetPendingRewardByContract } from "state/poolrunV2/fetchData"
import BigNumber from "bignumber.js";
import { BIG_ZERO } from "utils/bigNumber";
import { useHarvest } from "state/poolrunV2/hook/useHarvest"

interface HavestProps {
    tokenEarn: SerializedToken
    poolContract:Address
    chainId:number
    account:string|null
    refresh:number,
    onRefresh:(newValue:number) => void
}
const HavestAction: React.FC<HavestProps> = ({
    tokenEarn,
    poolContract,
    chainId,
    account,
    refresh,
    onRefresh
}) => {
    const { t } = useTranslation()
    const imgTokenEarn = `/images/coins/${tokenEarn?.address}.png`
    const { theme } = useTheme()
    const isAccount = account !== null
    const { pendingReward } = GetPendingRewardByContract(poolContract, account, chainId, refresh )
    const isPendingReward = new BigNumber(pendingReward).isGreaterThan(BIG_ZERO)
    const { handleHarvest, pendingHarvestd } = useHarvest(poolContract, account, chainId,  onRefresh)
    return (
        <ContainerHavestActions>
            <Text><span style={{color:theme.colors.primaryBright}}>{tokenEarn?.symbol}</span> EARNED</Text>
            <Row>
                <Flex alignItems="center" style={{gap:"10px"}}>
                    <img src={imgTokenEarn} alt="logo token earn" style={{height:"30px", width:"30px"}}/>
                    <Text fontSize="20px" bold>{Number(pendingReward).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </Flex>
                <HarvestButton
                   onClick={handleHarvest} 
                   disabled={!isAccount || !isPendingReward || pendingHarvestd}
                   endIcon={ pendingHarvestd ? <AutoRenewIcon spin color="textDisabled"/> : null}
                > 
                    Harvest
                </HarvestButton>
            </Row>
        </ContainerHavestActions>
    )
}
export default HavestAction

const ContainerHavestActions = styled(Flex)`
    width: 30%;
    flex-direction:column;
    justify-content: center;
    align-items: start;
    height:100%;
    gap:20px;
    @media screen and (min-width: 600px) and (max-width: 1000px) {
        width:50%;
        height:100px;
    }
    @media screen and (max-width: 600px) {
        width:100%;
        height:100px;
        margin-top:1.25rem;
    }
`
const HarvestButton = styled(Button)`
    background: transparent;
    height: 50px;
    border: 2px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: 90px;
    color: ${({ theme }) => theme.colors.text};
    box-shadow:none;
`
const Row = styled(Flex)`
    gap:20px;
    width:100%;
    @media screen and (max-width: 600px) {
        width:100%;
        justify-content:space-between
    }
`