import { createAction } from '@reduxjs/toolkit'

export const fetchBalance = createAction<{balance:string}>('demoRedux/fetchBalance')