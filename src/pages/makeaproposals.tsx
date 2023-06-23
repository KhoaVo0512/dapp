import { ChainId } from '@pancakeswap/sdk'
import MakeAProposal from '../views/MakeAProposals'

const MakeAProposalPage = () => <MakeAProposal />

MakeAProposalPage.chains = [ChainId.BSC, ChainId.BSC_TESTNET]

export default MakeAProposalPage