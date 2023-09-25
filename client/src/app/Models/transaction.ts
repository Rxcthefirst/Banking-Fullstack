export interface Transaction {
    id: number;
    amount: number;
    description: string;
    transaction_type: string;
    account_id: number;
}