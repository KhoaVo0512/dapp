
/* eslint-disable camelcase */
import { URL_SNAPSHORT_BSC, URL_SNAPSHORT_BSC_TESTNET } from ".."

export const GetURL_SNAPSHORT = (chainId:number) => {
  switch (chainId) {
    case 56:
      return URL_SNAPSHORT_BSC
    case 97:
      return URL_SNAPSHORT_BSC_TESTNET
    default:
      return ""
  }
}