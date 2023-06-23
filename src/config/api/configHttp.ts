import axios from 'axios';
import { Decrypts } from './decrypts';


export const URL = process.env.NEXT_PUBLIC_API
class AxiosConfig{    
    instance?:any;
    
    interceptors?:any;
     
    constructor(){
        this.instance=axios.create({  
            headers:{
                'Content-Type':'application/json',
            },
            baseURL:URL,
            timeout:50000 
        })
        this.instance.interceptors.response.use( 
            response=>{
                const result={...response.data,status:response.status}
                return result;
            },
            ({response})=>{  
                if (!response) {
                     // eslint-disable-next-line no-param-reassign
                     response = {
                        data:'RequestLimit'
                     }
                   return response;
                }
               
                if (response.status === 401) {
                   window.location.reload();
                }
                const result={...response.data,status:response.status}
                return Promise.reject(result);
            }
        )
        this.instance.interceptors.request.use(
            (config:any)=>
            {   const token = Decrypts();
               
                if (token){
                    // eslint-disable-next-line no-param-reassign
                    config.headers.authorization= token 
                }
                return config;
            },
                error=>{
                     return Promise.reject(error.reponse)
                }            
            )    
    }
    
    get(url,config=null){
        return this.instance.get(url,config) 
    }

    post(url,data,config){
        return this.instance.post(url,data,{
            ...config
        })
    }

    put(url,data,config=null){
        return this.instance.put(url,data,config);
    }

    delete(url,data,config){
        return this.instance.delete(url,{
            data,
            ...config
        })
    }
}
 const axiosconfig = new AxiosConfig();
 export default axiosconfig;
