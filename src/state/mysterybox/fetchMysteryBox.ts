import { BigNumber } from 'bignumber.js';
import erc20ABI from 'config/abi/erc20.json';
import mysteryBoxAbi from 'config/abi/mysteryBox.json';
import mysteryBoxAbiONUS from 'config/abi/mysteryBoxONUS.json';
import contracts from 'config/constants/contracts';
import tokens from 'config/constants/tokens';
import { getAddress } from 'utils/addressHelpers';
import multicall from 'utils/multicall';
import { balanceMysteryBox, balanceMysteryToken, idMysteryBox, inforSoldMystery, startEndTimeMystery } from "./types";

export const fetchBalanceMysteryBox = async (account: string, chainId: number): Promise<balanceMysteryBox> => {
  try {
    const calls = [
      {
        address: getAddress(contracts.mysteryBox, chainId),
        name: 'balanceOf',
        params: [account]
      },
    ]
    const [resultBalanceBox] = await multicall(chainId === 1945 || chainId === 1975 ? mysteryBoxAbiONUS : mysteryBoxAbi, calls, chainId);
    return {
      balanceOfRunBox: Number(resultBalanceBox),
    }
  } catch (e) {
    return {
      balanceOfRunBox: 0,
    }
  }
}

export const fetchMysteryBoxID = async (amountBox: number, account: string, chainId: number): Promise<idMysteryBox> => {
  try {
    const calls = []
    for (let i = 0; i < amountBox; i++) {
      calls.push(
        {
          address: getAddress(contracts.mysteryBox, chainId),
          name: 'tokenOfOwnerByIndex',
          params: [account, i]
        }
      )
    }
    const result = await multicall(chainId === 1945 || chainId === 1975 ? mysteryBoxAbiONUS : mysteryBoxAbi, calls, chainId);
    return {
      mysteryBoxID: result
    }
  } catch (e) {
    return {
      mysteryBoxID: []
    }
  }
}

export const fetchBalanceMysteryToken = async (account: string, chainId: number): Promise<balanceMysteryToken> => {
  try {
    const calls = [
      {
        address: getAddress(tokens.busd.address, chainId),
        name: 'balanceOf',
        params: [account]
      },
      {
        address: getAddress(tokens.Run.address, chainId),
        name: 'balanceOf',
        params: [account]
      },
      {
        address: getAddress(tokens.busd.address, chainId),
        name: 'allowance',
        params: [account, getAddress(contracts.mysteryBox, chainId)]
      },
    ]
    const [resultBalanceBUSD, resultBalanceRun, allowance] = await multicall(erc20ABI, calls, chainId);
    return {
      balanceOfBUSD: Number(new BigNumber(resultBalanceBUSD).toJSON()) / 1E18,
      balanceOfRun: Number(new BigNumber(resultBalanceRun).toJSON()) / 1E18,
      balanceOfApprove: Number(new BigNumber(allowance).toJSON()) / 1E18,
    }
  } catch (e) {
    return {
      balanceOfBUSD: 0,
      balanceOfApprove: 0,
      balanceOfRun: 0,
    }
  }
}

export const fetchAmountSold = async (chainId: number): Promise<inforSoldMystery> => {
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
    const [resultMaxNftToBuy, resultNumOfBuy] = await multicall(mysteryBoxAbi, calls, chainId);
    return {
      inforSold: [
        {
        sold: Number(new BigNumber(resultNumOfBuy[0]._hex).toString()),
        maxSell: Number(new BigNumber(resultMaxNftToBuy[0]._hex).toString()),
        }
      ]
    }
  } catch (e) {
    return {
      inforSold:[
        {
          sold: 0,
          maxSell: 0
        }
      ]
    }
  }
}

export const fetchStartEndTime = async (chainId: number): Promise<startEndTimeMystery> => {
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
    const [resultStartTimeBuy, resultEndTimeBuy] = await multicall(mysteryBoxAbi, calls, chainId);
    return {
      startEndTime: [
        {
          startIn: Number(new BigNumber(resultStartTimeBuy[0]._hex).toString()),
          endIn: Number(new BigNumber(resultEndTimeBuy[0]._hex).toString()),
        }
      ]
    }
  } catch (e) {
    return {
      startEndTime:[
        {
          startIn: 0,
          endIn: 0
        }
      ]
    }
  }
}