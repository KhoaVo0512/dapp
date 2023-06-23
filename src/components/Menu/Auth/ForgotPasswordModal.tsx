import { useTranslation } from '@pancakeswap/localization'
import { EyeCloseIcon, EyeOpenIcon, Flex, InjectedModalProps, LockIcon, Mail, Modal, Text, useModal, useToast } from '@pancakeswap/uikit'
import { unwrapResult } from '@reduxjs/toolkit'
import ErrorMessages from 'components/ErrorMessages/ErrorMessage'
import { rules } from 'config/constants/auth/rules'
import OtpTimer from 'otp-timer'
import React, { CSSProperties, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import useTheme from 'hooks/useTheme'
import { sendmailForgot, verifycodeforgot } from 'state/auth/auth.createslice'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styled from 'styled-components'
// eslint-disable-next-line import/no-cycle
import RingLoader from "react-spinners/RingLoader"
// eslint-disable-next-line import/no-cycle
import LoginModal from './LoginModal'
// eslint-disable-next-line import/no-cycle
import {
  ButtonSubmit,
  ContainerIcon,
  ContainerInput, CsInput,
  FormSubmit, WrapIcon,
  WrapInput
} from './styles'

// TODO: Temporary. Once uikit is merged with this style change, this can be removed.
interface RegisterProp {
  email: string
  password: string
  confirmpassword: string
  codeotp: string
}
const initValue: RegisterProp = {
  email: '',
  password: '',
  confirmpassword: '',
  codeotp: ''
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const ForgotModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [timeto, Settimeto] = useState(0)
  const [loading, setLoading] = useState(false);
  const { toastError, toastSuccess } = useToast()
  const [getMessageError, SetMessageError] = useState('')
  const [errorSendMail, setErrorSendMail] = useState('')
  const [changePassword, setChangePassword] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState(true)
  const [checkError, SetCheckError] = useState(false)
  const changeIcon = changePassword !== true
  const ConfirmchangeIcon = confirmPassword !== true
  const [openModalLogin] = useModal(<LoginModal />)
  
   // form validation rules 
   const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').min(4, 'Emails are between 4 and 160 characters in length').max(160, 'Emails are between 4 and 160 characters in length'),
    password: Yup.string().required('Password is required').min(8, 'Password are between 8 and 50 characters in length').max(50, 'Password are between 8 and 50 characters in length'),
    confirmpassword:Yup.string().required('Confirm password is required').min(8, 'Password are between 8 and 50 characters in length').max(50, 'Password are between 8 and 50 characters in length')
    .oneOf([Yup.ref('password'), null], 'Password is not match'),
    codeotp: Yup.string().required('Registration code is required')
    .min(6, 'Registration code must be 6 characters').max(6, 'Registration code must be 6 characters')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { handleSubmit, formState, control, getValues } = useForm(formOptions);
  const { errors } = formState;  


  const handleSendCode = async () => {
    const body = {
      email: getValues('email') || '',
    }
    try {
      const responses: any = await dispatch(sendmailForgot(body))
      if (responses.payload.data==="RequestLimit"){
        toastError("You have exceeded the allowed access limit. Please try again");
        return;
      }
      if (responses.payload.status === 200) {
        Settimeto(1)
        toastSuccess(t('Please check your email'), t(''))
        setErrorSendMail('')
        SetMessageError("")
        localStorage.setItem('email_Verify', JSON.stringify(getValues('email')));
        localStorage.setItem('new_password_run', JSON.stringify(getValues('password')));
      } 
      // else {
      //   // toastError(t('You have left the email blank or the email already exists'), t(''))
      //   setErrorSendMail('You have left the email blank or the email does not exist')
      // }

      unwrapResult(responses)
    } catch (error) {
      Settimeto(0)
      // eslint-disable-next-line camelcase
      const { error_code, error_msg }: any = error
      // eslint-disable-next-line camelcase
      if (error_code && error_msg) {
        // eslint-disable-next-line camelcase
       if(error_msg.en) {
          setErrorSendMail(error_msg.en)
          SetMessageError("")
        }
        else {
          setErrorSendMail(error_msg)
          SetMessageError("")
        }
      } else {
        setErrorSendMail(error_code)
        SetMessageError("")
      }
    }
  }

  const handleForgotPassword = async (data) => {
    
    setLoading(true)
    const body = {
      email: data.email,
      password:data.password,
      code: data.codeotp
    }
    try {
      const responses: any = await dispatch(verifycodeforgot(body))
      unwrapResult(responses)
      if (responses.payload.data==="RequestLimit"){
        toastError("You have exceeded the allowed access limit. Please try again");
      }
      toastSuccess(t('Reset Password Success'), t(''))

      setTimeout(() => {
        setLoading(false)
        openModalLogin()
      }, 500)
    } catch (error) {
      // eslint-disable-next-line camelcase
      const { error_code, error_msg }: any = error
      SetCheckError(true)
      // eslint-disable-next-line camelcase
      if (error_code && error_msg) {
        // eslint-disable-next-line no-unused-expressions
        error_msg.en ? SetMessageError(error_msg.en) : SetMessageError(error_msg) 
        setErrorSendMail("")
      } else {
        SetMessageError(error_code)
        setErrorSendMail("")
      }
      setLoading(false)
    }
  }

  return (
    <CustomModal title={t('Reset Password')} onDismiss={onDismiss} minWidth="350px" padding="10px 0px">
      <Flex flexDirection="column" marginTop='20px'>
        <Flex paddingTop="0px" flexDirection="column">
          
          <FormSubmit onSubmit={handleSubmit(handleForgotPassword)}>
            <Flex flexDirection="column">
              <ContainerInput>
                <WrapInput>
                  <ContainerIcon>
                    <Mail />
                  </ContainerIcon>
                  <Controller
                    control={control}
                    name="email"
                    rules={rules.email}
                    render={({ field }) => (
                      <CsInput
                        name="email"
                        value={getValues('email')}
                        type="email"
                        placeholder="Your email address"
                        onChange={field.onChange}
                      />
                    )}
                  />
                 </WrapInput>
                <ErrorMessages errors={errors} name="email" />

                {/* password */}
                <WrapInput>
                  <ContainerIcon>
                    <LockIcon />
                  </ContainerIcon>
                  <Controller
                    control={control}
                    name="password"
                    rules={rules.password}
                    render={({ field }) => (
                         <CsInput
                        type={changePassword ? 'password' : 'text'}
                        name="password"
                        value={getValues('password')}
                        placeholder="Your new password"
                        onChange={field.onChange}
                      />  
                    )}
                  />
                  <WrapIcon
                    className="icon"
                    onClick={() => {
                      setChangePassword(changeIcon)
                    }}
                  >
                    {changeIcon ? <EyeOpenIcon /> : <EyeCloseIcon />}
                  </WrapIcon>
                </WrapInput>
                <ErrorMessages errors={errors} name="password" />


                {/* confirm password */}
                <WrapInput>
                  <ContainerIcon>
                    <LockIcon />
                  </ContainerIcon>
                  <Controller
                    control={control}
                    name="confirmpassword"
                    rules={{
                      ...rules.confirmpassword,
                      validate: {
                        samepassword: (v) => v === getValues('password') || 'Password is not match',
                      },
                    }}
                    render={({ field }) => (
                      <CsInput
                        type={confirmPassword ? 'password' : 'text'}
                        name="confirmpassword"
                        value={getValues('confirmpassword')}
                        placeholder="Confirm new password"
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <WrapIcon
                    className="icon"
                    onClick={() => {
                      setConfirmPassword(ConfirmchangeIcon)
                    }}
                  >
                    {ConfirmchangeIcon ? <EyeOpenIcon /> : <EyeCloseIcon />}
                  </WrapIcon>
                </WrapInput>
                <ErrorMessages errors={errors} name="confirmpassword" />
                <WrapInput>
                  <ContainerIcon>
                    <img src="/images/KeyIcon.svg" alt="" />
                  </ContainerIcon>
                  <Controller
                    control={control}
                    rules={rules.codeotpForgot}
                    name="codeotp"
                    render={({ field }) => (
                      <CsInput
                        type="text"
                        name="codeotp"
                        value={getValues('codeotp')}
                        placeholder="Forgot password code"
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <WrapTextVerify>
                    {timeto === 0 ? (
                      <TextVerify onClick={() => handleSendCode()}>Get Verify Code</TextVerify>
                    ) : (
                      <CustomOtpTimer
                        minutes={0}
                        seconds={60}
                        text="Resend after "
                        ButtonText="Get Verify Code"
                        resend={handleSendCode}
                        textColor={theme.colors.primaryBright}
                        buttonColor={theme.colors.primaryBright}
                        background="transparent"
                      />
                    )}
                  </WrapTextVerify>
                </WrapInput>

                <WrapVerifyMobile>
                  <WrapTextVerifyMobile>
                    {timeto === 0 ? (
                      <TextVerify onClick={() => handleSendCode()}>Get Verify Code</TextVerify>
                    ) : (
                      <CustomOtpTimer
                        minutes={0}
                        seconds={60}
                        text="Code resend is "
                        ButtonText="Get Verify Code"
                        resend={handleSendCode}
                        textColor={theme.colors.primaryBright}
                        buttonColor={theme.colors.primaryBright}
                        background="transparent"
                      />
                    )}
                  </WrapTextVerifyMobile>
                </WrapVerifyMobile>
                <ErrorMessages errors={errors} name="codeotp" />
              </ContainerInput>
              { checkError === true && 
                <CustomMessageError>{getMessageError}</CustomMessageError>
              }
              { errorSendMail &&
                <Text color="primaryBright">{errorSendMail}</Text>
              }
              <Flex width="100%" mt="1rem">
                  <ButtonSubmit 
                    width="100%"
                    type="submit"
                    disabled={loading}
                   >
                    {!loading ? 
                      "Reset Password"
                      :
                      <RingLoader color="white" loading={loading} cssOverride={override} size={30} />
                    }
                  </ButtonSubmit>
              </Flex>
            </Flex>
          </FormSubmit>
        </Flex>
      </Flex>
    </CustomModal>

  )
}

export default ForgotModal

const CustomModal = styled(Modal)`
  padding: 0px !important;
  width: 475px;
  min-width: 350px;
  padding: 40px 0px !important;
  @media only screen and (max-width: 600px) {
    width: 360px;
  }
  @media only screen and (max-width: 320px) {
    min-width: 320px;
    width: 320px;
  }

  & > div {
    padding: 0px 24px;
    max-height: 100%;
  }
`
const WrapTextVerify = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  right: 0px;
  font-weight: 900 !important;
  cursor: pointer;
  height: 100%;
  top: 50%;
  transform: translateY(-50%);
  align-items: center;
  @media (max-width: 600px) {
    right: 5px;
  }
  > div > button {
    font-weight: 600;
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
`
const TextVerify = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  text-align: right;
  color: #ff592c;
  cursor: pointer;
`

const CustomOtpTimer = styled(OtpTimer)`
  font-weight: 900 !important;
`

const CustomMessageError = styled.div`
  color: #ff592c;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.1;
  margin-top: 5px;
`

const WrapVerifyMobile = styled.div`
  display: none;

  @media screen and (max-width: 500px) {
    display: block;
    margin: 10px;
  }
`
const WrapTextVerifyMobile = styled.div``
