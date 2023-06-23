import React, { useState, useEffect } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
  Modal,
  ModalBody,
  Text,
  Flex,
  Button,
  Box,
  InputGroup,
  AutoRenewIcon,
  ErrorIconV2, Progress, Skeleton
} from "@pancakeswap/uikit";
import { useTranslation } from "@pancakeswap/localization";
import BigNumber from 'bignumber.js'
import NumberFormat from 'react-number-format';
import styled from 'styled-components'
// import tokens from 'config/constants/tokens'
import { GetTokenBalance } from "utils/getTokenBalance";
import { LIMIT_VOTING } from "config/index"
import { GetAllowanceVoting } from 'state/votingProposals'
import { NUMBER1BILION } from 'config/constants'
import { bscTokens, ethwTokens, bscTestnetTokens } from '@pancakeswap/tokens'
import { ChainId } from '@pancakeswap/sdk'
import { useApprove } from "../hook/useApprove"
import { useVoting } from "../hook/useVoting"


interface ModalVotingProps {
  votingAgree:string
  votingRefuse:string
  totalVoting:string
  isAgree:boolean
  onDismiss?: () => void
  votingId?:number
  onRefresh?:(newValue) => void
  startTimeVoting?:number
  endTimeVoting?:number
  chairPerson:string
  stakeMinToWin?:string
}

const Row = styled(Box)<{width?: string, align?: string, justify?: string, padding?: string, border?: string, borderRadius?: string}>`
  width: ${({ width }) => width ?? '100%'};
  display: flex;
  padding: 0;
  align-items: ${({ align }) => align ?? 'center'};
  justify-content: ${({ justify }) => justify ?? 'flex-start'};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`

export const AutoRow = styled(Row)<{ gap?: string; justify?: string }>`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};
  gap: 5px;
  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`

const CustomModal = styled(Modal)`
  padding: 10px 5px 0;
  overflow: hidden;
  max-width: 550px;
  width: 100%;
  max-height: 100vh !important;
  @media (max-width: 600px) {
    padding: 20px 0 10px !important;
  }
  > div {
    &:nth-child(2) {
      max-height: 90vh;
      padding: 10px;
    }
  }
`

const CustomInputGroup = styled(InputGroup)`
  font-weight: bold;
  background: ${({ theme }) => theme.colors.backgroundDisabled};
  border-radius:8px;
  > input{
    border: none!important;
    background-color: transparent;
    height: 50px;
    padding-left: 10px;
    font-size:18px;
    font-weight: 600;
    &:focus-visible{
      border:none!important;
      box-shadow:none!important;
      outline:none!important;
    }
  }
  
`
const ImgRun = styled.img``
const CustomWidthResult = styled.div`
  width: 100%;
  gap: 7px;
  display: flex;
  flex-direction: column;
  &:nth-child(2){
    margin-bottom:10px;
  }
`
const WrapPercent = styled(Flex)`
  justify-content: space-between;
  overflow-wrap: break-word; 
`
const CustomButton = styled(Button)`
  border-radius: 90px !important;
  width: 100%;
  box-shadow: none;
  background:  ${({ theme }) => theme.colors.primaryBright};
  margin-top: 10px;
`

const WrapProgress = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const CustomModalBody = styled(ModalBody)`
  max-height: 100vh;
  padding: 0px !important;
`
const CustomCard = styled.div`
  padding: 0.8rem;
  border: 1px solid  ${({ theme }) => theme.colors.primaryBright};
  border-radius: 12px;
  background-color:  ${({ theme }) => theme.colors.backgroundAlt};
  display: flex;
  max-width: 320px;
`

const CustomIcon = styled.div`
  align-self: flex-start;
  margin-right: 5px;
`
const CsTextPercent = styled(Text)`
  color:${({ theme }) => theme.colors.warning43};
`
const CsNumberFormat = styled(NumberFormat)`
   color:${({theme}) => theme.colors.text}
`

function renderTokenByChain(chainId){
  if( chainId === ChainId.BSC ) {
      return bscTokens.runtogether.address
  } if (chainId === ChainId.ETHW_MAINNET) {
      return ethwTokens.runtogether.address
  } if (chainId === ChainId.BSC_TESTNET) {
      return bscTestnetTokens.runtogether.address
  }
  return ""
}

