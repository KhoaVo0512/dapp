
import { createReducer } from '@reduxjs/toolkit'
import { Decrypts } from "config/api/decrypts";
import { fecthTokenByUser } from './actions';

const token = Decrypts()

interface globalStateAccount {
    tokenByUser:string
}
export const initialState: globalStateAccount = {
    tokenByUser:token
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(fecthTokenByUser, (state, action) => {
      state.tokenByUser = action.payload.tokenByUser
    })
)
