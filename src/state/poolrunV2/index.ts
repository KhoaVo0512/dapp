import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
// @ts-ignore
// eslint-disable-next-line import/extensions
import { fetchData } from "./fetchData"
import { fetchPoolInfo } from "./actions"
// @ts-ignore
// eslint-disable-next-line import/extensions
import { PoolConfig } from "./type"

export const GetPoolInfo = (account:string, poolConfig:PoolConfig[], chainId:number, ) => {
    const data = useSelector<AppState, AppState['poolrunreducerv2']>((state) => state.poolrunreducerv2)
    const poolInfo = data.listPool
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getDataUser = async () => {
            try {
                const result = await fetchData(account, poolConfig, chainId )
                dispatch(fetchPoolInfo(result))
            } catch (e) {
                console.log(e)
            }
        }
        getDataUser()
    }, [ dispatch, account, poolConfig, chainId ]) 
    return [ poolInfo ]
}