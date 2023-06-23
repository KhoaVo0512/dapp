/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { Flex, Text,Button, EditIcon1, StarIcon } from "@pancakeswap/uikit";
import styled from 'styled-components';
import Link from "next/link"
import { useTranslation } from "@pancakeswap/localization";

export interface CardBannerProps {
    headerName?: string
}

export default function CardBanner ({headerName}: CardBannerProps) {
  const { t } = useTranslation()
  return (
    <Container>
        <LeftContent>
            <Wrap>
                <Content>
                    <Flex>
                        <TextIcon>
                            <CsStarIcon/>
                        </TextIcon>
                        <TextContent>{t("Users who own 1,000,000 RUN tokens have the right to propose to open the store owner.")}</TextContent>
                    </Flex>
                    <Flex>
                        <TextIcon>
                            <CsStarIcon fill='#FFFFFF'/>
                        </TextIcon>
                        <TextContent>{t("RunTogether will open a shoe store when the vote is closed over 50%, users will receive 30% of the store's sales profit and annual stake interest 20% of Pools Store. The maximum amount RUN token can be stake in Pool is 2.5M.")}</TextContent>
                    </Flex>
                </Content>
            </Wrap>
            <BtnContainer>  
                <Link href="/makeaproposals" passHref legacyBehavior>
                  <CsButton><EditIcon1 /> Make a proposal</CsButton>
                </Link>  
            </BtnContainer>
        </LeftContent>
        <RightContent>
            <Wrap>
                <Img src='/images/ImgProposals.png'/>
            </Wrap>
        </RightContent>
    </Container>
  );
}

const Container = styled.div`
    background: radial-gradient(103.03% 103.03% at 0% 0%, #6FE8BD 0%, #019CA4 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    border-radius: 16px;
    margin: 32px 0px;
    padding: 20px 60px;
    display: grid;
    grid-template-columns: 70% 30%;
    @media screen  and (max-width: 768px) {
        padding: 20px 10px;        
    }

    @media screen  and (max-width: 600px) {
        display: flex;
        flex-direction: column-reverse;
    }
`

const LeftContent = styled(Flex)`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`

const RightContent = styled(Flex)`
  @media screen and (max-width: 600px) {
    justify-content: center;
    margin-bottom: 20px;
  }
`

const Wrap = styled(Flex)`
  justify-content: center;
`

const Content = styled(Flex)`
   flex-direction: column;
   gap: 10px;
`

const BtnContainer = styled(Flex)`
  margin-top: 30px;
  @media screen and (max-width: 600px) {
    justify-content: center;
  }
`

const Img = styled.img``

const TextIcon = styled(Text)`
  margin-right: 10px;
  padding-top: 5px;
`

const TextContent = styled(Text)`
    color: ${({ theme }) => theme.colors.backgroundAlt};
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
`

const CsButton = styled(Button)`
    background: ${({ theme }) => theme.colors.warning};
    gap: 10px;
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
    color: #FCFCFD;
    border-radius: 90px;
    height: 48px;
    padding: 0 24px;
    display: flex;
    align-items: center;

    &:hover {
        opacity: 0.7;
        transition: all 0.3s ease;
    }
`

const CsStarIcon = styled(StarIcon)`
  svg {
    fill: ${({ theme }) => theme.colors.backgroundAlt};
  }
  path {
    stroke: ${({ theme }) => theme.colors.backgroundAlt};
  }
`