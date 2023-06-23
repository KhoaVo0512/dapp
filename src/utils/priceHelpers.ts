import Web3 from 'web3';
import { AbiItem } from "web3-utils"
import { ChainId } from '@pancakeswap/sdk';
import { ROUTER_ADDRESS } from 'config/constants/exchange';
import pancakeSwapAbi from "../config/abi/pancakeRouter.json";
import tokenAbi  from "../config/abi/erc20.json";

const BSC_NODE = "https://bsc-dataseed1.binance.org"

async function calcSell( tokenAddres: string){
    const web3 = new Web3(BSC_NODE);
    const BNBTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";

    const router = await new web3.eth.Contract( pancakeSwapAbi as AbiItem[], ROUTER_ADDRESS[ChainId.BSC] );
    const tokenRouter = await new web3.eth.Contract( tokenAbi  as AbiItem[], tokenAddres ); 
    const tokenDecimals = await tokenRouter.methods.decimals().call();
    
    const tokensToSell = setDecimals(1, tokenDecimals);
    let amountOut;
    try {
        amountOut = await router.methods.getAmountsOut(tokensToSell, [tokenAddres ,BNBTokenAddress]).call();
        amountOut =  web3.utils.fromWei(amountOut[1]);
    } catch (error) {
        console.log(error)
    }
    
    if(!amountOut) return 0;
    return amountOut;
}

async function calcBNBPrice() {
    const web3 = new Web3(BSC_NODE);
    const BNBTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    const USDTokenAddress  = "0x55d398326f99059fF775485246999027B3197955"; 
    const bnbToSell = web3.utils.toWei("1", "ether") ;
    let amountOut;
    try {
        const router = await new web3.eth.Contract( pancakeSwapAbi  as AbiItem[], ROUTER_ADDRESS[ChainId.BSC] );
        amountOut = await router.methods.getAmountsOut(bnbToSell, [BNBTokenAddress ,USDTokenAddress]).call();
        amountOut =  web3.utils.fromWei(amountOut[1]);
    } catch (error) {
        console.log(error)
    }
    if(!amountOut) return 0;
    return amountOut;
}

function setDecimals( number: number, decimals: number ){
    const numberValue = number.toString();
    const numberAbs = numberValue.split('.')[0]
    let numberDecimals = numberValue.split('.')[1] ? numberValue.split('.')[1] : '';
    while( numberDecimals.length < decimals ){
        numberDecimals += "0";
    }
    return numberAbs + numberDecimals;
}

export default async function getPrice( tokenAddres: string ) {
    const bnbPrice = await calcBNBPrice() 
    if (tokenAddres.toLocaleLowerCase() === '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c') {
        return +bnbPrice;
    }
    
    const priceInBnb = await calcSell(tokenAddres.toLocaleLowerCase())/1; 
    return +priceInBnb*+bnbPrice
}