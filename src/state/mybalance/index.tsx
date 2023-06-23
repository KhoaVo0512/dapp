import { useCallback, useEffect } from 'react'
import { URL } from 'config/api/configHttp'
import { useDispatch, useSelector } from 'react-redux'
import { Decrypts } from "config/api/decrypts";
import { GetTokenUser } from 'state/auth';
import { AppDispatch, AppState } from '../index'
import { fetchAllTransactions, fetchBalance } from "./actions"
import { fetchListTransactions, fetchUserBalance } from './fetchData'

export const GetAllTransaction = (start:string, end:string) => {
    const mybalance = useSelector<AppState, AppState['mybalance']>((state) => state.mybalance)
    const listAllTransactions = mybalance.listTransactions
    const [ tokenByUser ] = GetTokenUser()
    // eslint-disable-next-line no-console
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getAllTransactions = async () => {
            try {
                const renderURL = start !== null && end !== null ?  `${URL}/balance/get-history?from=${start}&to=${end}` : `${URL}/balance/get-history`
                const result = await fetchListTransactions(renderURL)
                dispatch(fetchAllTransactions(result))
            } catch (e) {
                console.log(e)
            }
        }
        if ( tokenByUser ) {
            getAllTransactions()
        }
    }, [start, end, dispatch, tokenByUser])
    return [ listAllTransactions ]
}

export const GetListBalance = () => {
    const mybalance = useSelector<AppState, AppState['mybalance']>((state) => state.mybalance)
    const mainBalance = mybalance.listBanlace.mainBalance
    const [ tokenByUser ] = GetTokenUser()
    const earnBalance = mybalance.listBanlace.earnBalance
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getListBalance = async () => {
            try {
                const result = await fetchUserBalance()
                dispatch(fetchBalance(result))
            } catch (e) {
                console.log(e)
            }
        }
        if( tokenByUser ) {
            getListBalance()
        }
    }, [tokenByUser])
    return [ mainBalance, earnBalance ]
}