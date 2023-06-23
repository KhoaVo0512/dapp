import { useTranslation } from "@pancakeswap/localization";
import { CloseIcon, Flex, Text, Button, AutoRenewIcon } from "@pancakeswap/uikit";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { useEffect, useState } from "react";
import { GetLevelVip, GetNonceCode, GetUser } from "state/account";
import styled from "styled-components";
import { GetTokenUser } from 'state/auth'
import ConnectWalletButton from "components/ConnectWalletButton";
import { useSign } from "./hook/useSign";
import { useUpdateAddress } from "./hook/useUpdateAddress";



export const ModalAlertAddress = () => {
  const { t } = useTranslation()
  const [isDifferentState, setIsDifferentState] = useState(sessionStorage.getItem('isDifferent'));
  const [isCloseState, setIsCloseState] = useState(sessionStorage.getItem('isClose'));

  const [isAddressState, setAddressState] = useState(sessionStorage.getItem('isAddress'));
  // const [isCloseAddress, setIsCloseAddress] = useState(sessionStorage.getItem('isCloseAddress'));

  const [ user ] = GetUser(true);
  const [level] = GetLevelVip()
  const token = localStorage.getItem('serviceToken');
  const [ tokenByUser ] = GetTokenUser()
  const { account } = useActiveWeb3React()
  const [ nonceCode ] = GetNonceCode(account)
  const [isCloseClick, setIsCloseClick] = useState(false);
  const { handleSign, signatureKey, pendingSign } = useSign(nonceCode)
  const { handleUpdateAddress, pendingUpdate, requestedUpdate } =useUpdateAddress(account, signatureKey)
  // const [isCloseClickAddress, setIsCloseClickAddress] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth) 
  const isAddress = user?.address ? !false : false

  useEffect(() => {
    if (signatureKey && !pendingSign) {
      const isSignIn = sessionStorage.getItem('signIn') === 'true'
      if (isSignIn) {
        handleUpdateAddress()
      }
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signatureKey, pendingSign])

  function handleCilck() {
    sessionStorage.setItem('isDifferent', "false");   
    sessionStorage.setItem('isAddress', "false"); 
    sessionStorage.setItem('isClose', "false");
    setIsCloseClick(true);
  }

  useEffect(() => {
    if(isCloseClick) {
      setIsDifferentState(sessionStorage.getItem('isDifferent'));
      setAddressState(sessionStorage.getItem('isAddress'));
      setIsCloseState(sessionStorage.getItem('isClose'));
    }
  }, [isCloseClick])

  useEffect(() => {
    sessionStorage.setItem('isClose', "true");
    setIsCloseState(sessionStorage.getItem('isClose'));
    if( account?.length > 0 && tokenByUser?.length && user?.address?.length ){
      if( account.toLocaleUpperCase() === user?.address.toLocaleUpperCase()){
        sessionStorage.setItem('isDifferent', "false");    
        sessionStorage.setItem('isClose', "false");
        setIsCloseClick(true);
      }
      if( account.toLocaleUpperCase() !== user?.address.toLocaleUpperCase() ) {
        sessionStorage.setItem('isDifferent', "true");
        sessionStorage.setItem('isClose', "true");
        setIsDifferentState(sessionStorage.getItem('isDifferent'));
        setIsCloseClick(false);
      } else {
        sessionStorage.setItem('isDifferent', "false");    
        sessionStorage.setItem('isClose', "false");
        setIsCloseClick(true);
      }
    } 
    if( account?.length > 0 && tokenByUser?.length && user ){ // co address ma tai khoan dang nhap khong co vi
      if(user?.address?.length === undefined){ 
        sessionStorage.setItem('isAddress', "true");
        sessionStorage.setItem('isCloseAddress', "true");
        setAddressState(sessionStorage.getItem('isAddress'));
        setIsCloseClick(false);
      }
    }
  }, [account, tokenByUser, user])

  function renderAddress(address){
    if ( address ) {
      if (windowSize > 1080) {
        return address
      } return `${address.substring(0, 6)}...${address.substring(address.length - 6)}`
    }
    return "No data"
  }

  return(
    <>
      { (isDifferentState === "true" && isCloseState === "true" && user?.address ) && (
        <ModalWrapper>
            <CustomContainer>
                  <ContainerButton onClick={handleCilck}>
                    <CloseIcon/>
                  </ContainerButton>
                <Text textAlign="center" color="failure" mt="1rem" bold fontSize="20px">{t("The current user wallet address is not the same as the connect wallet address. ")}</Text>
                <Text textAlign="center" color="failure" bold fontSize="20px">{t("Please connect the correct wallet")}</Text>
                <ContainerAddress>
                    <Text width="100%" textAlign="center">Your address connected</Text>
                    <TextCus mt="10px" width="100%" textAlign="center">{renderAddress(user?.address)}</TextCus>
                </ContainerAddress>
            </CustomContainer>
        </ModalWrapper>
      )}
      {(isAddressState === "true" && isCloseState === "true" ) && (
          <ModalWrapper>
            <CustomContainerNullWallet>
                  <ContainerButton onClick={handleCilck}>
                    <CloseIcon/>
                  </ContainerButton>
                <Text textAlign="center" color="failure" mt="1rem" bold fontSize="20px">{t("The current user wallet address does not exist. Please connect your wallet address.")}</Text>
              <WrapInput>
              {(!isAddress && tokenByUser) &&
                <>
                  {account ?
                    <CustomButton
                      mt="30px"
                      width="100%"
                      color="#fff"
                      bgcolor="#FF592C"
                      onClick={handleSign}
                      endIcon={pendingSign ? <AutoRenewIcon spin color="textSecondary" /> : null}
                      disabled={pendingSign}
                    >
                      Update Wallet Address
                    </CustomButton>
                    :
                    <ConnectWalletButton mt="23px" />}
                </>
              }
            </WrapInput>
            </CustomContainerNullWallet>
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

const TextCus = styled(Text)`
  word-wrap: break-word;
`
const CustomContainerNullWallet = styled(Flex)`
    width: 100%;
    max-width: 500px;
    height: 280px;
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
      height: 280px;
      padding:0px 10px 0px 10px;
    }
`
export const WrapInput = styled.div`
  position: relative;
  margin-bottom: 0rem;
`
export const CustomButton = styled(Button)`
  height: 48px;
  padding: 1px 0;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => props.color};
  width: 250px;
  font-size: 16px;
  margin-bottom: 0;
  box-shadow: none;
  border-radius: 90px;
  @media (max-width: 768px) {
    padding: 1px 20px;
    line-height: 16px;
  }
  @media (max-width: 600px) {
    padding: 0px 20px;
  }
`