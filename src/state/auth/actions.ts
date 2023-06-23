import { createAction } from '@reduxjs/toolkit'

export const fecthTokenByUser = createAction<{tokenByUser:string|undefined}>('account/fecthTokenByUser')
