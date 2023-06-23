/* eslint-disable react/no-unescaped-entities */
import { Button, Flex, LinkExternal, Progress, Radio, Skeleton, StatusClosedIcon, StatusOpenIcon, Text, useModal } from "@pancakeswap/uikit";
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity';
import PageFullWidth from 'components/Layout/PageFullWidth';
import { useRouter } from 'next/router';
import { BIG_ZERO } from 'utils/bigNumber';
// import { BASE_BSC_URL } from 'config';
import { useTranslation } from '@pancakeswap/localization';
import BigNumber from 'bignumber.js';
import ConnectWalletButton from 'components/ConnectWalletButton';
/* eslint-disable camelcase */
import { GetURL_SNAPSHORT } from "config/constants/votingSnapshort";
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useEffect, useState } from 'react';
import { GetListProposals, GetProposalsInfo, GetSnapShortVoting } from 'state/votingProposals';
import styled from 'styled-components';
import { getBlockExploreLink } from "utils";
import Nav from 'views/Invest/components/SubNav';
import { Container, WrapAppBody, Wrapper } from 'views/Invest/styles';
import CardVote from './components/CardVote';
import CardVoteByOwner from "./components/CardVotingByOwner";
import ListVote from './components/ListVote';
import VoteModal from './components/VoteModal';
import { FetchDataVoting } from './hook/fetchDataVoting';
import Note from "./components/Note";



const Vote = () => {
  const router = useRouter()
  const votingId  = router?.query?.voteid
  const { chainId, account } = useActiveWeb3React() 
  const voteUrlSnapShort = GetURL_SNAPSHORT(chainId)
  const [ listVotingData ] = GetSnapShortVoting(Number(votingId), voteUrlSnapShort)
  const [ refresh, setRefresh ] = useState(0)
  const { t } = useTranslation()
  const [ totalProposals, minAmountToWin ] = GetProposalsInfo(chainId)
  const [listProposals] = GetListProposals(totalProposals, chainId)
  const votingDetails = listProposals.filter(data => data.votingId === Number(votingId))[0]
  function convertDate(date) {
    if (date) {
      const today:any = new Date(date*1000);
      const seconnd = String(today.getSeconds()).padStart(2, '0');
      const minutes = String(today.getMinutes()).padStart(2, '0');
      const hours = String(today.getHours()).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); 
      const yyyy = today.getFullYear();
      return <Flex >
           <Text bold >{hours}:{minutes}:{seconnd}</Text>
           <Text ml="10px" bold >{dd}/{mm}/{yyyy}</Text>
          </Flex>;
    }
    
    return <Skeleton width={60} />
  }
  function sAccount(dataAddress) {
    if (dataAddress) {
      return `${dataAddress.substring(0, 4)}...${dataAddress.substring(dataAddress.length - 4)}`
    }
    return <Skeleton width={60} />
  }
  const [radio, setRadio] = useState(true);

  const handleChange = (value: boolean) => {
    setRadio(value);
  };
  const { dataVoting } = FetchDataVoting(votingId, refresh,chainId, account)
  const [openModalVoting] = useModal(
    <VoteModal
      votingAgree={dataVoting.agree}
      votingRefuse={dataVoting.refuse}
      totalVoting={dataVoting.totalVote}
      isAgree={radio}
      votingId={Number(votingId)}
      onRefresh={(newValue)=>setRefresh(newValue)}
      startTimeVoting={dataVoting.startDate}
      endTimeVoting={dataVoting.startDate}
      chairPerson={dataVoting.chairPerson}
      stakeMinToWin={minAmountToWin.toString()}
    />,
    true,
    true,
    'VoteModal',
  )
  
  const checkOwnerVote = account?.toLocaleLowerCase() === dataVoting?.chairPerson?.toLocaleLowerCase();
  function renderPercent(agree: string, refuse: string, isAgree: boolean) {
    const convertAgree =  new BigNumber(agree);
    const convertRefuse =  new BigNumber(refuse);
    let renderValues =0;
    let values = 0
    if (isAgree === true) {
      renderValues = Number(convertAgree.dividedBy(convertAgree.plus(convertRefuse)).multipliedBy(100))
    }
    else {
      renderValues = Number(convertRefuse.dividedBy(convertAgree.plus(convertRefuse)).multipliedBy(100))
    }
    if (Number.isNaN(renderValues)) {
      values = 0
    } else {
      values = renderValues
    }
    return values
  }
    const renderPercentAgree = renderPercent(dataVoting.agree, dataVoting.refuse, true).toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    const renderPercentRefuse = renderPercent(dataVoting.agree, dataVoting.refuse, false).toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2})
    const convertdataAgree = new BigNumber(dataVoting.agree)
    const convertdataRefuse = new BigNumber(dataVoting.refuse)
    const totalVoting = convertdataAgree.plus(convertdataRefuse);
    const partTotalVote = totalVoting.decimalPlaces(2,1)
