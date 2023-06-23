import { useTranslation } from "@pancakeswap/localization";
import { ChainId } from '@pancakeswap/sdk';
import { bscTestnetTokens, bscTokens, ethwTokens } from '@pancakeswap/tokens';
import { AutoRenewIcon, Button, Flex, Input, OpenNewIcon, Skeleton, Text } from "@pancakeswap/uikit";
import ConnectWalletButton from 'components/ConnectWalletButton';
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity';
import HeaderProposals from 'components/HeaderProposals/HeaderProposals';
import PageFullWidth from 'components/Layout/PageFullWidth';
import { NUMBER1M } from 'config/constants';
import contracts from 'config/constants/contracts';
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetAllowanceVoting, GetListProposals, GetProposalsInfo } from 'state/votingProposals';
import styled from 'styled-components';
import { getBlockExploreLink } from "utils";
import { getAddress } from 'utils/addressHelpers';
import { GetTokenBalance } from "utils/getTokenBalance";
import Nav from 'views/Invest/components/SubNav';
import { Container, WrapAppBody, Wrapper } from "views/Invest/styles";
import { Textbold } from "views/Vote";
import { useApprove } from "views/Vote/hook/useApprove";
import { FetchVotingDuration } from './hook/fetchVotingDuration';
import { useCreateVoting } from "./hook/useCreateVoting";

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

const MakeAProposals = () => {
  const { chainId, account } = useActiveWeb3React()
  const { t } = useTranslation()
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const [ totalProposals ] = GetProposalsInfo(chainId)
  const [ listProposals ] = GetListProposals(totalProposals,chainId)  
  const lastProposal = listProposals?.slice(-1).pop();
  const findIdByLast = lastProposal?.votingId +1 || 0; 
  const {stakeVotingDuration} = FetchVotingDuration(getAddress(contracts.votingProposals,chainId),chainId); 
  const timeNow  = Date.now();
    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
  function renderAccount (address) {
      let sAccount = ""
      if ( account ) {
        if ( windowSize < 1080 ) {
          sAccount =`${address.substring(0, 4)}...${address.substring(address.length - 4)}`
        } else {
          sAccount = address
        }
      }
      return sAccount
  }
  const openBSC = () => { 
    window.open(getBlockExploreLink(account, 'address', chainId))
  }
  const { handleApprove, requestedApproval, pendingTx } = useApprove(chainId)
  const [ allowanceVoting ] = GetAllowanceVoting(account,requestedApproval,chainId, renderTokenByChain(chainId))
  const { handleVoting, requestedVoting, pendingVoting } = useCreateVoting(chainId)
  const { balance } = GetTokenBalance(renderTokenByChain(chainId),account,chainId)
  const router = useRouter()
  useEffect(() => {
    if ( requestedVoting ) {
      router.push("/proposals")
    }
  }, [requestedVoting]) // eslint-disable-line react-hooks/exhaustive-deps
  function convertDate(date: any){  
    if (date) {  
    const today=  new Date(date);
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const yyyy = today.getFullYear();
    return <Flex alignItems="center">
        <Text bold>{hours}:{minutes}</Text>
        <Text ml="10px" bold>{dd}/{mm}/{yyyy}</Text>
    </Flex>;    
    }
    return <Skeleton width={60} />
  }
  type optionDay = {
      year?:any,
      month?:any,
      day?:any
  }
  const configOptionDay:optionDay = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
  } 
  const onKeyDown = (e) => {
      e.preventDefault();
  };
  return (
    <PageFullWidth>
      <HeaderLiquidity bgColor="#029DA5" namePlace="Invest Together" nameTitle="run together" />
      <Nav />
      <Container>
        <WrapAppBody>
            <Wrapper>
              <HeaderProposals headerName='Make a Proposals'/>
              <Content>
                <Flex>
                  <Text bold fontSize='24px' paddingBottom='40px'>Action</Text>
                </Flex>
                  <Row style={{ marginBottom: '20px' }}>
                     <Col>
                        <WrapInput>                                                                                                      
                            <Text>{t("Vote ID")}</Text>    
                            <CustomId>
                                  <Text bold >#{findIdByLast}</Text>
                            </CustomId>                                                                                             
                        </WrapInput>
                        <div style={{ marginBottom: '20px' }}>                      
                            <Label>Creator</Label>
                            <Flex position='relative'>
                              <CsInput type='text' readOnly value={account ? renderAccount(account) : 'No Data'}/>
                              { account &&
                                <CsOpenNewIcon onClick={openBSC} />
                              }
                            </Flex>                      
                        </div>
                     </Col>
                     <Col>
                        <WrapInput>                        
                           <Text>{t("Start date")}</Text>
                          {convertDate(timeNow)}
                        </WrapInput>
                        <WrapInput> 
                          <Text>{t("End date")}</Text>
                          {convertDate(timeNow+(stakeVotingDuration*1000))}
                        </WrapInput>
                     </Col>
                  </Row>
                 
                  <CustomRow>                   
                    <TextCol>                                                                                         
                          <Flex flexDirection="column" style={{gap:'9px'}}> 
                              <Text lineHeight='21px'>Your RUN balance: <b>{Number(balance).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></Text>
                              <Flex>
                                <CustomTextMakeProposals fontSize='16px'>You need <Textbold> at least 1,000,000.00 RUN </Textbold> to publish a proposal.</CustomTextMakeProposals>
                              </Flex>
                          </Flex>                                                                                                                                                                       
                   </TextCol> 
                   {   account ?                      
                            <CsFlex>
                              {allowanceVoting !==0 ?
                                  <CustomButton
                                    onClick={handleVoting}
                                    disabled={pendingVoting || Number(balance) < NUMBER1M}
                                    endIcon={pendingVoting ? <AutoRenewIcon spin color="textDisable" /> : null}
                                  >
                                    Publish
                                  </CustomButton>
                                :
                                  <CustomButton
                                    onClick={handleApprove}
                                    disabled={pendingTx || requestedApproval || Number(balance) < NUMBER1M}
                                    endIcon={pendingTx ? <AutoRenewIcon spin color="textDisable" /> : null}
                                  >
                                    Approve
                                  </CustomButton>
                              }
                            </CsFlex>                       
                      :                        
                            <CsFlex>
                              <CsButtonConectWallet/>
                            </CsFlex>                       
                    }
                  </CustomRow>                 
              </Content>
            </Wrapper>
        </WrapAppBody>
      </Container>
    </PageFullWidth>
  )
}

