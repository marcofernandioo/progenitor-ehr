const express = require('express');
import mongoose from 'mongoose';
const cors = require('cors');
import * as path from 'path';
import * as forge from 'node-forge';

import { util } from './util'
import Protocol from './protocol/index'

import Blockchain from './controller/Blockchain'
import Transaction from './controller/Transaction';
import MedicalRecord from './controller/MedicalRecord';

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
        const { username } = req.body;
        let privateKey = req.body.privateKey;
        console.log("BTOA: ")
        console.log(privateKey);
        privateKey = atob(privateKey);
        console.log("ATOB: ")
        console.log(privateKey);
        // console.log(privateKey);
        // console.log(username);

        // const { username } = req.body;
        // const privateKey = `
        // `

        const _privateKey = `
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChmYR4x1cDYu5R
z0e12djFYq3hgdE4MnClFeu8pxQYh1X80UJDlD+FuAs7n9FnjiGjjkC61HtIlUka
PtK2Qzxf2l3syP3KDGbOf8bHzyhHpg/BD01OqP6iWUut9vjFzlzw6U4c7+OrQIc2
IWJdvjytfaXkGfUjt/S0Lcmjok7O0Oiban+GXtjsDfanHQ8BCpQBE3Fa70kEIWUC
OGyR9287ZDZ5PG2jSO8lMKUSbDjXOdw69oxI7Rx5nsGaXHCQ7YbO2L1/wdrif2UU
89QuIN2/D/d6dOuBceXGAM1+Bct3igJBqzi4RLi6ugVkg2mzSE1ECCRAU6uILy4M
lpsr904nAgMBAAECggEAQ163BYtFUVobNOwPX1b0skWTbCIs0RrmL0zWPI4DKL6z
MHUlBPt3CA5UUIUuTdfJWmBhyAHxa68hDNoICog5UVS+N4sLkwJckdZfTsmkZ0pp
4vi4KAT4M0K69Em0KPMBeEYrlJDF/40lUYHVenNm5IUvdcsEkeGNGNjF6XwvErUH
zNqiL5M5+ws5Las42dwt/mRgtOu8PyVKkY+vyKd4Ps2BAw/ozyihv9ASdaQksN74
gN7MwDmTETPXO8ILIquW8E2oP834aoM+7vbgQqNJU+l95wfP9C9T/TCyliCHDbHq
v9kUV9Rudto6qQIqrl9jE+M9rP/KsWSRlnuarHN7AQKBgQDL+hNctA/NZtkpAn0C
rz9hvyhtmUX1jkSnf43MRr3opxugQ7HbOTvsUt3y/DTYlJxopV+SnpPNS6Y3IQPp
LNAEv/9NAVuNJwDrlNx2F1CXw0jnGKt1q9ZIuZef0RSn3BezshRn2+7Rz7Lwkphl
L3fpcQwaRYKL61I2aRL5jKN7QQKBgQDK0JQawvd1+g3qsxtnvUFGbz7OrJNL0z7T
S+N85Eu2myA0dW8tD6gliqo5pp34txC5UL9X+LupI/lmGryqDWtuMfYpcE4z3g2E
qsgWi91VydRG7X4P6RDwkMLntp6soNDOT2Onwal6MsZNs5IyBy1XyA5x+0pVU+YH
LsGN8gX3ZwKBgGoXlRCHmxyDnPnGkIzf58CIc5elvAx/Rdg08OTJ+qbSm/zcmNpk
R3WgmE50vWvUyBFpym7xSgDikv5jjqwuIbgGwNwlk5+0JLdjgtNtRv7YlMeWPkAC
8356AZIfZnX0dOODATgP3YSFWhXkuZ0PdngV02yqsL7j06v3NOZVLwbBAoGAY+uf
DBBCGr23XYogVlvHbQwhxXEAoLrSmQcqbL2ND8odc7rnqyuri9NlSkHsUjze4G4H
1y+URSCUHtnNWXqDEydKP+A0pxkfT91T9sexpDJrgwY+tVf+IIcxfzdZtXMFbJ9w
WZXwCWQ6js2JmVwv2q+VblJ/rMpI6gD/Gw/CIMECgYEApnRx7FBs46igwnLgnwhT
VhRNnIw3Pn/a6bR6WePEw41Bwhv7ASemAL/DVUTsxoCcR0n5o30YLwQYhW+yeD77
ZuGoh4QSeTzH9dBSBHJ7EM3FoqsFGkni6WNK1Qj8r64VBGTwhozjSlKClPWybdEe
gA3uztMlpfe8X0fLuXYKTzQ=
-----END PRIVATE KEY-----`
        console.log(_privateKey === privateKey);

        // 1. Find username in DB.
        const user: IUser | any = await getUserByUsername(username);
        if (!user) return null;
        // // 2. Check if private key entered could generate the public key stored in the DB.
        // const _publicKey = util.derivePublicKeyFromPrivateKey(privateKey.replace(" ", "\n"));
        const _publicKey = util.derivePublicKeyFromPrivateKeys2(_privateKey);
        console.log(_publicKey);
        if (user.publicKey === _publicKey) {
            return res.json({ data: "logged in"});
        }
    } catch (e) {
        console.log(e);
        return res.json({ error: "Error! ",e });
    }
})

