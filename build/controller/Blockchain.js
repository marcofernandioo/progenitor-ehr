"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Block_1 = require("./Block");
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.difficulty = 1;
        this.miningReward = 100;
        this.pendingTransactions = [];
        this.blocks = [];
        this.difficulty;
        this.createGenesisBlock();
    }
    Blockchain.getInstance = function () {
        if (!Blockchain.instance) {
            Blockchain.instance = new Blockchain();
        }
        return Blockchain.instance;
    };
    Blockchain.overrideInstance = function (newInstance) {
        Blockchain.instance = newInstance;
    };
    Blockchain.prototype.createGenesisBlock = function () {
        var genesisBlock = new Block_1.default('', [], 0);
        this.blocks.push(genesisBlock);
    };
    Blockchain.prototype.chainIsValid = function () {
        for (var i = 1; i < this.blocks.length; i++) {
            var currentBlock = this.blocks[i];
            var previousBlock = this.blocks[i - 1];
            if (previousBlock.blockHash !== currentBlock.previousHash) {
                return false;
            }
        }
        return true;
    };
    // Deprecated.
    Blockchain.prototype.createBlock = function () {
        if (this.pendingTransactions.length < 5)
            return;
        var newBlock = new Block_1.default(this.getLatestBlock().blockHash, this.pendingTransactions.slice(0, 4), this.getLatestBlock().index + 1);
        newBlock.mineBlock(this.difficulty);
        this.blocks.push(newBlock);
    };
    Blockchain.prototype.getLatestBlock = function () {
        return this.blocks.slice(-1)[0];
    };
    // Search sender based on public key.
    Blockchain.prototype.searchRecordByPublicKey = function (publicKey) {
        this.blocks.map(function (block) {
            block.transactions.filter(function (tx) { return tx.sender === publicKey; });
        });
    };
    Blockchain.prototype.addTransaction = function (tx) {
        var _a;
        (_a = this.pendingTransactions) === null || _a === void 0 ? void 0 : _a.push(tx);
    };
    Blockchain.prototype.mineBlock = function () {
        if (this.pendingTransactions.length === 0) {
            return;
        }
        var block = new Block_1.default(this.getLatestBlock().blockHash, this.pendingTransactions.slice(0, 5), this.getLatestBlock().index + 1);
        while (block.blockHash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join('0')) {
            block.nonce++;
            block.blockHash = block.calculateBlockHash();
        }
        // Push the block into the chain.
        this.blocks.push(block);
        // Remove the mined transactions.
        this.pendingTransactions.splice(0, block.transactions.length);
    };
    return Blockchain;
}());
exports.default = Blockchain;
