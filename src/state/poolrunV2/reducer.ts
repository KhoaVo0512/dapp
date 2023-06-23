import { createReducer } from '@reduxjs/toolkit'
// @ts-ignore
// eslint-disable-next-line import/extensions
import { fetchPoolInfo } from "./actions"
// eslint-disable-next-line import/extensions
import { PoolItemsProps } from "./type"

interface globalPoolRun {
    listPool: PoolItemsProps[],
}
export const initialState: globalPoolRun = {
    listPool:[]
}
export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchPoolInfo, (state, action) => {
      state.listPool = action.payload.listPool
    })
)