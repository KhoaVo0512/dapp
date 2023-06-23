import { Flex, Text,SearchIcon,InputGroup,Radio,Input} from "@pancakeswap/uikit";
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity';
import HeaderProposals from 'components/HeaderProposals/HeaderProposals';
import PageFullWidth from 'components/Layout/PageFullWidth';
import React, { useState, useEffect } from 'react';
import { useTranslation } from "@pancakeswap/localization";
import styled from 'styled-components';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import Nav from 'views/Invest/components/SubNav';
import { OptionProps } from 'components/Select/Select'
import SelectCustom from 'components/Select/SelectCustom'
import { Container, WrapAppBody, Wrapper } from 'views/Invest/styles';
import { GetProposalsInfo, GetListProposals } from 'state/votingProposals';
import CardBanner from './components/CardBanner';
import VotingCard from './components/VotingCard';

const Proposals = () => {
    const { t } = useTranslation()
    const [isNow, setIsNow] = useState("true");
    const [searchQuery, setSearchQuery] = useState('')
    const { chainId } = useActiveWeb3React()
    const handleChange = (evt) => {
            const { value } = evt.target;
            setIsNow(value);
    };
    const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }
    const [sortidvote, setSortIdVote] = useState('latest')
    const handleSortVoteId = (option: OptionProps): void => {
        setSortIdVote(option.value)
    }
    const [ totalProposals, minAmountToWin ] = GetProposalsInfo(chainId)
    const [ listProposals ] = GetListProposals(totalProposals,chainId)
    const [ listVotes, setListVotes] = useState([])
    const [ searchVotes, setSearchVotes ] = useState([...listProposals])
    const [ listVotesFilter, setListVotesFilter] = useState([])
    const currentTime = Date.now()
    const [listCardVote, setlistCardVote] = useState([...listVotes])
    useEffect(() => {
        const object = [...listProposals]
        if ( searchQuery !== "" && listProposals) {
            const filterData = object.filter((data) => (data.votingId).toString() === searchQuery)
            setSearchVotes(filterData)
        }
        if ( searchQuery === "" ){
            setSearchVotes(object)
        }
    }, [searchQuery, listProposals])
    useEffect(() => {
        setListVotesFilter(listProposals)
        setListVotes(listProposals)
    }, [listProposals]) 
    // sort
    useEffect(() => {
        const object = [...searchVotes]
        function SortIdVote() {
        // eslint-disable-next-line no-alert
        if (sortidvote === 'latest') {
            // eslint-disable-next-line no-alert
            return setlistCardVote(
            object.sort((obj1, obj2) => Number(obj2.votingId) - Number(obj1.votingId)),
            )
        }
        if (sortidvote === 'oldest') {
            return setlistCardVote(
            object.sort((obj1, obj2) => Number(obj1.votingId) - Number(obj2.votingId)),
            )
        }
        }
        SortIdVote()
    }, [sortidvote, listVotes, searchVotes])
    const listVotingNow = listCardVote.filter(data => data.endTime*1000 > currentTime)
    const listVotingEnd = listCardVote.filter(data => data.endTime*1000 < currentTime)
    
    return (
        <PageFullWidth>
             <HeaderLiquidity bgColor='#029DA5' namePlace='Invest Together' nameTitle='run together'/>
             <Nav />
             <Container>
                <WrapAppBodyProposal>
                    <Wrapper>
                        <HeaderProposals headerName='Proposals'/>
                        <CardBanner />
                        <VoteContainer>
                          <WrapRadio>
                            <CustomRadio name="md" value="true" onChange={handleChange} checked={isNow === "true"} />
                            <CsText>Vote Now</CsText>
                          </WrapRadio>
                          <WrapRadio>
                            <CustomRadio name="md" value="false" onChange={handleChange} checked={isNow === "false"} />
                            <CsText>Closed</CsText>
                          </WrapRadio>
                        </VoteContainer>                        
                    </Wrapper>
                    
                    <CustomFlex justifyContent="space-between" mt="20px">
                        <CustomInputGroup endIcon={<SearchIconCus/>} >
                                <CustomInputSearch placeholder={t("Search Vote ID")} onChange={handleChangeSearchQuery}/>
                        </CustomInputGroup>
                        <CustomSelect
                          options={[
                            {
                                label: t('Latest'),
                                value: 'latest',
                            },
                            {
                                label: t('Oldest'),
                                value: 'oldest',
                            },
                            ]}
                            onChange={handleSortVoteId}
                        />
                    </CustomFlex>
                    <OfferContainer>
                            {  totalProposals > 0 &&
                                <>
                                    { isNow === "true" ?
                                        <>
                                            {listVotingNow.length !== 0 ?
                                                <>
                                                    {listVotingNow.map((item) => {
                                                        return (
                                                            <VotingCard
                                                                endTimeVoting={item.endTime}
                                                                votingId={item.votingId}
                                                                status="open"
                                                                chainId={chainId}
                                                                countMinToWin={minAmountToWin}
                                                            />
                                                        )
                                                    })}
                                                </>
                                            :
                                                <Flex width="100%" justifyContent="center">
                                                    <Text>{t("No Data")}</Text>
                                                </Flex>
                                            }
                                        </>

                                    :
                                        <>
                                            {listVotingEnd.length !== 0 ?
                                                <>
                                                    {listVotingEnd.map((item) => {
                                                        return (
                                                            <VotingCard
                                                                endTimeVoting={item.endTime}
                                                                votingId={item.votingId}
                                                                voteCounterAgree={item.agree}
                                                                voteCounterDisAgree={item.disagrees}
                                                                status='close'
                                                                chainId={chainId}
                                                                countMinToWin={minAmountToWin}
                                                            />
                                                        )
                                                    })}
                                                </>
                                            :
                                                <Flex width="100%" justifyContent="center">
                                                    <Text>{t("No Data")}</Text>
                                                </Flex>
                                            }
                                        </>
                                    }
                                </>
                            }
                    </OfferContainer>
                </WrapAppBodyProposal>
             </Container>
        </PageFullWidth>
    );
};

