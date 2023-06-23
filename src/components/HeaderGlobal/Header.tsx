import React from 'react'
import styled from 'styled-components'
import { Flex, Text,BgBanner, BgBannerMobile } from '@pancakeswap/uikit'

const Header = ({ bgColor, nameTitle, namePlace, imgIcon, ...props }) => {
  return (
    <Container>
      <Bg>
        <CsBgBanner color={bgColor}/>
        <CsBgBannerMobile color={bgColor}/>
      </Bg>
      <Row>
        <Col height="100%">
          <FlexTitle width="100%" height="100%" alignItems="start" flexDirection="column">
            <TextTitle textTransform="uppercase" color="#fff" fontSize="16px" bold>
              {nameTitle}
            </TextTitle>
            <TextPlace fontSize="96px" bold color="#fff">
              {namePlace}
            </TextPlace>
          </FlexTitle>
        </Col>
        <ColImage>
          <WrapImg>
            <ImgIcon src={imgIcon} />
          </WrapImg>
        </ColImage>
      </Row>
    </Container>
  )
}

export default Header

const Container = styled.div`
  width: 100%;
  height: 450px;
  /* background-repeat: no-repeat;
  background-size: 100% 100%; */
  @media screen and (max-width: 1024px) {
    height: 400px;
  }

  @media screen and (min-width: 601px) and (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 400px;
  }
`

const Bg = styled.div`
  position: absolute;
  width: 100%;
  top: -280px;
  z-index: -1;
  height:100%;

  @media screen and (min-width: 2000px) {
    top: -380px;
  }

  @media screen and (max-width: 1440px) {
    top: -270px;
  }

  @media screen and (max-width: 1336px) {
    top: -315px;
  }

  @media screen and (max-width: 1024px) {
    top: -280px;
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
  padding-top: 115px;
  @media screen and (min-width: 2000px) {
    padding-left: 200px;
  }
  @media screen and (max-width: 1440px) {
    padding-top: 100px;
  }
  @media screen and (max-width: 1336px) {
    padding-top: 70px;
  }
  @media screen and (max-width: 1024px) {
    padding-top: 100px;
  }
  @media screen and (max-width: 920px) {
    padding-top: 80px;
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 600px) {
    padding-top: 55px;
    gap: 12px;
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
  @media screen and (min-width: 2560px) {
    right: 500px;
    top: 100px;
  }
  @media screen and (min-width: 2000px) {
    right: 500px;
    top: 65px;
  }
  @media screen and (max-width: 1400px) {
    right: 100px;
    top: 24px;
  }
  @media screen and (max-width: 1024px) {
    right: 140px;
    top: 70px;
  }
  @media screen and (max-width: 920px) {
    right: 88px;
    top: 38px;
  }
  @media screen and (max-width: 768px) {
    top: 60px;
    right: 48px;
  }
  @media screen and (max-width: 600px) {
    top: 90px;
    right: 48px;
  }
  @media screen and (max-width: 500px) {
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
