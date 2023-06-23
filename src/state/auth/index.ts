import { useSelector } from 'react-redux'
import { AppState } from 'state'

export const GetTokenUser = () => {
    const account = useSelector<AppState, AppState['authReducer']>((state) => state.authReducer)
    const tokenByUser = account.tokenByUser
    return [ tokenByUser ]
}