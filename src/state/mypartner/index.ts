import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Decrypts } from 'config/api/decrypts'
import { GetTokenUser } from 'state/auth';
import { AppDispatch, AppState } from '../index'
// eslint-disable-next-line import/named
import { fetchLevelVip, fetchReferralCode, fetchnonceCodeByUser, fetchUser, fetchPartnerConfig, fetchParentPartnerData, fetchListReferalData} from "./fetchData"
import { fetchUserLevelVip, fetchreferralCode, fetchnonceCode, fetchUserInfo, fetchListPartnerConfig,fetchParentPartner, fetchListReferal } from "./actions"

export const GetLevelVip = () => {
    const account = useSelector<AppState, AppState['account']>((state) => state.account)
    const level = account.level
    const [ tokenByUser ] = GetTokenUser()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getDataUser = async () => {
            try {
                const result = await fetchLevelVip()
                dispatch(fetchUserLevelVip(result))
            } catch (e) {
                console.log(e)
            }
        }
        getDataUser()
    }, [tokenByUser])
    return [ level ]
}

export const GetReferralCode = () => {
    const account = useSelector<AppState, AppState['account']>((state) => state.account)
    const referralCode = account.referralCode
    const [ tokenByUser ] = GetTokenUser()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getReferralCode = async () => {
            try {
                const result = await fetchReferralCode()
                dispatch(fetchreferralCode(result))
            } catch (e) {
                console.log(e)
            }
        }
        getReferralCode()
    }, [tokenByUser]) 
    return [ referralCode ]
}

export const GetNonceCode = (account:string) => {
    const userData = useSelector<AppState, AppState['account']>((state) => state.account)
    const nonceCode = userData.nonceCode
    const [ tokenByUser ] = GetTokenUser()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getReferralCode = async () => {
            try {
                const result = await fetchnonceCodeByUser(account)
                dispatch(fetchnonceCode(result))
            } catch (e) {
                console.log(e)
            }
        }
        getReferralCode()
    }, [account, dispatch, tokenByUser])
    return [ nonceCode ]
}

export const GetUser = () => {
    const userData = useSelector<AppState, AppState['account']>((state) => state.account)
    const user = userData.userInfo
    const [ tokenByUser ] = GetTokenUser()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const result = await fetchUser()
                dispatch(fetchUserInfo(result))
            } catch (e) {
                console.log(e)
            }
        }
        getUserInfo()
    }, [dispatch, tokenByUser])
    return [ user ]
}

export const GetPartnerConfig = () => {
    const userData = useSelector<AppState, AppState['account']>((state) => state.account)
    const partnerConfig = userData.listPartnerConfig
    const [ tokenByUser ] = GetTokenUser()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const result = await fetchPartnerConfig()
                dispatch(fetchListPartnerConfig(result))
            } catch (e) {
                console.log(e)
            }
        }
        getUserInfo()
    }, [dispatch, tokenByUser])
    return [ partnerConfig ]
}

export const GetParentPartner = () => {
    const userData = useSelector<AppState, AppState['account']>((state) => state.account)
    const partnerparent = userData.parentpartner;
    const [ tokenByUser ] = GetTokenUser()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getparentPartner = async () => {
            try {
                const result = await fetchParentPartnerData()
                dispatch(fetchParentPartner(result))
            } catch (e) {
                console.log(e)
            }
        }
        getparentPartner()
    }, [dispatch, tokenByUser])
    return [ partnerparent ]
}

export const GetListReferal = () => {
    const userData = useSelector<AppState, AppState['account']>((state) => state.account)
    const listreferal = userData.getlistreferal;
    const [ tokenByUser ] = GetTokenUser()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getlistReferal = async () => {
            try {
                const result = await fetchListReferalData()
                dispatch(fetchListReferal(result));
            } catch (e) {
                console.log(e)
            }
        }
        getlistReferal()
    }, [dispatch, tokenByUser])
    return [ listreferal ]
}