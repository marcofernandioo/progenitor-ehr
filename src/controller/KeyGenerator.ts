import * as crypto from 'crypto';

interface KeyPair {
  publicKey: string;
  privateKey: string;
}

function generateRSAKeyPairDEPRECATED(): Promise<KeyPair> {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      'rsa',
      {
        modulusLength: 4096,
        publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs1', format: 'pem', cipher: 'aes-256-cbc', passphrase: "pass" },
      },
      (err, publicKey, privateKey) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            publicKey: `${publicKey.toString()}`,
            privateKey: `${privateKey.toString()}`
          })
        }
      }
    );
  });
}


function generateRSAKeyPair(): KeyPair {
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

function derivePublicKey(privateKey: string): string {
  try {
    const publicKey = crypto.createPublicKey(privateKey);
    return publicKey.export({ type: 'spki', format: 'pem' }).toString();
  } catch (error: any) {
    throw new Error('Failed to derive public key: ' + error.message);
  }
}


// Example usage
generateRSAKeyPairDEPRECATED()
  .then((keyPair: KeyPair) => {
    console.log('Public Key:', keyPair.publicKey);
    console.log('Private Key:', keyPair.privateKey);
  })
  .catch((err) => {
    console.error('Error generating key pair:', err);
  });


// Example usage:
const { publicKey, privateKey } = generateRSAKeyPair();
console.log('Public Key:', publicKey);
console.log('Private Key:', privateKey);

const derivedPublicKey = derivePublicKey(privateKey);
console.log('Derived Public Key:', derivedPublicKey);