import BigNumber from "bignumber.js";
import votingProposalsAbi from "config/abi/votingProposals.json";
import contracts from "config/constants/contracts";
import { useEffect, useState } from "react";
import { getAddress } from "utils/addressHelpers";
import multicall from "utils/multicall";

export const FetchDataVoting = (votingId, refresh,chainId, account, requestedUnStake=true) => {
    const [ dataVoting, setDataVoting ] = useState({
        agree:"0",
        refuse:"0",
        totalVote:"0",
        startDate:0,
        endDate:0,
        chairPerson:"",
        endTimeLockChairPerson:0,
        isUnStaked:false
        
    })
    useEffect(() => {
      const fetcDataVoting = async () => {
        try {
             const calls = [
                {
                  address: getAddress(contracts.votingProposals,chainId),
                  name: 'voteCounter',
                  params: [votingId, true]
                },
                {
                    address: getAddress(contracts.votingProposals,chainId),
                    name: 'voteCounter',
                    params: [votingId, false]
                },
                {
                  address: getAddress(contracts.votingProposals,chainId),
                  name: 'proposals',
                  params: [votingId]
                },
                {
                  address: getAddress(contracts.votingProposals,chainId),
                  name: 'isUnstaked',
                  params: [votingId, account]
                }
             ]
            const [ votingAgree, votingRefuse, resultProposals, resultUnstaked ] = await multicall(votingProposalsAbi,calls,chainId)
           
            setDataVoting({
                agree:(new BigNumber(votingAgree).dividedBy(1E18)).toString(),
                refuse:(new BigNumber(votingRefuse).dividedBy(1E18)).toString(),
                totalVote:(new BigNumber(votingAgree).dividedBy(1E18)).plus(new BigNumber(votingRefuse).dividedBy(1E18)).toString(),
                startDate:Number((resultProposals?.startTime).toString()),
                endDate:Number((resultProposals?.endTime).toString()),
                chairPerson:resultProposals?.chairPerson,
                endTimeLockChairPerson:Number((resultProposals?.endTimeLockChairPerson).toString()),
                isUnStaked:resultUnstaked[0]
            })
        } catch (e) {
          console.log('err',e)
        }
      }
      if (votingId) {
        fetcDataVoting()
      }
    }, [chainId, refresh, votingId, requestedUnStake, account])
  
    return { dataVoting }
}
