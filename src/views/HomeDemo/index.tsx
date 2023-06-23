
import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import { bscTestnetTokens, bscTokens, ethwTokens } from '@pancakeswap/tokens'
import { AutoRenewIcon, Button, Flex, Text } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import PageHeader from 'components/Layout/PageHeader'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTheme from 'hooks/useTheme'
import { GetTokenBalance } from 'state/demoFetchData'
import { useTransfer } from 'state/demoFetchData/useTranferToken'

function renderTokenByChain(chainId){
    if( chainId === ChainId.BSC ) {
        return bscTokens.runtogether.address
    } if (chainId === ChainId.ETHW_MAINNET) {
        return ethwTokens.runtogether.address
    } if (chainId === ChainId.BSC_TESTNET) {
        return bscTestnetTokens.runtogether.address
    }
    return ""
}

const HomeDemo = () => {
    const { t } = useTranslation()
    const { chainId } = useActiveWeb3React()
    const account = "0xA6912ed0CB1700c0fa7200Dfe26e90dd2aE2364a"
    const { theme } = useTheme()
    const tokenAddress = renderTokenByChain(chainId)
    const [ dataUser ] = GetTokenBalance(tokenAddress, account, chainId)
    const { handleTransfer, pendingTransfer } = useTransfer(tokenAddress)
    return (
        <>
            <PageHeader 
                    nameTitle="RUN TOGETHER"
                    namePlace="Inventory"
                    imgIcon="/images/runInventory/imgBanner.png"
                    bgColor={theme.colors.gold}
            />
            <Page>
                <Flex flexDirection="column" width="300px">
                    <Text>{t("Demo page")}</Text>
                    <Text> Account test: 0xA6912ed0CB1700c0fa7200Dfe26e90dd2aE2364a</Text>
                    <Text>Demo read balance token RUN : {Number(dataUser).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                    <Text>Demo write contract</Text>
                    <Text> Test build hook </Text>
                    <Button 
                        mt="1rem"
                        onClick={handleTransfer}
                        disabled={pendingTransfer}
                        endIcon={pendingTransfer ? <AutoRenewIcon spin color="currentColor" /> : null}
                    >
                        Transfer Token RUN
                    </Button>
                </Flex>
            </Page>
        </>
    )
}
export default HomeDemo