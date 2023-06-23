import { poolProposalItem } from "./type"

let logged = false

export const getPoolProposalConfig = async (chainId: number) => {
  try {
    return (await import(`/${chainId}.ts`)).default.filter(
      (f: poolProposalItem) => f.storeID !== null,
    ) as poolProposalItem[]
  } catch (error) {
    if (!logged) {
      console.error('Cannot get proposals config', error, chainId)
      logged = true
    }
    return []
  }
}
