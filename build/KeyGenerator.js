'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// import * as EC from 'elliptic';
var elliptic_1 = require("elliptic");
var gen = new elliptic_1.ec('secp256k1');
// Generate a new key pair and convert them to hex-strings
var key = gen.genKeyPair();
var publicKey = key.getPublic('hex');
var privateKey = key.getPrivate('hex');
// Print the keys to the console
console.log();
console.log('Your public key (also your wallet address, freely shareable)\n', publicKey);
console.log();
console.log('Your private key (keep this secret! To sign transactions)\n', privateKey);
