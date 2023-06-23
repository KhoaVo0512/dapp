import React, { useState, useEffect } from "react";
import multicall from "utils/multicall";
import BigNumber from "bignumber.js"
import poolStoreAbi from "config/abi/poolStore.json";
import { useWeb3React } from "@web3-react/core";

export const GetStakeAmountByBlock =  (contractAddress,callback,poolLength, chainId) =>{
    const [stakeAmountByBlock, setStakeAmountByBlock] = useState(true);
    const { account } = useWeb3React();   
    useEffect(()=>{
         const getStakeAmountByBlock = async ()=>{
             try {
                 const calls = [
                    {
                        address: contractAddress,
                        name: 'withdrawStatusByBlockMap',
                        params: [account,poolLength]
                    },
                 ]   
                 const [resultStakeAMount] = await multicall(poolStoreAbi, calls, chainId);                 
                 setStakeAmountByBlock(resultStakeAMount[0])
             }
             catch(error) {
                console.log(error)
            }
         }
         if (account) {
            getStakeAmountByBlock()
        }
    },[contractAddress,account,callback,poolLength, chainId])
    return {stakeAmountByBlock}
}

