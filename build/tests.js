"use strict";
// import * as CryptoJS from 'crypto-js';
// import * as crypto from 'crypto';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// class MerkleTree {
//     private transactions: string[];
//     private root: string;
//     constructor(transactions: string[]) {
//         this.transactions = transactions;
//         this.root = this.calculateMerkleRoot(this.transactions);
//     }
//     private calculateMerkleRoot(transactions: string[]): string {
//         if (transactions.length === 1) {
//             return transactions[0];
//         }
//         const newTransactions: string[] = [];
//         for (let i = 0; i < transactions.length; i += 2) {
//             if (i + 1 < transactions.length) {
//                 const hash = this.calculateHash(transactions[i] + transactions[i + 1]);
//                 newTransactions.push(hash);
//             } else {
//                 const hash = this.calculateHash(transactions[i] + transactions[i]);
//                 newTransactions.push(hash);
//             }
//         }
//         console.log(newTransactions);
//         return this.calculateMerkleRoot(newTransactions);
//     }
//     // private calculateHash(transaction: string): string {
//     //     return crypto.SHA256(transaction).toString();
//     // }
//     calculateHash(transactions: any) {
//         return crypto.createHash('sha256').update(transactions).digest('hex');
//     }
//     public getRoot(): string {
//         return this.root;
//     }
// }
// // Usage:
// const transactions = ['tx1', 'tx2', 'tx3', 'tx4', 'tx5'];
// const merkleTree = new MerkleTree(transactions);
// console.log('Merkle Root:', merkleTree.getRoot());
// import * as CryptoJS from 'crypto-js';
var crypto = require("crypto");
var MerkleTree = /** @class */ (function () {
    function MerkleTree(transactions) {
        this.transactions = transactions;
        this.root = this.calculateMerkleRoot(this.transactions);
    }
    MerkleTree.prototype.calculateMerkleRoot = function (transactions) {
        var transactionList = __spreadArray([], transactions, true);
        while (transactionList.length > 1) {
            var newTransactionList = [];
            for (var i = 0; i < transactionList.length; i += 2) {
                if (i + 1 < transactionList.length) {
                    var hash = this.calculateHash(transactionList[i] + transactionList[i + 1]);
                    newTransactionList.push(hash);
                }
                else {
                    var hash = this.calculateHash(transactionList[i] + transactionList[i]);
                    newTransactionList.push(hash);
                }
            }
            transactionList = newTransactionList;
        }
        return transactionList[0];
    };
    MerkleTree.prototype.calculateHash = function (transaction) {
        // return crypto.SHA256(transaction).toString();
        return crypto.createHash('sha256').update(transaction).digest('hex');
    };
    MerkleTree.prototype.getRoot = function () {
        return this.root;
    };
    return MerkleTree;
}());
// Usage:
var transactions = ['tx1', 'tx2', 'tx3', 'tx4', 'tx5'];
var merkleTree = new MerkleTree(transactions);
console.log('Merkle Root:', merkleTree.getRoot());
