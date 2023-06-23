import { parseUnits } from '@ethersproject/units'
import {
  ButtonMenu,
  Flex,
  ButtonMenuItem,
  CloseIcon,
  Heading,
  IconButton,
  InjectedModalProps,
  ModalBody,
  ModalContainer,
  ModalHeader as UIKitModalHeader,
} from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import { useBalance } from 'wagmi'
import WalletInfo from './WalletInfo'
import WalletTransactions from './WalletTransactions'
import WalletWrongNetwork from './WalletWrongNetwork'

export enum WalletView {
  WALLET_INFO,
  TRANSACTIONS,
  WRONG_NETWORK,
}

interface WalletModalProps extends InjectedModalProps {
  initialView?: WalletView
}

export const LOW_BNB_BALANCE = parseUnits('2', 'gwei')

const ModalHeader = styled(UIKitModalHeader)`
  background: ${({ theme }) => theme.colors.gradientBubblegum};
`

const Tabs = styled.div`
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 16px 24px;
`
const WrapIconButton = styled(IconButton)`
  position: absolute;
  top: 15px;
  right: 15px;
  background: black !important;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  svg {
    fill: #fff;
    width: 25px;
  }
`;

const ModalTitle = styled(Flex)`
  align-items: center;
  height: 40px;
  margin-top: 5px;
  flex: 1;
  justify-content: center;
  color: #23262f;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  gap: 10px;
`;

const WalletModal: React.FC<React.PropsWithChildren<WalletModalProps>> = ({
  initialView = WalletView.WALLET_INFO,
  onDismiss,
}) => {
  const [view, setView] = useState(initialView)
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { data, isFetched } = useBalance({ addressOrName: account })
  const hasLowNativeBalance = isFetched && data && data.value.lte(LOW_BNB_BALANCE)

  const handleClick = (newIndex: number) => {
    setView(newIndex)
  }

  const TabsComponent: React.FC<React.PropsWithChildren> = () => (
    <Tabs>
      <ButtonMenu scale="sm" variant="subtle" onItemClick={handleClick} activeIndex={view} fullWidth>
        <ButtonMenuItem>{t('Wallet')}</ButtonMenuItem>
        <ButtonMenuItem>{t('Transactions')}</ButtonMenuItem>
      </ButtonMenu>
    </Tabs>
  )

  return (
    <ModalContainer title={t('Welcome!')} minWidth="360px">
      <ModalHeader>
        <ModalTitle>
          <Heading>{t('Your Wallet')}</Heading>
        </ModalTitle>

        <WrapIconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="text" />
        </WrapIconButton>

      </ModalHeader>
      {view !== WalletView.WRONG_NETWORK && <TabsComponent />}
      <ModalBody p="24px" width="100%">
        {view === WalletView.WALLET_INFO && (
          <WalletInfo hasLowNativeBalance={hasLowNativeBalance} switchView={handleClick} onDismiss={onDismiss} />
        )}
        {view === WalletView.TRANSACTIONS && <WalletTransactions onDismiss={onDismiss} />}
        {view === WalletView.WRONG_NETWORK && <WalletWrongNetwork onDismiss={onDismiss} />}
      </ModalBody>
    </ModalContainer>
  )
}

export default WalletModal
