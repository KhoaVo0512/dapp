import { useState, useEffect } from "react";
import BigNumber from 'bignumber.js'
import { ERC20_ABI } from 'config/abi/erc20'
import multicall from 'utils/multicall'



export const GetTokenBalance = (tokenAddress:string, account:string, chainId:number, requested=0) => {
    
    
    const [ balance, setBalance ] = useState("0")
    useEffect(() => {
        const getBalance = async () => {
            try {
                const calls = [
                    {
                        address: tokenAddress,
                        name: 'balanceOf',
                        params: [account]
                    }
                ]
                const [resultBalance] = await multicall(ERC20_ABI, calls, chainId)
                setBalance((new BigNumber(resultBalance).dividedBy(1E18)).toString())
            }
            catch(error) {
                console.log(tokenAddress)
                console.log(chainId)
                console.log(account)
                console.log(error)
            }
        }
    
        if (account !== undefined && tokenAddress.length) {
            getBalance()
        }
        }, [account, tokenAddress, chainId, requested])

    return { balance }
}