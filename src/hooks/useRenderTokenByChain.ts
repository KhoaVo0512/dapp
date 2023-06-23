import { ChainId } from "@pancakeswap/sdk"
import { bscTestnetTokens, bscTokens, ethwTokens } from "@pancakeswap/tokens"

export const renderTokenRunByChain = (chainId) => {
    if( chainId === ChainId.BSC ) {
        return bscTokens.runtogether.address
    } if (chainId === ChainId.ETHW_MAINNET) {
        return ethwTokens.runtogether.address
    } if (chainId === ChainId.BSC_TESTNET) {
        return bscTestnetTokens.runtogether.address
    }
    return ""
}
export const renderNftRunBoxByChain = (chainId) => {
    if( chainId === ChainId.BSC ) {
        return bscTokens.runtogetherBoxNft.address
    } if (chainId === ChainId.ETHW_MAINNET) {
        // return ethwTokens.runtogetherBoxNft.address
    } if (chainId === ChainId.BSC_TESTNET) {
        return bscTestnetTokens.runtogetherBoxNft.address
    }
    return ""
}

export const renderTokenBUSDByChain = (chainId) => {
    if( chainId === ChainId.BSC ) {
        return bscTokens.busd.address
    } if (chainId === ChainId.BSC_TESTNET) {
        return bscTestnetTokens.busd.address
    }
    return ""
}