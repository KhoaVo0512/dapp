import { onusTestnetTokens } from "@pancakeswap/tokens"
import contracts from "config/constants/contracts"
import { PoolConfig } from "./type"

const poolConfig:PoolConfig[] = [
    {
        poolId:1,
        tokenStake:onusTestnetTokens.runtogether,
        tokenEarn:onusTestnetTokens.busd,
        apy:"20",
        name:"Pool Run",
        withdrawFee:"1%-3%",
        poolContract:contracts.poolRun,
        widthdrawDescription:[
            "Fee for withdrawing within first 48h: 3%",
            "Fee for withdrawing after first 48h in first month: 1%",
            "No withdrawal fee after first month"
        ]
    }
]
export default poolConfig