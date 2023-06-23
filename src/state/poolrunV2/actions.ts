import { createAction } from '@reduxjs/toolkit'

// @ts-ignore
// eslint-disable-next-line import/extensions
import { PoolRunInfo } from './type'

export const fetchPoolInfo = createAction<PoolRunInfo>('poolrunreducerv2/fetchPoolInfo')