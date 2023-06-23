import multicall from "utils/multicall"
import contracts from "config/constants/contracts"
import { getAddress } from "utils/addressHelpers"
import RunMarketplaceAbi from 'config/abi/RunMarketplaceAbi.json'
import runNftAbi from "config/abi/RunTogetherBox.json"
import BigNumber from "bignumber.js"
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ListSellItemsProps, SellListProps, TotalSellProps,  TokenIdsProps, NftInfoProps, } from "../type"

type BalanceProps = {
  balance: number
}

export const fetchTotalSell = async (chainId:number): Promise<TotalSellProps> => {
    try {
      const calls = [
            {
              address: getAddress(contracts.runMarketplace, chainId),
              name: 'saleItemsCount',
              params: []
            }
          ]
          const [result] = await multicall(RunMarketplaceAbi, calls, chainId)
          return {
            totalSell: Number(new BigNumber(result).toJSON())
          }
    }
    catch(error) {
      console.log(error)
      return {
        totalSell: 0
      }
    }
}

export const fetchItemsSellByUser = async (chainId:number ,totalSellItems:number, account:string|undefined): Promise<SellListProps> => {
    try {
      const calls = [];
        for (let index = 0; index < totalSellItems; index++) {
            calls.push({
                address: getAddress(contracts.runMarketplace, chainId),
                name: 'saleItems',
                params: [index]
            })
        }
      const result = await multicall(RunMarketplaceAbi, calls, chainId);
      const filterData = result.filter(data=> data.seller.toUpperCase() === account?.toUpperCase() && data.isSold === false )
      const data = filterData.map((item, i) => {
        return { 
            saleId: Number(item.saleId.toString()),
            nftId: Number(item.nftId.toString()),
            priceListing: new BigNumber(item.priceListing.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber(),
            isSold:item.isSold,
            seller:item.seller,
            buyer:item.buyer,
            currency:item.currency,
            nft:item.nft,
            boxType:new BigNumber(item.boxType.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber()*1E18,
            adminSale:item.adminSale
         }
      })
      return {
        listItemsSell:data
      }
    }
    catch(error) {
        console.log(error)
        return {
          listItemsSell:[]
        }
    }
  }

  export const fetchItemsSell = async (totalSellItems:number, chainId:number): Promise<ListSellItemsProps> => {
    try {
      if(totalSellItems > 0) {
        const calls = [];
        for (let index = 0; index < totalSellItems; index++) {
          calls.push({
              address: getAddress(contracts.runMarketplace, chainId),
              name: 'saleItems',
              params: [index]
          })
        }
        const result = await multicall(RunMarketplaceAbi, calls, chainId);
        const filterData = result?.filter(data => data.isSold === false)
        const data = filterData?.map((item, i) => {
          return { 
            saleId:  Number(new BigNumber(item.saleId.toString())),
            nftId: item.nftId.toString(),
            priceListing: new BigNumber(item.priceListing.toString()).dividedBy(1E18).toNumber(),
            isSold:item.isSold,
            seller:item.seller,
            buyer:item.buyer,
            currency:item.currency,
            nft:item.nft,
            boxType:new BigNumber(item.boxType.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber()*1E18,
            adminSale:item.adminSale
          }
        })
        return {
          listItems:data
        }
      }      
      return {
        listItems:[]
      }
    }
    catch(error) {
        console.log(error)
        return {
          listItems:[]
        }
    }
  }

export const fetchBalanceNft = async (tokenAddress:string, account:string, chainId:number): Promise<BalanceProps> => {
  try {
        const calls = [
          {
            address: tokenAddress,
            name: 'balanceOf',
            params: [account]
          }
        ]
        const result = await multicall(runNftAbi, calls, chainId)
        const resultNumber = new BigNumber(result.toString()).toNumber();
        return {
          balance: resultNumber
        } 
  } catch (e) {
    console.log(e)
    return {
      balance: 0
    } 
  }
}

 export const fetchTokensId = async (tokenAddress:string, account:string, balance:number, chainId:number): Promise<TokenIdsProps> => {
  try {
    const listId = []
    const calls = [];
    for (let index = 0; index < balance; index++) {
        calls.push({
            address: tokenAddress,
            name: 'tokenOfOwnerByIndex',
            params: [account, index]
        })
    }
    const result = await multicall(runNftAbi, calls, chainId);
    for( let index = 0;index < result.length;index++){
        listId.push(parseInt(result[index].toString()))
    }
    return {
      tokenIds:listId
    }
  }
  catch(error) {
      console.log(error)
      return {
        tokenIds:[]
      }
  }
}
export const fetchBoxType = async (tokenAddress:string, listNftId:any, chainId:number): Promise<NftInfoProps> => {
  try {
    const calls = [];
      for (let index = 0; index < listNftId.length; index++) {
          calls.push({
              address: tokenAddress,
              name: 'getBoxType',
              params: [listNftId[index]]
          })
      }
    const result = await multicall(runNftAbi, calls, chainId);
    const mergeData = result.map((item, i) => {
      return { nftId:listNftId[i], nftType: parseInt(item.toString()) }
    })
    return {
      nftInfo:mergeData
    }
  }
  catch(error) {
      console.log(error)
      return {
        nftInfo:[]
      }
  }
}