import { useTranslation } from "@pancakeswap/localization";
import { SerializedToken } from '@pancakeswap/sdk';
import { AddIcon, AutoRenewIcon, Button, Flex, IconButton, MinusIcon, Text, useModal } from "@pancakeswap/uikit";
import ConnectWalletButton from "components/ConnectWalletButton";
import { Address } from "config/constants/types";
import useTheme from "hooks/useTheme";
import React from "react";
import { GetApprovePoolContract } from "state/poolrunV2/fetchData";
import { useApprove } from "state/poolrunV2/hook/useApprove";
import styled from "styled-components";
import StakeModal from "../../components/StakeModal";
import UnStakeModal from "../../components/UnStakeModal";

interface StakeProps {
    tokenStake:SerializedToken,
    poolContract:Address,
    chainId:number
    account:string|null
    refresh:number,
    startTimeStake: number,
    totalStakeAmount:string,
    tvl:string,
    runPriceUsd:number,
    onRefresh?: (newValue) => void,
    endTimeStake?: number
}
const StakeAction: React.FC<StakeProps> = ({
    tokenStake,
    poolContract,
    chainId,
    account,
    refresh,
    startTimeStake,
    runPriceUsd,
    tvl,
    totalStakeAmount,
    onRefresh,
    endTimeStake
}) => {
    const { t } = useTranslation()
    const currentTime = Date.now()
    const { theme } = useTheme()
    const dataUserStaked = 1211
    const [ openModalUnStake ] = useModal(
        <UnStakeModal
            title="Unstake"
            tokenStake={tokenStake}
            refresh={refresh}
            chainId={chainId}
            account={account}
            poolContract={poolContract}
            onRefresh={onRefresh}
        />,
    )
    const [ openModalStake ] = useModal(
        <StakeModal
            title="Stake"
            tokenStake={tokenStake}
            refresh={refresh}
            chainId={chainId}
            account={account}
            poolContract={poolContract}
            onRefresh={onRefresh}
        />
    )

    const { allowance } = GetApprovePoolContract(tokenStake, poolContract, account, chainId, refresh )

    const { handleApprove, pendingApprove } = useApprove(poolContract, tokenStake.address, chainId, onRefresh )

    const renderCurrencyBUSD =  totalStakeAmount.length ? Number(totalStakeAmount)*runPriceUsd : 0
    const renderPercentStaked = totalStakeAmount.length ? Number(totalStakeAmount)/Number(tvl)*100 : 0
    const finished = endTimeStake*1000 < currentTime && endTimeStake !==0
    return (
        <ContainerStakeActions>
            <Text textTransform="uppercase">Start Pooling</Text>
            { account ?
                <Flex width="100%">
                    { Number(allowance) !== 0 ?
                        <>
                            { Number(totalStakeAmount) !== 0 ?
                                <Container width="100%" justifyContent="space-between" alignItems="center">
                                    <Flex flexDirection="column">
                                        <Text><span style={{color:theme.colors.primaryBright}}>{tokenStake?.symbol}</span> Staked</Text>
                                        <Flex style={{gap:"5px"}} alignItems="center" mt="6px" flexWrap="wrap">
                                            <Text fontSize="18px" bold>{Number(totalStakeAmount).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                            <Text>({renderPercentStaked.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}% of pool)</Text>
                                        </Flex>
                                        <Text small color='textDisabled'> ~ {renderCurrencyBUSD.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BUSD </Text>
                                    </Flex>
                                    <Flex style={{gap:"15px"}}>
                                        <CustomIconButton
                                            onClick={openModalUnStake}
                                        >
                                            <MinusIcon color="white" />
                                        </CustomIconButton>
                                        <CustomIconButton
                                            onClick={openModalStake}
                                            disabled={finished}
                                        >
                                            <AddIcon color="white" />
                                        </CustomIconButton>
                                    </Flex>
                                </Container>
                            :
                                <ButtonStaked onClick={openModalStake} disabled={finished}>
                                    Stake
                                </ButtonStaked>
                            }
                        </>
                    :
                        <ApprovedButton
                            disabled={pendingApprove || finished}
                            onClick={handleApprove}
                            endIcon={pendingApprove ? <AutoRenewIcon spin color="textDisabled" /> : null}
                        >
                            {t("Approve")}
                        </ApprovedButton>
                    }
                    
                </Flex>
            :
                <CustomButtonConnectWallet/>
            }
        </ContainerStakeActions>
    )
}
export default StakeAction

const ContainerStakeActions = styled(Flex)`
    width: 40%;
    flex-direction:column;
    justify-content: center;
    align-items: start;
    height:auto;
    @media screen and (min-width: 601px) and (max-width: 1000px) {
        width:100%;
        height:100px;
        margin-top:1rem;
    }
    @media screen and (max-width: 600px) {
        margin-top:1rem;
        height:130px;
        width:100%;
    }
`
const CustomButtonConnectWallet = styled(ConnectWalletButton)`
    width: 100%;
    height: 55px;
`
const ButtonStaked = styled(Button)`
    width: 100%;
    height: 55px;
`
const Container = styled(Flex)`
    border: 2px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: 12px;
    padding:20px;
`
const CustomIconButton = styled(IconButton)`
    background: ${({ theme }) => theme.colors.primaryBright};
    box-shadow:none;
    display: flex;
    justify-content:center;
    align-items:center;
`
const ApprovedButton = styled(Button)`
    width: 100%;
    height:55px;
`