export default Proposals;

const SearchIconCus = styled(SearchIcon)`

    @media screen and (min-width: 769px) and (max-width: 1080px) {

    }
    @media screen and (max-width: 600px) {

    }
`

const VoteContainer = styled(Flex)`
    justify-content: center;
    align-items: center;
    gap: 100px;
    padding: 30px 0px;
    border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
    border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
    margin-bottom: 10px;
`
const CsText = styled(Text)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
`
const WrapRadio = styled(Flex)`
  gap: 10px;
`
const OfferContainer = styled(Flex)`
    flex-wrap:wrap;
    // justify-content: space-around;
    align-items: center;
    margin-bottom:1rem;
    // min-height: 40vh;
    justify-content: space-between;
    margin: 20px 30px;
    @media screen and (max-width: 600px) {
        justify-content: space-around;
        min-height: 40vh;
        margin: 0 0px;
        width: 100%;
    }
`
export const CustomInputGroup = styled(InputGroup)`
    // margin: 0 40px;
    width: 305px;
    height: 48px;
    border: 2px solid #E6E8EC!important;
    border-radius:12px;
    background: transparent !important;
    > input {
        background: transparent !important;
        border: none!important;
        height: 48px;
        &::placeholder{
            color: ${({theme}) => theme.colors.text};
        }
    }
    @media screen and (max-width: 600px) {
        margin: 0 0px;
        width: 100%;
    }
`
const CustomInputSearch = styled(Input)`
 &:focus {
    box-shadow:none!important;
 }
 border: 1px solid ${({theme}) => theme.colors.cardBorder}!important;
 box-shadow: none!important;
`
export const CustomRadio = styled(Radio)`
    &:hover:not(:disabled):not(:checked){
        box-shadow:none!important;
    }
    &:hover:not(:disabled):not(:checked){
        box-shadow:none!important;
    }
    &:hover{
        box-shadow:none!important;
    }
    &:checked {
        box-shadow:none!important;
    }
    &:after{
        border-radius: 50%;
        content: "";
        height: 12px;
        left: 10px;
        position: absolute;
        top: 9px;
        width: 12px;
    }
`

const CustomSelect = styled(SelectCustom)`
`
const WrapAppBodyProposal = styled(WrapAppBody)`
background:${({theme}) => theme.colors.backgroundFCVote}!important;
`
export const CustomFlex = styled(Flex)`
  margin: 0px 30px;
  @media (max-width:600px) {
    flex-direction:column;
    margin:0;
  }
`;