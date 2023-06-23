import { useContext } from 'react'
import { ChainId } from '@pancakeswap/sdk'
import { SUPPORT_FARMS } from 'config/constants/supportChains'
import { FarmsPageLayout, FarmsContext } from 'views/Farms'
import FarmCard from 'views/Farms/components/FarmCard/FarmCard'
import { getDisplayApr } from 'views/Farms/components/getDisplayApr'
import { usePriceRunBusd } from 'state/farms/hooks'
import { useWeb3React } from '@pancakeswap/wagmi'
import ProxyFarmContainer, {
  YieldBoosterStateContext,
} from 'views/Farms/components/YieldBooster/components/ProxyFarmContainer'

const ProxyFarmCardContainer = ({ farm }) => {
  const { account } = useWeb3React()
  const cakePrice = usePriceRunBusd()

  const { proxyFarm, shouldUseProxyFarm } = useContext(YieldBoosterStateContext)
  const finalFarm = shouldUseProxyFarm ? proxyFarm : farm

  return (
    <FarmCard
      key={finalFarm.pid}
      farm={finalFarm}
      displayApr={getDisplayApr(finalFarm.apr, finalFarm.lpRewardsApr)}
      cakePrice={cakePrice}
      account={account}
      removed={false}
    />
  )
}

const FarmsPage = () => {
  const { account } = useWeb3React()
  const { chosenFarmsMemoized } = useContext(FarmsContext)
  const cakePrice = usePriceRunBusd()
  return (
    <>
      {chosenFarmsMemoized.map((farm) =>
        farm.boosted ? (
          <ProxyFarmContainer farm={farm} key={farm.pid}>
            <ProxyFarmCardContainer farm={farm} />
          </ProxyFarmContainer>
        ) : (
          <FarmCard
            key={farm.pid}
            farm={farm}
            displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
            cakePrice={cakePrice}
            account={account}
            removed={false}
          />
        ),
      )}
    </>
  )
}

FarmsPage.Layout = FarmsPageLayout

FarmsPage.chains = [ChainId.BSC, ChainId.ONUS_TESTNET, ChainId.ONUS]

export default FarmsPage
