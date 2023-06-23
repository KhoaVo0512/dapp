import BigNumber from "bignumber.js"
import contracts from "config/constants/contracts"
import { getAddress } from "utils/addressHelpers"
import multiBuyBox from 'config/abi/multiBuyBox.json'
import multicall from "utils/multicall"
import { ERC20_ABI } from "config/abi/erc20"
import { renderTokenBUSDByChain } from "hooks/useRenderTokenByChain"
import { dataUserType, ListBoxByUser, maxNftTransfer, nftInMarket, totalBoxOfUser } from "./type"


export const fetchBalanceNftInMarkeMultiBuy = async (chainId:number): Promise<nftInMarket> => {
    const contractAddress = getAddress(contracts.runMarketplaceMultiByBox, chainId) || ""
    if ( contractAddress.length ) {
        try {
            const callsBalance = []
            const callsPrice = []
            for( let index=1; index<=4; index++){
                callsBalance.push({
                    address: getAddress(contracts.runMarketplaceMultiByBox, chainId),
                    name: 'runTogetherBoxNftTypeCountMap',
                    params: [index]
                })
                callsPrice.push({
                    address: getAddress(contracts.runMarketplaceMultiByBox, chainId),
                    name: 'runTogetherBoxNftTypePriceMap',
                    params: [index]
                })
            }
            const resultBalance = await multicall(multiBuyBox, callsBalance, chainId)
            const resultPrice = await multicall(multiBuyBox, callsPrice, chainId)
            
            return {
                nftInfo:{
                    nftBalance:{
                        totalNftMetaRush:Number(new BigNumber(resultBalance[0].toString())),
                        totalNftMetaRun:Number(new BigNumber(resultBalance[1].toString())),
                        totalNftMetaRace:Number(new BigNumber(resultBalance[2].toString())),
                        totalNftMetaRich:Number(new BigNumber(resultBalance[3].toString()))
                    },
                    nftPrice:{
                        totalNftMetaRush:Number(new BigNumber(resultPrice[0].toString()).dividedBy(1E18)),
                        totalNftMetaRun:Number(new BigNumber(resultPrice[1].toString()).dividedBy(1E18)),
                        totalNftMetaRace:Number(new BigNumber(resultPrice[2].toString()).dividedBy(1E18)),
                        totalNftMetaRich:Number(new BigNumber(resultPrice[3].toString()).dividedBy(1E18))
                    }
                }
            }
          } catch (e) {
            console.log(e)
            
            return {
                nftInfo:{
                    nftBalance:{
                        totalNftMetaRush:0,
                        totalNftMetaRun:0,
                        totalNftMetaRace:0,
                        totalNftMetaRich:0,
                    },
                    nftPrice:{
                        totalNftMetaRush:0,
                        totalNftMetaRun:0,
                        totalNftMetaRace:0,
                        totalNftMetaRich:0,
                    }
                }
            }
          }
    } else {
        return {
            nftInfo:{
                nftBalance:{
                    totalNftMetaRush:0,
                    totalNftMetaRun:0,
                    totalNftMetaRace:0,
                    totalNftMetaRich:0,
                },
                nftPrice:{
                    totalNftMetaRush:0,
                    totalNftMetaRun:0,
                    totalNftMetaRace:0,
                    totalNftMetaRich:0,
                }
            }
    }
 }
}

export const fetchTotalBoxOfUser = async (account:string, chainId: number): Promise<totalBoxOfUser> => {
    const contractAddress = getAddress(contracts.runMarketplaceMultiByBox, chainId) || ""
    if ( account && contractAddress.length ) {
        try {
            const calls = [
               {
                   address: getAddress(contracts.runMarketplaceMultiByBox, chainId),
                   name: 'totalBoxOfUser',
                   params: [account]
               }
            ]
            const [resultTotalBoxOfUser] = await multicall(multiBuyBox, calls, chainId)
            return {
                totalBoxOfUser:Number(new BigNumber(resultTotalBoxOfUser.toString()))
            }
          } catch (e) {
            console.log(e)
            return {
                totalBoxOfUser:0
            }
          }
    } else {
        return {
            totalBoxOfUser:0
         }
    }
}

export const fetchUserBuyBox= async (account:string, chainId: number): Promise<ListBoxByUser> => {
    const contractAddress = getAddress(contracts.runMarketplaceMultiByBox, chainId) || ""
    if ( account && contractAddress.length ) {
        try {
            const calls = []
            for( let index=1; index<=4; index++){
               calls.push({
                    address: getAddress(contracts.runMarketplaceMultiByBox, chainId),
                    name: 'userBoxTypeMap',
                    params: [account, index]
                })
            }
            const resultlistBox = await multicall(multiBuyBox, calls, chainId)
            return {
               listBoxByUser:{
                   totalBoxMetaRush:Number(new BigNumber(resultlistBox[0].toString())),
                   totalBoxMetaRun:Number(new BigNumber(resultlistBox[1].toString())),
                   totalBoxMetaRace:Number(new BigNumber(resultlistBox[2].toString())),
                   totalBoxMetaRich:Number(new BigNumber(resultlistBox[3].toString())),
               }
            }
          } catch (e) {
            console.log(e)
            return {
               listBoxByUser:{
                   totalBoxMetaRush:0,
                   totalBoxMetaRun:0,
                   totalBoxMetaRace:0,
                   totalBoxMetaRich:0,
               }
            }
          }
    } else {
        return {
            listBoxByUser:{
                totalBoxMetaRush:0,
                totalBoxMetaRun:0,
                totalBoxMetaRace:0,
                totalBoxMetaRich:0,
            }
         }
    }
 }

export const fetchNftTransfer = async (chainId: number): Promise<maxNftTransfer> => {
    const contractAddress = getAddress(contracts.runMarketplaceMultiByBox, chainId) || ""
    try {
        const calls = [
           {
               address: contractAddress,
               name: 'maxNftInTransfer',
               params: []
           }
        ]
        const [resultNftTransfer] = await multicall(multiBuyBox, calls, chainId)
        return {
            maxNftTransfer:Number(new BigNumber(resultNftTransfer.toString()))
        }
      } catch (e) {
        console.log(e)
        return {
            maxNftTransfer:0
        }
      }
}

export const fetchAllowanceMarketMultiBuy = async (account:string, chainId: number): Promise<dataUserType> => {
    const contractMultiBuyAddress = getAddress(contracts?.runMarketplaceMultiByBox, chainId)
    if ( account && contractMultiBuyAddress?.length ) {
            const tokenAddress = renderTokenBUSDByChain(chainId)
            try {
                const calls = [
                   {
                       address: tokenAddress,
                       name: 'allowance',
                       params: [account, contractMultiBuyAddress],
                   },
                   {
                       address: tokenAddress,
                       name: 'balanceOf',
                       params: [account]
                   }
                ]
                const [resultAllowance, resultBalanceOf] = await multicall(ERC20_ABI, calls, chainId)
                return {
                   dataUser:{
                       balanceOf:(new BigNumber(resultBalanceOf.toString()).dividedBy(1E18)).toString(),
                       allowance:(new BigNumber(resultAllowance.toString()).dividedBy(1E18)).toString()
                   }
                }
            } catch (e) {
                console.log(e)
                return {
                   dataUser:{
                       balanceOf:"0",
                       allowance:"0"
                   }
                }
            }
        } else {
            return {
                dataUser:{
                    balanceOf:"0",
                    allowance:"0"
                }
             }
        }
}