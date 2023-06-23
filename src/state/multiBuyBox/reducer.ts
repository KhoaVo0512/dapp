import { createReducer } from '@reduxjs/toolkit'
import {
  fetchAMountListBoxByUser,
  fetchBalanceNftInMarket,
  fetchDataUser,
  fetchMaxNftTransfer,
  fetchTotalBoxofUserBuy,
  selectAmountMetaRace,
  selectAmountMetaRich,
  selectAmountMetaRun,
  selectAmountMetaRush,
} from './actions'
import { nftBalanceItems, nftPriceItems } from './type'

interface globalStateMarketMultiBuy {
  nftInfo: {
    nftBalance: nftBalanceItems
    nftPrice: nftPriceItems
  }
  dataUser: {
    balanceOf: string
    allowance: string
  }
  totalBoxOfUser: number
  totalMetaRush: number
  totalMetaRun: number
  totalMetaRace: number
  totalMetaRich: number
  maxNftTransfer: number
  listBoxByUser: {
    totalBoxMetaRush: number
    totalBoxMetaRun: number
    totalBoxMetaRace: number
    totalBoxMetaRich: number
  }
}

export const initialState: globalStateMarketMultiBuy = {
  nftInfo: {
    nftBalance: {
      totalNftMetaRush: 0,
      totalNftMetaRun: 0,
      totalNftMetaRace: 0,
      totalNftMetaRich: 0,
    },
    nftPrice: {
      totalNftMetaRush: 0,
      totalNftMetaRun: 0,
      totalNftMetaRace: 0,
      totalNftMetaRich: 0,
    },
  },
  dataUser: {
    balanceOf: '0',
    allowance: '0',
  },
  totalBoxOfUser: 0,
  totalMetaRush: 0,
  totalMetaRun: 0,
  totalMetaRace: 0,
  totalMetaRich: 0,
  maxNftTransfer: 0,
  listBoxByUser: {
    totalBoxMetaRush: 0,
    totalBoxMetaRun: 0,
    totalBoxMetaRace: 0,
    totalBoxMetaRich: 0,
  },
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchBalanceNftInMarket, (state, action) => {
      state.nftInfo = action.payload.nftInfo
    })
    .addCase(fetchDataUser, (state, action) => {
      state.dataUser = action.payload.dataUser
    })
    .addCase(fetchTotalBoxofUserBuy, (state, action) => {
      state.totalBoxOfUser = action.payload.totalBoxOfUser
    })
    .addCase(selectAmountMetaRush, (state, action) => {
      state.totalMetaRush = action.payload.totalMetaRush
    })
    .addCase(selectAmountMetaRun, (state, action) => {
      state.totalMetaRun = action.payload.totalMetaRun
    })
    .addCase(selectAmountMetaRace, (state, action) => {
      state.totalMetaRace = action.payload.totalMetaRace
    })
    .addCase(selectAmountMetaRich, (state, action) => {
      state.totalMetaRich = action.payload.totalMetaRich
    })
    .addCase(fetchMaxNftTransfer, (state, action) => {
      state.maxNftTransfer = action.payload.maxNftTransfer
    })
    .addCase(fetchAMountListBoxByUser, (state, action) => {
      state.listBoxByUser = action.payload.listBoxByUser
    }),
)
