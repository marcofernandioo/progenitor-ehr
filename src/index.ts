const express = require('express');
import mongoose from 'mongoose';
const cors = require('cors');
import * as path from 'path';

// import { derivePrivateKeyFromPublicKey } from './util';
import { util } from './util'
import Protocol from './protocol/index'

// import Progenitor from './controller/BlockchainInstance';
import Blockchain from './controller/Blockchain'
import Transaction from './controller/Transaction';

import { User, getUserByUsername, createUser } from './model/user';
import { IUser } from './interface';

const dbString = `mongodb+srv://marco:marco@comingback.2ovq7pl.mongodb.net/progenitor-ehr?retryWrites=true&w=majority&appName=ComingBack`

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')))

app.use(express.static('public'));

// Test endpoint
app.get('/', (req: any, res: any) => {
    res.json({ data: "yo this fire." })
})

// [DONE] Registration
app.post('/register', async (req: any, res: any) => {
    // 1. Input Username & role.
    const { username, role } = req.body;
    // 2. Generate ppkp.
    const { publicKey, privateKey } = util.generateRSAKeyPair();
    // 3. Store in DB.
    try {
        const _user = await createUser({ username, role, publicKey });
        return res.json({ data: { publicKey, privateKey } })
    } catch(e) {
        return res.json({ e});
    }
})

// [DONE] Login
app.post('/login', async (req: any, res: any) => {
    try {

        const { username, privateKey } = req.body;
        // 1. Find username in DB.
        const user: IUser | any = await getUserByUsername(username);
        // 2. Check if private key entered could generate the public key stored in the DB.
        const _publicKey = util.derivePublicKeyFromPrivateKey(privateKey);
        if (user.publicKey === _publicKey) {
            return res.json({ data: "logged in"});
        }
    } catch (e) {
        return res.json({ error: "Error! ",e });
    }
})

// 1. Add Transaction.

