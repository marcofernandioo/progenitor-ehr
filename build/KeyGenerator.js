"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
function generateRSAKeyPair() {
    return new Promise(function (resolve, reject) {
        crypto.generateKeyPair('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs1', format: 'pem', cipher: 'aes-256-cbc', passphrase: "pass" },
        }, function (err, publicKey, privateKey) {
            if (err) {
                reject(err);
            }
            else {
                resolve({
                    publicKey: "".concat(publicKey.toString()),
                    privateKey: "".concat(privateKey.toString())
                });
            }
        });
    });
}
// Example usage
generateRSAKeyPair()
    .then(function (keyPair) {
    console.log('Public Key:', keyPair.publicKey);
    console.log('Private Key:', keyPair.privateKey);
})
    .catch(function (err) {
    console.error('Error generating key pair:', err);
});
