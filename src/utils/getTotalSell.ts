import useActiveWeb3React from "hooks/useActiveWeb3React";
import { fetchTotalSell } from "state/marketplace/hook/fetchDataMarketPlace";

export async function getSaleItem () {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { chainId } = useActiveWeb3React()
    const activeItems = await fetchTotalSell(chainId)
    return activeItems
}

export const listPaths = () => {
    const paths = []
    for ( let index = 1; index <= 96; index++){
        paths.push(
            {
                params: { saleId : index },
            },
        )
    }
    return paths
}