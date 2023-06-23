import React, { CSSProperties, useState } from 'react'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
// eslint-disable-next-line import/no-duplicates
import { useTranslation } from '@pancakeswap/localization'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Barcode, EyeCloseIcon, EyeOpenIcon, Flex, LockIcon, Mail, Modal, Text, useModal, useToast } from '@pancakeswap/uikit'
import OtpTimer from 'otp-timer'
import { useHistory } from 'react-router-dom'
// eslint-disable-next-line import/no-unresolved
import { useDispatch } from 'react-redux'
// eslint-disable-next-line import/no-duplicates
import ErrorMessages from 'components/ErrorMessages/ErrorMessage'
// eslint-disable-next-line import/no-unresolved
import { unwrapResult } from '@reduxjs/toolkit'
import { rules } from 'config/constants/auth/rules'
import RingLoader from "react-spinners/RingLoader"
import { AppDispatch } from 'state'
import useTheme from 'hooks/useTheme'
import { register, sendmail } from '../../../state/auth/auth.createslice'

// eslint-disable-next-line import/no-cycle
import LoginModal from './LoginModal'
import {
  ButtonSubmit,
  ContainerIcon,
  ContainerInput,
  CsFlex,
  CsInput,
  FormSubmit,
  TransferModal,
  WrapIcon,
  WrapInput
} from './styles'



interface RouteParams {
  onDismiss?: () => void
  dataReferralCode?: string
}
// let dataReferralCode
// if (typeof window !== 'undefined') {
//     const queryParams = new URLSearchParams(window.location.search);
//      dataReferralCode = queryParams.get("referral_code")
//   } else {
//     console.log('You are on the server')
//   }

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

// TODO: Temporary. Once uikit is merged with this style change, this can be removed.
interface RegisterProp {
  email: string
  password: string
  confirmpassword: string
  // eslint-disable-next-line camelcase
  referral_code?: string
  codeotp: string
}
const initValue: RegisterProp = {
  email: '',
  password: '',
  confirmpassword: '', 
  referral_code: '',
  codeotp: '',
}


