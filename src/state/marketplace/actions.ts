import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { TokenIdsProps, SellListProps, NftInfoProps, TotalSellProps, SellItemsProps, ListSellItemsProps, ListSortPrice, SelectSorPrice } from "./type"

export const fetchBalance = createAction<{ balance: number }>('marketplace/fetchBalance')
export const fetchNumberPageCurrent= createAction<{ pagenumbermkl: number }>('marketplace/fetchNumberPageCurrent')
export const fetchValueSortPrice = createAction<ListSortPrice>('marketplace/fetchValueSortPrice')
export const fetchTokenIds = createAction<TokenIdsProps>('marketplace/fetchTokenIds')
export const fetchTokenInfo = createAction<NftInfoProps>('marketplace/fetchTokenInfo')
export const fetchTotalSellItem = createAction<TotalSellProps>('marketplace/fetchTotalSellItem')
export const fetchSellItemsByUser = createAction<SellListProps>('marketplace/fetchSellItemsByUser')
export const fetchSellItems = createAction<ListSellItemsProps>('marketplace/fetchSellItems')
