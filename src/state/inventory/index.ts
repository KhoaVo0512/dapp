import { useEffect } from 'react'
import { GetTokenUser } from 'state/auth'
import { Decrypts } from "config/api/decrypts";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { fetchShoes, fetchBoxes } from './actions'
import { fetchListBoxes, fetchListShoes } from './hook/fetchDataOffChain'

export const GetListShoes = (userId:number) => {
    const inventory = useSelector<AppState, AppState['inventory']>((state) => state.inventory)
    const listShoes = inventory.listShoes
    const [ tokenByUser ] = GetTokenUser()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getListShoes = async () => {
            try {
                const result = await fetchListShoes(userId, tokenByUser)
                dispatch(fetchShoes(result))
            } catch (e) {
                console.log(e)
            }
        }
        if ( tokenByUser && userId !== null) {
            getListShoes()
        } else {
            dispatch(fetchShoes({
                listShoes:[]
            }))
        }
    }, [userId, tokenByUser])
    return [ listShoes ]
}

export const GetListBoxes = (userId: number) => {
    const inventory = useSelector<AppState, AppState['inventory']>((state) => state.inventory)
    const listBoxes = inventory.listBoxes
    const [ tokenByUser ] = GetTokenUser()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getListBoxes = async () => {
            try {
                const result = await fetchListBoxes(userId, tokenByUser)
                dispatch(fetchBoxes(result))
            } catch (e) {
                console.log(e)
            }
        }
        if (tokenByUser && userId !== null) {
            getListBoxes()
        } else {
            dispatch(fetchBoxes({
                listBoxes:[]
            }))
        }
    }, [userId, tokenByUser])
    return [ listBoxes ]
}