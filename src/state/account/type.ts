
export interface levelVipProps {
    level:string
} 
export interface referralCodeProps {
    referralCode:string
} 
export interface nonceProps {
    nonceCode:string
} 

/* eslint-disable camelcase */
export interface userInfoProp{
    id: number,
    email: string,
    mobile: string,
    username: string,
    address: string,
    avatar: string,
    name: string,
    last_read_notification: string,
    partner_role: number,
    status: number,
    created_time: string,
    updated_time: string,
    referral_code: string,
    referral_code_invite: string
}
export interface userProps {
    userInfo:userInfoProp
}
export interface parentPartnerProps {
    parentpartner:parentPartnerProp
}
export interface getVipAndReferalProps {
    getvipandreferal:getVipAndReferalProp
}

export interface getListReferalProps{
    getlistreferal:getListReferalProp[]
} 

/* eslint-disable camelcase */
export interface partnetConfig {
    role: number,
    name: string,
    commission: string,
    bottom_level_require: number,
    created_time: string,
    updated_time: string,
    partner_name: {
        en: string,
        vi: string
    }
}

/* eslint-disable camelcase */
export interface parentPartnerProp{
    name?: string,
    avatar?: string,
    partner_role: {
        en: string,
        vi: string
    }
}

/* eslint-disable camelcase */
export interface getVipAndReferalProp {
    vip: {
        max?: number,
        name?: string,
        level?: number,
        duration_lock?: number,
        require_stake?: number,
        max_percent_withdrawal?: number,
        current_stake?: number
    },
    partner_level: {
        referral_code?: string,
        partner_role?: number
    },
}

/* eslint-disable camelcase */
export interface getListReferalProp {
    user_id: number,
    partner_role?: number,
    avatar: null,
    name: string,
    email?: string
}

export interface listPartnerConfig {
    listPartnerConfig:partnetConfig[]
}

export interface differentType {
    isDifferent:string
}
export interface closeDifferentType {
    isClose:string
}