import { useToast } from '@pancakeswap/uikit';
import axios from "axios";
import { Decrypts } from "config/api/decrypts";
import { HashClient } from "config/api/encrypt";
import { URL } from "config/index";
import { useCallback, useState } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "state";
import { fetchUserInfo } from "state/account/actions";
import { fetchUser } from "state/account/fetchData";



export const useUpdateAddress = (account, signature) => {
    const [ pendingUpdate, setPendingUpdate ] = useState(false)
    const [ requestedUpdate, setRequestedUpdate ] = useState(false)
    const { toastSuccess, toastError } = useToast()
    const dispatch = useDispatch<AppDispatch>()
    const handleUpdateAddress = useCallback(async () => {
        setPendingUpdate(true)
        
        try {
            // const token = localStorage.getItem('serviceToken');
            const token = Decrypts();
            const hash =  HashClient('user/update-address');
            await axios({
                method: 'PUT', 
                url: `${URL}/user/update-address`, 
                headers:{
                        'Authorization': `Bearer ${token}`,
                        'hash-client': `${hash}`
                    }, 
                    data: {
                        "address": `${account}`,
                        "sign":`${signature}`
                    }
            });
            toastSuccess("Wallet address update successful")
            setRequestedUpdate(true)
            const result = await fetchUser()
            dispatch(fetchUserInfo(result))
            sessionStorage.setItem('isAddress', "false");
        } catch (error:any) {
            const converError = error.response.data.error_code
            console.log(converError)
            if (converError === "ADDRESS_INVALID"){
                toastError(`${error.response.data.error_msg.en}`)
            }
            if (converError === "ADDRESS_EXISTS"){
                toastError(`${error.response.data.error_msg.en}`)
            }
            if (converError === "USER_HAD_ADDRESS"){
                toastError(`${error.response.data.error_msg.en}`)
            }
            setPendingUpdate(false) 
            setRequestedUpdate(false)
        } 
        finally {
            setPendingUpdate(false)
            setRequestedUpdate(false)
        }
        }, [account, dispatch, signature, toastError, toastSuccess])
    return { handleUpdateAddress, pendingUpdate, requestedUpdate }
}
  