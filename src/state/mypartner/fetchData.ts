import React, { useState, useEffect } from "react";
import axios from "axios";
import { Decrypts } from "config/api/decrypts";
import { HashClient } from "config/api/encrypt";
import { URL } from "config/index"
// eslint-disable-next-line import/named
import { levelVipProps, referralCodeProps, nonceProps, userProps, listPartnerConfig, parentPartnerProps, getVipAndReferalProps, getListReferalProps } from "./type";

export const fetchLevelVip = async (): Promise<levelVipProps> => {
    const token = Decrypts();
    if (token){
        try {
            const hash =  HashClient('user/get-vip');
            
            const {data: response} = await axios({
                method: 'GET',
                url: `${URL}/user/get-vip`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'hash-client': `${hash}`
                  }
            });
            return {
                level: response && response.data.name
            }
        }
        catch(error) {
            console.log(error)
            return {
                level:""
            }
        }
    } else {
        return {
            level:""
        }
    }
    
}

export const fetchReferralCode = async (): Promise<referralCodeProps> => {
    const token = Decrypts();
    if ( token ) {
        try {
            const hash =  HashClient('user/get');
            
            const {data: response} = await axios({
                method: 'GET',
                url: `${URL}/user/get`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'hash-client': `${hash}`
                  }
            });
            return {
                referralCode: response && response.data.referral_code_invite
            }
        }
        catch(error) {
            console.log(error)
            return {
                referralCode:""
            }
        }
    } else {
        return {
            referralCode:""
        }
    }
}


export const fetchUser = async (): Promise<userProps> => {
    const token = Decrypts();
    if ( token ) {
        try {
            const hash =  HashClient('user/get');
            const {data: response} = await axios({
                method: 'GET',
                url: `${URL}/user/get`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'hash-client': `${hash}`
                  }
            });
            sessionStorage.setItem('userAddress', response.data.address);
            return {
                userInfo:{
                    id:response && response.data.id,
                    email:response && response.data.email,
                    mobile:response && response.data.mobile,
                    username:response && response.data.username,
                    address:response && response.data.address,
                    avatar:response && response.data.avatar,
                    name:response && response.data.name,
                    last_read_notification:response && response.data.ast_read_notification,
                    partner_role:response && response.data.partner_role,
                    status:response && response.data.status,
                    created_time:response && response.data.created_time,
                    updated_time:response && response.data.updated_time,
                    referral_code:response && response.data.referral_code,
                    referral_code_invite:response && response.data.referral_code_invite 
                }
            }
        }
        catch(error) {
            console.log(error)
            return {
                userInfo:{
                    id:0,
                    email:"",
                    mobile:"",
                    username:"",
                    address:"",
                    avatar:"",
                    name:"",
                    last_read_notification:"",
                    partner_role:0,
                    status:0,
                    created_time:"",
                    updated_time:"",
                    referral_code:"",
                    referral_code_invite:""  
                }
            }
        }
    } else {
        return {
            userInfo:{
                id:0,
                email:"",
                mobile:"",
                username:"",
                address:"",
                avatar:"",
                name:"",
                last_read_notification:"",
                partner_role:0,
                status:0,
                created_time:"",
                updated_time:"",
                referral_code:"",
                referral_code_invite:""  
            }
        }
    }
    
}
export const fetchnonceCodeByUser = async (account:string): Promise<nonceProps> => {
    const token = Decrypts();
    if ( token ) {
        try {
            const hash =  HashClient('user/get-nonce');
            const {data: response} = await axios({
                method: 'POST', 
                url: `${URL}/user/get-nonce`, 
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'hash-client': `${hash}`
                }, 
                data: {
                    "address": `${account}`
                }
            });
            return {
                nonceCode: response && response.data.nonce
            }
        }
        catch(error) {
            console.log(error)
            return {
                nonceCode:""
            }
        }
    } else {
        return {
            nonceCode:""
        }
    }
}

