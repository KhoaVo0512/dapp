import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "state"
import { fetchBalance, fetchSellItems, fetchSellItemsByUser, fetchTokenIds, fetchTokenInfo, fetchTotalSellItem } from "./actions";
import { fetchBalanceNft, fetchBoxType, fetchItemsSell, fetchItemsSellByUser, fetchTokensId, fetchTotalSell } from "./hook/fetchDataMarketPlace";

export const GetTotalSellItems = (chainId) => {
    const marketplace = useSelector<AppState, AppState['marketplace']>((state) => state.marketplace)
    const totalSell = marketplace.totalSell
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getTotalSellItems = async () => {
            try {
                const result = await fetchTotalSell(chainId)
                dispatch(fetchTotalSellItem(result))
            } catch (error) {
                console.log(error);
            }
        }
        getTotalSellItems();  
    }, [chainId, dispatch])
    return [totalSell]
}

export const GetSellItemsByUser = (chainId:number, totalSellItems:number, account:string|undefined) => {
    const marketplace = useSelector<AppState, AppState['marketplace']>((state) => state.marketplace)
    const listItems = marketplace.listItemsSell
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getListSellItems = async () => {
            try {
                const result = await fetchItemsSellByUser(chainId, totalSellItems, account )
                dispatch(fetchSellItemsByUser(result))
            } catch (e) {
                console.log(e)
            }
        }
        if ( totalSellItems > 0 ) {
            getListSellItems()
        }
    }, [totalSellItems, dispatch, account, chainId])
    return [ listItems ]
}

export const GetListItems = (totalSellItems:number, chainId:number) => {
    const marketplace = useSelector<AppState, AppState['marketplace']>((state) => state.marketplace)
    const listItems = marketplace.listItems
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getListSellItems = async () => {
            try {
                const result = await fetchItemsSell(totalSellItems, chainId)
                dispatch(fetchSellItems(result))
            } catch (e) {
                console.log(e)
            }
        }
        getListSellItems()
    }, [totalSellItems, dispatch])
    return [ listItems ]
}

export const GetBalanceNft = (tokenAddress:string, account:string, chainId:number) => {
    const marketplace = useSelector<AppState, AppState['marketplace']>((state) => state.marketplace)
    const {balance} = marketplace
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getSaleItems = async () => {
            try {
                const result = await fetchBalanceNft(tokenAddress, account, chainId)
                dispatch(fetchBalance(result))
            } catch (e) {
                console.log(e)
            }
        }
        if(account) {
            getSaleItems();
        }        
    }, [account, dispatch, chainId, tokenAddress])
    return [ balance ]
}

export const GetTokenIds = (tokenAddress:string, account:string, balance:number, chainId:number) => {
    const marketplace = useSelector<AppState, AppState['marketplace']>((state) => state.marketplace)
    const tokenIds = marketplace.tokenIds
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getTokenIds = async () => {
            try {
                const result = await fetchTokensId(tokenAddress, account, balance, chainId)
                dispatch(fetchTokenIds(result))
            } catch (e) {
                console.log(e)
            }
        }
        getTokenIds()
    }, [account, balance, dispatch, chainId, tokenAddress])
    return [ tokenIds ]
}

export const GetNftInfo = (tokenAddress:string, listNftId:any, chainId:number) => {
    const marketplace = useSelector<AppState, AppState['marketplace']>((state) => state.marketplace)
    const nftInfo = marketplace.nftInfo
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getNftInfo = async () => {
            try {
                const result = await fetchBoxType(tokenAddress, listNftId, chainId)
                dispatch(fetchTokenInfo(result))
            } catch (e) {
                console.log(e)
            }
        }
        getNftInfo()
    }, [listNftId, dispatch, chainId, tokenAddress])
    return [ nftInfo ]
}