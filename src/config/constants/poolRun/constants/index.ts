import { PoolConfig } from "./type"

let logged = false

export const getPoolConfig = async (chainId: number) => {
  try {
    return (await import(`/${chainId}.ts`)).default.filter(
      (f: PoolConfig) => f.poolId !== null,
    ) as PoolConfig[]
  } catch (error) {
    if (!logged) {
      console.error('Cannot get farm config', error, chainId)
      logged = true
    }
    return []
  }
}