export const fetchPartnerConfig = async (): Promise<listPartnerConfig> => {
    const token = Decrypts();
    if( token ) {
        try { 
            const hash =  HashClient('common/partner-config');
            const {data: response} = await axios({
                method: 'GET', 
                url: `${URL}/common/partner-config`, 
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'hash-client': `${hash}`
                }, 
            });
            return {
                listPartnerConfig: response && response.data.data
            }
        }
        catch(error) {
            console.log(error)
            return {
                listPartnerConfig:[]
            }
        }
    } else {
        return {
            listPartnerConfig:[]
        }
    }
}
// ---partner
export const fetchParentPartnerData= async (): Promise<parentPartnerProps> => {
    const token = Decrypts();
    if ( token ) {
        try {
        
            const hash =  HashClient('ref/parent');
            const {data: response} = await axios({
                method: 'GET',
                url: `${URL}/ref/parent`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'hash-client': `${hash}`
                  }
            });
            return {
                parentpartner:{
                name:response && response.data.name,
                avatar: response && response.data.avatar,
                partner_role: {
                    en: response && response.data.partner_role.en,
                    vi: response && response.data.partner_role.vi
                }
              }
            }
            
        }
        catch(error) {
               console.log('error',error)
               return {
                parentpartner:{
                name: "",
                avatar:"" ,
                partner_role: {
                    en: "",
                    vi: ""
                    }
                }
            }
        }
    } else {
        return {
            parentpartner:{
            name: "",
            avatar:"" ,
            partner_role: {
                en: "",
                vi: ""
                }
            }
        }
    }
    
}
export const fetchgetVipAndReferalData= async (): Promise<getVipAndReferalProps> => {
    const token = Decrypts();
    if ( token ) {
        try {
        
            const hash =  HashClient('wallet/get-vip-and-referral');
            const {data: response} = await axios({
                method: 'GET',
                url: `${URL}/wallet/get-vip-and-referral`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'hash-client': `${hash}`
                  }
            });
            return {
                getvipandreferal: {
                vip: {
                    max: response && response.data.max,
                    name: response && response.data.name,
                    level: response && response.data.level,
                    duration_lock: response && response.data.duration_clock,
                    require_stake: response && response.data.require_stake,
                    max_percent_withdrawal: response && response.data.max_percent_withdrawal,
                    current_stake: response && response.data.current_stake
                },
                partner_level: {
                    referral_code:  response && response.data.referral_code,
                    partner_role: response && response.data.partner_role
                },
            }
        }
        }
        catch(error) {
               console.log('error',error)
               return {
                getvipandreferal:{
                    vip: {
                        max: 0,
                        name: "",
                        level: 0,
                        duration_lock: 0,
                        require_stake: 0,
                        max_percent_withdrawal: 0,
                        current_stake: 0
                    },
                    partner_level: {
                        referral_code: "",
                        partner_role: 0
                    },
            }
        }
            }
    } else {
        return {
            getvipandreferal:{
                vip: {
                    max: 0,
                    name: "",
                    level: 0,
                    duration_lock: 0,
                    require_stake: 0,
                    max_percent_withdrawal: 0,
                    current_stake: 0
                },
                partner_level: {
                    referral_code: "",
                    partner_role: 0
                },
            }
        }
    }
   
}

export const fetchListReferalData = async (): Promise<getListReferalProps> => {
    const token = Decrypts();
    if ( token ) {
        try { 
            const hash =  HashClient('ref/list-referral');
            const {data: response} = await axios({
                method: 'GET', 
                url: `${URL}/ref/list-referral`, 
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'hash-client': `${hash}`
                }, 
            });
            return {
                getlistreferal: response && response.data.data
            }
        }
        catch(error) {
            console.log(error)
            return {
                getlistreferal:[]
            }
        }
    } else {
        return {
            getlistreferal:[]
        }
    }
}