const VoteModal: React.FC<ModalVotingProps> = ({ 
  votingId, 
  votingAgree, 
  votingRefuse, 
  totalVoting, 
  isAgree, 
  onDismiss, 
  onRefresh,
  startTimeVoting,
  endTimeVoting,
  chairPerson,
  stakeMinToWin
}) => {
  const { t } = useTranslation()
  const {chainId,account} = useActiveWeb3React()
  const tokenAddress = renderTokenByChain(chainId)
  const { balance } = GetTokenBalance(tokenAddress, account, chainId)
  const [ votingCount, setVotingCount ] = useState("")
  const [ tempVoting, setTempVoting ] = useState({
    voteAgree:votingAgree.toString(),
    voteRefuse:votingRefuse.toString()
  })
  const convertVoteAgreee = new BigNumber(tempVoting.voteAgree)
  const convertVoteRefuse = new BigNumber(tempVoting.voteRefuse)
  // const convertStakeMinToWin = new BigNumber(stakeMinToWin)
  const convertVotingAgree = new BigNumber(votingAgree)
  const convertVotingRefuse= new BigNumber(votingRefuse)
  const convertVotingCount = new BigNumber(votingCount)

  function tempSelectedVoting ( values) {
    const convertValue = values !== "" ? new BigNumber(values) : new BigNumber(0)
    setVotingCount(values)
    if (Number(values) >= 0 ) {
      if ( isAgree ){
        const newValueVotingAgree = convertVotingAgree.plus(convertValue)
        setTempVoting({
          voteAgree:newValueVotingAgree.toString(),
          voteRefuse:votingRefuse.toString()
        })
      } else {
        const newValueVotingRefuse = convertVotingRefuse.plus(convertValue)
        setTempVoting({
          voteAgree:votingAgree.toString(),
          voteRefuse:newValueVotingRefuse.toString()
        })
      }
    }
  }
  function decimalCount (number) {
    const numberAsString = number.toString();
    if (numberAsString.includes('.')) {
      return numberAsString.split('.')[1].length;
    }
    return 0;
  }
 // eslint-disable-next-line consistent-return
 const handleChangeValue = (values)=>{
      const {value} = values;
      const converValue = new BigNumber(value)
      if ( value === "" ) {
        tempSelectedVoting("")
      } else {
        tempSelectedVoting(converValue.toString())
      }
 }
 
  function renderPercentAgreee (agree:number, refuse:number){
    let value = 0
    const convertAgree =  new BigNumber(agree);
    const convertRefuse = new BigNumber(refuse);
    const renderValue =  Number(convertAgree.dividedBy(convertAgree.plus(convertRefuse)).multipliedBy(100))
    if ( Number.isNaN(renderValue)) {
      value = 0
    } else {
      value = renderValue
    }
    return value
  }
  function renderPercentRefuse (agree:number, refuse:number){
    const convertAgree =  new BigNumber(agree);
    const convertRefuse =  new BigNumber(refuse);
    const renderValues =  Number(convertRefuse.dividedBy(convertAgree.plus(convertRefuse)).multipliedBy(100))
    let values = 0
    if ( Number.isNaN(renderValues)) {
      values = 0
    } else {
      values = renderValues
    }
    return values
  }
  const isLimitVote =new BigNumber(votingCount).isLessThan(new BigNumber(LIMIT_VOTING))
  
  const { handleApprove, requestedApproval, pendingTx } = useApprove(chainId)
  const [ allowanceVoting ] = GetAllowanceVoting(account,requestedApproval,chainId,tokenAddress)
  const { handleVoting, requestedVoting, pendingVoting } = useVoting(votingId, votingCount, isAgree, onRefresh,chainId)
  useEffect(()=>{
    if (requestedVoting) {
      onDismiss()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[requestedVoting])
  const partAgreee = convertVoteAgreee.decimalPlaces(2,1)
  const partRefuse = convertVoteRefuse.decimalPlaces(2,1)
  return (
    <CustomModal title={t('Confirm Vote')} headerBackground="transparent" onDismiss={onDismiss}>
      <CustomModalBody>
          <AutoRow
            mb="1rem"
            style={{
              justifyContent: 'space-between',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Text color="textSubtle" fontSize="12px">
              {t('Your RUN balance')}
            </Text>
            <Flex>
              { Number(balance) > 0 ?
                  <Text bold>{(Math.floor(Number(balance) * 100) / 100).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                :
                  <Skeleton width={60} />
              }
              <ImgRun src="/images/Run_Logo.svg" style={{ paddingLeft: '10px' }} />
            </Flex>
            <Text color="textSubtle" fontSize="12px">
              {t('Input your RUN vote')}
            </Text>
            <CustomInputGroup
              endIcon={<ImgRun src="/images/coins/0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7.png" width="24px" />}
            >
              <ContainerInput>
                <CsNumericFormat
                    value={votingCount}
                    thousandSeparator={!false}
                    decimalScale={18}
                    placeholder="0.00"
                    maxLength={80}
                    onValueChange={(values) => handleChangeValue(values)}
                />
              </ContainerInput>
            </CustomInputGroup>
            {convertVotingCount.isLessThan(new BigNumber(100)) &&
              <div style={{color:'red',fontSize:'12px'}}>
                Value should not be less than 100
              </div> 
            }
            <WrapProgress>
              <CustomWidthResult>
                <Text color="textSubtle" fontSize="12px">
                  Agree
                </Text>
                <Progress variant="round" primaryStep={Number(convertVoteAgreee.dividedBy(convertVoteAgreee.plus(convertVoteRefuse)).multipliedBy(100))} scale="sm" />
                <WrapPercent>
                    <Text fontSize="14px" maxWidth="80%">
                        { partAgreee.isNaN() ?
                          "0.00"
                        :
                          Number(partAgreee.toString()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        }
                      &nbsp;Votes
                    </Text>
                    <Text fontSize="14px" color="success">
                        ~ {renderPercentAgreee(Number(partAgreee), Number(partRefuse)).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                    </Text>
                </WrapPercent>
              </CustomWidthResult>
              <CustomWidthResult>
                <Text color="textSubtle" fontSize="12px">
                  Disagree
                </Text>
                <Progress bgcolor={({ theme }) => theme.colors.warning43} variant="round" primaryStep={Number(convertVoteRefuse.dividedBy(convertVoteAgreee.plus(convertVoteRefuse)).multipliedBy(100))} scale="sm" />
                <WrapPercent>
                  <Text fontSize="14px" maxWidth="80%">
                        { partRefuse.isNaN() ?
                          "0.00"
                        :
                          Number(partRefuse.toString()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        }
                      &nbsp;Votes
                    </Text>                 
                  <CsTextPercent fontSize="14px">
                  ~ {renderPercentRefuse(Number(partAgreee), Number(partRefuse)).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                  </CsTextPercent>
                </WrapPercent>
              </CustomWidthResult>
            </WrapProgress>
            {Number((Math.floor(Number(balance) * 100) / 100).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) <= 0 ? 
            <CustomCard>
              <CustomIcon>
                <ErrorIconV2 />
              </CustomIcon>
              <Text>
                {t(
                  'Hold some RUN in your wallet to get voting power for future proposals.',
                )}
              </Text>
            </CustomCard>
            :
            <div style={{width:320,visibility:'hidden',height:0}}/>

                }
            { account?.toLocaleLowerCase() === chairPerson?.toLocaleLowerCase() &&
              <Text mt="1rem" color='primaryBright'>{t("Chair person cannot vote")}</Text>
            }
            { allowanceVoting !== 0 ?
                <CustomButton
                    onClick={handleVoting}
                    disabled={Number(votingCount) <= 0 || decimalCount(votingCount) > 18 ||  Number(balance) < LIMIT_VOTING || isLimitVote || Number(votingCount) > Number(balance) || pendingVoting || account?.toLocaleLowerCase() === chairPerson?.toLocaleLowerCase()}
                    endIcon={pendingVoting ? <AutoRenewIcon spin color="textDisable" /> : null}
                >
                  { Number(votingCount) > Number(balance) ?
                    t("Insufficient %symbol% balance", { symbol:bscTokens.runtogether.symbol})
                  :
                    "Confirm"
                  }
                    
                </CustomButton>
            :
                <CustomButton
                  onClick={handleApprove}
                  disabled={pendingTx}
                  endIcon={pendingTx ? <AutoRenewIcon spin color="textDisable" /> : null}
                >
                  Approve
                </CustomButton>
            }
          </AutoRow>
        </CustomModalBody>
    </CustomModal>
  )
  
}

export default VoteModal


const ContainerInput = styled(Flex)`
    width: 90%;
    height: 55px;
    justify-content:space-between;
    align-items:center;
    padding-left:15px;
    padding-right:15px;
    margin-left:0px;
    border-radius:8px;
    > input {
        background:transparent !important;
        border:none;
        box-shadow:none;
        color:${({ theme }) => theme.colors.text};
        font-size:16px;
        width: 100%;
        font-weight:600;
        font-size:18px;
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