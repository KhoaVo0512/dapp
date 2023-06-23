import { createReducer } from "@reduxjs/toolkit"
import { fetchBalance, fetchNumberPageCurrent, fetchSellItems, fetchSellItemsByUser, fetchTokenIds, fetchTokenInfo, fetchTotalSellItem, fetchValueSortPrice } from "./actions"
import { BoxType, SelectSorPrice, SellItemsProps, TokenId } from "./type"



interface globalStateMarketPlace {
    balance?: number,
    totalSell?:number,
    listItems?:SellItemsProps[],
    listItemsSell?:SellItemsProps[],
    tokenIds?:TokenId[],
    nftInfo?:BoxType[],
    listsortprice?:SelectSorPrice,
    pagenumbermkl?:number
}

export const initialState: globalStateMarketPlace = {
    balance:0,
    totalSell:0,
    listItems:[
        {
            saleId:0,
            nftId:null,
            priceListing:0,
            isSold:false,
            seller:"",
            buyer:"",
            currency:"",
            nft:"",
            boxType:0,
            adminSale:false
        }
    ],
    listItemsSell:[
        {
            saleId:0,
            nftId:null,
            priceListing:0,
            isSold:false,
            seller:"",
            buyer:"",
            currency:"",
            nft:"",
            boxType:0,
            adminSale:false
        }
    ],
    tokenIds:[],
    nftInfo:[],
    listsortprice:{
        labelsort:"",
        valuesort:""
    },
    pagenumbermkl:0   
}

export default createReducer(initialState, (builder) => 
   builder
    .addCase(fetchTotalSellItem, (state, action) => {
      state.totalSell = action.payload.totalSell
    })
    .addCase(fetchSellItemsByUser, (state, action) => {
        state.listItemsSell = action.payload.listItemsSell
    })
    .addCase(fetchSellItems, (state, action) => {
        state.listItems = action.payload.listItems
    })
    .addCase(fetchBalance, (state, action) => {
        state.balance = action.payload.balance
    })
    .addCase(fetchTokenIds, (state, action) => {
        state.tokenIds = action.payload.tokenIds
    })
    .addCase(fetchTokenInfo, (state, action) => {
        state.nftInfo = action.payload.nftInfo
    })
    .addCase(fetchValueSortPrice, (state, action) => {     
        state.listsortprice = action.payload.listsortprice
    })
    .addCase(fetchNumberPageCurrent, (state, action) => {     
        state.pagenumbermkl = action.payload.pagenumbermkl
    })
)