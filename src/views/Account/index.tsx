import { useTranslation } from '@pancakeswap/localization'
import PageHeader from 'components/Layout/PageHeader'

import { AutoRenewIcon, Button } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import ErrorMessages from 'components/ErrorMessages/ErrorMessage'
import PageFullWidth from 'components/Layout/PageFullWidth'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useEffect, useState } from 'react'
import { GetLevelVip, GetNonceCode, GetUser } from 'state/account'
import styled from 'styled-components'

import Header from 'components/HeaderGlobal/Header'
import { DecryptsUserInfo } from 'config/api/decrypts'
import { useForm } from 'react-hook-form'
import { GetTokenUser } from 'state/auth'
import { useUpdateAddress } from './hook/useUpdateAddress'

import {
  Col,
  ContainerIcon, CustomCol2,
  CustomColBorder,
  CustomContainer,
  CustomContainer1,
  CustomContainer3,
  CustomFlexText,
  CustomIconCopy,
  CustomInput,
  CustomLabel,
  Divider, ImgLogo,
  Relative,
  Row,
  TextLevel,
  TextYou,
  Tooltip,
  WrapInput
} from './styles'
// eslint-disable-next-line import/extensions
import { useSign } from "./hook/useSign"

interface Props {
  name?: any
  address?: any
  email?: any
  username?: any
  mobile?: any
  id?: any
}

const initValue: Props = {
  username: '',
  address: '',
  mobile: '',
}

const Account = () => {
  const [level] = GetLevelVip()
  const { account } = useActiveWeb3React()
  const [ nonceCode ] = GetNonceCode(account)
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)
  const [ tokenByUser ] = GetTokenUser()
  const data: any = DecryptsUserInfo() || ''
  let { name, address, email, username, mobile } = data

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    setError,
    watch,
  } = useForm({
    defaultValues: initValue,
  })

  if (!name) {
    name = 'No Data'
  }
  if (!address) {
    address = 'No Data'
  }
  if (!email) {
    email = 'No Data'
  }
  if (!username) {
    username = 'No Data'
  }
  if (!mobile) {
    mobile = 'No Data'
  }
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  useEffect(() => {
      const handleResize = () => {
          setWindowSize(window.innerWidth)
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
  }, [])
  function renderAddress(userAddress){
    // eslint-disable-next-line no-console
    if ( userAddress ) {
      if (windowSize>1080){
        return userAddress
      }
      return `${userAddress.substring(0, 4)}...${userAddress.substring(userAddress.length - 4)}`
    }
    return "No Data"
  }
  // update wallet address
  const { handleSign, signatureKey, pendingSign } = useSign(nonceCode)
  const { handleUpdateAddress, pendingUpdate, requestedUpdate } =useUpdateAddress(account, signatureKey)
  const [ user ] = GetUser(requestedUpdate)

  useEffect(() => {
    if ( signatureKey && !pendingSign ) {
      const isSignIn = sessionStorage.getItem('signIn') === 'true'
      if (isSignIn) {
        handleUpdateAddress()
      }
    }
  }, [signatureKey, pendingSign]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=>{
    renderAddress(user?.address)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user?.address])

  const isAddress = user?.address ? !false : false
  const textcp =  user?.address

  const handleCopy = () => {
    if (navigator.clipboard && navigator.permissions) {
        navigator.clipboard.writeText(textcp).then(() => displayTooltip())
      } else if (document.queryCommandSupported('copy')) {
        const ele = document.createElement('textarea')
        ele.value = textcp
        document.body.appendChild(ele)
        ele.select()
        document.execCommand('copy')
        document.body.removeChild(ele)
        displayTooltip()
      }
  }
  function displayTooltip() {
        setIsTooltipDisplayed(true)
        setTimeout(() => {
          setIsTooltipDisplayed(false)
        }, 2000)
  }
  return (
    <>
      <PageFullWidth>
        <PageHeader
          nameTitle="RUN TOGETHER"
          namePlace="My account"
          imgIcon="/images/runMyAccount/imgBanner.png"
          bgColor='#6C5DD3'
        />
        <CustomContainer1>
          <Row>
            <CustomCol2>
              <ImgLogo src="/images/account/Logo.png" />
              <CustomFlexText>
                {tokenByUser &&
                  <>
                    <TextYou>You are in</TextYou>
                    <TextLevel>{level}</TextLevel>
                  </>}
              </CustomFlexText>
            </CustomCol2>
          </Row>
        </CustomContainer1>
        <CustomContainer>
          <Row>
            <CustomColBorder>
              <Divider />
            </CustomColBorder>
          </Row>
        </CustomContainer>
        <CustomContainer3>

          <Row>
            <Col>
              <WrapInput>
                <CustomLabel>Your Full Name</CustomLabel>
                <CustomInput type="text" value={user?.name ? user?.name : "No Data"} disabled />
              </WrapInput>

              <WrapInput>
                <CustomLabel>Email</CustomLabel>
                <CustomInput type="text" value={user?.email ? user?.email : "No Data"} disabled />
              </WrapInput>
              <WrapInput>
                <CustomLabel>Phone</CustomLabel>
                <CustomInput type="text" value={user?.mobile ? user?.mobile : "No Data"} disabled />
              </WrapInput>
            </Col>
            <Col>
              <WrapInput>
                <CustomLabel>User Name</CustomLabel>
                <CustomInput type="text" value={user?.username ? user?.username : "No Data"} disabled />
              </WrapInput>

              <WrapInput>
                <CustomLabel>Wallet Address</CustomLabel>
                <Relative>
                  <ContainerIcon>
                    {user?.address &&
                      <CustomIconCopy onClick={handleCopy} />}
                    <Tooltip isTooltipDisplayed={isTooltipDisplayed}>Copied</Tooltip>
                  </ContainerIcon>

                <CustomInput
                  value={renderAddress(user?.address)}
                  readOnly />
              </Relative>
              <ErrorMessages errors={errors} name="address" />
            </WrapInput>
            <WrapInput>
              {(!isAddress && tokenByUser) &&
                <>
                  {account ?
                    <CustomButton
                      mt="23px"
                      width="100%"
                      bgcolor="#1B1D21"
                      color="#fff"
                      onClick={handleSign}
                      endIcon={pendingSign ? <AutoRenewIcon spin color="textSecondary" /> : null}
                      disabled={pendingSign}
                    >
                      Update Wallet Address
                    </CustomButton>
                    :
                    <ConnectWalletButton mt="23px" />}
                </>}
            </WrapInput>
          </Col>
        </Row>
      </CustomContainer3>
    </PageFullWidth>
    </>
  )
}

export default Account

const CustomButton = styled(Button)`
    width:250px;
    background: #FF592C;
    border-radius: 90px;
    box-shadow:none;
    @media screen and (max-width: 600px){
      width: 100%;
    }
`