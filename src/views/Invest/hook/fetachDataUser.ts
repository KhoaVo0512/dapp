import BigNumber from "bignumber.js";
import erc20ABI from 'config/abi/erc20.json';
import { useEffect, useState } from "react";
import multicall from "utils/multicall";

export const GetDataUser = (tokenStakeAddress:string, contractPoolAddress:string, refresh=0, account, chainId) => {
    const [ dataUser, setDataUser ] = useState({
        balance:"",
        allowance:0
    })
    useEffect(() => {
        const getDataUser = async () => {
            try {
                const calls = [
                    {
                        address: tokenStakeAddress,
                        name: 'balanceOf',
                        params: [account]
                    },
                    {
                        address: tokenStakeAddress,
                        name: 'allowance',
                        params: [account, contractPoolAddress]
                    }
                ]
                const [resultBalance, resultAllowance ] = await multicall(erc20ABI, calls, chainId)
                setDataUser({
                    balance:(new BigNumber(resultBalance).dividedBy(1E18)).toString(),
                    allowance:Number(new BigNumber(resultAllowance).toJSON())
                })
            }
            catch(error) {
                console.log(error)
            }
        }
        if ( account !== undefined && tokenStakeAddress.length && contractPoolAddress.length ) {
            getDataUser()
        }
      }, [tokenStakeAddress, contractPoolAddress, refresh, account, chainId]) 

    return { dataUser }
}