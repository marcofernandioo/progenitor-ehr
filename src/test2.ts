// // const crypto = require('crypto');
// import * as crypto from 'crypto';

// // Function to generate a key pair
// function generateKeyPair(modulusLength = 4096, callback: any) {
//     crypto.generateKeyPair(
//       'rsa',
//       {
//         modulusLength,
//         publicKeyEncoding: {
//           type: 'spki',
//           format: 'der',
//         },
//         privateKeyEncoding: {
//           type: 'pkcs8',
//           format: 'der',
//         },
//       },
//       (err, publicKey, privateKey) => {
//         if (err) {
//           callback(err);
//           return;
//         }
  
//         // Convert keys to base64 format
//         const publicKeyBase64 = publicKey.toString('base64');
//         const privateKeyBase64 = privateKey.toString('base64');
  
//         callback(null, { publicKey: publicKeyBase64, privateKey: privateKeyBase64 });
//       }
//     );
//   }
  
//   // Function to derive the public key from the private key
//   function derivePublicKey(privateKeyBase64: any, callback: any) {
//     const privateKeyDer = Buffer.from(privateKeyBase64, 'base64');
  
//     crypto.generateKeyPair(
//       'rsa',
//       {
//         privateKey: privateKeyDer,
//         outFormat: 'der',
//       },
//       (err, publicKey) => {
//         if (err) {
//           callback(err);
//           return;
//         }
  
//         const derivedPublicKeyBase64 = publicKey.toString('base64');
//         callback(null, derivedPublicKeyBase64);
//       }
//     );
//   }
  
//   // Usage examples
//   generateKeyPair(2048, (err: any, keys: any) => {
//     if (err) {
//       console.error('Error generating key pair:', err);
//       return;
//     }
  
//     console.log('Generated Public Key (DER, Base64):');
//     console.log(keys.publicKey);
//     console.log('\nGenerated Private Key (DER, Base64):');
//     console.log(keys.privateKey);
  
//     derivePublicKey(keys.privateKey, (err, derivedPublicKey) => {
//       if (err) {
//         console.error('Error deriving public key:', err);
//         return;
//       }
  
//       console.log('\nDerived Public Key (DER, Base64):');
//       console.log(derivedPublicKey);
//     });
//   });