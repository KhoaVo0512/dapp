
export interface ItemSale {
    saleId:number,
    nftId:number,
    priceListing:string,
    isSold:boolean,
    seller:string,
    buyer:string,
    currency:string,
    nftAddress:string
}

export interface ItemsProps {
    saleItems:ItemSale[]
}
export interface TokenId {
    tokenId:number
}
export interface TotalSellProps {
    totalSell:number
}
export interface BoxType {
    nftId:number,
    nftType:number
}
export interface TokenIdsProps {
    tokenIds:TokenId[]
}
export interface NftInfoProps {
    nftInfo:BoxType[]
}
export interface SellItemsProps {
    saleId:number,
    nftId:number,
    priceListing:number,
    isSold:boolean,
    seller:string,
    buyer:string,
    currency:string,
    nft:string,
    boxType:number,
    adminSale:boolean
}

export interface SellListProps {
    listItemsSell:SellItemsProps[]
}
export interface ListSellItemsProps {
    listItems:SellItemsProps[]
}
export interface SelectSorPrice {
    labelsort:string,
    valuesort:string
}
export interface ListSortPrice {
    listsortprice:SelectSorPrice
}
export interface PropPageNumber{
    pagenumbermkl:number
}
