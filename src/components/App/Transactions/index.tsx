import { HistoryIcon, useModal, IconButton } from '@pancakeswap/uikit'
import TransactionsModal from './TransactionsModal'

interface Props {
  iconColors?:string
}

const Transactions: React.FC<Props> = ({iconColors}) => {
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  return (
    <>
      <IconButton scale="sm" variant="text" onClick={onPresentTransactionsModal}>
        <HistoryIcon color={iconColors || "textSubtle" } width="24px" />
      </IconButton>
    </>
  )
}

export default Transactions
