
import { createReducer } from '@reduxjs/toolkit'
import {
  fetchDifferentIsClose, fetchgetVipAndReferal, fetchIsDifferent, fetchListPartnerConfig, fetchListReferal, fetchnonceCode, fetchParentPartner, fetchreferralCode, fetchUserInfo, fetchUserLevelVip
} from "./actions"
// eslint-disable-next-line import/named
import { getListReferalProp, getVipAndReferalProp, parentPartnerProp, partnetConfig, userInfoProp } from "./type"

interface globalStateAccount {
    level: string,
    referralCode:string
    nonceCode:string,
    userInfo:userInfoProp,
    parentpartner:parentPartnerProp,
    getvipandreferal:getVipAndReferalProp,
    listPartnerConfig:partnetConfig[],
    getlistreferal:getListReferalProp[],
    isDifferent:string,
    isClose:string
}
export const initialState: globalStateAccount = {
    level: "",
    referralCode:"",
    nonceCode:"",
    userInfo:null,
    parentpartner:null,
    getvipandreferal:null,
    listPartnerConfig:[],
    getlistreferal:[],
    isDifferent:"",
    isClose:""
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
    .addCase(fetchIsDifferent, (state, action) => {
      state.isDifferent = action.payload.isDifferent
    })
    .addCase(fetchDifferentIsClose, (state, action) => {
      state.isClose = action.payload.isClose
    })
)
