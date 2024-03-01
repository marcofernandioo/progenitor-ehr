import { ITransaction } from './Transaction';

export interface IBlock {
    previousHash: String,
    timestamp: Number,
    transactions: ITransaction[],
    nonce: Number,
    merkleRoot: String,
    blockHash: String,
    index: number
}