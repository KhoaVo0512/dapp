import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import account from './account/reducer'
import authReducer from './auth/reducer'
import burn from './burn/reducer'
import demoRedux from './demoFetchData/reducer'
import farmReducer from './farms'
import mysteryBox from './mysterybox/reducer'
import { updateVersion } from './global/actions'
import globalReducer from './global/reducer'
import infoReducer from './info'
import inventory from './inventory/reducer'
import limitOrders from './limitOrders/reducer'
import marketplace from './marketplace/reducer'
import mint from './mint/reducer'
import luckyBox from './luckyBox/reducer'
import marketMultiBuy from './multiBuyBox/reducer'
import multicall from './multicall/reducer'
import mybalance from './mybalance/reducer'
import poolProposals from './poolProposals/reducer'
import poolrunreducerv2 from './poolrunV2/reducer'
import poolsReducer from './pools'
import swap from './swap/reducer'
import transactions from './transactions/reducer'
import user from './user/reducer'
import votingProposals from './votingProposals/reducer'

const PERSISTED_KEYS: string[] = ['user', 'transactions']

const persistConfig = {
  key: 'primary',
  whitelist: PERSISTED_KEYS,
  blacklist: ['profile'],
  storage,
  version: 1,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    global: globalReducer,
    farms: farmReducer,
    pools: poolsReducer,
    info: infoReducer,
    limitOrders,

    // Exchange
    user,
    account,
    transactions,
    swap,
    mint,
    burn,
    multicall,
    mybalance,
    authReducer,
    demoRedux,
    mysteryBox,
    votingProposals,
    poolProposals,
    marketplace,
    poolrunreducerv2,
    marketMultiBuy,
    luckyBox,
    inventory,
  }),
)

// eslint-disable-next-line import/no-mutable-exports
let store: ReturnType<typeof makeStore>

export function makeStore(preloadedState = undefined) {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  })
}

export const initializeStore = (preloadedState = undefined) => {
  let _store = store ?? makeStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store

  // Create the store once in the client
  if (!store) {
    store = _store
  }

  return _store
}

store = initializeStore()

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store

export const persistor = persistStore(store, undefined, () => {
  store.dispatch(updateVersion())
})

export function useStore(initialState) {
  return useMemo(() => initializeStore(initialState), [initialState])
}
