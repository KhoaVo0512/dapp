import { useTranslation } from '@pancakeswap/localization'
import { ArrowBackIcon, Flex, IconButton, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import Link from 'next/link'

const Header = () => {
  const { t } = useTranslation()
  return (
    <CustomFlex width="100%">
       <Link passHref href="/inventory">
         <CsArrow>
            <IconButton as="a" style={{display:'flex',justifyContent:'center'}} >
              <ArrowBackIcon width="26px"/>           
            </IconButton>
          </CsArrow>
        </Link>
        <SmallTitle>{t('Back to Inventory')}</SmallTitle>
    </CustomFlex>
  )
}

export default Header

const CustomFlex = styled(Flex)`
  align-items:center;
  @media screen and (min-width: 768px) and (max-width: 1080px) {
       padding-left:3rem;
  }
  @media screen and (max-width: 600px) {
       padding-left:15px;
  }
  padding-left:3.5rem;
  padding-bottom:1.5rem;
  gap:15px;
  @media (max-width:600px){
    padding-bottom:0!important;
  }
`
const SmallTitle = styled(Text)`
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`
const CsArrow = styled.div`
border-radius:50%;
border:1px solid #ddd;
width: 48px;
height: 48px;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
`