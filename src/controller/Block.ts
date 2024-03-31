import * as crypto from 'crypto';

import * as I from '../interface';

export default class Block implements I.IBlock {
    previousHash: String;
    timestamp: Number;
    transactions: I.ITransaction[];
    nonce: number; // Actual value is assigned upon block is mined.
    merkleRoot: String; // Assigned upon transaction limit is reached.
    blockHash: String;  //  Assigned upon transaction limit is reached.
    index: number;

    constructor (_previousHash: String, _transactions: I.ITransaction[], _index: number) {
        this.previousHash = _previousHash;
        this.timestamp = Date.now();
        this.transactions = _transactions;
        this.nonce = 0;
        this.blockHash = "";
        this.merkleRoot = this.calculateMerkleRoot2();
        this.index = _index;
    }

    calculateBlockHash() {
        return crypto.createHash('sha256').update(
            this.previousHash + this.timestamp.toString() + this.transactions + this.nonce + this.merkleRoot
        ).digest('hex');
    }

    mineBlock(difficulty: number) { 
        while (
            this.blockHash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
        ) {
            this.nonce++;
            this.blockHash = this.calculateBlockHash();
        }
    }

    calculateMerkleRoot() {
        if (this.transactions.length === 0) {
            return '';
        }
        let txHashList = this.transactions.map((tx) => tx.hash);
        while (txHashList.length > 1) {
            const newHashes = [];
            for (let i = 0; i < txHashList.length - 1; i += 2) {
                const combinedHash = crypto.createHash('256').update(txHashList[i].concat(txHashList[i+1].toString()));
                newHashes.push(combinedHash);
            }
            if (txHashList.length % 2 !== 0) {
                newHashes.push(txHashList[txHashList.length-1]);
            }
        }
        return txHashList[0];
    }

    calculateHash(transactions: string): string {
        // const dataBuffer = Buffer.from(transactions.hash, 'utf-8');
        return crypto.createHash('sha256').update(transactions).digest('hex');
    }

    // calculateMerkleRoot1(transactions: string): string {
    //     if (transactions.length === 1)  
    //         return transactions[0];

    //     const newTransactions: any[] = [];

    //     for (let i = 0; i < transactions.length; i += 2) {
    //         if (i + 1 < transactions.length) {
    //             const hash = this.calculateHash(transactions[i].hash +''+ transactions[i+1].hash);
    //             newTransactions.push(hash);
    //         } else {
    //             const hash = this.calculateHash(transactions[i].hash + ''+transactions[i].hash);
    //             newTransactions.push(hash);
    //         }
    //     }
    //     console.log(newTransactions);
    //     return this.calculateMerkleRoot1(newTransactions);
    // }

    getTransactionAsString() {
        
    }

    calculateMerkleRoot2(): String {
        let transactionList: String[] = this.transactions.map(o => o.hash);
        if (transactionList.length === 0)
            return '';

        while (transactionList.length > 1) {
            let newTransactionList: string[] = [];

            for (let i = 0; i < transactionList.length; i += 2) {
                if (i + 1 < transactionList.length) {
                    const hash: string = this.calculateHash(transactionList[i] +''+ transactionList[i + 1]);
                    newTransactionList.push(hash);
                } else {
                    const hash: string = this.calculateHash(transactionList[i] +''+ transactionList[i]);
                    newTransactionList.push(hash);
                }
            }

            transactionList = newTransactionList;
        }

        return transactionList[0];
    }

}