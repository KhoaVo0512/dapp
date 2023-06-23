import { createAction } from '@reduxjs/toolkit'
// eslint-disable-next-line import/named
import { getListReferalProps, getVipAndReferalProp, listPartnerConfig, parentPartnerProp, userInfoProp, differentType, closeDifferentType } from './type'

export const fetchUserLevelVip = createAction<{level:string}>('account/fetchDataUser')
export const fetchreferralCode = createAction<{referralCode:string}>('account/fetchreferralCode')
export const fetchnonceCode = createAction<{nonceCode:string}>('account/fetchnonceCode')
export const fetchUserInfo = createAction<{userInfo:userInfoProp}>('account/fetchUserInfo') 
export const fetchListPartnerConfig = createAction<listPartnerConfig>('account/fetchListPartnerConfig')
export const fetchParentPartner = createAction<{parentpartner:parentPartnerProp}>('account/fetchParentPartner')
export const fetchgetVipAndReferal = createAction<{getvipandreferal:getVipAndReferalProp}>('account/fetchgetVipAndReferal')
export const fetchListReferal = createAction<getListReferalProps>('account/fetchListReferal')  
export const fetchIsDifferent = createAction<differentType>('account/fetchIsDifferent') 
export const fetchDifferentIsClose = createAction<closeDifferentType>('account/fetchDifferentIsClose')