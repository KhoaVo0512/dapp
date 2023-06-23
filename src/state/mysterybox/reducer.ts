import { createReducer } from '@reduxjs/toolkit'
import { fetchAmountSoldMystery, fetchIDMysteryBox, fetchMysteryBox, fetchMysteryToken, fetchStartEndTimeMystery } from './actions'
import { amountSold, startEndTime } from './types'

interface globalState {
  balanceOfRunBox:number,
  balanceOfBUSD:number,
  balanceOfApprove:number,
  balanceOfRun:number,
  mysteryBoxID:any,
  startEndTime:startEndTime[],
  inforSold:amountSold[]
}


export const initialState: globalState = {
  balanceOfRunBox:0,
  balanceOfBUSD:0,
  balanceOfApprove:0,
  balanceOfRun:0,
  mysteryBoxID:[],
  startEndTime:[
  {
      startIn: 0,
      endIn: 0
  }
  ],
  inforSold:[
  {
      sold:0,
      maxSell:0
  }
  ]
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchMysteryBox, (state, action) => {
      state.balanceOfRunBox = action.payload.balanceOfRunBox
    })
    .addCase(fetchIDMysteryBox, (state, action) => {
      state.mysteryBoxID = action.payload.mysteryBoxID
    })
    .addCase(fetchMysteryToken, (state, action) => {
      state.balanceOfBUSD = action.payload.balanceOfBUSD
      state.balanceOfApprove = action.payload.balanceOfApprove
      state.balanceOfRun = action.payload.balanceOfRun
    })
    .addCase(fetchStartEndTimeMystery, (state, action) => {
      state.startEndTime = action.payload.startEndTime
    })
    .addCase(fetchAmountSoldMystery, (state, action) => {
      state.inforSold = action.payload.inforSold
    })
)
