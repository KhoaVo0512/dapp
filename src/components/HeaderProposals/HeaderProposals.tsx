import * as React from 'react';
import { Flex, Text } from "@pancakeswap/uikit";
import styled from 'styled-components';

export interface IAppProps {
    headerName?: string
}

export default function HeaderProposals ({headerName}: IAppProps) {
  return (
    <Header>
      <CsText textAlign='center'>{headerName}</CsText>
    </Header>
  );
}

const Header = styled(Flex)`
   width: 100%;
   align-items: center;
   justify-content: center;
   padding-top: 60px;
   padding-bottom: 32px;
`

const CsText = styled(Text)`
    font-weight: 700;
    font-size: 48px;
    line-height: 72px;
    color: #11142D;
    @media screen and (max-width: 425px) {
      font-size: 30px;
      line-height: 48px;
    }
`