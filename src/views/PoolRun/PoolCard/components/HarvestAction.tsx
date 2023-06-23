import React, { useState } from "react";
import { Text, Flex, Button, useModal, AutoRenewIcon } from "@pancakeswap/uikit";
import styled from "styled-components";
import useTheme from 'hooks/useTheme'
import { SerializedToken } from '@pancakeswap/sdk'
import { Address } from "config/constants/types";
import { GetPendingRewardByContract } from "state/poolrunV2/fetchData"
import BigNumber from "bignumber.js";
import { BIG_ZERO } from "utils/bigNumber";
import { useHarvest } from "state/poolrunV2/hook/useHarvest"

interface HarvestActionProps {
    tokenEarn: SerializedToken
    poolContract:Address
    chainId:number
    account:string|null
    refresh:number,
    onRefresh:(newValue:number) => void
}
const HarvestAction: React.FC<HarvestActionProps> = ({
    tokenEarn, 
    poolContract, 
    chainId, 
    account, 
    refresh,
    onRefresh
}) => {
    const { theme } = useTheme()
    const isAccount = account !== null
    const { pendingReward } = GetPendingRewardByContract(poolContract, account, chainId, refresh )
    const isPendingReward = new BigNumber(pendingReward).isGreaterThan(BIG_ZERO)
    const { handleHarvest, pendingHarvestd } = useHarvest(poolContract, account, chainId,  onRefresh)
    return (
        <Flex width="100%" justifyContent="space-between" mt="10px" alignItems="center">
            <Flex flexDirection="column">
                <Text><span style={{color:theme.colors.primaryBright}}>{tokenEarn.symbol}</span> Earned</Text>
                <Text color="textDisabled">{Number(pendingReward).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            </Flex>
            <HarvestButton
                onClick={handleHarvest} 
                disabled={!isAccount || !isPendingReward || pendingHarvestd}
                endIcon={ pendingHarvestd ? <AutoRenewIcon spin color="textDisabled"/> : null}
            > 
                Harvest
            </HarvestButton>
        </Flex>
    )
}
export default HarvestAction

const HarvestButton = styled(Button)`
    background: transparent;
    height: 50px;
    border: 2px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: 90px;
    color: ${({ theme }) => theme.colors.text};
    box-shadow:none;
`