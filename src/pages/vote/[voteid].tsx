import { ChainId } from '@pancakeswap/sdk';
import { SWRConfig } from 'swr'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Vote from 'views/Vote'

const VotePage = () => {
  return (
    <Vote />
  )
}

VotePage.chains = [ChainId.BSC, ChainId.BSC_TESTNET]


export default VotePage



