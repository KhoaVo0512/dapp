import { useEffect, useState } from "react"
import { getPoolProposalConfig } from "./constants"
import { poolProposalItem } from "./constants/type"

export const poolProposalConfig = (chainId:number) => {
    const UseActivePool = async (chain: number) => { 
        const investPool = await getPoolProposalConfig(chain)
        return investPool
    }
     // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ poolConfig, setPoolConfig ] =  useState<poolProposalItem[]>([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(
        () => {
          const UsePools = async () => {
            const activePools = await UseActivePool(chainId)
            setPoolConfig(activePools)
          }
          UsePools()
        },
        [chainId],
    )
    return poolConfig
}