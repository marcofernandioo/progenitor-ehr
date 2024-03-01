import { IBlock } from "./Block";
import { ITransaction } from "./Transaction";

export interface IBlockchain {
    blocks: IBlock[],
    difficulty: Number,
    miningReward: Number,
    pendingTransactions: ITransaction[]
}