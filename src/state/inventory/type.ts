
/* eslint-disable camelcase */
export interface runType {
    chain_type: number
    comfy: number
    created_time: string
    efficiency: number
    energy: number
    energy_mining: number
    energy_remain: number
    expiration: number
    extra_data: any
    id: number
    image: string
    img_box: any
    is_box_open: number
    level: number
    luck: number
    name: string
    quality: number
    repair_remain: number
    sneaker_config: any
    status: number
    sturdence: number
    sturdence_remain: number
    token_id: number
    type: number
    updated_time: string
    user_id: string
}

export interface ListShoes {
    listShoes:runType[]
}
export interface ListBoxes {
    listBoxes:runType[]
}

export interface TokenId {
    tokenId: number
}
export interface ListTokenId {
    tokenIds: TokenId[]
}
export interface PropPageNumber {
    pagenumbercount:number
}
