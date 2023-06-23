import React, { useState, useEffect } from "react";
import multicall from "utils/multicall";
import BigNumber from "bignumber.js"
import votingProposal from "config/abi/votingProposals.json"
import useActiveWeb3React from 'hooks/useActiveWeb3React'  

export const FetchVotingDuration =  (contractAddress,chainId) =>{
    const [stakeVotingDuration, setStakeVotingDuration] = useState(0);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { account } = useActiveWeb3React()
    useEffect(()=>{
         const getminAmountToWin = async ()=>{
             try {
                 const calls = [
                    {
                        address: contractAddress,
                        name: 'votingDuration',
                        params: []
                    },
                 ]   
                 const [resultvotingDuration] = await multicall(votingProposal,calls,chainId);
               
                 setStakeVotingDuration( Number(new BigNumber(resultvotingDuration).toString()))
             }
             catch(error) {
                console.log(error)
            }
         }
            getminAmountToWin()
    },[contractAddress, account, chainId])
    return {stakeVotingDuration}
}

