import { useTranslation } from '@pancakeswap/localization'
import { Flex, Text } from '@pancakeswap/uikit'
import React from 'react'
import styled from 'styled-components'

const Header = () => {
  const { t } = useTranslation()
  return (
    <CustomFlex width="100%" flexDirection="column">
        <SmallTitle>{t("run together")}</SmallTitle>
        <Heading mt="10px">{t("Mystery Box")}</Heading>
    </CustomFlex>
  )
}

export default Header

const CustomFlex = styled(Flex)`
  padding-left:45px;
  @media screen and (min-width: 768px) and (max-width: 1080px) {
       padding-left:3rem;
  }
  @media screen and (max-width: 600px) {
       padding-left:15px;
  }
`
const SmallTitle = styled(Text)`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`
const Heading = styled(Text)`
  letter-spacing: -0.02em;
  font-weight: 700;
  font-size: 76px;
  @media screen and (max-width: 600px) {
    font-size: 56px;
  }
`