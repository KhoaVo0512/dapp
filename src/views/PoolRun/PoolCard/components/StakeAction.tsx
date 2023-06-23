import { useTranslation } from '@pancakeswap/localization';
import { SerializedToken } from '@pancakeswap/sdk';
import { AddIcon, Button, Flex, IconButton, MinusIcon, Text, useModal, AutoRenewIcon } from "@pancakeswap/uikit";
import { Address } from "config/constants/types";
import useTheme from 'hooks/useTheme';
import { useApprove } from "state/poolrunV2/hook/useApprove"
import React from "react";
import Countdown, { zeroPad } from 'react-countdown'
import { GetApprovePoolContract } from "state/poolrunV2/fetchData";
import styled from "styled-components";
import StakeModal from "../../components/StakeModal";
import UnStakeModal from "../../components/UnStakeModal";


interface StakeActionProps {
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
const StakeAction: React.FC<StakeActionProps> = ({
    tokenStake,
    poolContract,
    chainId,
    account,
    refresh,
    startTimeStake,
    totalStakeAmount,
    runPriceUsd,
    tvl,
    onRefresh,
    endTimeStake
}) => {
    const { t } = useTranslation()
    const { theme } = useTheme()
    const currentTime = Date.now()
    const isStartTimeStake = currentTime < startTimeStake*1000
    const [ openModalUnStake ] = useModal(
        <UnStakeModal
            title="Unstake"
            tokenStake={tokenStake}
            refresh={refresh}
            chainId={chainId}
            account={account}
            poolContract={poolContract}
            onRefresh={onRefresh}
        />
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
    const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) return (
            <></>
        )
        return (
            <Flex ml="10px">
                <Text >{zeroPad(days)} days,</Text>
                <Text ml="5px" >{zeroPad(hours)}:</Text>
                <Text >{zeroPad(minutes)}:</Text>
                <Text >{zeroPad(seconds)}</Text>
            </Flex>
        )
    }
    const { handleApprove, pendingApprove } = useApprove(poolContract, tokenStake.address, chainId, onRefresh )
    const { allowance } = GetApprovePoolContract(tokenStake, poolContract, account, chainId, refresh )
    const renderCurrencyBUSD =  totalStakeAmount.length ? Number(totalStakeAmount)*runPriceUsd : 0
    const renderPercentStaked = totalStakeAmount.length ? Number(totalStakeAmount)/Number(tvl)*100 : 0
    const finished = endTimeStake*1000 < currentTime && endTimeStake !==0
    return (
        <Flex width="100%" flexDirection="column" mt="1rem">
            <Flex width="100%" flexDirection="column">
                { Number(allowance) === 0 ?
                    <ApprovedButton
                        disabled={pendingApprove || finished}
                        onClick={handleApprove}
                        endIcon={pendingApprove ? <AutoRenewIcon spin color="textDisabled" /> : undefined}
                    >
                        {t("Approve")}
                    </ApprovedButton>
                :
                    <>
                        { Number(totalStakeAmount) === 0 ?
                            <StakeButton onClick={openModalStake} disabled={isStartTimeStake || finished} >
                                Stake
                            </StakeButton>
                        :
                            <Container width="100%" justifyContent="space-between" alignItems='center'>
                                <Flex flexDirection="column">
                                    <Text><span style={{color:theme.colors.primaryBright}}>{tokenStake.symbol}</span> Staked</Text>
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
                                        <MinusIcon color="white"/>
                                    </CustomIconButton>
                                    <CustomIconButton
                                        onClick={openModalStake}
                                        disabled={finished}
                                    >
                                        <AddIcon color="white"/>
                                    </CustomIconButton>
                                </Flex>
                            </Container>
                        }
                    </>
                }
            </Flex>
            { isStartTimeStake &&
                <Flex mt="1rem">
                    <Text>Start in</Text>
                    <Countdown zeroPadTime={2} date={startTimeStake}  renderer={renderCountdown}/>
                </Flex>
            }
        </Flex>
    )
}
export default StakeAction

const StakeButton = styled(Button)`
    width: 100%;
    box-shadow:none;
    height:55px;
`
const CustomIconButton = styled(IconButton)`
    display: flex;
    justify-content:center;
    align-items:center;
`
const Container = styled(Flex)`
    border: 2px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: 12px;
    padding:10px;
`
const ApprovedButton = styled(Button)`
    width: 100%;
    height:55px;
`
