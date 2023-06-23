import { useTranslation } from '@pancakeswap/localization'
import { Flex, Text } from '@pancakeswap/uikit'
import PageFullWidth from 'components/Layout/PageFullWidth'
import useTheme from 'hooks/useTheme'
import { useHistory } from 'react-router'
import styled from 'styled-components'


const CustomContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  padding: 0px;
  @media only screen and (max-width: 600px) {
    padding-left: 10px;
    padding-right: 10px;
  }
  @media only screen and (max-width: 500px) {
    padding-left: 0px;
    padding-right: 0px;
    justify-content: flex-start;
  }
`
const Img = styled.img`
  width: 100%;
  height: auto;
  z-index: 10;
  top: 0px;
  @media screen and (max-width: 500px) {
    display: none;
  }
`
const Content = styled(Flex)`
  top: 0px;
  z-index: 100;
  flex-direction: column;
  padding: 60px 0px 60px 140px;
  @media screen and (max-width: 1024px) {
    padding: 37px 0px 60px 140px;
  }
  @media screen and (max-width: 800px) {
    padding: 18px 0px 60px 50px;
  }
  @media screen and (max-width: 500px) {
    padding: 80px 20px 20px 20px;
  }
`

const Heading = styled(Text)`
  color: #ffffff;
  font-weight: 900;
  font-size: 96px;
  line-height: 100%;
  letter-spacing: -0.02em;

  @media only screen and (max-width: 1024px) {
    font-size: 65px;
  }
  @media only screen and (max-width: 912px) {
    font-size: 60px;
  }
  @media only screen and (max-width: 800px) {
    font-size: 60px;
  }
  @media only screen and (max-width: 600px) {
    font-size: 30px;
  }
  @media screen and (max-width: 500px) {
    font-weight: 700;
    font-size: 46px;
    line-height: 100%;
    text-align: center;
  }
  @media screen and (max-width: 320px) {
    font-size: 40px;
  }
`
const SubTitle = styled(Text)`
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  text-transform: uppercase;
  @media only screen and (max-width: 600px) {
    font-size: 13px;
  }
  @media only screen and (max-width: 500px) {
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
  }
`

const Wrap = styled(Flex)`
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  height: 100%;
  display: grid;
  grid-template-columns: 50% 50%;

  @media screen and (max-width: 1440px) {
    grid-template-columns: 55% 45%;
  }
  @media screen and (max-width: 1336px) {
    grid-template-columns: 60% 40%;
  }
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`

const ImgMobile = styled.img`
  display: none;
  @media screen and (max-width: 500px) {
    display: block;
    width: 100%;
  }
`

const ComingSoon = () => {
  const { t } = useTranslation()
  return (
    <PageFullWidth>
      <CustomContainer style={{ position: 'relative' }}>
        <ImgMobile src="/images/comingsoon/ComingSoon_Mobile.png" alt="comingsoon" />
        <Img src="/images/comingsoon/ComingSoon.png" alt="mask-comingsoon" />
        <Wrap>
          <Content>
            <SubTitle color="text" mt="1rem">
              {t(`run together`)}
            </SubTitle>
            <Heading bold mt="1rem">
              We are coming soon
            </Heading>
          </Content>
        </Wrap>
      </CustomContainer>
    </PageFullWidth>
  )
}

export default ComingSoon
