import * as crypto from 'crypto';

import { IKeyPair } from '../interface';

export class util {
    
    static derivePublicKeyFromPrivateKey(privateKey: string) {
        try {
            const publicKey = crypto.createPublicKey(privateKey);
            return publicKey.export({ type: 'spki', format: 'pem' }).toString();
        } catch (error: any) {
            throw new Error('Failed to derive public key: ' + error.message);
        }
    }

    static generateRSAKeyPair(): IKeyPair {
        try {
          const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048, // Adjust the modulus length as needed
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
          });
          return { publicKey: publicKey.toString(), privateKey: privateKey.toString() };
        } catch (error: any) {
          throw new Error('Failed to generate RSA key pair: ' + error.message);
        }
      }

}