export default MakeAProposals


const Content = styled(Flex)`
  flex-direction: column;
  padding-top: 70px;
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding-bottom: 50px;
`

export const Row = styled.div`
  width: 100%;
  display: flex;
  /* padding-bottom: 40px; */
  @media (max-width: 600px) {
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
  }
`

export const Col = styled.div`
  max-width: 50%;
  width: 50%;
  &:first-child{
    padding-right:1rem;
  }
  &:nth-child(2){
     padding-left:1rem;
  }
  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
    max-width: 100%;
    &:first-child,&:nth-child(2){
      padding-left:0rem;
      padding-right:0rem;
    }
  }
`

export const ColSingle = styled(Col)`
  padding-right: 40px;
  @media screen and (max-width: 900px) {
    max-width: 100%;
    width: 100%;
    padding-right: 0px;
  }
`

export const WrapInput = styled(Flex)`
  justify-content: space-between;
  margin-bottom:10px;
`

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.textDisabled};
`

export const CustomInput = styled(Input)`
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-weight: 600;
  border-radius: 8px;
  padding: 22px;
  color: ${({ theme }) => theme.colors.input}!important;
  @media (max-width: 600px) {
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-height: 24px; 
    max-height: 72px; 
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
    font-size: 12px;
  }
`
const CsInput = styled(Input)`
   height: 48px;
   font-weight: 600;
   border-radius:5px!important;
   border:none!important;
   &:focus {
       box-shadow:none!important;
       border:none!important;
   }
`

const CustomButton = styled(Button)`
  border-radius: 90px !important;
  box-shadow: none;
  background: ${({theme})=>theme.colors.primaryBright};
  width:172px;
  @media (max-width:650px) {
    width:100%;
  }
`
const CsButtonConectWallet = styled(ConnectWalletButton)`  
  width: 172px;
  height: 48px;
  background: ${({theme})=>theme.colors.primaryBright};
  border-radius: 90px;
  color: ${({theme})=>theme.colors.backgroundAlt};;
  box-shadow:none;
  font-size:14px;
  @media screen and (max-width: 600px) {
    width:100%;
  }
`
const CsOpenNewIcon = styled(OpenNewIcon)`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  padding-right: 5px;
  cursor: pointer;
`

const CustomRow = styled(Row)`
display:flex;
justify-content:space-between;
gap:8px;
margin-top:10px;
`
const TextCol = styled.div``

const CustomId = styled(Flex)`
  background:${({theme})=>theme.colors.success19};
  border-radius: 6px;
  width: auto;
  height: 30px;
  padding: 0px 10px 0px 10px;
  justify-content: center;
  align-items: center;
`
export const CsFlex = styled(Flex)`
  @media(max-width:600px){
   width:100%!important;
 }
`;
const CustomTextMakeProposals = styled(Text)`
@media (max-width:1024px) and (min-width:769px){
  font-size:14px;
}
@media (max-width:600px){
  font-size:14px;
  padding-bottom:10px;
}
`