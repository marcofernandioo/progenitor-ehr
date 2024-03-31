"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var Block = /** @class */ (function () {
    function Block(_previousHash, _transactions, _index) {
        this.previousHash = _previousHash;
        this.timestamp = Date.now();
        this.transactions = _transactions;
        this.nonce = 0;
        this.blockHash = "";
        this.merkleRoot = this.calculateMerkleRoot2();
        this.index = _index;
    }
    Block.prototype.calculateBlockHash = function () {
        return crypto.createHash('sha256').update(this.previousHash + this.timestamp.toString() + this.transactions + this.nonce + this.merkleRoot).digest('hex');
    };
    Block.prototype.mineBlock = function (difficulty) {
        while (this.blockHash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.blockHash = this.calculateBlockHash();
        }
    };
    Block.prototype.calculateMerkleRoot = function () {
        if (this.transactions.length === 0) {
            return '';
        }
        var txHashList = this.transactions.map(function (tx) { return tx.hash; });
        while (txHashList.length > 1) {
            var newHashes = [];
            for (var i = 0; i < txHashList.length - 1; i += 2) {
                var combinedHash = crypto.createHash('256').update(txHashList[i].concat(txHashList[i + 1].toString()));
                newHashes.push(combinedHash);
            }
            if (txHashList.length % 2 !== 0) {
                newHashes.push(txHashList[txHashList.length - 1]);
            }
        }
        return txHashList[0];
    };
    Block.prototype.calculateHash = function (transactions) {
        // const dataBuffer = Buffer.from(transactions.hash, 'utf-8');
        return crypto.createHash('sha256').update(transactions).digest('hex');
    };
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
    Block.prototype.getTransactionAsString = function () {
    };
    Block.prototype.calculateMerkleRoot2 = function () {
        var transactionList = this.transactions.map(function (o) { return o.hash; });
        if (transactionList.length === 0)
            return '';
        while (transactionList.length > 1) {
            var newTransactionList = [];
            for (var i = 0; i < transactionList.length; i += 2) {
                if (i + 1 < transactionList.length) {
                    var hash = this.calculateHash(transactionList[i] + '' + transactionList[i + 1]);
                    newTransactionList.push(hash);
                }
                else {
                    var hash = this.calculateHash(transactionList[i] + '' + transactionList[i]);
                    newTransactionList.push(hash);
                }
            }
            transactionList = newTransactionList;
        }
        return transactionList[0];
    };
    return Block;
}());
exports.default = Block;
