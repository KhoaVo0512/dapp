import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem ,Flex} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
  p {
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
const defaultStyle = {
 
}
const styleActive = { 
  color: `${({ theme }) => theme.colors.secondary}`, 
  background: '#5DCB83',
  boxsizing: 'border-box',
  borderradius: '20px 20px 0px 0px'
}
const Wrapper = styled.div`
  width:100%;
  max-width: 600px;
  height:auto;
  @media screen and (max-width: 600px) {
    padding: 0 20px;    
  }
`

const CsStyledNav = styled(StyledNav)`
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  cursor:pointer;
`

const CustomNavLink = styled.p`
  color: #FFFFFF !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding-bottom: 20px !important;
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
    font-size: 36px;
  }

  @media screen and (max-width: 425px) {
    font-size: 20px;
  }
`
const WrapAppBody = styled.div`  
  @media only screen and (max-width: 600px) {
    margin-left: 16px;
    margin-right: 16px;  
    padding: 0px;
  }
`
const getActiveIndex = (pathname: string): number => {
  if (
     pathname.includes('/liquidity') || pathname.includes('/add') || pathname.includes('/find') || pathname.includes('/remove')
  ) {
    return 1
  }
  return 0
}

const Nav = () => {
  const { pathname } = useRouter()
  const { t } = useTranslation()
  const activeIndex = getActiveIndex(pathname)
  
  return (
    <Wrapper>
    <WrapAppBody>
    <CsStyledNav>     
        <WrapLink style={activeIndex === 0 ? styleActive : defaultStyle}>
          <Link href="/swap" passHref>
              <CustomNavLink style={activeIndex === 0 ? styleActive : defaultStyle}>
                  <Strong>
                    {t('Swap')}
                  </Strong>
              </CustomNavLink>
          </Link>
        </WrapLink>
        <WrapLink style={activeIndex === 1 ? styleActive : defaultStyle}>
          <Link href="/liquidity" passHref>
            <CustomNavLink style={activeIndex === 1 ? styleActive : defaultStyle}>
              <Strong>
                {t('Liquidity')}
              </Strong>
            </CustomNavLink>
          </Link>
        </WrapLink>
    </CsStyledNav>
    </WrapAppBody>
    </Wrapper>
  )
}

export default Nav
