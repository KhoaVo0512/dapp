import { URL } from "config/api/configHttp";
import axios from "axios";
import { Decrypts } from "config/api/decrypts";
import { HashClient } from "config/api/encrypt";
import { ListTransaction, listBanlace } from "./type";

export const fetchListTransactions = async (renderURL:string): Promise<ListTransaction> => {
    try {
        const token = Decrypts();
        const hash =  HashClient('balance/get-history');
        const {data: response} = await axios({
            method: 'GET',
            url: renderURL,
            headers: {
                'Authorization': `Bearer ${token}`,
                'hash-client':`${hash}`
              }
        });
        return {
            listTransactions:response.data.data
        }
    }
    catch(error) {
        console.log(error)
        return {
            listTransactions:[]
        }
    }
}
export const fetchUserBalance = async (): Promise<listBanlace> => {
    try {
        const token = Decrypts();
        const hash =  HashClient('user/balance');
        const {data: response} = await axios({
            method: 'GET',
            url: `${URL}/user/balance`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'hash-client': `${hash}`
              }
        });
        return {
            listBalance:{
                mainBalance:response.data.data.filter((data) => data.balance_type === 1),
                earnBalance:response.data.data.filter((data) => data.balance_type === 2)
            }
        }
    }
    catch(error) {
        console.log(error)
        return {
            listBalance:{
                mainBalance:0,
                earnBalance:0
            }
        }
    }
}