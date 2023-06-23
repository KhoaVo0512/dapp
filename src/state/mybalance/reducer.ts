import { createReducer } from '@reduxjs/toolkit'
import { fetchAllTransactions, fetchBalance } from './actions'
import { ListTransaction, transactionProps, OffChainBalance, listBanlace } from './type'

interface globalStateMyBalance {
    listTransactions: transactionProps[],
    listBanlace:OffChainBalance
}
export const initialState: globalStateMyBalance = {
    listTransactions: [],
    listBanlace:{
      mainBalance:0,
      earnBalance:0
    }
}
export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchAllTransactions, (state, action) => {
      state.listTransactions = action.payload.listTransactions
    })
    .addCase(fetchBalance, (state, action) => {
      state.listBanlace = action.payload.listBalance
    })
)