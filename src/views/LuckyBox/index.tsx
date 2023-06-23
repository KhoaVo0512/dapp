import { Button, Flex, Input, InputGroup, SearchIcon, Heading } from '@pancakeswap/uikit';
import { useTranslation } from '@pancakeswap/localization'
import Page from 'components/Layout/Page'
import CustomSelect from 'components/CustomSelect/CustomSelect';
import Container from 'components/Layout/Container';
import PageHeader from 'components/PageHeader'
import styled from 'styled-components';
import InventoryOffChain from './components/InventoryOffChain';
  
interface Props {
    activeIndex: string
}

const Inventory: React.FC<Props> = () => {
    const { t } = useTranslation()
    return (
        <Page>
            <PageHeader mt="1rem">
                <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
                    <Flex flex="1" flexDirection="column" mr={['8px', 0]}>
                        <Heading as="h1" scale="xxl" mb="24px">
                        {t('Lucky Box')}
                        </Heading>
                        <Heading scale="md" color="text">
                        {t('Manage assets and NFTs')}
                        </Heading>
                    </Flex>
                </Flex>
            </PageHeader>
            <CustomContainer>
                <InventoryOffChain/>
            </CustomContainer>
        </Page>
    );
}

export default Inventory

const CustomContainer = styled(Container)`
    width:100%;
    height: auto;
    @media only screen and (max-width: 768px) {
        padding-left:10px;
        padding-right: 10px;
    }
`
const CsFlex = styled(Flex)`
    flex-wrap:wrap;
    gap: 30px;
    @media only screen and (min-width: 600px) and (max-width: 1024px){
        width: 100%;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
    @media only screen and (max-width: 600px) {
        width: 100%;
        gap: 20px;
    }
` 
const CustomRow = styled(Flex)`
    flex-wrap:wrap;
    @media only screen and (max-width:1080px) {
        width: 100%;
        justify-content: center;
    }
`
const WrapperTabs = styled(Flex)`
    width:auto;
    @media only screen and (min-width: 600px) and (max-width: 1080px) {
        width: 100%;
        justify-content: center;
        gap: 15px
    }
    @media only screen and (max-width: 600px) {
        width: 100%;
        flex-wrap:wrap;
    }
`
const CotainerTabAll = styled.div`
    display: flex;
    width:auto;
    @media only screen and (max-width: 600px) {
        width: 100%;
        justify-content: center;
    }
`
const CustomTabAll = styled(Button)<{isActive?:boolean}>`
    width: auto;
    background:none;
    box-shadow: none;
    font-size:22px;
    display: flex;
    justify-content: flex-start;
    padding-left:10px;
    font-weight:bold;
    border-radius:0px;
    color:${({ isActive }) => isActive ? "#4B19F5" : "#B1B5C3"};
    border-bottom:${({ isActive }) => isActive ? "3px solid #4B19F5" : "none"}; 
    @media only screen and (max-width: 900px) {
        font-size:18px;
    }
    @media only screen and (max-width: 600px) {
        width: 50%;
        justify-content: center;
        margin-bottom:10px;
        border-bottom:${({ isActive }) => isActive ? "3px solid #4B19F5" : "1px solid #c4c6d073"}; 
    }
`
const CustomTab = styled(Button)<{isActive?:boolean}>`
    width: auto;
    background:none;
    box-shadow: none;
    font-size:22px;
    display: flex;
    justify-content: flex-start;
    padding-left:10px;
    font-weight:bold;
    border-radius:0px;
    color:${({ isActive }) => isActive ? "#4B19F5" : "#B1B5C3"};
    border-bottom:${({ isActive }) => isActive ? "3px solid #4B19F5" : "none"}; 
    @media (min-width:602px) and (max-width:800px){       
        padding:0;
    }
    @media only screen and (max-width: 600px) {
        width: 50%;
        padding: 0px;
        &:first-child {
            width: 100%;
        }
        margin-bottom:10px;
        border-bottom:${({ isActive }) => isActive ? "3px solid #4B19F5" : "1px solid #c4c6d073"}; 
    }
`
const Tags = styled.img`
    height: 35px;
    width: 35px;
    border-radius:50%;
    overflow:hidden;
`

const FlexPrice = styled(Flex)`
    flex-wrap:wrap;
    gap: 30px;
    @media screen and (min-width: 944px) and (max-width: 1024px) {
        width: 70%;
    }
    @media screen and (min-width: 601px) and (max-width: 943px) {
        width: 50%;
        flex-wrap:nowrap;
    }
    @media only screen and (max-width: 600px) {
        gap: 20px;
    }
`
const CustomSelectShoe = styled(CustomSelect)`
`
const CustomInputGroup = styled(InputGroup)`
    width: 305px;
    height: 48px;
    border: 2px solid #E6E8EC;
    border-radius:12px;
    background: transparent !important;
    > input {
        background: transparent !important;
        border: none;
        height: 48px;
    }
    @media screen and (min-width: 601px) and (max-width: 768px) {
        width: 50%;
        margin-left: 40px;
    }
    @media screen and (max-width: 600px) {
        margin-top: 40px;
        width: 100%;
    }
`
const SearchIconCus = styled(SearchIcon)`

    @media screen and (min-width: 769px) and (max-width: 1080px) {

    }
    @media screen and (max-width: 600px) {

    }
`
const RowFilterType = styled(Flex)`
  margin-top:1.25rem;
  width:100%;
  justify-content: center;
  flex-wrap:wrap;
  border-bottom: 1px solid #c4c6d073;
  @media only screen and (max-width: 600px) {
    justify-content:flex-end;
    padding-right:10px;
    ${Flex}{
      width: 100%;
      justify-content: flex-start;
      // margin-top:1rem;
    }
    border-bottom: none;
  }
`
const Row = styled(Flex)`
  margin-top:1.25rem;
  width:100%;
  justify-content: space-between;
  // flex-wrap:wrap;
  @media only screen and (max-width: 600px) {
    flex-wrap:wrap;
    justify-content:flex-end;
    padding-right:10px;
    ${Flex}{
      width: 100%;
      justify-content: flex-start;
      margin-top:1rem;
    }
  }
`
