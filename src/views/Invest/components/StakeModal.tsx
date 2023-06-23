import { useTranslation } from "@pancakeswap/localization";
import { AutoRenewIcon, BalanceInput, Box, Button, Flex, Modal, Skeleton, Text, WarningIcon } from "@pancakeswap/uikit";
import BigNumber from "bignumber.js";
import tokens from "config/constants/tokens";
import { AMOUNT_FULL_POOL } from "config/index";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import NumberFormat from "react-number-format";
import { usePriceRunBusd } from 'state/farms/hooks';
import styled from "styled-components";
import { formatNumber, getFullDisplayBalance } from "utils/formatBalance";
import { GetDataUser } from "../hook/fetachDataUser";
import { GetTotalStaked } from "../hook/fetchDataPool";
import { useStaked } from "../hook/useStake";


interface StakeModalProps {
    onDismiss?: () => void
    title?:string
    contractAddress?:string,
    totalStaked?:number,
    tokenStakeSymbol:string,
    account:string,
    chainId:number,
    tvlstake?:string
    tokenAddress?:string
    onRefresh?:(newValue) => void
  }

const StakeModalPoolStore: React.FC<StakeModalProps> = ({
    onDismiss, 
    title, 
    contractAddress,
    totalStaked,
    tvlstake, 
    tokenStakeSymbol,
    tokenAddress, 
    onRefresh,
    account,
    chainId 
}) => {
    
    const [stakeAmount, setStakeAmount] = useState('')
    const handleStakeInputChange = (input: string) => {  
        setStakeAmount(input)
    }
   
    const { t } = useTranslation()
    const [ refresh, setRefresh ] = useState(0)
    const runPriceUsd = usePriceRunBusd().toNumber()
    function onUpdateAmount(newValue:number){
        setRefresh(newValue)
    }
    const { handleStaked, requestedStake, pendingStaked } = useStaked(stakeAmount, contractAddress, onUpdateAmount, onRefresh, account, chainId)
    const { tvl } = GetTotalStaked( tokenAddress, contractAddress, refresh, chainId )
    const formattedUsdValueStaked = stakeAmount ? formatNumber(Number(stakeAmount)*runPriceUsd) : ''
    const converAmountFullPool = new BigNumber(AMOUNT_FULL_POOL)
    const converAmountTvl = new BigNumber(tvl)
    const remaining = converAmountFullPool.minus(converAmountTvl)      
    const convertStakeAmount = new BigNumber(stakeAmount)
    const totalStakeAmount = converAmountTvl.plus(convertStakeAmount)
    const isFullPool = totalStakeAmount.isGreaterThan(converAmountFullPool)
    
    useEffect(() => {
        function updateAmount(){
            setStakeAmount("")
        }
        if ( requestedStake ) {
            updateAmount()
        }
    }, [refresh, requestedStake])
    const { dataUser } = GetDataUser(tokenAddress, contractAddress, refresh, account, chainId)
    const isMaxBalance = new BigNumber(stakeAmount).isGreaterThan(new BigNumber(dataUser.balance))
    useEffect(() => {
        const percent = (Number(stakeAmount)/Number((Math.floor(Number(dataUser.balance) * 100) / 100)))*100
        setPercent(Number(percent.toFixed(0)))
    }, [stakeAmount, dataUser.balance]) 
    const [percent, setPercent ] = useState(0)

    const fullBalance = useMemo(() => {
        return getFullDisplayBalance(new BigNumber(dataUser.balance).multipliedBy(1E18))
      }, [dataUser.balance]) 

    const handleSelectMax = useCallback(() => {
        setStakeAmount(fullBalance)
    }, [fullBalance, setStakeAmount])

    function quickSelect (value:number){
        setPercent(value)
        if ( value === 100 ) {
            // setStakeAmount(dataUser.balance.toString())
            handleSelectMax()
        } else {
            setStakeAmount((Math.floor(Number(dataUser.balance) * value) / 100).toString())
        }
    }
    return (
        <CustomModal title="" onDismiss={onDismiss}>
            <Container>
                <Text textAlign="center" fontSize="22px" bold>{title}</Text>
                <Flex width="100%" flexDirection="column" mt="1rem">
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
                            <Text fontSize="12px" textAlign="left" color="text">
                                {formattedUsdValueStaked && `~${formattedUsdValueStaked || 0} BUSD`}
                            </Text>
                        </CsBox>
                    </StyledBalanceInput>
                    {/* <CsBalanceInput
                        value={stakeAmount}
                        onUserInput={handleStakeInputChange}
                        decimals={18}
                        currencyValue={runPriceUsd && `~${formattedUsdValueStaked || 0} BUSD`}
                    /> */}
                       {isFullPool && <div style={{color:'red',fontSize:'16px',paddingTop: '10px'}} >Pool is full</div>}
                </Flex>
                <Flex width="100%" mt="10px">
                    <Flex style={{gap:"4px"}}>
                        <Text>Remaning of Pool:</Text>
                        <Text onClick={()=>setStakeAmount(remaining.toString())} style={{textDecoration:'underline',cursor:'pointer'}}>{(remaining.toNumber()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    </Flex>
                </Flex>
                <Flex width="100%" mt="10px" mb="10px">
                    <Flex style={{gap:"4px"}}>
                        <Text>Balance:</Text>
                        { Number(dataUser.balance) > 0 ?
                                <Text>{(Math.floor(Number(dataUser.balance) * 100) / 100).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                            :
                                <Skeleton width={60} />
                        }
                    </Flex>
                </Flex>
                { Number(dataUser.balance) === 0 &&
                    <Flex style={{gap:"5px"}} alignItems="center">
                        <WarningIcon color="warning43"/>
                        <Text small color="warning43">{t("No token %symbol% to deposit", {symbol: tokenStakeSymbol})}</Text>
                    </Flex>
                }
                <Flex width="100%" justifyContent='space-between' flexWrap="wrap" style={{gap:"15px"}}>
                    <CustonButton isActive={percent === 25} onClick={()=>quickSelect(25)}>25%</CustonButton>
                    <CustonButton isActive={percent === 50} onClick={()=>quickSelect(50)}>50%</CustonButton>
                    <CustonButton isActive={percent === 75} onClick={()=>quickSelect(75)}>75%</CustonButton>
                    <CustonButton isActive={percent === 100} onClick={()=>quickSelect(100)}>100%</CustonButton>
                </Flex>
                
                <ConfirmButton 
                    onClick={handleStaked}
                    disabled={pendingStaked || Number(stakeAmount) === 0 || isFullPool || isMaxBalance }
                    endIcon={pendingStaked ? <AutoRenewIcon spin color="textDisable" /> : null}
                >
                    { isMaxBalance ?
                      t("Insufficient %symbol% balance", { symbol:tokens.Run.symbol})
                       :
                       'Confirm'
                    }
                   
                </ConfirmButton>
            </Container>
        </CustomModal>
    )
}
export default StakeModalPoolStore
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