const RegisterModal: React.FC<RouteParams> = ({ onDismiss, dataReferralCode }) => {

  const dispatch = useDispatch<AppDispatch>()
  const { toastError, toastSuccess } = useToast()
  const [checkError, SetCheckError] = useState(false)
  const [getMessageError, SetMessageError] = useState('')
  const [ errorSendMail, setErrorSendMail ] = useState("")
  const history = useHistory()
  const router = useRouter();
  // form validation rules 
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').min(4, 'Emails are between 4 and 160 characters in length').max(160, 'Emails are between 4 and 160 characters in length'),
    password: Yup.string().required('Password is required').min(8, 'Password are between 8 and 50 characters in length').max(50, 'Password are between 8 and 50 characters in length'),
    confirmpassword:Yup.string().required('Confirm password is required').min(8, 'Password are between 8 and 50 characters in length').max(50, 'Password are between 8 and 50 characters in length')
    .oneOf([Yup.ref('password'), null], 'Password is not match'),
    codeotp: Yup.string().required('Registration code is required')
    .min(6, 'Registration code must be 6 characters').max(6, 'Registration code must be 6 characters'),
    
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { handleSubmit, formState, control, getValues } = useForm(formOptions);
  const { errors } = formState;  

  const [loading, setLoading] = useState(false);
  const [changePassword, setChangePassword] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState(true)
  const changeIcon = changePassword !== true
  const ConfirmchangeIcon = confirmPassword !== true
  const [openModalLogin] = useModal(<LoginModal />)
  const { t } = useTranslation()
  const [timeto, Settimeto] = useState(0)
  const { theme } = useTheme()

  const handleRegister = async (data) => {
    
    setLoading(true)
    const body = {
      email: data.email,
      password: data.password,
      referral_code: dataReferralCode || data.referral_code,
      code: data.codeotp,
    }
    try {
      const responses: any = await dispatch(register(body))
      unwrapResult(responses)
      if (responses.payload.data==="RequestLimit"){
        toastError("You have exceeded the allowed access limit. Please try again");
        return;
      }
      toastSuccess(t('Register Success'), t(''))

      if(dataReferralCode) {
        setTimeout(() => {
          setLoading(false)
          router.push("/")
          openModalLogin()
        }, 500)
      } else {
        setTimeout(() => {
          setLoading(false)
          openModalLogin()
        }, 500)
      }
    
     
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
  const handleSendCode = async () => {
    const body = {
      email: getValues('email') || '',
    }
    // if (getValues('email') && getValues('email')!==""){
    try {
      // openModalVerify()
      const responses: any = await dispatch(sendmail(body))
      if (responses.payload.data==="RequestLimit"){
        toastError("You have exceeded the allowed access limit. Please try again");
        return;
      }
      if (responses.payload.status === 200) {
        Settimeto(1)
        toastSuccess(t('Please check your email'), t(''));
        setErrorSendMail("")
        SetMessageError("")
      } 
      // else {
      //   // toastError(t('You have left the email blank or the email already exists'), t(''))
      //   setErrorSendMail("You have left the email blank or the email already exists")
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



  return (
    <CustomModal title="" onDismiss={onDismiss} maxWidth="550px" dataReferralCode={dataReferralCode}>
      <Flex flexDirection="column">
        <Flex pt="5px" flexDirection="column">
          <CsFlex width="100%" justifyContent="center" alignItems="center">
            <Text bold fontSize="24px">
              Register
            </Text>
          </CsFlex>

          { !dataReferralCode ? 
             <CsFlex width="100%" justifyContent="center" alignItems="center">
               <Text color="textSubtle">Have an account?</Text> 
               <TransferModal onClick={openModalLogin}>Log in now</TransferModal>
             </CsFlex>
             : 
             ""
          }
          <FormSubmit onSubmit={handleSubmit(handleRegister)}>
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
                        placeholder="Your password"
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

                <WrapInput>
                  <ContainerIcon>
                    <LockIcon />
                  </ContainerIcon>
                  <Controller
                    control={control}
                    name="confirmpassword"
                    // rules={{
                    //   ...rules.confirmpassword,
                    //   validate: {
                    //     samepassword: (v) => v === getValues('password') || 'Password is not match',
                    //   },
                    // }}
                    render={({ field }) => (
                      <CsInput
                        type={confirmPassword ? 'password' : 'text'}
                        name="confirmpassword"
                        value={getValues('confirmpassword')}
                        placeholder="Confirm password"
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
                    <Barcode />
                  </ContainerIcon>
                  <Controller
                    control={control}
                    name="referral_code"
                    render={({ field }) => (
                      dataReferralCode ?
                          <CsInput
                          disabled
                          type="text"
                          name="referral_code"
                          value={dataReferralCode || getValues('referral_code')}
                          placeholder="Referral code"
                          onChange={field.onChange}
                          />
                      :
                        <CsInput
                          type="text"
                          name="referral_code"
                          value={dataReferralCode || getValues('referral_code')}
                          placeholder="Referral code"
                          onChange={field.onChange}
                        />
                    )}
                  />
                </WrapInput>
                <ErrorMessages errors={errors} name="referral_code" />

                <WrapInput>
                  <ContainerIcon>
                    {/* <Barcode /> */}
                    <img src="/images/KeyIcon.svg" alt="" />
                  </ContainerIcon>
                  <Controller
                    control={control}
                    rules={rules.codeotp}
                    name="codeotp"
                    render={({ field }) => (
                      <CsInput
                        type="text"
                        name="codeotp"
                        value={getValues('codeotp')}
                        placeholder="Registration code"
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
                    value="Submit"
                    disabled={loading}
                  >
                    {!loading ? 
                      " Register"
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

export default RegisterModal;

const CustomOtpTimer = styled(OtpTimer)`
  font-weight: 900 !important;
`

const CustomModal = styled(Modal)<{dataReferralCode?:string}>`
  padding: 20px 0px !important;
  width: 475px;
  min-width: 350px;
  @media only screen and (max-width: 768px) {
    width: 400px;
    height: auto;
    padding: 10px 0px;
  }
  @media only screen and (max-width: 320px) {
    min-width: 320px;
    width: 320px;
  }
  & > div {
    overflow-y: auto;
    padding: 0px 24px;
    max-height: 100%;

    &:first-child {
      display: ${({dataReferralCode}) => dataReferralCode ? 'none': 'block'};
    }

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
  @media screen and (max-width: 320px) {
    display: none;
  }
`
const TextVerify = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  text-align: right;
  color: ${({ theme }) => theme.colors.primaryBright};
  cursor: pointer;
`
const CustomMessageError = styled.div`
  color: ${({ theme }) => theme.colors.primaryBright};
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1;
  margin-top: 5px;
  margin-left: 35px;
`
const WrapVerifyMobile = styled.div`
  display: none;

  @media screen and (max-width: 320px) {
    display: block;
    margin: 10px;
  }
`

const WrapTextVerifyMobile = styled.div``
