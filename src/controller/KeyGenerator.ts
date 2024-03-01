'use strict';
import { ec } from 'elliptic';
const gen = new ec('secp256k1');

// Generate a new key pair and convert them to hex-strings
const key = gen.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

// Print the keys to the console
console.log(
  'Your public key (also your wallet address, freely shareable)\n',
  publicKey
);

console.log(
  'Your private key (keep this secret! To sign transactions)\n',
  privateKey
);