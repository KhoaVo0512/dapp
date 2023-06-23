import { createAction } from "@reduxjs/toolkit"
import { amountGoldBox, amountRubyBox, amountSilverBox } from "./type"

export const selectAmountSilverBox = createAction<amountSilverBox>('luckyBox/selectAmountSilverBox')
export const selectAmountGoldBox = createAction<amountGoldBox>('luckyBox/selectAmountGoldBox')
export const selectAmountRubyBox = createAction<amountRubyBox>('luckyBox/selectAmountRubyBox')