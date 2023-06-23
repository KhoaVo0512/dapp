
import { bscTokens } from "@pancakeswap/tokens"
import contracts from "../../contracts"
import { poolProposalItem } from "./type"

const investPool:poolProposalItem[] = [
    {
        storeID:1,
        storeName:"META SHOP",
        revenue:"30%",
        apy:"20",
        depositFee:"2%",
        tokenStake:bscTokens.runtogether,
        tokenEarn:bscTokens.busd,
        storeLocation:"FundGo Building, 81A Nguyen Hien Street, An Khanh, Ninh Kieu, Can Tho City, Vietnam",
        storeContract:contracts.poolProposals1,
        poolStoreContract:contracts.poolStore1,
        depositFeeDescription:["Fee for withdrawing before first 6 months: 2%", "No withdraw fee after 6 months"]
    },
    {
        storeID:2,
        storeName:"META SHOP",
        revenue:"30%",
        apy:"20",
        depositFee:"2%",
        tokenStake:bscTokens.runtogether,
        tokenEarn:bscTokens.busd,
        storeLocation:"Co.opmart Can Tho, 1 Hoa Binh Avenue, Tan An, Ninh Kieu, Can Tho City, Vietnam",
        storeContract:contracts.poolProposals2,
        poolStoreContract:contracts.poolStore2,
        depositFeeDescription:["Fee for withdrawing before first 6 months: 2%", "No withdraw fee after 6 months"]
    }
]

export default investPool