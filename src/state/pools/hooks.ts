import { getFarmConfig } from '@pancakeswap/farms/constants'
import { useWeb3React } from '@pancakeswap/wagmi'
import { FAST_INTERVAL } from 'config/constants'
import { livePools } from 'config/constants/pools'
import { useFastRefreshEffect } from 'hooks/useRefreshEffect'
import { useMemo } from 'react'
import { batch, useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import useSWRImmutable from 'swr/immutable'

import {
  fetchCakePoolUserDataAsync, fetchCakeVaultFees, fetchCakeVaultPublicData,
  fetchCakeVaultUserData, fetchIfoPublicDataAsync, fetchUserIfoCreditDataAsync
} from '.'
import { DeserializedPool, VaultKey } from '../types'
import {
  ifoCeilingSelector, ifoCreditSelector, makePoolWithUserDataLoadingSelector,
  makeVaultPoolByKey, makeVaultPoolWithKeySelector, poolsWithVaultSelector
} from './selectors'

const lPoolAddresses = livePools.filter(({ sousId }) => sousId !== 0).map(({ earningToken }) => earningToken.address)

// Only fetch farms for live pools
const getActiveFarms = async (chainId: number) => {
  const farmsConfig = await getFarmConfig(chainId)
  return farmsConfig
    .filter(
      ({ token, pid, quoteToken }) =>
        pid !== 0 &&
        ((token.symbol === 'BUSD' && quoteToken.symbol === 'WBNB') ||
          lPoolAddresses.find((poolAddress) => poolAddress === token.address)),
    )
    .map((farm) => farm.pid)
}

export const usePool = (sousId: number): { pool: DeserializedPool; userDataLoaded: boolean } => {
  const poolWithUserDataLoadingSelector = useMemo(() => makePoolWithUserDataLoadingSelector(sousId), [sousId])
  return useSelector(poolWithUserDataLoadingSelector)
}

export const usePoolsWithVault = () => {
  return useSelector(poolsWithVaultSelector)
}

export const useDeserializedPoolByVaultKey = (vaultKey) => {
  const vaultPoolWithKeySelector = useMemo(() => makeVaultPoolWithKeySelector(vaultKey), [vaultKey])

  return useSelector(vaultPoolWithKeySelector)
}

export const useCakeVaultUserData = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useFastRefreshEffect(() => {
    if (account) {
      dispatch(fetchCakeVaultUserData({ account }))
    }
  }, [account, dispatch])
}

export const useCakeVaultPublicData = () => {
  const dispatch = useAppDispatch()
  useFastRefreshEffect(() => {
    dispatch(fetchCakeVaultPublicData())
  }, [dispatch])
}

export const useFetchIfo = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useSWRImmutable(
    'fetchIfoPublicData',
    async () => {
      batch(() => {
        dispatch(fetchCakeVaultPublicData())
        dispatch(fetchIfoPublicDataAsync())
      })
    },
    {
      refreshInterval: FAST_INTERVAL,
    },
  )

  useSWRImmutable(
    account && 'fetchIfoUserData',
    async () => {
      batch(() => {
        dispatch(fetchCakePoolUserDataAsync(account))
        dispatch(fetchCakeVaultUserData({ account }))
        dispatch(fetchUserIfoCreditDataAsync(account))
      })
    },
    {
      refreshInterval: FAST_INTERVAL,
    },
  )

  useSWRImmutable('fetchCakeVaultFees', async () => {
    dispatch(fetchCakeVaultFees())
  })
}

export const useCakeVault = () => {
  return useVaultPoolByKey(VaultKey.CakeVault)
}

export const useVaultPoolByKey = (key: VaultKey) => {
  const vaultPoolByKey = useMemo(() => makeVaultPoolByKey(key), [key])

  return useSelector(vaultPoolByKey)
}

export const useIfoCredit = () => {
  return useSelector(ifoCreditSelector)
}

export const useIfoCeiling = () => {
  return useSelector(ifoCeilingSelector)
}
