import { createReducer } from '@reduxjs/toolkit'
import { selectAmountGoldBox, selectAmountRubyBox, selectAmountSilverBox } from './actions'

interface globalStateLuckyBox {
  totalSilverBox: number
  totalGoldBox: number
  totalRubyBox: number
}

export const initialState: globalStateLuckyBox = {
  totalSilverBox: 1,
  totalGoldBox: 1,
  totalRubyBox: 1,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(selectAmountSilverBox, (state, action) => {
      state.totalSilverBox = action.payload.totalSilverBox
    })
    .addCase(selectAmountGoldBox, (state, action) => {
      state.totalGoldBox = action.payload.totalGoldBox
    })
    .addCase(selectAmountRubyBox, (state, action) => {
      state.totalRubyBox = action.payload.totalRubyBox
    }),
)
