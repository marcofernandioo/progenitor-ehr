import Block from './controller/Block';
import Blockchain from './controller/Blockchain'
import Transaction from './controller/Transaction'
import * as I from './interface';
// import Transaction from './controller/Transaction'

import { ec } from 'elliptic';
const gen = new ec('secp256k1');


const myKey = gen.keyFromPrivate(
    '7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf'
);

const progenitor = new Blockchain();
progenitor.createGenesisBlock();
const tx1 = new Transaction(
    "04729aaee497f99ff7ed4da9b7a5c23912da6533783b5cee16839b1e2628bc3413672b407a68c7a15a6fe3ea238b16f26e7a35755e258a0b9fb3d007da7a2e9c94",
    "no body",
    myKey
);

const tx2 = new Transaction(
    "04729aaee497f99ff7ed4da9b7a5c23912da6533783b5cee16839b1e2628bc3413672b407a68c7a15a6fe3ea238b16f26e7a35755e258a0b9fb3d007da7a2e9c94",
    "dllm",
    myKey
);

const tx3 = new Transaction(
    "04729aaee497f99ff7ed4da9b7a5c23912da6533783b5cee16839b1e2628bc3413672b407a68c7a15a6fe3ea238b16f26e7a35755e258a0b9fb3d007da7a2e9c94",
    "Lei Lou Mou",
    myKey
);

progenitor.addTransaction(tx1);
progenitor.addTransaction(tx2);
progenitor.mineBlock();

progenitor.addTransaction(tx3);
progenitor.mineBlock();


console.log("BLOCK:")
console.log(progenitor.blocks[1].transactions);

console.log("Chain pending tx: ")
console.log(progenitor.pendingTransactions);
console.log(progenitor);

console.log("MR: ");
console.log(progenitor.blocks[2].merkleRoot)
console.log(typeof progenitor.blocks[2].merkleRoot)