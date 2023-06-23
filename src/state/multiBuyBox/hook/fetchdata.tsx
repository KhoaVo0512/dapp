import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "state"
import { fetchAllowanceMarketMultiBuy, fetchBalanceNftInMarkeMultiBuy, fetchNftTransfer, fetchTotalBoxOfUser, fetchUserBuyBox } from ".."
import { fetchAMountListBoxByUser, fetchBalanceNftInMarket, fetchDataUser, fetchMaxNftTransfer, fetchTotalBoxofUserBuy } from "../actions"



export const GetBalanceNftInMarket = (chainId:number) => {
    const marketMultiBuy = useSelector<AppState, AppState['marketMultiBuy']>((state) => state.marketMultiBuy)
    const nftInfo = marketMultiBuy.nftInfo
    const nftBalance = nftInfo.nftBalance
    const nftPrice = nftInfo.nftPrice
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getNftBalanceInMarket = async () => {
            try {
                const result = await fetchBalanceNftInMarkeMultiBuy(chainId)
                dispatch(fetchBalanceNftInMarket(result))
               
            } catch (e) {
                console.log(e)
            }
        }
        getNftBalanceInMarket();
    }, [chainId, dispatch])
    return [ nftBalance, nftPrice ]
}

export const GetDataUser = (account:string, chainId: number) => {
    const marketMultiBuy = useSelector<AppState, AppState['marketMultiBuy']>((state) => state.marketMultiBuy)
    const dataUser = marketMultiBuy.dataUser
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getDataUser = async () => {
            try {
                const result = await fetchAllowanceMarketMultiBuy(account, chainId)
                dispatch(fetchDataUser(result))
            } catch (e) {
                console.log(e)
            }
        }
        getDataUser();
    }, [dispatch, account])
    return [ dataUser ]
}

export const GetTotalBoxUserBuy = (account:string, chainId: number) => {
    const marketMultiBuy = useSelector<AppState, AppState['marketMultiBuy']>((state) => state.marketMultiBuy)
    const totalBoxUserBuy = marketMultiBuy.totalBoxOfUser
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getTotalBoxUserBuy = async () => {
            try {
                const result = await fetchTotalBoxOfUser(account, chainId)
                dispatch(fetchTotalBoxofUserBuy(result))
            } catch (e) {
                console.log(e)
            }
        }
        getTotalBoxUserBuy(); 
    }, [dispatch, account])
    return [ totalBoxUserBuy ]
}

export const GetBoxBuyOfUser = (account:string, chainId: number) => {
    const marketMultiBuy = useSelector<AppState, AppState['marketMultiBuy']>((state) => state.marketMultiBuy)
    const listBoxByUser = marketMultiBuy.listBoxByUser
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getListUserBuyBox= async () => {
            try {
                const result = await fetchUserBuyBox(account, chainId)
                dispatch(fetchAMountListBoxByUser(result))
            } catch (e) {
                console.log(e)
            }
        }
        getListUserBuyBox(); 
    }, [dispatch, account, chainId])
    return [ listBoxByUser ]
}

export const GetMaxNftTransfer = (chainId) => {
    const marketMultiBuy = useSelector<AppState, AppState['marketMultiBuy']>((state) => state.marketMultiBuy)
    const maxNftTransfer = marketMultiBuy.maxNftTransfer
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getNftTransfer= async () => {
            try {
                const result = await fetchNftTransfer(chainId)
                dispatch(fetchMaxNftTransfer(result))
            } catch (e) {
                console.log(e)
            }
        }
        getNftTransfer(); 
    }, [dispatch])
    return [ maxNftTransfer ]
}