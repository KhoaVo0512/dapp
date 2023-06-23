
import { ethers } from "ethers";
import React, { useCallback, useState } from "react";

declare let window:any

export const useSign = (nonceCode) => {
    const [ pendingSign, setPendingSign ] = useState(false)
    const [ signatureKey, setSignatureKey ] = useState("")
   
    const handleSign = useCallback(async () => {
      setPendingSign(true)
      try {
        if (typeof window.ethereum !== "undefined") {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const message = `Runtogether sign ${nonceCode}`
          const signer = provider.getSigner();
          const signature = await signer.signMessage(message)
          if (signature){
              setSignatureKey(signature)
              setPendingSign(false)
              sessionStorage.setItem('signIn', 'true')
          }
       }
        
      } catch (e) {
        console.error(e)
        setPendingSign(false)
        sessionStorage.setItem('signIn', 'false')
      } finally {
        setPendingSign(false)
      }
    }, [
        nonceCode
    ])
   
  
    return { handleSign, signatureKey, pendingSign }
  }
  
