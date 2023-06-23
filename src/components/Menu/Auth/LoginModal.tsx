
import { useTranslation } from '@pancakeswap/localization';
import { EyeCloseIcon, EyeOpenIcon, Flex, InjectedModalProps, LockIcon, Mail, Modal, Text, useToast, useModal } from '@pancakeswap/uikit';
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ErrorMessages from 'components/ErrorMessages/ErrorMessage';
import { rules } from 'config/constants/auth/rules';
import axios from 'axios';
import { fecthTokenByUser } from 'state/auth/actions';
import { login } from 'state/auth/auth.createslice';
import { unwrapResult } from '@reduxjs/toolkit';
import { Encrypts } from 'config/api/encrypt';
import { AppDispatch } from 'state'
import React, { CSSProperties, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { DecryptsV2 } from 'config/api/decrypts';
import RingLoader from "react-spinners/RingLoader";
import styled from 'styled-components';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  ButtonSubmit,
  ContainerIcon,
  ContainerInput,
  CsFlex,
  TransferModal,
  CsInput,
  FormSubmit, WrapIcon,
  WrapInput
} from './styles';

// eslint-disable-next-line import/no-cycle
import ForgotModal from './ForgotPasswordModal';
// eslint-disable-next-line import/no-cycle, import/no-named-as-default
import RegisterModal from './RegisterModal';


// TODO: Temporary. Once uikit is merged with this style change, this can be removed.
interface RegisterProp {
  email: string,
  password: string,  
}


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};



const LoginModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const [changePassword, setChangePassword] = useState(true)
  const changeIcon = changePassword !== true
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation()
  const [checkError,SetCheckError] = useState(false);
  const { toastSuccess,toastError } = useToast()
  const [openModalForgot] = useModal(<ForgotModal />)
  const [openModalRegister] = useModal(<RegisterModal />)
  const { account } = useActiveWeb3React()
  const [getMessageError,SetMessageError] = useState('');
  const dispatch = useDispatch<AppDispatch>()
  // form validation rules 
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').min(4, 'Emails are between 4 and 160 characters in length').max(160, 'Emails are between 4 and 160 characters in length'),
    password: Yup.string().required('Password is required').min(8, 'Password are between 8 and 50 characters in length').max(50, 'Password are between 8 and 50 characters in length'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, control, getValues } = useForm(formOptions);
  const { errors } = formState;  
  // function login
  const handleLogin = async (data) => {   
    setLoading(true) 
    SetCheckError(false);
 
    const body = {
        email:data.email,
        password: data.password,       
    }   
    try{
      const responses:any = await dispatch(login(body))   
      unwrapResult(responses) ;    
      if (responses.payload.data==="RequestLimit"){
        toastError("You have exceeded the allowed access limit. Please try again");
      }
      const {token} = responses.payload.data; 
      // eslint-disable-next-line camelcase
      const {user_info} = responses.payload.data;
      const encrypt = Encrypts(token);
      const encryptUserInfo = Encrypts(user_info);
      const userToken = DecryptsV2(encrypt)
      if (token) {
        localStorage.setItem('serviceToken', encrypt);
        localStorage.setItem('user_info', encryptUserInfo);
        dispatch(fecthTokenByUser({tokenByUser:userToken}))
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        if ( account && user_info?.address ){
          if (account.toLocaleUpperCase() !== user_info?.address.toLocaleUpperCase()){
            sessionStorage.setItem('isDifferent', "true");
          }
        }
        onDismiss()
      } else {
            localStorage.removeItem('serviceToken');
            localStorage.removeItem('user_info');
            delete axios.defaults.headers.common.Authorization;
            setLoading(false)
      }
    }

    catch(error){  
      // eslint-disable-next-line camelcase
      const { error_code, error_msg }: any = error
      SetCheckError(true)
      // eslint-disable-next-line camelcase
      if (error_code && error_msg) {
        // eslint-disable-next-line no-unused-expressions
        error_msg.en ? SetMessageError(error_msg.en) : SetMessageError(error_msg) 
      } else {
        SetMessageError(error_code)
      }     
      setLoading(false)                  
    }
  }

  return (
    <CustomModal title="" onDismiss={onDismiss} maxWidth="550px">
    <Flex flexDirection="column">
      <Flex paddingTop="0px" flexDirection="column">
        <CsFlex width="100%" justifyContent="center" alignItems="center">   
        <Text bold fontSize="24px">{t('Login')}</Text>
        </CsFlex>  
        <CsFlex width="100%" justifyContent="center" alignItems="center">           
          <Text color="#B5B5BE">New user?</Text>
          <TransferModal onClick={openModalRegister}>Register now</TransferModal>
        </CsFlex>
        <FormSubmit onSubmit={handleSubmit(handleLogin)}>
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
                        <CsInput name="email" value={getValues('email')}
                            type="email" placeholder="Your email address" onChange={field.onChange}
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
                 render={({ field }) => 
                 (<CsInput
                  type={changePassword ? 'password' : 'text'}
                   name="password" 
                   value={getValues('password')} 
                   placeholder="Password" onChange={field.onChange} />)}/>  
                                                                 
                <WrapIcon
                  className="icon"
                  onClick={() => {
                    setChangePassword(changeIcon)
                  }}
                >
                  {changeIcon ? <EyeOpenIcon /> : <EyeCloseIcon />}
                </WrapIcon>
              </WrapInput>
              <ErrorMessages errors={errors} name="password"/>  
             { checkError === true && <CustomMessageError>{getMessageError}</CustomMessageError> }
            </ContainerInput>
            <Flex width="100%" mt="1rem">
                <ButtonSubmit 
                  width="100%"
                  type="submit"
                  value="Submit"
                  disabled={loading}
                >
                  {!loading ? 
                      "Login"
                      :
                    <RingLoader color="white" loading={loading} cssOverride={override} size={30} />
                  }
                </ButtonSubmit>
            </Flex>
            <Flex 
                justifyContent="center"
                onClick={openModalForgot}
            >
              <TransferModal>Forgot password?</TransferModal>
            </Flex>
          </Flex>
        </FormSubmit>
      </Flex>
    </Flex>
  </CustomModal>

  )
}
export default LoginModal

const CustomModal = styled(Modal)`
  padding: 0px !important;
  width: 475px;
  min-width: 350px;
  @media only screen and (max-width: 600px) {
    width: 360px;
  }
  @media only screen and (max-width: 320px) {
    min-width: 320px;
    width: 320px;
  }
`
const CustomMessageError = styled.div`
color: ${({ theme }) => theme.colors.primaryBright};
font-size:12px;
font-weight:400;
letter-spacing: 0.1;
`

