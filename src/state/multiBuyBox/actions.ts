import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
  nftInMarket,
  dataUserType,
  totalBoxOfUser,
  amountMetaRush,
  amountMetaRun,
  amountMetaRace,
  amountMetaRich,
  maxNftTransfer,
  ListBoxByUser,
} from './type'

export const fetchBalanceNftInMarket = createAction<nftInMarket>('marketMultiBuy/fetchBalanceNftInMarket')
export const fetchDataUser = createAction<dataUserType>('marketMultiBuy/fetchDataUser')
export const fetchTotalBoxofUserBuy = createAction<totalBoxOfUser>('marketMultiBuy/fetchTotalBoxofUserBuy')
export const selectAmountMetaRush = createAction<amountMetaRush>('marketMultiBuy/selectAmountMetaRush')
export const selectAmountMetaRun = createAction<amountMetaRun>('marketMultiBuy/selectAmountMetaRun')
export const selectAmountMetaRace = createAction<amountMetaRace>('marketMultiBuy/selectAmountMetaRace')
export const selectAmountMetaRich = createAction<amountMetaRich>('marketMultiBuy/selectAmountMetaRich')
export const fetchMaxNftTransfer = createAction<maxNftTransfer>('marketMultiBuy/fetchMaxNftTransfer')
export const fetchAMountListBoxByUser = createAction<ListBoxByUser>('marketMultiBuy/fetchAMountListBoxByUser')
