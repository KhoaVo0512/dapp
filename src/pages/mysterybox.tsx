import { ChainId } from '@pancakeswap/sdk'
import { MysteryBoxLayout } from 'views/MysteryBox'

// const MysteryBox = () => <MysteryBoxLayout />

const MysteryBox = () => {
    return (
      <>
        <MysteryBoxLayout />
      </>
    )
}


MysteryBox.chains = [ChainId.BSC_TESTNET, ChainId.ONUS_TESTNET, ChainId.ETHW_MAINNET, ChainId.ONUS]

export default MysteryBox