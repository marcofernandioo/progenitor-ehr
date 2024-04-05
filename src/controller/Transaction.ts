import * as crypto from 'crypto';
import * as forge from 'node-forge';
import * as I from '../interface'

export default class Transaction implements I.ITransaction {
    sender: String;
    timestamp: Number;
    medicalRecord: I.IMedicalRecord;
    hash: String="";
    signature: String="";

    constructor(_sender: String, _medicalRecord: I.IMedicalRecord) {
        this.sender = _sender;
        this.timestamp = Date.now();
        this.medicalRecord = _medicalRecord;
        this.hash = this.calculateTxHash();
    };

    // Sign a transaction using the private key.
    async signTx (privateKey: string) {
        const signer = crypto.createSign('sha256');
        this.hash = this.calculateTxHash();
        signer.update(Buffer.from(this.hash));
        const signature = signer.sign(privateKey);
        this.signature =  signature.toString('hex');
    }

    // Deprecated.
    signWithForge(privateKeyPEM: string): string {
        try {
            // Parse private key
            const privateKey = forge.pki.privateKeyFromPem(privateKeyPEM);
    
            // Calculate hash
            const md = forge.md.sha256.create();
            md.update(this.medicalRecord.toString(), 'utf8');
            const hash = md.digest().getBytes();
    
            // Sign the hash
            const signature = privateKey.sign(hash);
    
            // Convert the signature to hexadecimal string
            console.log(signature);
            return forge.util.bytesToHex(signature);
        } catch (error: any) {
            console.error('Error signing with Forge:', error.message);
            throw error;
        }
    }

    // Calculate the hash of a transaction.
    calculateTxHash(): String {
        return crypto.createHash('sha256').update(this.sender + this.medicalRecord.toString() + this.timestamp).digest('hex');
    }

    // Deprecated.
    sign(key: any) {
        if (key.getPublic('hex') !== this.sender)
            throw new Error("Sender does not match with given keys.");
        const sign = key.sign(this.hash, 'base64');
        return sign.toDER('hex');
    }

}