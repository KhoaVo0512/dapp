import CryptoJS from "crypto-js";

const saltHass = process.env.NEXT_PUBLIC_API_KEYCRYPT
// eslint-disable-next-line consistent-return
export const Decrypts = ()=>{
  if (typeof window !== 'undefined') {
    if(localStorage.getItem("serviceToken")){
      try {
        const decrypted = CryptoJS?.AES?.decrypt(localStorage?.getItem("serviceToken"), `${saltHass}`).toString(CryptoJS?.enc?.Utf8).replace(/["']/g, "")
        return decrypted;
      }
      catch(error) {
        localStorage.removeItem('serviceToken');    
        console.log(error)
      }
    }
    return ""
  }
  }
// eslint-disable-next-line consistent-return
export const DecryptsUserInfo = ()=>{
  if (typeof window !== 'undefined') {
    if(localStorage.getItem("user_info")){
      try {
        const decrypted = CryptoJS?.AES?.decrypt(localStorage?.getItem("user_info"), `${saltHass}`).toString(CryptoJS?.enc?.Utf8) 
        return JSON.parse(decrypted);
      }
      catch(error) {
        localStorage.removeItem('user_info');    
        console.log(error)
      }
    }
  }
}
  export const DecryptsV2 = (value) =>{
    const decrypted = CryptoJS?.AES?.decrypt(value, `${saltHass}`).toString(CryptoJS?.enc?.Utf8).replace(/["']/g, "")
    return decrypted;
  }
  