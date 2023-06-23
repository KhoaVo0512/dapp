import styled from 'styled-components'
import { Text, Flex, Heading, IconButton, ArrowBackIcon, NotificationDot } from '@pancakeswap/uikit'
import { useExpertModeManager } from 'state/user/hooks'
import GlobalSettings from 'components/Menu/GlobalSettings'
import Link from 'next/link'
import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'
import { SettingsMode } from '../Menu/GlobalSettings/types'

interface Props {
  title: string
  subtitle?: string
  helper?: string
  backTo?: string | (() => void)
  noConfig?: boolean
}

const AppHeaderContainer = styled.div`
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  width: 100%;
`

const AppHeader: React.FC<React.PropsWithChildren<Props>> = ({ title, subtitle, helper, backTo, noConfig = false }) => {
  const [expertMode] = useExpertModeManager()

  return (
    <AppHeaderContainer>
      {backTo &&
          (typeof backTo === 'string' ? (
            <Link passHref href={backTo}>
              <IconButton as="a" scale="sm">
                <ArrowBackIcon width="32px" />
              </IconButton>
            </Link>
          ) : (
            <IconButton scale="sm" variant="text" onClick={backTo}>
              <ArrowBackIcon width="32px" />
            </IconButton>
          ))}
      <CustomFlex alignItems="center" width="100%" style={{ gap: '16px' }}>
        <Flex flexDirection="column" width="100%">
          <CsTextHeader as="h2">{title}</CsTextHeader>
          <CsFlex mb="8px" mt="24px" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Text color="#000" fontSize="16px">
              {subtitle}
            </Text>
          </Flex>
          {/* <Flex>              
              {helper && <QuestionHelper text={helper} ml="4px" placement="top-start"/>}
          </Flex> */}
            {!noConfig && (
              <Flex alignItems="center">
                <NotificationDot show={expertMode}>
                  <GlobalSettings mode={SettingsMode.SWAP_LIQUIDITY} />
                </NotificationDot>
                <Transactions iconColors="#000"/>
              </Flex>
            )}
         </CsFlex>
        </Flex>

      </CustomFlex>
    </AppHeaderContainer>
  )
}

export default AppHeader

const CsTextHeader = styled(Heading)`
 font-size:48px;
 text-align:center;
 @media (max-width:600px){
  font-size:36px;
}
`
const CsFlex = styled(Flex)`
 @media(max-width:600px){
   flex-direction:column;
 }
`
const CustomFlex = styled(Flex)`
  @media screen and (max-width: 600px) {
    padding: 0px;
  }
`