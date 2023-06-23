import React, { useState, useEffect } from "react";
import { getAddress } from "utils/addressHelpers";
import RunTogetherBox from "config/abi/RunTogetherBox.json"
import multicall from "utils/multicall";
import BigNumber from "bignumber.js";
// import tokens from "config/constants/tokens";
// import { useWeb3React } from "@web3-react/core";
// import { parseInt } from "lodash";
// import axios from 'axios'
// import useRefresh from 'hooks/useRefresh'
import contracts from "config/constants/contracts";
// import RunMarketplace from "config/abi/RunMarketplace.json"
// import { ERC20_ABI } from "config/abi/erc20";
import { ERC20_ABI } from "config/abi/erc20";
import useActiveWeb3React from "hooks/useActiveWeb3React";

export const FetchApprove = (requestedApprovalForAll, nftRunBoxAddress, chainId) => {
    const [ dataApprove, setDataApprove ] = useState(false)
    const { account } = useActiveWeb3React()
    useEffect(() => {
      const fetchBalance = async () => {
        try {
              const approvedForAll = [
                  {
                    address: nftRunBoxAddress,
                    name: 'isApprovedForAll',
                    params: [account, getAddress(contracts.runMarketplace, chainId)]
                  },
              ]
              const [ resultForAll ] = await multicall(RunTogetherBox, approvedForAll, chainId)
              setDataApprove(resultForAll[0])
        } catch (e) {
          console.log(e)
        }
      }
  
      if (account) {
        fetchBalance()
      }
    }, [account, requestedApprovalForAll, nftRunBoxAddress, chainId])
  
    return { dataApprove }
}


export const GetSimpleBoxType = (nftId, tokenAddress: string, chainId: number) => {
    const [ boxType, setBoxType ] = useState(0)
    useEffect(() => {
        const getListBoxType = async () => {
            try {
                const calls = [
                    {
                        address: tokenAddress,
                        name: 'getBoxType',
                        params: [nftId]
                    }
                ]
                const result = await multicall(RunTogetherBox, calls, chainId);
                setBoxType(Number(new BigNumber(result[0]).toJSON()))
            }
            catch(error) {
                console.log(error)
            }
        }
    
        if (nftId) {
            getListBoxType()
        }
      }, [nftId, tokenAddress, chainId])

    return { boxType }
}




export const FetchApproveContractTransfer = (requestedApproval, nftRunBoxAddress, chainId) => {
    const [ allowance, setAllowance ] = useState(false)
    const { account } = useActiveWeb3React()
    useEffect(() => {
      const fetchBalance = async () => {
        try {
             const approvedForAll = [
                {
                  address: nftRunBoxAddress,
                  name: 'isApprovedForAll',
                  params: [account, getAddress(contracts.withdrawNftRun, chainId)]
                },
             ]
            const [ resultForAll ] = await multicall(RunTogetherBox, approvedForAll, chainId)
            setAllowance(resultForAll[0])
        } catch (e) {
          console.log(e)
        }
      }
  
      if (account) {
        fetchBalance()
      }
    }, [account, requestedApproval, nftRunBoxAddress, chainId])
  
    return { allowance }

}

export const FetchApproveFee = (requestedApproveFee, tokenRunAddress, chainId) => {
  const [ isApproveFee, setApproveFee ] = useState(0)
  const { account } = useActiveWeb3React()
  useEffect(() => {
    const fetchApproveFee = async () => {
      try {
           const approvedForAll = [
              {
                address: tokenRunAddress,
                name: 'allowance',
                params: [account, getAddress(contracts.withdrawNftRun, chainId)]
              },
           ]
          const [ resultFee ] = await multicall(ERC20_ABI, approvedForAll, chainId)
          setApproveFee(Number(new BigNumber(resultFee).toString()))
      } catch (e) {
        console.log(e)
      }
    }
    if (account) {
      fetchApproveFee()
    }
  }, [account, requestedApproveFee, tokenRunAddress, chainId])

  return { isApproveFee }
}

export const FetchBalanceFee = (tokenRunAddress, chainId) => {
  const [ balanceFee, setBalanceFee ] = useState(0)
  const { account } = useActiveWeb3React()
  useEffect(() => {
    const fetchBalanceFee = async () => {
      try {
           const calls = [
              {
                address: tokenRunAddress,
                name: 'balanceOf',
                params: [account]
              },
           ]
          const [ resultFee ] = await multicall(ERC20_ABI, calls, chainId)
          setBalanceFee(Number(new BigNumber(resultFee).toString())/1E18)
      } catch (e) {
        console.log(e)
      }
    }
    if (account) {
      fetchBalanceFee()
    }
  }, [account, tokenRunAddress, chainId])

  return { balanceFee }
}

export const GetOwnerOf = (nftId, tokenAddress: string, chainId: number) => {
  const [ isowner, setIsOwner ] = useState("")

  useEffect(() => {
      // eslint-disable-next-line consistent-return
      const getFCOwner = async () => {
          try {
              const calls = [
                  {
                      address: tokenAddress,
                      name: 'ownerOf',
                      params: [nftId]
                  }
              ]
              const result = await multicall(RunTogetherBox, calls, chainId);           
              setIsOwner(result[0].toString())
          }
          catch(error) {              
            setIsOwner("error")
          }
      }
      if (nftId) {
         getFCOwner()
      }
    }, [nftId, tokenAddress, chainId])

  return { isowner }
}


