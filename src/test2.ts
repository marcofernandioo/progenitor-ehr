import * as crypto from 'crypto';
import * as forge from 'node-forge';

function derivePublicKeyFromPrivateKey(privateKey: string) {
    try {
        const publicKey = crypto.createPublicKey(privateKey);
        return publicKey.export({ type: 'spki', format: 'der' }).toString('base64');
    } catch (error: any) {
        throw new Error('Failed to derive public key: ' + error.message);
    }
}

// function derivePublicKey (privateKey: string) {
//     const privateKeyDer = Buffer.from(privateKey, 'base64');
//     crypto.generateKeyPairSync(
//         'rsa',
//         {
//             privateKey: privateKeyDer,
//             outFormat: 'der'
//         },
//         (err: any, publicKey: any) => {
//             if (err) {
//                 return "error"
//             }
//             return publicKey;
//         }
//     )
// }

function derivedPublicKey2(priv: string) {
    const privateKey = crypto.createPrivateKey(priv);
    console.log(privateKey);
    // const publicKey = crypto.createPublicKey(privateKey);
    // const publicKeyDer = publicKey.export({ type: 'spki', format: 'der' });
    // console.log(publicKeyDer)
    // return publicKeyDer.toString('base64');
}


// function getPublicKeyFromPrivateKey(privateKeyPem: string, callback: (err: Error | null, publicKey?: string) => void): void {
//     try {
//       const privateKey = crypto.createPrivateKey(privateKeyPem);
//       crypto.generateKeyPair(
//         'rsa',
//         {
//           privateKey,
//           outFormat: 'pem',
//         },
//         (err: any, publicKey: any) => {
//           if (err) {
//             callback(err);
//           } else {
//             callback(null, publicKey);
//           }
//         }
//       );
//     } catch (err) {
//       callback(err);
//     }
//   }

function derivePublicKeyFromPrivateKeys(privateKeyPem: string) {
    try {
        // Convert the PEM-encoded private key to a forge PrivateKey object
        const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    
        // Generate the public key from the private key
        const publicKey = forge.pki.setRsaPublicKey(privateKey.n, privateKey.e);
    
        // Convert the public key to PEM format
        const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
    
        return publicKeyPem;
      } catch (err) {
        throw err;
      }
}


function generateRSAKeyPair(): any {
    try {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096, // Adjust the modulus length as needed
            publicKeyEncoding: { type: 'spki', format: 'der' },
            privateKeyEncoding: { type: 'pkcs8', format: 'der' },
        });
        return { publicKey: publicKey.toString('base64'), privateKey: privateKey.toString('base64') };
    } catch (error: any) {
        throw new Error('Failed to generate RSA key pair: ' + error.message);
    }
}

    // const { publicKey, privateKey } = generateRSAKeyPair();
    // console.log("Pub: ")
    // console.log(publicKey);
    // console.log("Priv: ")
    // console.log(privateKey);

    const privateKey = `-----BEGIN PRIVATE KEY-----
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



    console.log(derivePublicKeyFromPrivateKeys(privateKey));
    // console.log(publicKey === _publicKey);
    // console.log(publicKey);
    // console.log(_publicKey);

    // const { pub, priv } = generateRSAKeyPair();
// console.log(pub)
// console.log(priv)