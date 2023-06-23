import { useTranslation } from '@pancakeswap/localization';
import { AddIcon, AutoRenewIcon, Button, Flex, MinusIcon, Text, useModal } from "@pancakeswap/uikit";
import BigNumber from "bignumber.js";
import { AMOUNT_FULL_POOL } from "config";
import useTheme from "hooks/useTheme";
import React from "react";
import styled from "styled-components";
import StakeModalPoolStore from "views/Invest/components/StakeModal";
import UnStakeModalPoolStore from "views/Invest/components/UnStakeModal";
import { GetDataUser } from "../../hook/fetachDataUser";
import { useApprove } from "../../hook/useApproveStake";


interface StaketActionProps {
    tokenStakeSymbol?:any
    tokenStakeAddress?: string
    contractAddress?:any
    onRefresh?:(newValue) => void
    refresh?:number
    totalStaked?:number,
    tvlstake?:any,
    endTimePool?:any
    totalTokenStake?:string
    startTimePool:number,
    account:string,
    chainId:number
    runPriceUsd:number
}
const StakeAction: React.FC<StaketActionProps> = ({
    tokenStakeSymbol, 
    tokenStakeAddress, 
    contractAddress, 
    onRefresh, 
    refresh,
    totalStaked,
    tvlstake,
    endTimePool,
    totalTokenStake,
    startTimePool,
    account,
    chainId,
    runPriceUsd
}) => {
    const { t } = useTranslation()
    const { theme } = useTheme()
    const { handleApprove, requestedApproval, pendingTxApproval } = useApprove(tokenStakeAddress, contractAddress, onRefresh)
    const { dataUser } = GetDataUser(tokenStakeAddress, contractAddress, refresh, account, chainId)
    const currentTime = Date.now();
    const timeCanStake = currentTime > startTimePool
    const checkTimeStake =  currentTime > endTimePool
    const converAmountFullPool = new BigNumber(AMOUNT_FULL_POOL)
    const converAmountTvl = new BigNumber(totalTokenStake)
    const isFullPool = converAmountTvl.isGreaterThanOrEqualTo(converAmountFullPool)
    const convertTotal = new BigNumber(totalStaked)
    const partTotalStake = convertTotal.decimalPlaces(2,1)

    const renderCurrencyBUSD =  totalStaked > 0 ? totalStaked*runPriceUsd : 0

    const [ openModalStake ] = useModal(
        <StakeModalPoolStore
            title="Stake"
            contractAddress={contractAddress}
            totalStaked={totalStaked}
            tokenStakeSymbol={tokenStakeSymbol}
            tvlstake={totalTokenStake}
            tokenAddress={tokenStakeAddress}
            onRefresh={onRefresh}
            account={account}
            chainId={chainId}
        />
    )
    const [ openModalUnStake ] = useModal(
        <UnStakeModalPoolStore
            title="Unstake"
            contractAddress={contractAddress}
            onRefresh={onRefresh}
            account={account}
            chainId={chainId}
        />
    )
    return (
        <Flex width="100%" flexDirection="column">
            <Flex width="100%" mt="1rem" flexDirection="column">
                { dataUser.allowance !== 0 ?
                    <>
                        <Container width="100%" justifyContent="space-between" flexDirection="column" mb="1rem">
                            <Flex width="100%" justifyContent="space-between"> 
                                <Flex flexDirection="column">
                                    <Text><span style={{color:theme.colors.primaryBright}}>{tokenStakeSymbol}</span> Staked</Text>
                                    <Flex alignItems="center" flexWrap="wrap">
                                        <Text fontSize="18px" bold>
                                            { totalStaked ?                                             
                                            Number(((partTotalStake.multipliedBy(100)).dividedBy(100))).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                            :
                                                "0.00"
                                            }
                                        </Text>
                                        <CustomText fontSize="14px">
                                            { totalStaked !== 0 && Number(totalTokenStake)!== 0                                            
                                            ? `(~ ${Number(((convertTotal.dividedBy((converAmountTvl)).multipliedBy(100)))).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}% of pool) `
                                            : `(~ 0.00% of pool)`
                                            }
                                        </CustomText>
                                    </Flex>
                                    <Text small color='textDisabled'> ~ {renderCurrencyBUSD.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BUSD </Text>
                                </Flex>
                                <Flex style={{gap:"15px"}}>
                                    <CustomIconButton
                                        disabled={Number(totalStaked) === 0}
                                        onClick={openModalUnStake}
                                    >
                                        <MinusIcon color="white"/>
                                    </CustomIconButton>
                                    <CustomIconButton
                                        disabled={checkTimeStake || !timeCanStake || isFullPool}
                                        onClick={openModalStake}
                                    >
                                        <AddIcon color="white"/>
                                    </CustomIconButton>
                                </Flex>
                            </Flex>
                            <Flex flexDirection="column">
                                {Number(dataUser.balance) === 0 && <div style={{color:'red',fontSize:'16px',paddingTop: '10px'}} >Your RUN balance is not enough</div>}
                                {isFullPool && <div style={{color:'red',fontSize:'16px',paddingTop: '10px'}} >Pool is full</div>}     
                            </Flex>
                        </Container>
                    </>
                :
                    <Flex width="100%" flexDirection="column">
                        <ApprovedButton
                            disabled={pendingTxApproval || isFullPool }
                            onClick={handleApprove}
                            endIcon={pendingTxApproval ? <AutoRenewIcon spin color="textDisable" /> : null}
                        >
                            {t("Enable")}
                        </ApprovedButton>

                        <Flex flexDirection="column">
                            { isFullPool &&
                                <Flex flexDirection="row" style={{gap:"10px"}}>
                                    <Text color='primaryBright' mt="10px">Pool is full</Text>
                                </Flex>
                            }
                        </Flex>
                    </Flex>
                }
            </Flex>
        </Flex>
    )
}
export default StakeAction

const IconButton = styled(Button)<{isActive?:boolean}>`
    height: 50px;
    width: 50px;
    border-radius: 10px;
    background: ${({ isActive, theme }) => isActive ? theme.colors.primaryBright : "transparent" };
    box-shadow:none;
    border:2px solid ${({ isActive, theme }) => isActive ? "none" : theme.colors.cardBorder };
`
const CustomIconButton = styled(IconButton)`
    background: ${({ theme }) => theme.colors.primaryBright};
    box-shadow:none;
    display: flex;
    justify-content:center;
    align-items:center;
`
const Container = styled(Flex)`
    border: 2px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: 12px;
    padding:20px;
`
const ApprovedButton = styled(Button)`
    width: 100%;
    background:${({ theme }) => theme.colors.primaryBright};
    border-radius: 90px;
    color:${({ theme }) => theme.colors.white};
    box-shadow:none;
    height:55px;
`
const CustomText = styled(Text)`
     margin-left:8px;
    @media screen and (max-width: 600px) {
        margin-left:0px;
    }
`