
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { useTranslation } from '@pancakeswap/localization'
import { Flex, Heading } from '@pancakeswap/uikit'
import Container from 'components/Layout/Container'
import Page from 'components/Layout/Page'
import useTheme from 'hooks/useTheme'
import { useState } from 'react'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import PageHeader from 'components/PageHeader'
import { FetchDataNft } from 'views/Inventory/hook/fetchDataMysteryBox'

function iframe() {
    return {
        __html: '<iframe src="./game/index.html" width="100%" height="514" style="margin: auto;"></iframe>'
    }
}

const FlyingDoge = () => {
    const { t } = useTranslation()
    const { theme } = useTheme()
    const { account, chainId } = useActiveWeb3React()
    // const { nftBalance } = FetchDataNft(account, chainId)

    return (
        <>
            <Page>
                <CustomContainer>
                    <div dangerouslySetInnerHTML={iframe()} />
                </CustomContainer>
            </Page>
        </>
    )
}
export default FlyingDoge

const CustomContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
`