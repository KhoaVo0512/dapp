import React, { useState, useEffect } from "react";
import multicall from "utils/multicall";
import BigNumber from "bignumber.js";
import poolProposalAbi from "config/abi/poolProposals.json"
import { useWeb3React } from "@web3-react/core";
import { ERC20_ABI } from "config/abi/erc20";

export const GetTotalStakedByUser = (contractPoolProposalsAddress, refresh, account, chainId) => {
    const [ totalStakeByUser, setTotalStakeByUser ] = useState("0")
    useEffect(() => {
        const getTotalStakedByUser = async () => {
            try {
                const calls = [
                    {
                        address: contractPoolProposalsAddress,
                        name: 'userInfo',
                        params: [account]
                    },
                ]
                const [ resultTotalStaked ] = await multicall(poolProposalAbi, calls, chainId)
                setTotalStakeByUser(new BigNumber(resultTotalStaked.amount?.toString()).dividedBy(1E18).toString())
            }
            catch(error) {
                console.log(error)
            }
        }
        if (account) {
            getTotalStakedByUser()
        } else {
            setTotalStakeByUser("0")
        }
      }, [contractPoolProposalsAddress, refresh]) // eslint-disable-line react-hooks/exhaustive-deps

    return { totalStakeByUser }
}

export const GetTotalStaked = (tokenStakeAddress, contractAddress, refresh, chainId) => {
    const [ tvl, setTvl ] = useState("0")
    useEffect(() => {
        const getTotalStaked = async () => {
            try {
                const calls = [
                    {
                        address: tokenStakeAddress,
                        name: 'balanceOf',
                        params: [contractAddress]
                    },
                ]
                const [ resultTotalStaked ] = await multicall(ERC20_ABI, calls, chainId)
                const converNumber = new BigNumber(resultTotalStaked)
                const amount = converNumber.dividedBy(1E18)     
                setTvl(amount.toString())
            }
            catch(error) {
                console.log(error)
            }
        }
        if (contractAddress) {
            getTotalStaked()
        }
      }, [contractAddress, refresh, chainId]) // eslint-disable-line react-hooks/exhaustive-deps

    return { tvl }
}