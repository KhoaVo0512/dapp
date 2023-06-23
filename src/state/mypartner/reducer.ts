
import { createReducer } from '@reduxjs/toolkit'
import { fetchLevelVip, fetchReferralCode } from "./fetchData"
import { fetchUserLevelVip, fetchreferralCode, fetchnonceCode, fetchUserInfo, fetchListPartnerConfig, fetchParentPartner, fetchgetVipAndReferal, fetchListReferal } from "./actions"
// eslint-disable-next-line import/named
import { userInfoProp, partnetConfig, parentPartnerProp, getVipAndReferalProp, getListReferalProp } from "./type"

interface globalStateAccount {
    level: string,
    referralCode:string
    nonceCode:string,
    userInfo:userInfoProp,
    parentpartner:parentPartnerProp,
    getvipandreferal:getVipAndReferalProp,
    listPartnerConfig:partnetConfig[],
    getlistreferal:getListReferalProp[]
}
export const initialState: globalStateAccount = {
    level: "",
    referralCode:"",
    nonceCode:"",
    userInfo:null,
    parentpartner:null,
    getvipandreferal:null,
    listPartnerConfig:[],
    getlistreferal:[]
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchUserLevelVip, (state, action) => {
      state.level = action.payload.level
    })
    .addCase(fetchreferralCode, (state, action) => {
      state.referralCode = action.payload.referralCode
    })
    .addCase(fetchnonceCode, (state, action) => {
      state.nonceCode = action.payload.nonceCode
    })
    .addCase(fetchUserInfo, (state, action) => {
      state.userInfo = action.payload.userInfo
    })
    .addCase(fetchParentPartner, (state, action) => {
      state.parentpartner = action.payload.parentpartner
    })
    .addCase(fetchgetVipAndReferal, (state, action) => {
      state.getvipandreferal = action.payload.getvipandreferal
    })
    .addCase(fetchListPartnerConfig, (state, action) => {
      state.listPartnerConfig = action.payload.listPartnerConfig
    })
    .addCase(fetchListReferal, (state, action) => {
      state.getlistreferal = action.payload.getlistreferal
    })

)
