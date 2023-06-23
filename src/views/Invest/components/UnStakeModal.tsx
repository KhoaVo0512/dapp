import { useTranslation } from "@pancakeswap/localization";
import { AutoRenewIcon, BalanceInput, Box, Button, Flex, Modal, Skeleton, Text, WarningIcon } from "@pancakeswap/uikit";
import BigNumber from "bignumber.js";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import NumberFormat from "react-number-format";
import { usePriceRunBusd } from 'state/farms/hooks';
import styled from "styled-components";
import { getFullDisplayBalance } from "utils/formatBalance";
import { GetTotalStakedByUser } from "../hook/fetchDataPool";
import { useUnStaked } from "../hook/useUnStake";


interface UnStakeModalProps {
    onDismiss?: () => void
    title?:string
    contractAddress:string
    onRefresh?:(newValue) => void,
    account:string,
    chainId:number
  }

const UnStakeModalPoolStore: React.FC<UnStakeModalProps> = ({onDismiss, title, contractAddress, onRefresh, account, chainId}) => {
    const { t } = useTranslation()
    const [unstakeAmount, setUnsunstakeAmount] = useState('')
    const handleStakeInputChange = (input: string) => {
        setUnsunstakeAmount(input)
    }
    const [ refresh, setRefresh ] = useState(0)
    function onUpdateAmount(newValue:number){
        setRefresh(newValue)
    }
    const { handleUnStaked, requestedUnStake, pendingUnStaked } = useUnStaked(unstakeAmount, contractAddress, onUpdateAmount, onRefresh, account, chainId)
    const { totalStakeByUser } = GetTotalStakedByUser(contractAddress, refresh, account, chainId)
    const runPriceUsd = usePriceRunBusd().toNumber()
    const [percent, setPercent ] = useState(0)

    const fullBalance = useMemo(() => {
        return getFullDisplayBalance(new BigNumber(totalStakeByUser).multipliedBy(1E18))
      }, [totalStakeByUser]) 

    const handleSelectMax = useCallback(() => {
        setUnsunstakeAmount(fullBalance)
    }, [fullBalance, setUnsunstakeAmount])


    function quickSelect (value:number){
        setPercent(value)
        if ( value === 100 ) {
            // setUnsunstakeAmount(totalStakeByUser)
            handleSelectMax()
        } else {
            setUnsunstakeAmount((Math.floor(Number(totalStakeByUser) * value) / 100).toString())
        }
    }
    // const formattedUsdValueStaked = unstakeAmount ? formatNumber(Number(unstakeAmount)*runPriceUsd) : ''
    const currencyValueRun = `~ ${(Number(unstakeAmount)*runPriceUsd).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BUSD`
    useEffect(() => {
        function updateAmount(){
            setUnsunstakeAmount("")
        }
        if ( requestedUnStake ) {
            updateAmount()
        }
    }, [requestedUnStake, refresh])
    useEffect(() => {
        const percentUnStake = (Number((Math.floor(Number(unstakeAmount) * 100) / 100))/Number((Math.floor(Number(totalStakeByUser) * 100) / 100)))*100
        setPercent(Number(percentUnStake.toFixed(0)))
    }, [unstakeAmount, totalStakeByUser]) 
    const convertunstakeAmount = new BigNumber(unstakeAmount)
    const convertTotalStakeByUser = new BigNumber(totalStakeByUser)
    const isFullAmount = convertunstakeAmount.isGreaterThan(convertTotalStakeByUser)
    return (
        <CustomModal title="" onDismiss={onDismiss}>
            <Container>
                <Text textAlign="center" fontSize="22px" bold>{title}</Text>
                <Flex width="100%" flexDirection="column" mt="1rem">
                    <Text>{title}</Text>
                    {/* <CsBalanceInput
                        value={unstakeAmount}
                        onUserInput={handleStakeInputChange}
                        decimals={18}
                        currencyValue={runPriceUsd && `~${formattedUsdValueStaked || 0} BUSD`}
                    /> */}
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
                                    setUnsunstakeAmount(value)    
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
                <Flex width="100%" mt="10px" mb="10px">
                    <Flex style={{gap:"4px"}}>
                        <Text>Total staked:</Text>
                        { Number(totalStakeByUser) > 0 ?
                            <Text>{((Math.floor(Number(totalStakeByUser) * 100) / 100)).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        :
                            <Skeleton width={60} />
                        }
                    </Flex>
                </Flex>
                <Flex width="100%" justifyContent='space-between' flexWrap="wrap" style={{gap:"15px"}}>
                    <CustonButton isActive={percent === 25} onClick={()=>quickSelect(25)}>25%</CustonButton>
                    <CustonButton isActive={percent === 50} onClick={()=>quickSelect(50)}>50%</CustonButton>
                    <CustonButton isActive={percent === 75} onClick={()=>quickSelect(75)}>75%</CustonButton>
                    <CustonButton isActive={percent === 100} onClick={()=>quickSelect(100)}>100%</CustonButton>
                </Flex>
                { isFullAmount &&
                    <Flex style={{gap:"5px"}} alignItems="center" mt="10px">
                        <WarningIcon color="warning43"/>
                        <Text small color="warning43">{t("Withdrawal amount is greater than deposit amount")}</Text>
                    </Flex>
                }
                <ConfirmButton 
                    disabled={pendingUnStaked || Number(unstakeAmount) === 0 || isFullAmount}
                    onClick={handleUnStaked}
                    endIcon={pendingUnStaked ? <AutoRenewIcon spin color="textDisable" /> : null}
                >
                    Confirm
                </ConfirmButton>
            </Container>
        </CustomModal>
    )
}
export default UnStakeModalPoolStore
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
    color:${({ theme }) => theme.colors.white};
    margin-top:1.25rem;
    box-shadow:none;
`
const CsBalanceInput = styled(BalanceInput)`
    ${Box} {
        width: 100% !important;
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