
/* eslint-disable camelcase */
export interface transactionProps {
    id: number,
    user_id: number,
    currency_id: number,
    type: number,
    balance_change: string,
    balance_before: string,
    balance_after: string,
    reason: number,
    reason_id: number,
    created_time: string,
    updated_time: string
}

export interface ListTransaction {
    listTransactions:transactionProps[]
}
export interface OffChainBalance {
    mainBalance:any
    earnBalance:any
}
export interface listBanlace {
    listBalance:OffChainBalance
}