// 1. Add Transaction
// Create a new Transaction
app.post('/create/transaction', (req: any, res: any) => {
    const { publicKey, hospital, doctor, treatment, diagnosis, privateKey } = req.body;

    const _publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ZfZINmIeZJIw4AVWsCJ
MDwh57xGCAXbYLdBLuZlbkN0XI2F4Thx4vzGgv9IERkg9xkFNSF/Vlwawx2KeobI
kQC/jrX+cVRgL3RwFsZ3lmL5fthkqwQSw8t+ISQurfLSj5Ml1agghJp3lZddGXJO
KkJkfif6xQrK3x3PSSzEPRh1cdzndWUW+wbRrYFoAD6ipro0oHUkNa06j1ckKv0/
RuuTJ3V4Fq4Z/gMqcRF7P0liRWPwZEiH9O60JPrYozf/l58UvPTuG+sWeimoHqka
WRjARdTqU33ffbBcjhOaqSTnwg6LloOAa3PZX59fxInUm6OvLjy975eP5czCx4T8
VwIDAQAB
-----END PUBLIC KEY-----`;
    const _privateKey = `-----BEGIN PRIVATE KEY-----
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
    const medicalRecord = new MedicalRecord(hospital, doctor, treatment, diagnosis);
    console.log("Medical record: ")
    console.log(medicalRecord);
    const newTransaction = new Transaction(_publicKey, medicalRecord);
    newTransaction.signTx(_privateKey);

    const progenitor = Blockchain.getInstance();
    progenitor.addTransaction(newTransaction);

    // 2. Add the tx obj into the blockchain
    console.log(Blockchain);
    return res.json({ data: "TX added to the blockchain"});

})

// 2. Get the Whole Blockchain Record
app.get('/get/blockchain', (req: any, res: any) => {
    const progenitor = Blockchain.getInstance();
    return res.json({data: progenitor});
})

app.get('/get/medical-record', (req: any, res: any) => {
    const progenitor = Blockchain.getInstance();
    const medicalRecordList = progenitor.blocks
        .filter(block => block.transactions.length > 0)
        .flatMap(block => block.transactions)
        .map(transaction => ({
            medicalRecord: transaction.medicalRecord,
            sender: transaction.sender,
            timestamp: transaction.timestamp
        }))
        .filter(Boolean);
    return res.json({medicalRecordList})
})

// Pass the blockchain state to the network
app.get('/get-data', (req: any, res: any) => {
    // 1. Actually have the blockchain data as an object.
    // 2. Propagate.
})

// Mine the transactions in the blockchain.
app.get('/mine', (req: any, res: any) => {
    // 0. Get the current state of the bc.
    const progenitor = Blockchain.getInstance();
    // 1. Mine transactions
    progenitor.mineBlock();
    // 2. Propagate new blockchain state.
    console.log(progenitor);
    return res.json({ data: progenitor, msg: "Block is mined."})
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
    // const newBc = new Blockchain();
})

const callback = (port: any) => {
    console.log("Node is running on port", port);
    // Protocol.propagateRequest('POST', '/receive', { data: 'dllm' });
    mongoose.connect(dbString)
        .then(() => console.log("DB Connected"))
        .catch(err => console.log("ERROR:", err));
}

Protocol.startServerOnAvailablePort(app, callback);