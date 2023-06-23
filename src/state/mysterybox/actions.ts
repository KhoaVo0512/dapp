import { createAction } from '@reduxjs/toolkit'
import { inforSoldMystery, startEndTimeMystery } from './types'

export const fetchMysteryBox = createAction<{balanceOfRunBox:number}>('mysteryBox/fetchMysteryBox')
export const fetchIDMysteryBox = createAction<{mysteryBoxID:any}>('mysteryBox/fetchIDMysteryBox')
export const fetchMysteryToken = createAction<{balanceOfBUSD:number, balanceOfApprove:number, balanceOfRun:number}>('mysteryBox/fetchMysteryToken')
export const fetchAmountSoldMystery = createAction<inforSoldMystery>('mysteryBox/fetchAmountSoldMystery')
export const fetchStartEndTimeMystery = createAction<startEndTimeMystery>('mysteryBox/fetchStartEndTimeMystery')
