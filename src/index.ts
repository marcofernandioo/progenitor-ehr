// import getPort from '../node_modules/get-port';
// import * as ejs from 'ejs';
const express = require('express');
import mongoose from 'mongoose';

import * as path from 'path';

import { derivePrivateKeyFromPublicKey } from './util';
import Protocol from './protocol/index'

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')))
// app.set('view engine', 'ejs');

// app.set('views', `D:\\prog\\projects\\progenitor\\progenitor-chain\\src\\views`);
// app.set('views', path.resolve(__dirname, "..", "src\\views"));

// console.log(path.resolve(__dirname, "..", "src\\views"));
console.log("Client Path:", path.join(__dirname, "../client-vite/dist"))
// app.set('views', './views');

app.use(express.static('public'));

const startServerOnAvailablePort = async () => {
    // const port = await getPort({ port: ports });
    // console.log(getPort);

    // // If we try to initialize more ports than specified in the array,
    // // rejected.
    // if (port > ports[ports.length - 1]) {
    //     return null;
    // }

    // // This endpoint is for this node to receive the data.
    // // Nodes must call this endpoint "/" to send data to other nodes.
    // app.post('/', (req: any, res: any) => {
    //     const data = req.body;
    //     console.log(`Received data: ${JSON.stringify(data.key)}`);
    //     // Process the received data as needed
    //     res.send('DIU LEI LOU MOU');
    // })

    // app.listen(port);
    // console.log(`Node server running on port ${port}`);
}

startServerOnAvailablePort();

app.post('/register', (req: any, res: any) => {
    // 1. Input Username & role.
    // 2. Generate ppkp.
    // 3. Store in DB.
    res.json({data: "successfully loaded."})
})

app.post('/login', (req: any, res: any) => {
    // const { username, privateKey } = req.body;
    // 1. Find username in DB.
    // const user = User.findOne(username);
    // 2. Check if private key entered could generate the public key stored in the DB.
    // const _publicKey = derivePublicKeyFromPrivateKey(privateKey);
    // if (user.publicKey === _publicKey)
    // return true;
    res.json({data: "logged in"});   
})

// Return a response of the current blockchain data.
app.get('/get-data', (req: any, res: any) => {
    // 1. Actually have the blockchain data as an object.
    // 2. Propagate.
})

// app.listen(3000, () => {
//     console.log("Node running on port 3000")
// });

// Protocol.startServerOnAvailablePort(app);
Protocol.startServerOnAvailablePort(app);

