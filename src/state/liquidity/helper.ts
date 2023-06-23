import BigNumber from 'bignumber.js'
import getPrice from 'utils/priceHelpers'

export const getTotalSupplyPrices = async(address: any) => {
    try {
        const value = await getPrice(address)
        const price = new BigNumber(value).toNumber()
        return price
    } catch {
        return 0
    }
}