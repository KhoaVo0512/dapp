import { useEffect, useState } from "react"
import { BIG_ZERO } from "utils/bigNumber"
import axios from 'axios';
import BigNumber from "bignumber.js";
import { getTokenPrice } from 'state/pools/helpers'


import useRefresh from "./useRefresh"




export const GetTokenPrice = (tokenAddress: string) => {
    const [tokenPrice, setTokenPrice] = useState(BIG_ZERO)
    const { slowRefresh } = useRefresh()
  
    useEffect(() => {
      const source = axios.CancelToken.source()
      const fetchBalance = async () => {
        try {
          const tokenPriceObject = await getTokenPrice(tokenAddress)
          setTokenPrice(new BigNumber(tokenPriceObject?.usdPrice.toString()))
        } catch (e) {
          if (axios.isCancel(e)) {
            console.log(e)
          } else {
            console.log(e)
          }
        }
      }
  
      fetchBalance()
      return () => {
        source.cancel()
      }
    }, [tokenAddress, setTokenPrice, slowRefresh])
    return tokenPrice
  }