// Create a new Transaction
app.get('/create/transaction', (req: any, res: any) => {
    const { body } = req.body;
    // const { publicKey, body, privateKey } = req.body;
    const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ZfZINmIeZJIw4AVWsCJ
MDwh57xGCAXbYLdBLuZlbkN0XI2F4Thx4vzGgv9IERkg9xkFNSF/Vlwawx2KeobI
kQC/jrX+cVRgL3RwFsZ3lmL5fthkqwQSw8t+ISQurfLSj5Ml1agghJp3lZddGXJO
KkJkfif6xQrK3x3PSSzEPRh1cdzndWUW+wbRrYFoAD6ipro0oHUkNa06j1ckKv0/
RuuTJ3V4Fq4Z/gMqcRF7P0liRWPwZEiH9O60JPrYozf/l58UvPTuG+sWeimoHqka
WRjARdTqU33ffbBcjhOaqSTnwg6LloOAa3PZX59fxInUm6OvLjy975eP5czCx4T8
VwIDAQAB
-----END PUBLIC KEY-----`;
    const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEwAIBADANBgkqhkiG9w0BAQEFAASCBKowggSmAgEAAoIBAQDVl9kg2Yh5kkjD
gBVawIkwPCHnvEYIBdtgt0Eu5mVuQ3RcjYXhOHHi/MaC/0gRGSD3GQU1IX9WXBrD
HYp6hsiRAL+Otf5xVGAvdHAWxneWYvl+2GSrBBLDy34hJC6t8tKPkyXVqCCEmneV
l10Zck4qQmR+J/rFCsrfHc9JLMQ9GHVx3Od1ZRb7BtGtgWgAPqKmujSgdSQ1rTqP
VyQq/T9G65MndXgWrhn+AypxEXs/SWJFY/BkSIf07rQk+tijN/+XnxS89O4b6xZ6
KageqRpZGMBF1OpTfd99sFyOE5qpJOfCDouWg4Brc9lfn1/EidSbo68uPL3vl4/l
zMLHhPxXAgMBAAECggEBAKlzm42lJtGUDWgUQFzMLMp4mkl3o3OP+fgjynHD1SqC
F1mp6VHBbxCui2q3zlvKPM3sKqZ5GcXQsmajFA6ayZnIJzC4D9GnJ9veG2LmN0+2
28sXL95BEAYHddwjEWltIEFJcxWrGYk55q9l8zVR6tM58vHnE9qo8kPKKX4bJuB0
CLSn9k89HjgbOae6zWOuH3yxwaLeZmv++PQ4F5GdeDz+/xR44xlJxeG0e7XqeLW1
yysMBA6WKzW4/63tYxQtQkS2RpdvW+Bf6lxx/iMCLZBrhGzVR4WeoijUcbLSEF9T
HCe+SThV6lh8VaXTAjNUotRrugQoZ7BR7932Qj3lAokCgYEA8+j129HxTuyroZbp
7moGFDkxg5beMeIHQnICclx9dZULy2douLSSW67nM3qz7F2o6UTK+xPP/b8/2hSv
GbxGEnwrUwVsam1T+wqi75J5ML6bj3wSYOr22YJdHxURukawPO8bMwBn9K5fKkPX
YvQyx+Sy80tA+nbCHEpFmXIXbhsCgYEA4C4wbdYo5iOXEQ3cEmhPODHDcyhh7SPd
zLsF8f+2Ne+fIZYhFbIORrB4Ly3+M7AYsjtTs08DJ2zcwj91xlRLcUkBAei9yaeR
7b8aHDQ/Y9KQqivd67xjRzHDk9u/ygOeAS/omkVaSSSeZ8C+MbFwf+uEq6ONw1cl
vLc5MChBnnUCgYEAgiBDKqdy6fxyBJ+S5lNCMv/gXqfamxpPbS+OBp05gcWmqTne
MMyFWMyTJG/OFchSGUFOWW1UhbfGxP5L/Jrpd2svYfd+w7jYGRKvosiuR0cpjv9O
fs5cK+bU74Q6FPspgxi9lhQdYfi1ZMMU4gIOJX7pycrYO8en/5fQUfEAdwkCgYEA
w5xqE50YKOALNA1U5xbvcQgzFCu7bvGp2reiU2weMOf6gZL/IXAxdssKw5gtRCq3
EeYkfcRG60LZSgGXocvx3FKoN2M/H1NBSSNEBDIu0cptAp+uT8EdG4U3s6++pOYN
G9oS63Hyevoh4kRTcQb0NBpstFvNGhLT0dxKYVPvFfUCgYEA1ymFiS9p1O6TFS+8
/3YrdKUtSUAAPOKQl2bimVrD2IOQGFylso+a0LLJnpX+E/WXQ+M9FnimT3Lkg0M2
8CmZju4dalDJ68Mah7hitqlY4HFTAeg+MdPeoQwejjWe0XpSzzuQYvekmDWhuNgP
InWC/+yNuRMoBFTejM7FSbsFJZc=
-----END PRIVATE KEY-----`;

    // 1. Create a new tx object
    const newTransaction = new Transaction(publicKey, body, privateKey);
    // Blockchain.addTransaction(newTransaction);
    // 2. Add the tx obj into the blockchain
    console.log(Blockchain);
})

// Pass the blockchain state to the network
app.get('/get-data', (req: any, res: any) => {
    // 1. Actually have the blockchain data as an object.
    // 2. Propagate.
})

// Mine the transactions in the blockchain.
app.get('/mine', (req: any, res: any) => {
    // 0. Get the current state of the bc.

    // 1. Mine transactions

    // 2. Propagate new blockchain state.
})

// Endpoint to receive any data from the network
app.post('/receive', (req: any, res: any) => {
    // Note: Before overriding the current bc with the new, make sure the whole bc is valid.
    // 1. Node receives the newest blockchain state.
    const data = req.body;
    console.log('Data received: ', data.data)
    // 2. Node returns the newest bc state to the response/ pass it to its client.
})

app.post('/override', (req: any, res: any) => {
    // const newBc = new Blockchain();
    const newBc = new Blockchain();
})


const callback = (port: any) => {
    console.log("Node is running on port", port);
    // I guess we can instantiate the blockchain here?
    // const progenitor = new Blockchain();
    console.log(Blockchain);
    Protocol.propagateRequest('POST', '/receive', { data: 'dllm' });

    mongoose.connect(dbString)
        .then(() => console.log("DB Connected"))
        .catch(err => console.log("ERROR:", err));
}

Protocol.startServerOnAvailablePort(app, callback);