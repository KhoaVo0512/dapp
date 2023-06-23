import React from "react";
import styled from "styled-components";
import { Text, Flex, WalletIcon, Progress, Heading, Box } from "@pancakeswap/uikit";
import { GetTokenBalance } from "utils/getTokenBalance";
import { bscTokens, ethwTokens, bscTestnetTokens, onusMainnetTokens } from '@pancakeswap/tokens'
import { ChainId } from '@pancakeswap/sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from '@pancakeswap/localization'

const CardOnChain = () => {
    function renderTokenByChain(chainId){
        if( chainId === ChainId.BSC ) {
            return bscTokens.runtogether.address
        } if (chainId === ChainId.ETHW_MAINNET) {
            return ethwTokens.runtogether.address
        } if (chainId === ChainId.BSC_TESTNET) {
            return bscTestnetTokens.runtogether.address
        }
        if (chainId === ChainId.CORE) {
            return onusMainnetTokens.runtogether.address
        }
        return ""
    }
    const { chainId, account } = useActiveWeb3React()
    const { t } = useTranslation()
    const tokenAddress = renderTokenByChain(chainId)
    const { balance } = GetTokenBalance(tokenAddress, account, chainId)
    return(
        <Container>
            <Flex width="100%" alignItems="center">
                <WalletIcon filterColor="#12575e" />
                <Text bold fontSize="18px" ml="10px" >Round information</Text>
            </Flex>
            <Flex width="100%">
                <Flex width="50%" flexDirection="column">
                    <Text fontSize="12px" bold >Token</Text>
                    <Flex alignItems="center">
                        <Text bold  mr="5px">
                            <Text bold fontSize="14px" >COREDOGE</Text>
                        </Text>
                    </Flex>
                </Flex>
                <Flex flexDirection="column">
                    <Text fontSize="12px" bold >Symbol</Text>
                    <Flex alignItems="center">
                        <Text bold  mr="5px">
                            <Text bold fontSize="14px" >$CDC</Text>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex width="100%">
                <Flex width="50%" flexDirection="column">
                    <Text fontSize="12px" bold >Total allocation</Text>
                    <Flex alignItems="center">
                        <Text bold  mr="5px">
                            <Text bold fontSize="14px" >6,000,000 $CDC</Text>
                        </Text>
                    </Flex>
                </Flex>
                <Flex flexDirection="column">
                    <Text fontSize="12px" bold >Price</Text>
                    <Flex alignItems="center">
                        <Text bold  mr="5px">
                            <Text bold fontSize="14px" >1 $CDC ~ 0.0125 CORE</Text>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Container>
    )
}

export default CardOnChain

const Container = styled(Flex)`
    justify-content: space-around;
    align-items: center;
    flex-direction:column;
    height: 160px;
    width:100%;
    border-radius:12px;
    background: linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%); 
    padding:18px 22px 18px 22px;
`