import React from 'react'
import styled from 'styled-components'
import { Flex, Text,BgBanner, BgBannerMobile } from '@pancakeswap/uikit'


const HeaderLiquidity = ({ bgColor, nameTitle, namePlace, ...props }) => {
  return (
    <Container>
      <Bg>
        <CsBgBanner color={bgColor}/>
        <CsBgBannerMobile color={bgColor}/>
      </Bg>
      <Row>
        <Col height="100%">
          <FlexTitle width="100%" height="100%" alignItems="center" flexDirection="column">
            <TextTitle textTransform="uppercase" color="#fff" fontSize="16px" bold>
              {nameTitle}
            </TextTitle>
            <TextPlace textAlign='center' fontSize="80px" bold color="#fff">
              {namePlace}
            </TextPlace>
          </FlexTitle>
        </Col>
      </Row>
    </Container>
  )
}

export default HeaderLiquidity

const Container = styled.div`
  width: 100%;
  height: 100%;
  /* background-repeat: no-repeat;
  background-size: 100% 100%; */
  @media screen and (max-width: 1024px) {
    /* height: 400px; */
  }

  @media screen and (min-width: 601px) and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const Bg = styled.div`
  position: absolute;
  width: 100%;
  top: -280px;
  z-index: -1;
  height:100%;
  @media screen and (max-width: 1440px) {
    top: -160px;
  }

  @media screen and (max-width: 1336px) {
    top: -170px;
  }

  @media screen and (max-width: 1024px) {
    top: -290px;
  }
  @media screen and (max-width: 801px) {
    top: -290px;
  }
  @media screen and (max-width: 600px) {
    top: -150px;    
  }
  @media screen and (max-width: 500px) {
    top: -65px;    
  }
`

const CsBgBanner = styled(BgBanner)`
  @media screen and (max-width: 600px) {
    display: none;
  }
`

const CsBgBannerMobile = styled(BgBannerMobile)`
  display: none;

  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
    position: absolute;
    top: -80px;
  }
`

const BgImgMobile = styled.img`
  display: none;

  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
    position: absolute;
    top: -145px;
  }
  @media screen and (max-width: 400px) {
    display: block;
    width: 100%;
    position: absolute;
    top: -48px;
  }
`

const Row = styled.div`
  height: 100%;
`

const Col = styled(Flex)`
  padding: 0px 250px;
  z-index: 99;
  @media screen and (max-width: 1336px) {
    padding: 0px 200px;
  }
  @media screen and (max-width: 1024px) {
    padding: 0px 164px;
  }
  @media screen and (max-width: 768px) {
    padding: 0px 100px;
  }
  @media screen and (max-width: 600px) {
    padding: 0 50px;
  }
  @media screen and (max-width: 400px) {
    padding: 0 32px;
  }
`

const FlexTitle = styled(Flex)`
  gap: 0px;
  padding-top: 60px;
  padding-bottom: 60px;
  @media screen and (max-width: 1440px) {
    padding-top: 150px;
    padding-bottom: 50px;
  }
  @media screen and (max-width: 1336px) {
    padding-top: 160px;
    padding-bottom: 20px;
  }
  @media screen and (max-width: 1024px) {
    padding-top: 40px;
  }
  @media screen and (max-width: 920px) {
    padding-top: 20px;
  }
  @media screen and (max-width: 768px) {
    padding-top: 20px;
  }
  @media screen and (max-width: 600px) {
    padding-top: 50px;
    /* gap: 12px; */
  }
`

const TextTitle = styled(Text)`
  @media screen and (max-width: 600px) {
    font-weight: 700;
    font-size: 12px;
    line-height: 12px;
  }
`

const TextPlace = styled(Text)`
  @media screen and (max-width: 1440px) {
    font-size: 90px;
  }

  @media screen and (max-width: 1024px) {
    font-size: 60px;
  }

  @media screen and (max-width: 920px) {
    font-size: 50px;
  }
  @media screen and (max-width: 600px) {
    font-size: 48px;
    font-weight: 700;
    line-height: 60px;
  }
  @media screen and (max-width: 320px) {
    font-size: 40px;
  }
`

const ColImage = styled(Flex)`
  position: absolute;
  right: 158px;
  top: 60px;
  @media screen and (max-width: 1400px) {
    right: 100px;
    top: 24px;
  }
  @media screen and (max-width: 1024px) {
    right: 140px;
    top: 36px;
  }
  @media screen and (max-width: 920px) {
    right: 88px;
    top: 38px;
  }
  @media screen and (max-width: 768px) {
    top: 14px;
    right: 48px;
  }
  @media screen and (max-width: 600px) {
    top: 153px;
    right: 48px;
  }
  @media screen and (max-width: 400px) {
    top: 153px;
  }
  @media screen and (max-width: 320px) {
    top: 153px;
    right: 31px;
  }
`

const WrapImg = styled.div``

const ImgIcon = styled.img`
  width: 627px;
  @media screen and (max-width: 1336px) {
    width: 555px;
  }
  @media screen and (max-width: 1024px) {
    width: 450px;
  }
  @media screen and (max-width: 920px) {
    width: 330px;
  }
  @media screen and (max-width: 600px) {
    width: 230px;
  }
`
