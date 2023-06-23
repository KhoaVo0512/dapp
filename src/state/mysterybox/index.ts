import { useCurrency } from 'hooks/Tokens'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { AppDispatch, AppState } from '../index'
import { fetchAmountSoldMystery, fetchIDMysteryBox, fetchMysteryBox, fetchMysteryToken, fetchStartEndTimeMystery } from './actions'
import { fetchAmountSold, fetchBalanceMysteryBox, fetchBalanceMysteryToken, fetchMysteryBoxID, fetchStartEndTime } from './fetchMysteryBox'

export const GetBalanceMysteryBox = (account: string, chainId: number) => {
    const data = useSelector<AppState, AppState['mysteryBox']>((state) => state.mysteryBox)
    const balanceMysteryBox = data.balanceOfRunBox
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getBalanceMysteryBox = async () => {
            try {
                const result = await fetchBalanceMysteryBox(account, chainId)
                dispatch(fetchMysteryBox(result))
            } catch (e) {
                console.log("error")
            }
        }
        getBalanceMysteryBox()
    }, [dispatch, account, chainId])
    return [ balanceMysteryBox]
}

export const GetIDMysteryBox = (amount: number, account, chainId) => {
    const data = useSelector<AppState, AppState['mysteryBox']>((state) => state.mysteryBox)
    const idMysteryBox = data.mysteryBoxID
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getIdMysteryBox = async () => {
            try {
                const result = await fetchMysteryBoxID(amount, account, chainId)
                dispatch(fetchIDMysteryBox(result))
            } catch (e) {
                console.log("error")
            }
        }
        getIdMysteryBox()
    }, [dispatch, amount, account, chainId])
    return [ idMysteryBox ]
}

export const GetBalanceMysteryToken = (account: string, chainId: number) => {
    const data = useSelector<AppState, AppState['mysteryBox']>((state) => state.mysteryBox)
    const balanceMysteryBUSD = data.balanceOfBUSD
    const balanceMysteryApprove = data.balanceOfApprove
    const balanceMysteryRun = data.balanceOfRun
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getBalanceMysteryToken = async () => {
            try {
                const result = await fetchBalanceMysteryToken(account, chainId)
                dispatch(fetchMysteryToken(result))
            } catch (e) {
                console.log("error")
            }
        }
        getBalanceMysteryToken()
    }, [dispatch, account, chainId])
    return [balanceMysteryBUSD, balanceMysteryApprove, balanceMysteryRun ]
}
export const GetCoinChain = (account) => {
    const router = useRouter()
    const native = useNativeCurrency()
    const [currencyIdA] = router.query.currency || [native.symbol]
    const currencyA = useCurrency(currencyIdA)
    const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currencyA ?? undefined)
    
    return [ selectedCurrencyBalance ]
}

export const GetAmountSold = (refresh: number, chainId) => {
    const data = useSelector<AppState, AppState['mysteryBox']>((state) => state.mysteryBox)
    const inforSold = data.inforSold
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getIdMysteryBox = async () => {
            try {
                const result = await fetchAmountSold(chainId)
                dispatch(fetchAmountSoldMystery(result))
            } catch (e) {
                console.log("error")
            }
        }
        getIdMysteryBox()
    }, [dispatch, refresh, chainId])
    return [inforSold[0]]
}

export const GetStartEndTime = (chainId) => {
    const data = useSelector<AppState, AppState['mysteryBox']>((state) => state.mysteryBox)
    const startEndTime = data.startEndTime
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getIdMysteryBox = async () => {
            try {
                const result = await fetchStartEndTime(chainId)
                dispatch(fetchStartEndTimeMystery(result))
            } catch (e) {
                console.log("error")
            }
        }
        getIdMysteryBox()
    }, [dispatch, chainId])
    return [startEndTime[0]]
}