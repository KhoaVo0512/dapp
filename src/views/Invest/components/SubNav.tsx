import { useTranslation } from '@pancakeswap/localization'
import { Flex, Link } from '@pancakeswap/uikit'
import { useRouter } from 'next/router'
import styled from 'styled-components'



const StyledNav = styled.nav`
  margin-bottom: 0px;
  justify-content: center;
  text-align: center;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    width: 550px;
  }
  a {
    flex-grow: 1;
    padding-top: 12px;
    padding-bottom: 12px;
    
    color: ${({ theme }) => theme.colors.text};
    font-weight: bold;
    font-size: 18px;
    line-height: 16px;
    text-align: center;
    height: 50px;
    display: inline-block;
    padding: 10px 0px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
`
const Wrapper = styled.div`
    width:100%;
    margin-top: -55px;
    max-width: 1200px;
    height:auto;
    @media screen and (max-width: 1024px) {
      margin-top: -5px;
      padding: 0px 50px;
    }
    @media screen and (max-width: 600px) {
        padding: 0 20px;    
    }
    @media screen and (min-width:1030px) and (max-width:1300px){
      padding-top:20px;
    }
`
const defaultStyle = {
  color: '#FFFFFF', 
}
const styleActive = { 
    
  color: '#FFFFFF', 
  background: '#5DCB83',
  boxsizing: 'border-box',
  borderradius: '20px 20px 0px 0px'
}



const getActiveIndex = (pathname: string): number => {
  let pathActive = 0
  switch (pathname) {
    case '/investtogether':
      pathActive = 0
      break;
    default:
      pathActive = 1
      break;
  }
  return pathActive
}

const Nav = () => {
  const { pathname } = useRouter()
  const { t } = useTranslation()
  const activeIndex = getActiveIndex(pathname)
  
  return (
    <Wrapper>
        <CsStyledNav>
          <WrapLink style={activeIndex === 0 ? styleActive : defaultStyle}>
            <CustomNavLink style={activeIndex === 0 ? styleActive : defaultStyle} href="/investtogether" aria-hidden="true">
              <Strong>{t('Pools Store')}</Strong>
            </CustomNavLink>
          </WrapLink>
          <WrapLink style={activeIndex === 1 ? styleActive : defaultStyle}>
            <CustomNavLink style={activeIndex === 1 ? styleActive : defaultStyle} href="/proposals" aria-hidden="true">
              <Strong>{t('Proposals')}</Strong>
            </CustomNavLink>
          </WrapLink>
        </CsStyledNav>
    </Wrapper>
  )
}

export default Nav

const CsStyledNav = styled(StyledNav)`
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
`

const CustomNavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding-bottom: 20px !important;
  &:hover {
    text-decoration: none;
  }
`
const WrapLink = styled(Flex)`
  padding: 15px 0px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  @media screen and (max-width: 1336px){
    padding: 10px 0px;
  }
`

const Strong = styled.strong`
  @media screen and (max-width: 600px) {
    font-size: 20px;
  }

  @media screen and (max-width: 425px) {
    font-size: 20px;
  }
`