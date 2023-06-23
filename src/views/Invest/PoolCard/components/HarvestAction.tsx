import { useTranslation } from "@pancakeswap/localization";
import { SerializedToken } from '@pancakeswap/sdk';
import { AutoRenewIcon, Button, Flex, Text } from "@pancakeswap/uikit";
import { BigNumber } from "bignumber.js";
import { AMOUNT_FULL_POOL } from "config";
import { Address } from "config/constants/types";
import useTheme from "hooks/useTheme";
import React from "react";
import { usePriceRunBusd } from "state/farms/hooks";
import styled from "styled-components";
import { getAddress } from "utils/addressHelpers";
import { GetPendingRewardPoolStore, GetPendingRewardProposal } from "../../hook/fetchDataPoolStore";
import { useWithdrawProposalsPoolProposals } from "../../hook/useWithdrawnPoolProposals";
import { useWithdrawPoolStore } from "../../hook/useWithdrawPoolStore";



interface HarvestActionProps {
    refresh?:number
    contractPoolStore?:Address
    contractProposals?:Address
    onRefresh?:(newValue) => void
    tokenEarn?:SerializedToken
    tokenStake?:SerializedToken,
    totalstaked:number,
    account:string,
    chainId:number
}
const HarvestAction: React.FC<HarvestActionProps> = ({
    refresh, 
    contractPoolStore, 
    contractProposals, 
    tokenEarn,
    tokenStake,
    totalstaked, 
    onRefresh,
    account,
    chainId
}) => {
    const { t } = useTranslation()
    const { theme } = useTheme()
    const contractAddressPoolStore = getAddress(contractPoolStore, chainId)
    const contractAddressPoolProposals = getAddress(contractProposals, chainId)
    const { handleWithdraw, requestedWithdraw, pendingWithdraw } = useWithdrawPoolStore(account, contractAddressPoolStore, onRefresh, chainId)
    const {pendingProposal} = GetPendingRewardProposal(contractAddressPoolProposals,requestedWithdraw, refresh, account, chainId)
    const { handleWithdrawProposals, requestedWithdrawProposals, pendingWithdrawProposals } = useWithdrawProposalsPoolProposals(account, contractAddressPoolProposals, onRefresh, chainId)
    const { pendingRewardPoolStore } = GetPendingRewardPoolStore(contractAddressPoolStore,refresh,requestedWithdrawProposals, account, chainId);
    const runPriceUsd = usePriceRunBusd().toNumber()
    const coinvertTotalStake = new BigNumber(totalstaked)
    const coinvertAmountFUll = new BigNumber(AMOUNT_FULL_POOL)
    const isFullPool = coinvertTotalStake.isGreaterThanOrEqualTo(coinvertAmountFUll)
    const partpendingRewardPoolStore = new BigNumber(pendingRewardPoolStore)

    return (
        <Flex width="100%" justifyContent="space-between" mt="10px" alignItems="center">
            <Flex flexDirection="column" width="100%">
               <Flex width="100%" justifyContent="space-between">
                    <Flex flexDirection="column">
                        <Flex alignItems="center">
                            <Text color="primaryBright" mr="4px">{tokenEarn.symbol}</Text>
                            <Text><span style={{color:theme.colors.text}}>{t("earned")}</span></Text>
                        </Flex>
                        <Flex flexDirection="column">
                            <Text >{pendingProposal.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </Flex>
                    </Flex>
                    <HarvestButton
                        disabled={pendingProposal === 0 || pendingWithdrawProposals}
                        onClick={handleWithdrawProposals}
                        endIcon={pendingWithdrawProposals ? <AutoRenewIcon spin color="textDisable" /> : null  }
                    >
                        Harvest
                    </HarvestButton>
               </Flex>
               <Flex width="100%" justifyContent="space-between" alignItems="center">
                    <Flex flexDirection="column" mt="5px">
                            <Flex alignItems="center">
                                <Text mr="4px" color="primaryBright">RUN</Text>
                                <Text><span style={{color:theme.colors.text}}>{t("earned revenue")}</span></Text>
                            </Flex>
                            <Flex flexDirection="column"> 
                                <Text >{Number(partpendingRewardPoolStore).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                <Text small color="textDisabled">~ {Number(partpendingRewardPoolStore.multipliedBy(new BigNumber(runPriceUsd))).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BUSD</Text>                               
                            </Flex>
                           
                    </Flex>
                    <HarvestButton
                        disabled={pendingWithdraw  || pendingRewardPoolStore === 0}
                        onClick={handleWithdraw}
                        endIcon={pendingWithdraw ? <AutoRenewIcon spin color="textDisable" /> : null  }
                    > 
                        Harvest
                    </HarvestButton>
               </Flex>
            </Flex>
        </Flex>
    )
}
export default HarvestAction

const HarvestButton = styled(Button)`
    background: transparent;
    width:140px;
    height: 45px;
    border: 2px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: 90px;
    color: #000;
    box-shadow:none;
`