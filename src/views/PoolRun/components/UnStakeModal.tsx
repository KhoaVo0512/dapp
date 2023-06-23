import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Text, Flex, Button, Modal, AutoRenewIcon, BalanceInput, WarningIcon, Box } from "@pancakeswap/uikit";
import BigNumber from "bignumber.js";
import NumberFormat from "react-number-format";
import styled from "styled-components";
import { useUnStake } from "state/poolrunV2/hook/useUnstake"
import { getFullDisplayBalance } from "utils/formatBalance";
import { useTranslation } from "@pancakeswap/localization";
import { usePriceRunBusd } from "state/farms/hooks";
import { bscTokens } from "@pancakeswap/tokens";
import { SerializedToken } from '@pancakeswap/sdk'
import { Address } from "config/constants/types";
import { getAddress } from "utils/addressHelpers";
import { BIG_ZERO } from "utils/bigNumber";
import { GetAmountDeposit } from "state/poolrunV2/fetchData";

interface UnStakeModalProps {
    onDismiss?: () => void,
    title?:string,
    refresh:number,
    account:string,
    chainId:number,
    poolContract:Address,
    tokenStake:SerializedToken,
    onRefresh?:(newValue) => void
  }

const UnStakeModal: React.FC<UnStakeModalProps> = ({
    poolContract, 
    onDismiss, 
    title, 
    onRefresh, 
    refresh, 
    tokenStake, 
    account, 
    chainId 
}) => {
    const [unstakeAmount, setUnstakeAmount] = useState('')
    const { t } = useTranslation()
    const [ changeIndex, setChangeIndex ] = useState(0)
    function onChangeIndex(newValue:number){
        setChangeIndex(newValue)
    }
    const { amount } = GetAmountDeposit(poolContract, account, chainId, changeIndex )
    const [percent, setPercent ] = useState(0)
    const runPriceUsd = usePriceRunBusd().toNumber()
    const currencyValueRun = `~ ${(Number(unstakeAmount)*runPriceUsd).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BUSD`
    const converBalanceDeposit = new BigNumber(amount).decimalPlaces(2,1)
    const poolAddress = getAddress(poolContract, chainId)
    const isMaxAmountWithdraw = new BigNumber(unstakeAmount).isGreaterThan(new BigNumber(amount))
    const isZero = new BigNumber(unstakeAmount).isEqualTo(BIG_ZERO)

    const fullBalance = useMemo(() => {
        return getFullDisplayBalance(new BigNumber(amount).multipliedBy(1E18))
      }, [amount]) 

    const handleSelectMax = useCallback(() => {
        setUnstakeAmount(fullBalance)
    }, [fullBalance, setUnstakeAmount])

    function quickSelect (value:number){
        setPercent(value)
        if ( value === 100 ) {
            // setUnstakeAmount(amount.toString())
            handleSelectMax()
        } else {
            setUnstakeAmount((Math.floor(Number(amount) * value) / 100).toString())
        }
    }
    useEffect(() => {
        if ( isMaxAmountWithdraw ) {
            setPercent(0)
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-shadow
            const percent = (Number(unstakeAmount)/Number((Math.floor(Number(amount) * 100) / 100)))*100
            setPercent(Number(percent.toFixed(0)))
        }
    }, [unstakeAmount, amount]) 
    const handleStakeInputChange = (input: string) => {
        setUnstakeAmount(input)
    }
    const { handleUnStake, pendingUnStake } = useUnStake(poolAddress, unstakeAmount, onRefresh, onChangeIndex )
    useEffect(() => {
        setUnstakeAmount("")
    }, [changeIndex]) 
    return (
        <CustomModal title="" onDismiss={onDismiss}>
            <Container>
                <Text textAlign="center" fontSize="22px" bold>{title}</Text>
                <Flex width="100%" flexDirection="column" mt="1rem" mb="10px">
                    <Text>{title}</Text>
                    <StyledBalanceInput>
                        <CsBox>
                            <CsNumericFormat
                                value={unstakeAmount}
                                decimalScale={18}
                                thousandSeparator={!false}
                                placeholder="0.00"
                                // eslint-disable-next-line no-return-assign, no-param-reassign
                                // onFocus={(e) => e.target.placeholder = ""} 
                                onValueChange={(values) => {
                                    const { value } = values;
                                    setUnstakeAmount(value)    
                                }}
                                maxLength={35}
                            />
                            {currencyValueRun && (
                                <Text fontSize="12px" textAlign="left" color="text">
                                    {currencyValueRun}
                                </Text>
                            )}
                        </CsBox>
                    </StyledBalanceInput>
                </Flex>
                { (unstakeAmount === "" || isZero) &&
                    <Flex style={{gap:"5px"}} alignItems="center">
                        <WarningIcon color="warning43"/>
                        <Text small color="warning43">{t("Please enter an amount withdraw")}</Text>
                    </Flex>
                }
                { isMaxAmountWithdraw &&
                    <Flex style={{gap:"5px"}} alignItems="center">
                        <WarningIcon color="warning43"/>
                        <Text small color="warning43">{t("Withdrawal amount is greater than deposit amount")}</Text>
                    </Flex>
                }
                <Flex width="100%" mt="10px" mb="10px">
                    <Flex style={{gap:"4px"}}>
                        <Text>Total staked:</Text>
                        <Text>{Number(converBalanceDeposit.toString()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    </Flex>
                </Flex>
                <Flex width="100%" justifyContent='space-between' flexWrap="wrap" style={{gap:"15px"}}>
                    <CustonButton isActive={percent === 25} onClick={()=>quickSelect(25)}>25%</CustonButton>
                    <CustonButton isActive={percent === 50} onClick={()=>quickSelect(50)}>50%</CustonButton>
                    <CustonButton isActive={percent === 75} onClick={()=>quickSelect(75)}>75%</CustonButton>
                    <CustonButton isActive={percent === 100} onClick={()=>quickSelect(100)}>100%</CustonButton>
                </Flex>
                <ConfirmButton 
                    onClick={handleUnStake}
                    disabled={isMaxAmountWithdraw || !account || pendingUnStake || isZero || unstakeAmount === ""}
                    endIcon={ pendingUnStake ? <AutoRenewIcon spin color="textDisabled"/> : null}
                >
                    {t('Confirm')}
                </ConfirmButton>
            </Container>
        </CustomModal>
    )
}
export default UnStakeModal
const CustomModal = styled(Modal)`
    padding:0px;
`
const Container = styled(Flex)`
    width: 400px;
    flex-direction:column;
    @media screen and (max-width: 600px) {
        width: 300px !important;
    }
`
const CustonButton = styled(Button)<{isActive?:boolean}>`
    width: auto;
    height: 40px;
    box-shadow:none;
    background: ${({ isActive, theme }) => isActive ? theme.colors.primaryBright : "transparent"};
    border: 2px solid ${({ isActive, theme }) => isActive ? "transparent" : theme.colors.cardBorder};
    border-radius: 90px;
    color:${({ isActive, theme }) => isActive ? theme.colors.white : theme.colors.text};
    @media screen and (max-width: 600px) {
        width: 45% !important;
    }
`
const ConfirmButton = styled(Button)`
    width:100%;
    box-shadow:none;
    margin-top: 1rem;
`
const StyledBalanceInput = styled(Box)`
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    border-radius: 16px;
    box-shadow: ${({ theme }) => theme.shadows.inset};
    padding: 8px 16px;
`;
const CsBox = styled(Box)`
     > input {
            background:transparent !important;
            border:none;
            box-shadow:none;
            color:${({ theme }) => theme.colors.text};
            font-size:16px;
            width: 100%;
            font-weight:600;
            font-size:16px;
        }
`

const CsNumericFormat = styled(NumberFormat)`
    &:focus-visible {
        outline: none;
    }
    ::placeholder { 
        color:${({ theme }) => theme.colors.text};
        opacity: 1; 
    }
`