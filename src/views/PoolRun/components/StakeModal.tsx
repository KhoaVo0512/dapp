import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Text, Flex, Button, Modal, AutoRenewIcon, BalanceInputV2, Box, WarningIcon } from "@pancakeswap/uikit";
import BigNumber from "bignumber.js";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import { getFullDisplayBalance } from 'utils/formatBalance'
import { bscTokens } from "@pancakeswap/tokens";
import { SerializedToken } from '@pancakeswap/sdk'
import { GetTokenBalance } from "utils/getTokenBalance";
import { usePriceRunBusd } from "state/farms/hooks";
import { useTranslation } from "@pancakeswap/localization";
import { useStake } from "state/poolrunV2/hook/useStake"
import { Address } from "config/constants/types";
import { getAddress } from "utils/addressHelpers";
import { BIG_ZERO } from "utils/bigNumber";


interface StakeModalProps {
    onDismiss?: () => void,
    title?:string,
    refresh:number,
    account:string,
    chainId:number,
    poolContract:Address,
    tokenStake:SerializedToken,
    onRefresh?:(newValue) => void
  }

const StakeModal: React.FC<StakeModalProps> = ({poolContract, onDismiss, title, onRefresh, refresh, tokenStake, account, chainId }) => {
    const [stakeAmount, setStakeAmount] = useState('')
    const { t } = useTranslation()
    const [ changeIndex, setChangeIndex ] = useState(0)
    function onChangeIndex(newValue:number){
        setChangeIndex(newValue)
    }
    const [percent, setPercent ] = useState(0)
    const runPriceUsd = usePriceRunBusd().toNumber()
    const currencyValueRun = `~ ${(Number(stakeAmount)*runPriceUsd).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BUSD`
    const { balance } = GetTokenBalance(tokenStake.address, account, chainId, changeIndex )
    const converBalanceTokenStake = new BigNumber(balance).decimalPlaces(2,1)
    const poolAddress = getAddress(poolContract, chainId)
    const isMaxBalance = new BigNumber(stakeAmount).isGreaterThan(new BigNumber(balance))
    const isZero = new BigNumber(stakeAmount).isEqualTo(BIG_ZERO)
    const fullBalance = useMemo(() => {
        return getFullDisplayBalance(new BigNumber(balance).multipliedBy(1E18))
      }, [balance]) 

    const handleSelectMax = useCallback(() => {
        setStakeAmount(fullBalance)
    }, [fullBalance, setStakeAmount])

    function quickSelect (value:number){
        setPercent(value)
        if ( value === 100 ) {
            // setStakeAmount(balance.toString())
            handleSelectMax()
        } else {
            setStakeAmount((Math.floor(Number(balance) * value) / 100).toString())
        }
    }
    useEffect(() => {
        if ( isMaxBalance ) {
            setPercent(0)
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-shadow
            const percent = (Number(stakeAmount)/Number((Math.floor(Number(balance) * 100) / 100)))*100
            setPercent(Number(percent.toFixed(0)))
        }
    }, [stakeAmount, balance]) 
    const handleStakeInputChange = (input: string) => {
        setStakeAmount(input)
        setPercent(Number(input));
    }
    const { handleStake, pendingStake } = useStake(poolAddress, stakeAmount, onRefresh, onChangeIndex )
    useEffect(() => {
        setStakeAmount("")
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
                                value={stakeAmount}
                                decimalScale={18}
                                thousandSeparator={!false}
                                placeholder="0.00"
                                // eslint-disable-next-line no-return-assign, no-param-reassign
                                // onFocus={(e) => e.target.placeholder = ""} 
                                onValueChange={(values) => {
                                    const { value } = values;
                                    setStakeAmount(value)    
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
                { ((stakeAmount === "" || isZero) && Number(balance) !== 0 )  &&
                    <Flex style={{gap:"5px"}} alignItems="center">
                        <WarningIcon color="warning43"/>
                        <Text small color="warning43">{t("Please enter an amount deposit")}</Text>
                    </Flex>
                }
                { Number(balance) === 0 &&
                    <Flex style={{gap:"5px"}} alignItems="center">
                        <WarningIcon color="warning43"/>
                        <Text small color="warning43">{t("No token %symbol% to deposit", {symbol:tokenStake?.symbol})}</Text>
                    </Flex>
                }
                <Flex width="100%" mt="10px" mb="10px">
                    <Flex style={{gap:"4px"}}>
                        <Text>Balance:</Text>
                        <Text>{Number(converBalanceTokenStake.toString()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    </Flex>
                </Flex>
                <Flex width="100%" justifyContent='space-between' flexWrap="wrap" style={{gap:"15px"}}>
                    <CustonButton isActive={percent === 25} onClick={()=>quickSelect(25)}>25%</CustonButton>
                    <CustonButton isActive={percent === 50} onClick={()=>quickSelect(50)}>50%</CustonButton>
                    <CustonButton isActive={percent === 75} onClick={()=>quickSelect(75)}>75%</CustonButton>
                    <CustonButton isActive={percent === 100} onClick={()=>quickSelect(100)}>100%</CustonButton>
                </Flex>
                <ConfirmButton 
                    disabled={isMaxBalance || !account || pendingStake || isZero || stakeAmount === ""}
                    onClick={handleStake}
                    endIcon={ pendingStake ? <AutoRenewIcon spin color="textDisabled"/> : null}
                >
                    { isMaxBalance ?
                        t("Insufficient %symbol% balance", { symbol:tokenStake.symbol})
                    :
                        t('Confirm')
                    }
                        
                </ConfirmButton>
                
            </Container>
        </CustomModal>
    )
}
export default StakeModal
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
    border-radius:90px;
    background: ${({ theme }) => theme.colors.primaryBright};
    color: ${({ theme }) => theme.colors.white};
    margin-top:1.25rem;
    box-shadow:none;
`
const CsBalanceInput = styled(BalanceInputV2)`
    ${Box} {
        width: 100% !important;
    }
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