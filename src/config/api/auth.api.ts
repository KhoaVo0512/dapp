import axiosconfig from "./configHttp";
import { HashClient } from "./encrypt";


const headerRegister = () => {
   return {
      'hash-client': HashClient('auth/register')
   }
 }
 
const headersendotp = () => {
   return {
      'hash-client': HashClient('auth/get-verify-email-code')
   }
 }
const headersendotpForgot = () => {
   return {
      'hash-client': HashClient('auth/get-verify-forgot-password')
   }
 }
const headerforgotPassword = () => {
   return {
      'hash-client': HashClient('auth/forgot-password')
   }
 }
const headerLogin = () => {
   return {
      'hash-client': HashClient('auth/login')
   }
}

const authAPI={
     register(data) {
         const getHeader = headerRegister();
         const datas= axiosconfig.post(`/auth/register`,data,{headers: getHeader}); 
         return datas;
     },
     sendotp(data) {
        const getHeader = headersendotp();
        const datas= axiosconfig.post(`/auth/get-verify-email-code`,data,{headers: getHeader}); 
        return datas;
     },
     sendotpForgot(data) {
        const getHeader = headersendotpForgot();
        const datas= axiosconfig.post(`/auth/get-verify-forgot-password`,data,{headers: getHeader}); 
        return datas;
     },
     forgotPassword(data) {
      const getHeader = headerforgotPassword();
      const datas= axiosconfig.post(`/auth/forgot-password`,data,{headers: getHeader}); 
      return datas;
  },
     login(data){
        const getHeader = headerLogin();
        const datas= axiosconfig.post(`/auth/login`,data,{headers: getHeader});        
        return datas;
     },   
}

export default authAPI;
