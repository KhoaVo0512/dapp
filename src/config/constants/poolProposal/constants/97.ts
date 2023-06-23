
import { bscTestnetTokens } from "@pancakeswap/tokens"
import contracts from "../../contracts"
import { poolProposalItem } from "./type"

const investPool:poolProposalItem[] = [
    {
        storeID:1,
        storeName:"RUN Store 1",
        revenue:"30%",
        apy:"20",
        depositFee:"2%",
        tokenStake:bscTestnetTokens.runtogether,
        tokenEarn:bscTestnetTokens.busd,
        storeLocation:"81 Nguyen Hien Street, An Khanh, Ninh Kieu, Can Tho city",
        storeContract:contracts.poolProposals1,
        poolStoreContract:contracts.poolStore1,
        depositFeeDescription:["Fee for withdrawing before first 6 months: 2%", "No withdraw fee after 6 months"]
    },
    {
        storeID:2,
        storeName:"RUN Store 2",
        revenue:"30%",
        apy:"20",
        depositFee:"2%",
        tokenStake:bscTestnetTokens.runtogether,
        tokenEarn:bscTestnetTokens.busd,
        storeLocation:"81 Nguyen Hien Street, An Khanh, Ninh Kieu, Can Tho city",
        storeContract:contracts.poolProposals2,
        poolStoreContract:contracts.poolStore2,
        depositFeeDescription:["Fee for withdrawing before first 6 months: 2%", "No withdraw fee after 6 months"]
    }
]

export default investPool