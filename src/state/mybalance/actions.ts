import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ListTransaction, transactionProps, listBanlace } from './type'

export const fetchAllTransactions = createAction<ListTransaction>('mybalance/fetchAllTransactions')
export const fetchBalance = createAction<listBanlace>('mybalance/fetchBalance')