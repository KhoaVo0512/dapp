
import { createReducer } from '@reduxjs/toolkit'
import { runType, TokenId } from './type'
import { fetchShoes, fetchBoxes, fetchBalanceMysteryBox, fetchlistTokenId, fetchPageNumberCount } from "./actions"

interface globalStateInventory {
    listShoes: runType[],
    listBoxes:runType[],
    balanceMysteryBox: number,
    tokenIds: TokenId[],
    pagenumbercount:number
}

export const initialState: globalStateInventory = {
    listShoes: [],
    listBoxes:[],
    balanceMysteryBox: 0,
    tokenIds: [],
    pagenumbercount:0
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchShoes, (state, action) => {
      state.listShoes = action.payload.listShoes
    })
    .addCase(fetchBoxes, (state, action) => {
        state.listBoxes = action.payload.listBoxes
      })
    .addCase(fetchBalanceMysteryBox, (state, action) => {
      state.balanceMysteryBox = action.payload.balanceMysteryBox
    })
    .addCase(fetchlistTokenId, (state, action) => {
      state.tokenIds = action.payload.tokenIds
    })
    .addCase(fetchPageNumberCount, (state, action) => {
      state.pagenumbercount = action.payload.pagenumbercount
    })
)