useEffect(()=>{
  BannerVotes()
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
function BannerVotes() {
  return (
    <>   
      <BannerVote >         
          {totalVoting.isGreaterThanOrEqualTo(new BigNumber(minAmountToWin)) && <CsTextStatus color="white">{convertdataAgree.isGreaterThan(convertdataRefuse) ? renderPercentAgree : renderPercentRefuse }<span style={{fontSize:'20px'}}>%</span></CsTextStatus>}
          {totalVoting.isGreaterThanOrEqualTo(new BigNumber(minAmountToWin)) ?  <CsTextStatus color="white">{convertdataAgree.isGreaterThan(convertdataRefuse) && totalVoting.isGreaterThan(new BigNumber(minAmountToWin)) ? 'Agree' : 'Disagree' }</CsTextStatus> :  <CsTextStatus color="#fff">Cancel</CsTextStatus>}
          <ButtonVoteStatus>
            {Number(partTotalVote).toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} Votes
          </ButtonVoteStatus>
      </BannerVote>
    </>
  )
 }
 
  const currentTime = Date.now()  
  const isTimeCanUnStake = currentTime > dataVoting.endDate*1000
  const listVotingAgrees = listVotingData.filter(data => data.voter?.toLocaleUpperCase() === account?.toLocaleUpperCase() && data?.option === true )
  const listVotingDisagrees = listVotingData.filter(data => data.voter?.toLocaleUpperCase() === account?.toLocaleUpperCase() && data?.option === false )
  const isOwneVoting = account?.toLocaleUpperCase() === votingDetails?.ownerAddress.toLocaleUpperCase()
  function getTotalAmount(arrayVoting:any){
    let totalAmount = BIG_ZERO;
    if ( arrayVoting.length > 0 ){
      for (let i = 0; i < arrayVoting.length; i++) {
        totalAmount = new BigNumber(totalAmount).plus(new BigNumber(arrayVoting[i]?.amount));
      }
    }
    return totalAmount
  }
  const convertVoteAgreee = new BigNumber(dataVoting.agree)
  const convertVoteRefuse = new BigNumber(dataVoting.refuse) 
  const partAgreee = convertVoteAgreee.decimalPlaces(2,1)
  const partRefuse = convertVoteRefuse.decimalPlaces(2,1)
  const urlLinkCreator:any = votingDetails?.ownerAddress
  function handleOpenLink(){
    window.open(getBlockExploreLink(urlLinkCreator, 'address', chainId))
  }
  
   return (
    <PageFullWidth>
      <HeaderLiquidity bgColor='#029DA5' namePlace='Invest Together' nameTitle='run together' />
      <Nav />
      <Container>
        <WrapAppBody>
          <CustomWrapper>   
          <StatusVote>
           {!isTimeCanUnStake ? <StatusOpenIcon /> : <StatusClosedIcon/>}
          </StatusVote>                 
          <Header>
             <CsText textAlign='center'>Vote</CsText>
          </Header>
          <WrapTextDes>
            
          {isTimeCanUnStake && dataVoting.endDate*1000 !== 0 ?
              totalVoting.isLessThan(new BigNumber(minAmountToWin)) ? 
                <>
                      <TextResResult>
                        <Text color="#1F3D7F" fontSize="10px" style={{fontWeight:'900'}}>FINAL RESULT</Text>
                      </TextResResult>
                      <WrapBannerVoteCancel>
                        <BannerVotes/>
                      </WrapBannerVoteCancel>
                     </>  
                : convertdataAgree.isGreaterThan(convertdataRefuse) ?
                <>
                    <TextResResult>
                      <Text color="#1F3D7F" fontSize="10px" style={{fontWeight:'900'}}>FINAL RESULT</Text>
                    </TextResResult>
                    <WrapBannerVoteAgree>
                      <BannerVotes/>
                    </WrapBannerVoteAgree>
                </> : <>
                    <TextResResult>
                      <Text color="#1F3D7F" fontSize="10px" style={{fontWeight:'900'}}>FINAL RESULT</Text>
                    </TextResResult>
                    <WrapBannerVoteDisAgree>
                      <BannerVotes/>
                    </WrapBannerVoteDisAgree>
                  </>        
             : 
               <></>

          }
             <TextProposal fontWeight="900">{t("Proposal to open a run shoe store")}</TextProposal>            
              <PdText>
                <CustomTextUser>{t("Users who own ")}<Textbold>{t("1,000,000 RUN ")}</Textbold>{t("tokens have the right to propose to open the store owner.")}</CustomTextUser>
                <CustomTextStore>
                  {t("RunTogether will open a shoe store when the vote is closed over 50%, users will receive 30% of the store's sales profit and annual stake interest 20% of Pools Store. The maximum amount RUN token can be stake in Pool is 2.5M. ")}
                </CustomTextStore>
              </PdText>
              <Note/>
            </WrapTextDes>
            <Divider />
            <TextTitle fontWeight="bold">{t("Details")}</TextTitle>
            <WrapDetail>
              <CustomWidth>
                <CsFlex>
                  <Text>{t("Vote ID")}</Text>    
                  <CustomId>
                        <Text bold >#{votingId}</Text>
                  </CustomId>              
                </CsFlex>
                <CsFlex>
                  <Text>{t("Creator")}</Text>
                  {votingDetails?.ownerAddress ?
                    <StyledLinkExternal onClick={handleOpenLink}>{sAccount(votingDetails?.ownerAddress)}</StyledLinkExternal>
                    :
                    <Skeleton width={60} />
                  }
                </CsFlex>
                
              </CustomWidth>
              <CustomWidth>
                <CsFlex>
                  <Text>{t("Start date")}</Text>
                  {convertDate(votingDetails?.startTime)}
                </CsFlex>

                <CsFlex>
                  <Text>{t("End date")}</Text>
                  {convertDate(votingDetails?.endTime)}
                </CsFlex>
              </CustomWidth>
            </WrapDetail>
            <Divider />
            
            <TextTitle fontWeight="bold">{ !isTimeCanUnStake ? t("Current Results") : t("Results")}</TextTitle>
            <WrapCurrentResult>
              <CustomWidthResult>
                <Text color="textSubtle">{t("Agree")}</Text>
                <Progress variant="round" primaryStep={Number(convertVoteAgreee.dividedBy(convertVoteAgreee.plus(convertVoteRefuse)).multipliedBy(new BigNumber(100)).toString())} scale="sm" />
                <WrapPercent>
                  <Text fontSize='14px'>
                        { partAgreee.isNaN() ?
                          "0.00"
                        :
                          Number(partAgreee.toString()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        } 
                        &nbsp;Votes
                    </Text>
                  <Text fontSize='14px' color="success">
                      {  Number(partAgreee.toString()) === 0
                      ? renderPercent(dataVoting.agree, dataVoting.refuse, true).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : 
                      `~ ${ renderPercent(dataVoting.agree, dataVoting.refuse, true).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      } %
                  </Text>
                </WrapPercent>
              </CustomWidthResult>
              <CustomWidthResult>
                <Text color="textSubtle">{t("Disagree")}</Text>
                <Progress bgcolor={({ theme }) => theme.colors.warning43} variant="round" primaryStep={Number(convertVoteRefuse.dividedBy(convertVoteAgreee.plus(convertVoteRefuse)).multipliedBy(new BigNumber(100)).toString())} scale="sm" />
                <WrapPercent>
                  <Text fontSize='14px'>
                        { partRefuse.isNaN() ?
                          "0.00"
                        :
                          Number(partRefuse.toString()).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        }
                        &nbsp;Votes
                    </Text>
                  <Text fontSize='14px' color="primaryBright">
                  {  Number(partRefuse.toString()) === 0
                      ? renderPercent(dataVoting.agree, dataVoting.refuse, false).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : 
                      `~ ${ renderPercent(dataVoting.agree, dataVoting.refuse, false).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      } %
                  </Text>
                </WrapPercent>
              </CustomWidthResult>
            </WrapCurrentResult>
            <Divider />
           { 
             checkOwnerVote  ?             
              <Flex width="100%" justifyContent="center" mt="1rem">
                { !isTimeCanUnStake && 
                    <Text color='primaryBright' fontWeight='bold'>{t("Creator cannot vote!")}</Text>
                }
              </Flex> 
              :                
              <>
                {!isTimeCanUnStake &&
                <>
                    <TextTitle fontWeight="bold" >{t("Cast your vote")}</TextTitle>
                    <WrapCast>                      
                        <WrapRadio>
                          <CSRadio name="sm" onChange={()=>handleChange(true)} checked={radio === !false} />
                          <Text>{t("Agree")}</Text>
                        </WrapRadio>
                        <WrapRadio>
                          <CSRadio name="sm" onChange={()=>handleChange(false)} checked={radio === false} />
                          <Text>{t("Disagree")}</Text>
                        </WrapRadio>                                         
                    </WrapCast>
                    {  account ?                            
                        <WrapBtnCast>                     
                            <CustomButton disabled={checkOwnerVote || isTimeCanUnStake} onClick={openModalVoting}>Cast vote</CustomButton>
                        </WrapBtnCast>                        
                        :
                        <CsConnectWalletButton mt="1rem"/>
                    } 
                </>  
                }
               
              </>         
            }
            <Flex width="100%" justifyContent="space-around" alignItems="center" mt="1.5rem">
              { account &&
                <>
                    { isOwneVoting ?
                        <CardVoteByOwner
                            votingId={Number(votingId)}
                            refresh={refresh}
                            account={account}            
                            chainId={chainId}  
                        />
                    :
                        <CardVote 
                          votingId={Number(votingId)}
                          refresh={refresh}
                          numberAgree ={getTotalAmount(listVotingAgrees).toString()}                                          
                          numberDisagree = {getTotalAmount(listVotingDisagrees).toString()}   
                          account={account}            
                          chainId={chainId}                         
                        />        
                    }
                </>
              }
            </Flex>
          </CustomWrapper>
          {isTimeCanUnStake &&
            <Flex width="100%" justifyContent="center">
                { !account &&
                    <CsConnectWalletButton mt="1rem"/>
                }
            </Flex>
          }
          <WrapperTable>
          <TextTitle fontWeight="bold">
                <b style={{fontWeight:'900'}}>VOTES</b> ({listVotingData.length}) 
          </TextTitle>
          {listVotingData.length !== 0 ?
              <>
            <TitleTable>                
                <FlexListVotting width='100%' justifyContent='space-around'>
                  <TextListVotting justifyContent='center'>TX Hash</TextListVotting>
                  <TextListVotting justifyContent='center'>Status</TextListVotting>
                  <TextListVotting justifyContent='center'>Amount</TextListVotting>
                </FlexListVotting>
            </TitleTable>
                {listVotingData.map((item, key) => {
                  return (
                    <ListVote
                      address={item.voter}
                      status={item.option}
                      balance={item.amount}
                      txAddress={item.transactionHash}
                      rowId={key}
                    />
                  )
                })}
              </>
              :
              <Flex width="100%" justifyContent="center" mt="1rem">
                <Text mt="2rem">{t("No Data")}</Text>
              </Flex>
            }
          </WrapperTable>

        </WrapAppBody>
      </Container>
    </PageFullWidth>


  );
};

export default Vote;

export const Textbold = styled.span`
  font-weight:900;
`;

export const WrapTextDes = styled(Text)`
 text-align:center;
`;

export const Divider = styled.div`
 width:100%;
 text-align: center;
 border-bottom:2px solid ${({ theme }) => theme.colors.tertiary};
 margin: 50px 0px;
 &:nth-child(3) {
   margin:60px 0!important;
 }

`
const TextTitle = styled(Text)`
font-size:24px;
font-weight:bold;
margin:20px 0;
`
export const WrapDetail = styled(Flex)`
  @media (max-width:600px) {
    flex-direction:column;
  }
`;
export const CsFlex = styled(Flex)`
  justify-content: space-between;
  margin-bottom:10px;
`;
const CustomWidth = styled(Flex)`
    flex-direction:column;
    &:first-child {
      padding-right:5rem;
      @media (max-width:600px) {
        padding:0 
    }
   }
   &:nth-child(2) {   
      padding-left:5rem;
      /* padding-right:5rem; */
      @media (max-width:600px) {
        padding:0 
    }
   }
    width:50%;
    @media screen and (max-width: 1080px) {
        width: 100%;
        padding:0;
    }
    @media screen and (max-width: 768px) {
      &:nth-child(2) {  
        padding:0;
    }
  }
`
const CustomWidthResult = styled(CustomWidth)`
   &:first-child {
      padding-right:1rem;
   }
   &:nth-child(2) {   
      padding-left:1rem;
   }
   gap:10px;
   @media (max-width:600px){
     width:100%;
     padding:0!important;
     &:nth-child(2) {   
        margin-top:20px;
     }
   }
   
`
const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 600;
  justify-content: center;
  cursor:pointer;
  color:${({ theme }) => theme.colors.text}!important;
  > svg {
    fill:${({ theme }) => theme.colors.text}!important;
  } 
  :hover{
    color: ${({ theme }) => theme.colors.secondary}!important;
    > svg {
    color:${({ theme }) => theme.colors.secondary}!important;
    fill:${({ theme }) => theme.colors.secondary}!important;
    }
  }
`
export const WrapCurrentResult = styled(Flex)`
  @media (max-width:600px){
     flex-direction:column;
  }
`;
export const CsFlexResult = styled(Flex)`
  flex-direction:column;
`;

const WrapRadio = styled(Flex)`
  width:100%;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors.backgroundDisabled};
  border-radius: 30px;
  align-items:center;
  padding: 15px 40px;
  gap: 10px;
  margin: 10px 0;
`
export const WrapCast = styled.div`
    width:100%;
`;
export const Wrap = styled(Flex)`
  
`;
export const WrapBtnCast = styled(Flex)`
   margin-top:20px;
   @media (max-width:600px) {
       justify-content:flex-start;
       margin:30px 0;
      
    }
`;
export const PdText = styled.div`
  padding: 0 60px;
  @media (max-width:600px) {
        padding:0 ;
        text-align:center;
    }
`;
const CustomTextUser = styled(Text)`
@media (max-width:1024px) and (min-width:769px){
  font-size:14px;
}
@media (max-width:600px){
  font-size:14px;
  padding-bottom:10px;
}
`
const CustomTextStore = styled (Text)`
@media (max-width:1024px) and (min-width:769px){
  font-size:14px;
}
@media (max-width:600px){
  font-size:14px;
}

`
const TextProposal = styled(Text)`
padding:20px 0 20px;
font-size:24px;
@media (max-width:600px){
  padding-bottom:10px;
  font-size:18px;
}
`
const WrapPercent = styled(Flex)`
   justify-content:space-between;
`
const TitleTable = styled(Flex)`
    width: 100%;
    height: 80px;
    background: ${({ theme }) => theme.colors.colortable};
    border-radius: 20px 20px 0px 0px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    color: #FFFFFF;
    flex-direction: column;
    align-items: left;
    justify-content: center;
`

const FlexListVotting = styled(Flex)`
    width: 100%;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    gap: 10px;
    @media screen and (max-width: 768px){
        gap: 20px;
    }
    @media screen and (max-width: 600px){
        gap: 0px;
        padding-left: 0;
    }
`
const TextListVotting = styled(Flex)`
    width: 33.33%;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
`
const CustomButton = styled(Button)`
  border-radius: 90px !important;
  box-shadow: none;
  background: ${({ theme }) => theme.colors.primaryBright};
`
const CsConnectWalletButton = styled(ConnectWalletButton)` 
  background-color: ${({ theme }) => theme.colors.primaryBright};
  color: ${({ theme }) => theme.colors.backgroundAlt};
  border:none;
  
`
export const WrapperTable = styled(Wrapper)`
  margin:1.2rem 0 0;
  padding-top:2rem;
  @media (max-width:600px) {
     margin: 0.5rem 0 0;
     padding-top:.5rem;
  }
`;
const CustomId = styled(Flex)`
  background: ${({theme})=>theme.colors.success19};
  border-radius: 6px;
  width: auto;
  height: 32px;
  padding: 0px 10px 0px 10px;
  justify-content: center;
  align-items: center;
`
const StatusVote = styled.div`
 color:red;
 padding: 10px 0;
 @media(max-width:600px){
    padding-left:20px;
 }
`
const Header = styled(Flex)`
   width: 100%;
   align-items: center;
   justify-content: center;
   padding-bottom: 20px;
`
const CsText = styled(Text)`
    font-weight: 700;
    font-size: 48px;
    line-height: 72px;
    color: ${({theme})=>theme.colors.text};
    @media screen and (max-width: 425px) {
      font-size: 36px;
      line-height: 48px;
    }
`
const CustomWrapper = styled(Wrapper)`
   padding-top:1.5rem;
`
const WrapBannerVoteAgree = styled(Flex)`
  background-image:url("/images/invest/BannerVotePc.jpg");
  background-repeat:no-repeat;
  width:100%;
  height:200px;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  position:relative;
  @media (max-width:600px){
    max-width: 600px;
    border: 1px solid ${({ theme }) => theme.colors.backgroundDisabled};;
    border-radius: 10px;
    background-position: bottom;
  }
`
const WrapBannerVoteDisAgree = styled(WrapBannerVoteAgree)`
 background-image:url("/images/invest/BackgroundDisagree.png");
`
const WrapBannerVoteCancel = styled(WrapBannerVoteAgree)`
 background-image:url("/images/invest/BannerCancel.png");
`

const BannerVote = styled(Flex)`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  margin-top:15px;
  margin-left:-20px;
  gap:18px;
  @media (max-width:600px){
     margin-left:-10px;
  }
`
const ButtonVoteStatus = styled.div`
  background: ${({ theme }) => theme.colors.buttonstatusvote};
  border-radius: 20px;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 14px;
  border:1px solid ${({ theme }) => theme.colors.buttonstatusvote};
  padding: 5px 30px;
  max-width:250px;
  border-radius: 90px;
  color:${({ theme }) => theme.colors.backgroundAlt};;
  line-height:20px;
`;

const CsTextStatus = styled(Text)`
 font-size:40px;
 font-weight:900;
 text-transform:uppercase;
 line-height:20px;
`
const TextResResult = styled.div`
background:${({theme})=>theme.colors.warning};;
padding:10px;
width:80px;
display:flex;
justify-content:flex-start;
position: absolute;
z-index: 100000;
height: 22px;
width: 85px;
top: 150px;
left: 10px;
align-items: center;
visibility:hidden;
@media (max-width:600px){
  visibility:visible;
}
@media (max-width:599px) and (min-width:420px) {
  top: 180px;
}
`
const CSRadio = styled(Radio)`
&:hover{
  box-shadow:none!important;
}
&:checked{
  box-shadow:none!important;
}
`
