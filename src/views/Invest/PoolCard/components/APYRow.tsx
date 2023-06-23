import { useTranslation } from "@pancakeswap/localization";
import { CalculateIcon, Flex, Text, useModal } from "@pancakeswap/uikit";
import RoiCalculatorPool from "components/RoiCalculatorModal/RoiCalculatorPool";
import contracts from "config/constants/contracts";
import { getAddress } from "utils/addressHelpers";
import { getExploreLinkWithAddress } from "utils";
import { bscTestnetTokens, bscTokens } from "@pancakeswap/tokens";
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { usePriceRunBusd, useTokenPrice } from "state/farms/hooks";
import React from "react";
import { GetTokenBalance } from "utils/getTokenBalance";

interface ApyRowProps {
    apy: string
}
const APYRow: React.FC<ApyRowProps> = ({apy}) => {
    const { t } = useTranslation()
    const { account, chainId } = useActiveWeb3React()
    const runPriceBUSD = usePriceRunBusd().toNumber()
    const busdPrice = useTokenPrice(bscTokens.busd.address).toNumber()
    const linkBscScan = getExploreLinkWithAddress(chainId)
    const renderLink = `${linkBscScan}/${getAddress(contracts.poolRun)}`
    
    const { balance } = GetTokenBalance(bscTestnetTokens.runtogether.address, account, chainId)
    const [ openModal ] = useModal(
        <RoiCalculatorPool
            earningTokenPrice={busdPrice}
            stakingTokenPrice={runPriceBUSD}
            apr={Number(apy)}
            linkHref={renderLink}
            linkLabel={t('Get %symbol%', { symbol: bscTokens.runtogether.symbol })}
            stakingTokenSymbol="RUN"
            earningTokenSymbol="BUSD"
            tokenBalance={Number(balance)}
          />
    )
    return (
        <Flex width="100%" justifyContent="space-between" mt="20px">
            <Text>APY</Text>
            <Flex alignItems="center" style={{gap:"5px", cursor:"pointer"}} onClick={openModal}>
                <Text>{apy}%</Text>
                <CalculateIcon style={{cursor:'pointer'}}/>
            </Flex>
        </Flex>
    )
}
export default APYRow