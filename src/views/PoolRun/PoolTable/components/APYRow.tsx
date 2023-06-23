import { useTranslation } from "@pancakeswap/localization";
import { bscTestnetTokens, bscTokens } from "@pancakeswap/tokens";
import { CalculateIcon, Flex, Text, useModal } from "@pancakeswap/uikit";
import RoiCalculatorPool from "components/RoiCalculatorModal/RoiCalculatorPool";
import contracts from "config/constants/contracts";
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import React from "react";
import { usePriceRunBusd, useTokenPrice } from "state/farms/hooks";
import styled from "styled-components";
import { getExploreLinkWithAddress } from "utils";
import { getAddress } from "utils/addressHelpers";
import { GetTokenBalance } from "utils/getTokenBalance";

interface ApyRowProps {
    apy: string
}

const ApyRow: React.FC<ApyRowProps> = ({apy}) => {
    const { t } = useTranslation()
    const { chainId, account } = useActiveWeb3React()
    const runPriceBUSD = usePriceRunBusd().toNumber()
    const busdPrice = useTokenPrice(bscTokens.busd.address).toString()
    const { balance } = GetTokenBalance(bscTestnetTokens.runtogether.address, account, chainId)
    const linkBscScan = getExploreLinkWithAddress(chainId)
    const renderLink = `${linkBscScan}/${getAddress(contracts.poolRun)}`
    const [ openModal ] = useModal(
        <RoiCalculatorPool
            earningTokenPrice={Number(busdPrice)}
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
        <ContainerApy>
            <Text>APY</Text>
            <Flex style={{gap:"15px"}}>
                <Text bold> {apy}%</Text>
                <CalculateIcon style={{cursor:'pointer'}} onClick={openModal}/>
            </Flex>
        </ContainerApy>
    )
}
export default ApyRow

const ContainerApy = styled(Flex)`
    width:12.5%;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    height:70px;
    @media screen and (min-width: 600px) and (max-width: 1000px) {
        width:30%;
    }
    @media screen and (max-width: 600px) {
        width:50%;
    }
`