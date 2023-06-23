import React from "react";
import styled from "styled-components";
import { Text, Flex, WalletIcon } from "@pancakeswap/uikit";
import { useTranslation } from '@pancakeswap/localization'
import { DecryptsUserInfo } from "config/api/decrypts";
import { GetListBalance } from "state/mybalance";


const CardOffChain = () => {
    const { t } = useTranslation()
    const [ mainBalance, earnBalance ] = GetListBalance()
    const data:any = DecryptsUserInfo() || "";

    return(
        <Container>
            <Flex width="100%" alignItems="center">
                <WalletIcon filterColor="#12575e" />
                <Text bold fontSize="18px" ml="10px" >Allowance</Text>
            </Flex>
            <Flex width="100%">
                <Flex width="50%" flexDirection="column">
                    <Text fontSize="12px" bold >Min allowance</Text>
                    <Flex alignItems="center">
                        <Text bold  mr="5px">
                            <Text bold fontSize="14px" >10.00 CORE</Text>
                        </Text>
                    </Flex>
                </Flex>
                <Flex flexDirection="column">
                    <Text fontSize="12px" bold >Max allowance</Text>
                    <Flex alignItems="center">
                        <Text bold  mr="5px">
                            <Text bold fontSize="14px" >200.00 CORE</Text>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex width="100%">
                <Flex width="50%" flexDirection="column">
                    <Text fontSize="12px" bold >Start time</Text>
                    <Flex alignItems="center">
                        <Text bold  mr="5px">
                            <Text bold fontSize="14px" >20 April 2023 12:00:00 UTC</Text>
                        </Text>
                    </Flex>
                </Flex>
                <Flex flexDirection="column">
                    <Text fontSize="12px" bold >End time</Text>
                    <Flex alignItems="center">
                        <Text bold  mr="5px">
                            <Text bold fontSize="14px" >22 April 2023 12:00:00 UTC</Text>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Container>
    )
}

export default CardOffChain

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

// background: #C6FFDD;  /* fallback for old browsers */
// background: -webkit-linear-gradient(to right, #f7797d, #FBD786, #C6FFDD);  /* Chrome 10-25, Safari 5.1-6 */
// background: linear-gradient(to right, #f7797d, #FBD786, #C6FFDD); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
