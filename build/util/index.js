"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.util = void 0;
var crypto = require("crypto");
var util = /** @class */ (function () {
    function util() {
    }
    util.derivePublicKeyFromPrivateKey = function (privateKey) {
        try {
            var publicKey = crypto.createPublicKey(privateKey);
            return publicKey.export({ type: 'spki', format: 'pem' }).toString();
        }
        catch (error) {
            throw new Error('Failed to derive public key: ' + error.message);
        }
    };
    util.generateRSAKeyPair = function () {
        try {
            var _a = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048, // Adjust the modulus length as needed
                publicKeyEncoding: { type: 'spki', format: 'pem' },
                privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
            }), publicKey = _a.publicKey, privateKey = _a.privateKey;
            return { publicKey: publicKey.toString(), privateKey: privateKey.toString() };
        }
        catch (error) {
            throw new Error('Failed to generate RSA key pair: ' + error.message);
        }
    };
    return util;
}());
exports.util = util;
