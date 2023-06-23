
import { HashClient } from "config/api/encrypt";
import axios from "axios";
import { URL } from "config/index"
import { ListShoes, ListBoxes } from "../type";


export const fetchListBoxes = async (userId:number, token:string): Promise<ListBoxes> => {
    try {
        const hash =  HashClient('sneaker/list');
        const {data: response} = await axios({ 
            method: 'GET',
            url: `${URL}/sneaker/list?user_id=${userId}&is_box_open=0`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'hash-client': `${hash}`
              }
        });
        return {
            listBoxes:response.data.data
        }
    }
    catch(error) {
        console.log(error)
        return {
            listBoxes:[]
        }
    }
}

export const fetchListShoes = async (userId:number, token:string): Promise<ListShoes> => {
    try {
        console.log("userIdfetchListShoes", userId)
        const hash =  HashClient('sneaker/list');
        const {data: response} = await axios({
            method: 'GET',
            url: `${URL}/sneaker/list?user_id=${userId}&is_box_open=1`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'hash-client': `${hash}`
              }
        });
        return {
            // type === 5 là giày vật lý
            listShoes:response.data.data.filter((data) => data.type !== 5) 
        }
    }
    catch(error) {
        console.log(error)
        return {
            listShoes:[]
        }
    }
}