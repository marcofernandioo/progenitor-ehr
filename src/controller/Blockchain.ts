import * as I from '../interface'

import Block from './Block';

export default class Blockchain implements I.IBlockchain {
    blocks: I.IBlock[];
    difficulty: number = 1;
    miningReward: Number = 100;
    pendingTransactions: I.ITransaction[];

    constructor() {
        this.pendingTransactions = [];
        this.blocks = [];
        this.difficulty;
    }

    createGenesisBlock() {
        const genesisBlock = new Block('', [], 0);
        this.blocks.push(genesisBlock);
    }

    // Check the remaining blocks on the chain to see if there hashes and
    // signatures are correct
    checkChainValidity() {
        for (let i = 1; i < this.blocks.length; i++) {
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i - 1];

            if (previousBlock.blockHash !== currentBlock.previousHash) {
                return false;
            }

            // if (!currentBlock.hasValidTransactions()) {
            //     return false;
            // }

            // if (currentBlock.hash !== currentBlock.calculateHash()) {
            //     return false;
            // }
        }

        return true;
    }

    // Gather the first few records, combine into a block, and mine them.
    // The 1st version of this.mineBlock();
    createBlock() {
        if (this.pendingTransactions.length < 5)
            return
        const newBlock = new Block(
            this.getLatestBlock().blockHash,
            this.pendingTransactions.slice(0, 4),
            this.getLatestBlock().index + 1
        );
        newBlock.mineBlock(this.difficulty);
        this.blocks.push(newBlock);
    }

    getLatestBlock(): I.IBlock {
        return this.blocks.slice(-1)[0];
    }

    // Search sender based on public key.
    searchRecordByPublicKey(publicKey: String) {
        this.blocks.map((block) => {
            block.transactions.filter((tx) => tx.sender === publicKey)
        })
    }

    addTransaction(tx: I.ITransaction) {
        this.pendingTransactions?.push(tx);
    }

    mineBlock() {
        const block = new Block(
            this.getLatestBlock().blockHash,
            this.pendingTransactions.slice(0,5),
            this.getLatestBlock().index + 1
        )
        while (
            block.blockHash.substring(0,this.difficulty) !== Array(this.difficulty + 1).join('0')
        ) {
            block.nonce++;
            block.blockHash = block.calculateBlockHash();
        }

        // Push the block into the chain.
        this.blocks.push(block);

        // Remove the mined transactions.
        this.pendingTransactions.splice(0,block.transactions.length);
    }

}