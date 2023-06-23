import { useCallback } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Modal, ModalBody, Text, Button, Flex, InjectedModalProps } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import isEmpty from 'lodash/isEmpty'
import groupBy from 'lodash/groupBy'
import { useAllSortedRecentTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import { useAppDispatch } from 'state'
import { clearAllTransactions } from 'state/transactions/actions'
import { chains } from 'utils/wagmi'
import styled from 'styled-components'
import { AutoRow } from '../../Layout/Row'
import Transaction from './Transaction'
import ConnectWalletButton from '../../ConnectWalletButton'

function renderTransactions(transactions: TransactionDetails[], chainId: number) {
  return (
    <Flex flexDirection="column">
      {transactions.map((tx) => {
        return <Transaction key={tx.hash + tx.addedTime} tx={tx} chainId={chainId} />
      })}
    </Flex>
  )
}

const TransactionsModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const { account } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const sortedRecentTransactions = useAllSortedRecentTransactions()

  const { t } = useTranslation()

  const hasTransactions = !isEmpty(sortedRecentTransactions)

  const clearAllTransactionsCallback = useCallback(() => {
    dispatch(clearAllTransactions())
  }, [dispatch])

  return (
    <Modal title={t('Recent Transactions')} headerBackground="gradientCardHeader" onDismiss={onDismiss} style={{padding:'40px'}}>
      {account ? (
        <ModalBody>
          {hasTransactions ? (
            <>
              <AutoRow mb="1rem" style={{ justifyContent: 'space-between' }}>
                <Text style={{textAlign:'center'}}>{t('Recent Transactions')}</Text>
                <CsButtonClearAll scale="md" onClick={clearAllTransactionsCallback}>
                  {t('Clear all')}
                </CsButtonClearAll>
              </AutoRow>
              {Object.entries(sortedRecentTransactions).map(([chainId, transactions]) => {
                const chainIdNumber = Number(chainId)
                const groupedTransactions = groupBy(Object.values(transactions), (trxDetails) =>
                  Boolean(trxDetails.receipt),
                )

                const confirmed = groupedTransactions.true ?? []
                const pending = groupedTransactions.false ?? []

                return (
                  <div key={`transactions#${chainIdNumber}`}>
                    <Text fontSize="12px" color="textSubtle" mb="4px">
                      {chains.find((c) => c.id === chainIdNumber)?.name ?? 'Unknown network'}
                    </Text>
                    {renderTransactions(pending, chainIdNumber)}
                    {renderTransactions(confirmed, chainIdNumber)}
                  </div>
                )
              })}
            </>
          ) : (
            <Text>{t('No recent transactions')}</Text>
          )}
        </ModalBody>
      ) : (
        <ConnectWalletButton />
      )}
    </Modal>
  )
}

export default TransactionsModal

const CsButtonClearAll = styled(Button)`
@media(max-width:600px){
  font-size: 12px;
    padding: 0 16px;
    height: 38px;
    margin-top: 8px;
}
`