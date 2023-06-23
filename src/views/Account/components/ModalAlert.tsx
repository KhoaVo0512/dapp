import React, { useState, useEffect } from "react";
import { Text, Flex, Button, Modal, CloseIcon } from "@pancakeswap/uikit";
import styled from "styled-components";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { useTranslation } from "@pancakeswap/localization";
import { GetUser } from 'state/account'


export const ModalAlert = ({ handleClickAlert }) => {
    const { t } = useTranslation()
    const isNonAddress = sessionStorage.getItem('isNonAddress')
    const [ user ] = GetUser(true)
    const token = localStorage.getItem('serviceToken');
    const { account } = useActiveWeb3React()

    const isClose = sessionStorage.getItem('isClose');
    sessionStorage.setItem('isNonAddress', "false")
    
    sessionStorage.setItem('isClose', "true")
    if( account && token && user ){
      if(!user?.address ){
        sessionStorage.setItem('isNonAddress', "true");
      }
    }

    return(
      <>
        { isNonAddress === 'true' && (
          <ModalWrapper>
              <CustomContainer>
                    <ContainerButton onClick={ handleClickAlert }>
                      <CloseIcon/>
                    </ContainerButton>
                  <Text textAlign="center" mt="1rem" color="failure" bold fontSize="20px">{t("The current user wallet address does not exist. Please connect your wallet address.")}</Text>
              </CustomContainer>
          </ModalWrapper>
        )}
      </>
    )
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndices.modal - 1};
  background: rgba(220, 224, 225, 0.601);
`;
const CustomContainer = styled(Flex)`
    width: 100%;
    max-width: 500px;
    height: 300px;
    border-radius: 16px;
    background:#fff;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    z-index:50;
    position:relative;
    padding:15px;
    @media screen and (max-width: 600px) {
      width:350px;
      height: 400px;
      padding:0px 10px 0px 10px;
    }
`
const ContainerButton = styled(Flex)`
  position: absolute;
  top: 15px;
  right: 15px;
  background: black;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    fill: #fff;
  }
`
const ContainerAddress = styled(Flex)`
    width:100%;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    border:2px solid rgba(101, 100, 101, 0.184);
    border-radius:12px;
    margin-top:10px;
    padding:15px 0px 15px 0px;
`