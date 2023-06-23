import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
// eslint-disable-next-line import/named
import { userInfoProp, listPartnerConfig, getVipAndReferalProp, parentPartnerProp, getListReferalProps } from './type'

export const fetchUserLevelVip = createAction<{level:string}>('account/fetchDataUser')
export const fetchreferralCode = createAction<{referralCode:string}>('account/fetchreferralCode')
export const fetchnonceCode = createAction<{nonceCode:string}>('account/fetchnonceCode')
export const fetchUserInfo = createAction<{userInfo:userInfoProp}>('account/fetchUserInfo') 
export const fetchListPartnerConfig = createAction<listPartnerConfig>('account/fetchListPartnerConfig')
export const fetchParentPartner = createAction<{parentpartner:parentPartnerProp}>('account/fetchParentPartner')
export const fetchgetVipAndReferal = createAction<{getvipandreferal:getVipAndReferalProp}>('account/fetchgetVipAndReferal')
export const fetchListReferal = createAction<getListReferalProps>('account/fetchListReferal')