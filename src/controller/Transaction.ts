import * as crypto from 'crypto';

import * as I from '../interface'

export default class Transaction implements I.ITransaction {
    sender: String;
    timestamp: Number;
    body: any;
    hash: String;
    signature: String;

    constructor (_sender: String, _body: any, key: any) {
        this.sender = _sender;
        this.timestamp = Date.now();
        this.body = _body;
        this.signature = this.sign(key);
        this.hash = this.calculateTxHash();
    }

    // We sign the transaction hash using private key.
    sign (key: any) {
        if (key.getPublic('hex') !== this.sender)
            throw new Error("Sender does not match with given keys.");
        const sign = key.sign(this.hash, 'base64');
        return sign.toDER('hex');
    }

    // Transaction hash, not yet signed by sender.
    calculateTxHash (): String {
        return crypto.createHash('sha256').update(this.sender + this.body + this.timestamp).digest('hex');
    }

}