import contracts from 'config/constants/contracts';
import { useEffect, useState } from 'react';
import { getAddress } from "utils/addressHelpers"; 
import multicall from "utils/multicall";
import BigNumber from 'bignumber.js';
import tokens from 'config/constants/tokens';
import erc20ABI from 'config/abi/erc20.json'
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import mysteryBoxAbi from "config/abi/mysteryBox.json"
import mysteryBoxAbiONUS from "config/abi/mysteryBoxONUS.json"

export const GetPriceBox = () => {
    const {chainId } = useActiveWeb3React()
    const [ price, setPrice ] = useState(0);

    useEffect(() => {
        const getPriceBox = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(contracts.mysteryBox, chainId),
                        name: 'price',
                        params: []
                    }
                ]
                if(chainId === 1945 || chainId === 1975 || chainId === 10001){
                    const result = await multicall(mysteryBoxAbiONUS, calls, chainId);
                    setPrice(new BigNumber(result.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber());
                }
                if(chainId === 97 || chainId === 56){
                    const result = await multicall(mysteryBoxAbi, calls, chainId);
                    setPrice(new BigNumber(result.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber());
                }
            }
            catch(error) {
                console.log(error)
            }
        }
        getPriceBox();
    }, [chainId]);
    return { price }
}

export const GetAmountSold = (refresh: number) => {
    const { account, chainId } = useActiveWeb3React()
    const [inforSold, setInforSold] = useState({
        sold: 0,
        maxSell: 0
    });
    useEffect(() => {
        const fetchInforSell = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(contracts.mysteryBox, chainId),
                        name: 'maxNftToBuy',
                        params: []
                    },
                    {
                        address: getAddress(contracts.mysteryBox, chainId),
                        name: 'numOfBuy',
                        params: []
                    }
                ]
                const [ resultMaxNftToBuy, resultNumOfBuy ] = await multicall(mysteryBoxAbi, calls, chainId);
                setInforSold({
                    sold: Number(new BigNumber(resultNumOfBuy).toJSON()),
                    maxSell: Number(new BigNumber(resultMaxNftToBuy).toJSON())
                });
            }  catch (e) {
                console.log(e)
            }         
        }
        fetchInforSell(); 
    }, [refresh, chainId]);
    return { inforSold }
}

export const GetStartEndTime = () => {
    const { account, chainId } = useActiveWeb3React()
    const [ startEndTime, setStartEndTime ] = useState({
        startIn: 0,
        endIn: 0
    });
    useEffect(() => {
        const fetchTimeStartEndIn = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(contracts.mysteryBox, chainId),
                        name: 'startTimeBuy',
                        params: []
                    },
                    {
                        address: getAddress(contracts.mysteryBox, chainId),
                        name: 'endTimeBuy',
                        params: []
                    }
                ]
                const [ resultStartTimeBuy, resultEndTimeBuy ] = await multicall(mysteryBoxAbi, calls, chainId);
                setStartEndTime({
                    startIn: Number(new BigNumber(resultStartTimeBuy).toJSON()),
                    endIn: Number(new BigNumber(resultEndTimeBuy).toJSON())
                });
            } catch (e) {
                console.log(e)
            }
        }
        fetchTimeStartEndIn();
    }, [chainId]);
    return { startEndTime }
}

export const FetchDataUser = (requestedApproval) => {
    const { account, chainId } = useActiveWeb3React()
    const [ dataBalance, setDataBalance ] = useState({
        balanceOf: 0,
        isApprove: 0,
        balanceOfRun: 0,
        balanceOfRunBox: 0,
    });
    useEffect(() => {
      const fetchBalance = async () => {
        try {
             const calls = [
                {
                    address: getAddress(tokens.busd.address, chainId),
                    name: 'balanceOf',
                    params: [account]
                },
                {
                    address: getAddress(tokens.busd.address, chainId),
                    name: 'allowance',
                    params: [account, getAddress(contracts.mysteryBox, chainId)]
                },
                {
                    address: getAddress(tokens.Run.address, chainId),
                    name: 'balanceOf',
                    params: [account]
                },
                {
                    address: getAddress(contracts.mysteryBox, chainId),
                    name: 'balanceOf',
                    params: [account]
                },
             ]
            const [ resultBalance, allowance, resultBalanceRun, resultBalanceRunBox ] = await multicall(erc20ABI, calls, chainId);
            setDataBalance({
                balanceOf: Number(new BigNumber(resultBalance).toJSON()) /1E18,
                isApprove: Number(new BigNumber(allowance).toJSON()),
                balanceOfRun: Number(new BigNumber(resultBalanceRun).toJSON()) /1E18,
                balanceOfRunBox: Number(resultBalanceRunBox)
            })
        } catch (e) {
          console.log(e)
        }
      }
  
      if (account) {
        fetchBalance()
      }
    }, [account, requestedApproval, chainId])
    return { dataBalance }
}
export const FetchIDMysteryBox = (amountBox: number) => {
    const { account, chainId } = useActiveWeb3React()
    const [ idMysteryBox, setIdMysteryBox ] = useState([]);
    useEffect(() => {
      const fetchIdMysteryBox = async () => {
        try {
             const calls = []
             for(let i = 0; i < amountBox; i++){
                calls.push(
                    {
                        address: getAddress(contracts.mysteryBox, chainId),
                        name: 'tokenOfOwnerByIndex',
                        params: [account, i]
                    }
                )
             }
            const result = await multicall(mysteryBoxAbi, calls, chainId);
            setIdMysteryBox(result)
        } catch (e) {
          console.log(e)
        }
      }
      if (account) {
        fetchIdMysteryBox()
      }
    }, [account, amountBox, chainId])
    return { idMysteryBox }
}