import BigNumber from "bignumber.js";
import poolStoreAbi from "config/abi/poolStore.json";
import { useEffect, useState } from "react";
import multicall from "utils/multicall";

export const GetDataPoolLength = (contractAddress, chainId) => {
    const [ poolLength, setpoolLength ] = useState(0)
    useEffect(() => {
        const getPoolLength = async () => {
            try {
                const calls = [
                    {
                        address: contractAddress,
                        name: 'poolLength',
                        params: []
                    },
                ]
                const [ resultPoollength ] = await multicall(poolStoreAbi, calls, chainId)               
                setpoolLength(Number(new BigNumber(resultPoollength.toString())))
            }
            catch(error) {
                console.log(error)
            }
        }
        getPoolLength()
      }, [ contractAddress, chainId ])

    return { poolLength }
}