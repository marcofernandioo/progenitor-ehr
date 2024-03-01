"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var Transaction = /** @class */ (function () {
    function Transaction(_sender, _body, key) {
        this.sender = _sender;
        this.timestamp = Date.now();
        this.body = _body;
        this.signature = this.sign(key);
        this.hash = this.calculateTxHash();
    }
    // We sign the transaction hash using private key.
    Transaction.prototype.sign = function (key) {
        if (key.getPublic('hex') !== this.sender)
            throw new Error("Sender does not match with given keys.");
        var sign = key.sign(this.hash, 'base64');
        return sign.toDER('hex');
    };
    // Transaction hash, not yet signed by sender.
    Transaction.prototype.calculateTxHash = function () {
        return crypto.createHash('sha256').update(this.sender + this.body + this.timestamp).digest('hex');
    };
    return Transaction;
}());
exports.default = Transaction;
