import CryptoJS from "crypto-js";
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

const saltHass = process.env.NEXT_PUBLIC_API_KEYCRYPT
const secretKey = process.env.NEXT_PUBLIC_VERIFY_CLIENT
export const Encrypts = (value) =>{
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), `${saltHass}`).toString();
    return encrypted;
}

export const getTimeStampt =()=>{
  const time = Date.now();
  const roundmilisecond = time - (time % 180000)
  return roundmilisecond;
}

export const HashClient=(url:string)=>{
  const params =  `${secretKey}${url}${getTimeStampt()}`;
  const hashClient = Base64.stringify(sha256(params));
  return hashClient;
}


  // Base64(SHA256(SECRET_KEY_VERIFY_CLIENT+ END_POINT + TIMESTAMP))