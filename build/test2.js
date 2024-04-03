"use strict";
// // import * as controller from './controller/Blockchain';
// import * as crypto from 'crypto';
Object.defineProperty(exports, "__esModule", { value: true });
// import Blockchain from './controller/Blockchain'
// import Transaction from './controller/Transaction';
// async function derivePublicKey(privateKey: any) {
//     try {
//         const publicKey = crypto.createPublicKey(privateKey);
//         return publicKey.export({ type: 'spki', format: 'pem' });
//     } catch (error: any) {
//         throw new Error('Failed to derive public key: ' + error.message);
//     }
// }
// async function derivePublicKey2(privateKey: string, passphrase: string) {
//     try {
//         const decryptedPrivateKey = crypto.privateDecrypt(
//             {
//                 key: Buffer.from(privateKey, 'base64'),
//                 passphrase: passphrase,
//             },
//             Buffer.from(privateKey, 'base64')
//         );
//         const publicKey = crypto.createPublicKey(decryptedPrivateKey);
//         return publicKey.export({ type: 'spki', format: 'pem' });
//     } catch (error: any) {
//         throw new Error('Failed to derive public key: ' + error.message);
//     }
// }
// const privateKey1 = `-----BEGIN RSA PRIVATE KEY-----
// MIIC3TBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQItAR7x5FMox4CAggA
// MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBA7hwfuOnniS4dGbNCQpiezBIIC
// gJPZjSoAl5hFt/miC9q4LP1VnDFriB6LWuVXRiL16dQzdm9ym4mWSxZRUGMKG57C
// BIhZzjuTnPoEIBFxET/jgsIpXQV08lDz1Ae5x1U+MHV+cUVjlIomQutbAC5qDopc
// 6noB3FYdHCgZuqCXNqzgc0DfUPT3TkafYiN6Jfd8jy/BW+Ta855HSqNrUifvR92Q
// Hk4Eq16RTHNs4iYUxng8SjqYZG8BDpyLjSRx/y4XArLvzgDnu2lmexZ4x/0BLZX+
// 1kQmn+pRagOj3gblSTNQCDa/f8nI5THZ+H5O4Kzwiy5jFnUHLLASwDwv8nOV2ySd
// r7NOccFyKJEvg0bsv4usfhEUPSmQeVn5l0S/8WMI0AfrzKY9iw6yGqcUAFQy+wl8
// jjmOfQBZrwJsqvi/rldzPBiueI5pdcbwFf3i8Ly1JQFWvv5xn3bDS81Guf3vpceu
// SeQDlxULfADGxnDu1rYmRSfGodDXAdoL7KbVGrxvXKthcdamzR/R4+z1tyjOWtdq
// Iqjr7UNmOFe2Cyn5TENVhVN+ijxYEkKStPVGjUJPa1dCBqP8ZtCNLya1ljA79udB
// gRV88idwR/mrsVXu2kYk7SZc7x2RoiiiBodW0F6r7wk4DbLWi9PSP5PQEsIkZu3Z
// xBBQZ0eQ45oNykNliBsFH/rgNDKjEru4trlzpr0UqS1kCXvWqaDnBk5hF3CZUEc/
// Nh+KwdQ+XqO6Kct9hEGBka87bqJv7zF29HKePzsg7KWPL8AbQ+WAljLAh+uFpPQ1
// lA20aX332HoXRFhIsMDUvmrQh8KNMaCDdgcm9kmIBySj8PncsKmNxaMNyczY0FkS
// 7a8HYcNf2+2o4Ki4rw7ibTc=
// -----END RSA PRIVATE KEY-----`
// const pubKey1 = derivePublicKey2(privateKey1, "pass");
// // console.log(privateKey1.replace(/\n/g, ''));
// // const pubKey1 = derivePublicKey(publicKey1);
// console.log(pubKey1);
// const progenitor = new Blockchain();
// const tx1 = new Transaction('senderA', "BODY_OF_TRANSACTION_1", "private_key");
// const tx2 = new Transaction('senderB', "BODY_OF_TRANSACTION_2", "private_key");
// progenitor.addTransaction(tx1);
// progenitor.addTransaction(tx2);
// console.log(progenitor);
//------------------------------------------------------------------------------------------
// import crypto module
// import * as crypto from'crypto';
// //generate key pair
// const { generateKeyPair } = require('crypto');
// generateKeyPair('rsa', {
//     modulusLength: 4096,
//     publicKeyEncoding: {
//         type: 'pkcs1',
//         format: 'pem'
//     },
//     privateKeyEncoding: {
//         type: 'pkcs1',
//         format: 'pem',
//         cipher: 'aes-256-cbc',
//         passphrase: 'top secret'
//     }
//     // Handle errors and use the generated key pair
// }, (err: any, publicKey: any, privateKey: any) => {
//     publicKey
// });
// //Assign key to variable
// const publicKeyString = `-----BEGIN RSA PUBLIC KEY-----
// MIICCgKCAgEAzXlBBes4SpVk5BxPVuY+LR5+pxcjTNVzlVl4ugix3husiWPSfnYl
// K+z0zmWwGRBXncVgjRb/SliBhHDKSyqJ+gvk8RU1rO7qSFK0hGTrO63EKy4fbGgz
// ghO0RMi+IznBqDWldd1XeBnxVUlHhjBsYNSWdFCSh6rwNTtG2Dn8GYWpXs5AUXZn
// L97WQot7cAekZA+P5iNjsAZoh74tY0+bRRLfIvKaXPFiH1I72R7Ky8F1NwBmOx0k
// Lk++7OGlpDDmJuI/1d3SDmznoVWeEo1evgnCYrjGeF1QCAWe0SSRWYaDCddy2dUi
// 1BfUIwyMHN4OSxX6TKohAPEhkbU7dU4CUyH6oEaXddhhl427UYrtv9WY32kKnY1d
// q/3ZjZ1LRE3cwPywHQichjyGMOZF6l6tPE6ZVQHlrgsT3GTaSEO8I4F5Z0eaEAqZ
// iqeg9sOf9DfLdTvA5oZ9NKymnHqWndEM3gIV3KA4LP+qwVlsD/zFcuxWRHjM5r1K
// XvQgrLAHqfCQ7LwhUivjCjIfp2nYFYrzlDlUUZzg1AAKxhRJIUt58o7RnS/29zon
// Pur5caj1iOrhfuTvkCM4uQyampk1A5+98aOObA97jCQ7mWbn8St8Hpdqim1c2v0s
// QXeyRdm8aZ5xzJ5cZ2p2NWGvGoocx4c8i9GQuHUVktQE6nuMS7aKQlECAwEAAQ==
// -----END RSA PUBLIC KEY-----`;
// //Use the function to create and export the public key object
// const publickKeyObject = crypto.createPublicKey(publicKeyString);
// publickKeyObject.export({ format: 'pem', type: 'pkcs1' });
// console.log(publickKeyObject)
//------------------------------------------------------------------------------------------
// THIS SHIT WORKS
// const forge = require('node-forge');
// var privateKey = `-----BEGIN RSA PRIVATE KEY-----
// MIICXAIBAAKBgQCOEDvAy4g+MCLUDGk2ybxmXPR3ETXwlfAZo5lS5bDWDZe/uvMF
// 83VtN+Sf/AcRJ3A3F46vgKSaoe/38hXM4w/ADbUY5wWXAyeMf6y4kujOy/IxX2Ls
// YYFkp6D085S1Ot69gKwodYnnwHxAZaREGC+jMTOwPRzK+Iz7aOrlBqPP9QIDAQAB
// AoGANy43B3wHP6CS5qqrc4yIkXoputYEjZ6v1EWnmHt/ZKWC/AYxv24BfprnQv0y
// AYfAHqYX1jOxvB6Kh1SRAzRvOSCnGmowLjZnG4aIfkN4pj5WKNk9BdGqy1oNfH3M
// 3JbuG5cxRowMiY3nOzIsbys9c2M3lEGNlqwz/FfPPUsyLUECQQD4+6lkcwKKJnLN
// HG4ZM0chsyBJeFMmy+Z8mWHE5wrgP0+OqwCI8fg0neYMfQ1bkWxNzJtHm3kIZkKh
// sQjVw3THAkEAkhEtr9dc5OsJeEaMU4FMiufx4EalT3WkvI9QId9xCJ1P9rPIiM0j
// kxn1C1v6KMe94YW9VbU1rmURKEvUhgAhYwJBAMJjwYHiZUY09IZ9Ptw/87Y04u1Z
// mxn8Mcxv+CxB8nTYGSYbDkTdHdr+uGBhte8a38LyDv3ePaW4KSeST4KNonsCQBZ9
// ApWyCKFN9nVIF06793bjYv/uoIDtUeGeBu5QImz7G1aWM2esfa+mLW4ESS2CIx/X
// oWDSt2MUOGIF2sCOwJUCQFSsxf5dzUjHRy4G3xaM0uqg70PUfPwYm7/jSoO734tZ
// D8TrVoeYNZDvjZyVa7/jghMeKHAwRKyT8L2dmukEyJY=
// -----END RSA PRIVATE KEY-----`;
// // convert PEM-formatted private key to a Forge private key
// var forgePrivateKey = forge.pki.privateKeyFromPem(privateKey);
// // get a Forge public key from the Forge private key
// var forgePublicKey = forge.pki.setRsaPublicKey(forgePrivateKey.n, forgePrivateKey.e);
// // convert the Forge public key to a PEM-formatted public key
// var publicKey = forge.pki.publicKeyToPem(forgePublicKey);
// // convert the Forge public key to an OpenSSH-formatted public key for authorized_keys
// var sshPublicKey = forge.ssh.publicKeyToOpenSSH(forgePublicKey);
// console.log(`PEM-formatted public key:${publicKey}`);
// //------------------------------------------------------------------------------------------
// THIS ALSO WORKS, WITHOUT USING SHADY ASS NPM MODULES.
// // WE GONNA USE THISSSSSSS
// import * as crypto from 'crypto';
// interface KeyPair {
//   publicKey: string;
//   privateKey: string;
// }
// function generateRSAKeyPair(): KeyPair {
//   try {
//     const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//       modulusLength: 2048, // Adjust the modulus length as needed
//       publicKeyEncoding: { type: 'spki', format: 'pem' },
//       privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
//     });
//     return { publicKey: publicKey.toString(), privateKey: privateKey.toString() };
//   } catch (error: any) {
//     throw new Error('Failed to generate RSA key pair: ' + error.message);
//   }
// }
// function derivePublicKey(privateKey: string): string {
//   try {
//     const publicKey = crypto.createPublicKey(privateKey);
//     return publicKey.export({ type: 'spki', format: 'pem' }).toString();
//   } catch (error: any) {
//     throw new Error('Failed to derive public key: ' + error.message);
//   }
// }
// Example usage:
// const { publicKey, privateKey } = generateRSAKeyPair();
// console.log('Public Key:', publicKey);
// console.log('Private Key:', privateKey);
// const privKey = `-----BEGIN PRIVATE KEY-----
// MIIEwAIBADANBgkqhkiG9w0BAQEFAASCBKowggSmAgEAAoIBAQDVl9kg2Yh5kkjD
// gBVawIkwPCHnvEYIBdtgt0Eu5mVuQ3RcjYXhOHHi/MaC/0gRGSD3GQU1IX9WXBrD
// HYp6hsiRAL+Otf5xVGAvdHAWxneWYvl+2GSrBBLDy34hJC6t8tKPkyXVqCCEmneV
// l10Zck4qQmR+J/rFCsrfHc9JLMQ9GHVx3Od1ZRb7BtGtgWgAPqKmujSgdSQ1rTqP
// VyQq/T9G65MndXgWrhn+AypxEXs/SWJFY/BkSIf07rQk+tijN/+XnxS89O4b6xZ6
// KageqRpZGMBF1OpTfd99sFyOE5qpJOfCDouWg4Brc9lfn1/EidSbo68uPL3vl4/l
// zMLHhPxXAgMBAAECggEBAKlzm42lJtGUDWgUQFzMLMp4mkl3o3OP+fgjynHD1SqC
// F1mp6VHBbxCui2q3zlvKPM3sKqZ5GcXQsmajFA6ayZnIJzC4D9GnJ9veG2LmN0+2
// 28sXL95BEAYHddwjEWltIEFJcxWrGYk55q9l8zVR6tM58vHnE9qo8kPKKX4bJuB0
// CLSn9k89HjgbOae6zWOuH3yxwaLeZmv++PQ4F5GdeDz+/xR44xlJxeG0e7XqeLW1
// yysMBA6WKzW4/63tYxQtQkS2RpdvW+Bf6lxx/iMCLZBrhGzVR4WeoijUcbLSEF9T
// HCe+SThV6lh8VaXTAjNUotRrugQoZ7BR7932Qj3lAokCgYEA8+j129HxTuyroZbp
// 7moGFDkxg5beMeIHQnICclx9dZULy2douLSSW67nM3qz7F2o6UTK+xPP/b8/2hSv
// GbxGEnwrUwVsam1T+wqi75J5ML6bj3wSYOr22YJdHxURukawPO8bMwBn9K5fKkPX
// YvQyx+Sy80tA+nbCHEpFmXIXbhsCgYEA4C4wbdYo5iOXEQ3cEmhPODHDcyhh7SPd
// zLsF8f+2Ne+fIZYhFbIORrB4Ly3+M7AYsjtTs08DJ2zcwj91xlRLcUkBAei9yaeR
// 7b8aHDQ/Y9KQqivd67xjRzHDk9u/ygOeAS/omkVaSSSeZ8C+MbFwf+uEq6ONw1cl
// vLc5MChBnnUCgYEAgiBDKqdy6fxyBJ+S5lNCMv/gXqfamxpPbS+OBp05gcWmqTne
// MMyFWMyTJG/OFchSGUFOWW1UhbfGxP5L/Jrpd2svYfd+w7jYGRKvosiuR0cpjv9O
// fs5cK+bU74Q6FPspgxi9lhQdYfi1ZMMU4gIOJX7pycrYO8en/5fQUfEAdwkCgYEA
// w5xqE50YKOALNA1U5xbvcQgzFCu7bvGp2reiU2weMOf6gZL/IXAxdssKw5gtRCq3
// EeYkfcRG60LZSgGXocvx3FKoN2M/H1NBSSNEBDIu0cptAp+uT8EdG4U3s6++pOYN
// G9oS63Hyevoh4kRTcQb0NBpstFvNGhLT0dxKYVPvFfUCgYEA1ymFiS9p1O6TFS+8
// /3YrdKUtSUAAPOKQl2bimVrD2IOQGFylso+a0LLJnpX+E/WXQ+M9FnimT3Lkg0M2
// 8CmZju4dalDJ68Mah7hitqlY4HFTAeg+MdPeoQwejjWe0XpSzzuQYvekmDWhuNgP
// InWC/+yNuRMoBFTejM7FSbsFJZc=
// -----END PRIVATE KEY-----`
// const derivedPublicKey = derivePublicKey(privKey);
// console.log('Derived Public Key from PrivKey:', derivedPublicKey);
//-----------------------------------------------------------------------
var Transaction_1 = require("./controller/Transaction");
var Blockchain_1 = require("./controller/Blockchain");
var crypto = require("crypto");
var privKey = "-----BEGIN PRIVATE KEY-----\nMIIEwAIBADANBgkqhkiG9w0BAQEFAASCBKowggSmAgEAAoIBAQDVl9kg2Yh5kkjD\ngBVawIkwPCHnvEYIBdtgt0Eu5mVuQ3RcjYXhOHHi/MaC/0gRGSD3GQU1IX9WXBrD\nHYp6hsiRAL+Otf5xVGAvdHAWxneWYvl+2GSrBBLDy34hJC6t8tKPkyXVqCCEmneV\nl10Zck4qQmR+J/rFCsrfHc9JLMQ9GHVx3Od1ZRb7BtGtgWgAPqKmujSgdSQ1rTqP\nVyQq/T9G65MndXgWrhn+AypxEXs/SWJFY/BkSIf07rQk+tijN/+XnxS89O4b6xZ6\nKageqRpZGMBF1OpTfd99sFyOE5qpJOfCDouWg4Brc9lfn1/EidSbo68uPL3vl4/l\nzMLHhPxXAgMBAAECggEBAKlzm42lJtGUDWgUQFzMLMp4mkl3o3OP+fgjynHD1SqC\nF1mp6VHBbxCui2q3zlvKPM3sKqZ5GcXQsmajFA6ayZnIJzC4D9GnJ9veG2LmN0+2\n28sXL95BEAYHddwjEWltIEFJcxWrGYk55q9l8zVR6tM58vHnE9qo8kPKKX4bJuB0\nCLSn9k89HjgbOae6zWOuH3yxwaLeZmv++PQ4F5GdeDz+/xR44xlJxeG0e7XqeLW1\nyysMBA6WKzW4/63tYxQtQkS2RpdvW+Bf6lxx/iMCLZBrhGzVR4WeoijUcbLSEF9T\nHCe+SThV6lh8VaXTAjNUotRrugQoZ7BR7932Qj3lAokCgYEA8+j129HxTuyroZbp\n7moGFDkxg5beMeIHQnICclx9dZULy2douLSSW67nM3qz7F2o6UTK+xPP/b8/2hSv\nGbxGEnwrUwVsam1T+wqi75J5ML6bj3wSYOr22YJdHxURukawPO8bMwBn9K5fKkPX\nYvQyx+Sy80tA+nbCHEpFmXIXbhsCgYEA4C4wbdYo5iOXEQ3cEmhPODHDcyhh7SPd\nzLsF8f+2Ne+fIZYhFbIORrB4Ly3+M7AYsjtTs08DJ2zcwj91xlRLcUkBAei9yaeR\n7b8aHDQ/Y9KQqivd67xjRzHDk9u/ygOeAS/omkVaSSSeZ8C+MbFwf+uEq6ONw1cl\nvLc5MChBnnUCgYEAgiBDKqdy6fxyBJ+S5lNCMv/gXqfamxpPbS+OBp05gcWmqTne\nMMyFWMyTJG/OFchSGUFOWW1UhbfGxP5L/Jrpd2svYfd+w7jYGRKvosiuR0cpjv9O\nfs5cK+bU74Q6FPspgxi9lhQdYfi1ZMMU4gIOJX7pycrYO8en/5fQUfEAdwkCgYEA\nw5xqE50YKOALNA1U5xbvcQgzFCu7bvGp2reiU2weMOf6gZL/IXAxdssKw5gtRCq3\nEeYkfcRG60LZSgGXocvx3FKoN2M/H1NBSSNEBDIu0cptAp+uT8EdG4U3s6++pOYN\nG9oS63Hyevoh4kRTcQb0NBpstFvNGhLT0dxKYVPvFfUCgYEA1ymFiS9p1O6TFS+8\n/3YrdKUtSUAAPOKQl2bimVrD2IOQGFylso+a0LLJnpX+E/WXQ+M9FnimT3Lkg0M2\n8CmZju4dalDJ68Mah7hitqlY4HFTAeg+MdPeoQwejjWe0XpSzzuQYvekmDWhuNgP\nInWC/+yNuRMoBFTejM7FSbsFJZc=\n-----END PRIVATE KEY-----";
function derivePublicKey(privateKey) {
    try {
        var publicKey_1 = crypto.createPublicKey(privateKey);
        return publicKey_1.export({ type: 'spki', format: 'pem' }).toString();
    }
    catch (error) {
        throw new Error('Failed to derive public key: ' + error.message);
    }
}
var publicKey = derivePublicKey(privKey);
console.log("PUBLIC KEY:", publicKey);
console.log("PRIVATE KEY:", privKey);
var tx1 = new Transaction_1.default(publicKey, "any-body", privKey);
var tx2 = new Transaction_1.default(publicKey, "any-body-1", privKey);
var progenitor = new Blockchain_1.default();
progenitor.addTransaction(tx1);
progenitor.addTransaction(tx2);
// console.log(progenitor);
progenitor.mineBlock();
// console.log(progenitor);
var tx3 = new Transaction_1.default(publicKey, "any-body-1", privKey);
progenitor.addTransaction(tx3);
progenitor.mineBlock();
console.log(progenitor);
