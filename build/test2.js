"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var forge = require("node-forge");
var Transaction_1 = require("./controller/Transaction");
var MedicalRecord_1 = require("./controller/MedicalRecord");
function derivePublicKeyFromPrivateKey(privateKey) {
    try {
        var publicKey = crypto.createPublicKey(privateKey);
        return publicKey.export({ type: 'spki', format: 'der' }).toString('base64');
    }
    catch (error) {
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
function derivedPublicKey2(priv) {
    var privateKey = crypto.createPrivateKey(priv);
    console.log(privateKey);
    // const publicKey = crypto.createPublicKey(privateKey);
    // const publicKeyDer = publicKey.export({ type: 'spki', format: 'der' });
    // console.log(publicKeyDer)
    // return publicKeyDer.toString('base64');
}
var _publicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ZfZINmIeZJIw4AVWsCJ\nMDwh57xGCAXbYLdBLuZlbkN0XI2F4Thx4vzGgv9IERkg9xkFNSF/Vlwawx2KeobI\nkQC/jrX+cVRgL3RwFsZ3lmL5fthkqwQSw8t+ISQurfLSj5Ml1agghJp3lZddGXJO\nKkJkfif6xQrK3x3PSSzEPRh1cdzndWUW+wbRrYFoAD6ipro0oHUkNa06j1ckKv0/\nRuuTJ3V4Fq4Z/gMqcRF7P0liRWPwZEiH9O60JPrYozf/l58UvPTuG+sWeimoHqka\nWRjARdTqU33ffbBcjhOaqSTnwg6LloOAa3PZX59fxInUm6OvLjy975eP5czCx4T8\nVwIDAQAB\n-----END PUBLIC KEY-----";
var _privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEwAIBADANBgkqhkiG9w0BAQEFAASCBKowggSmAgEAAoIBAQDVl9kg2Yh5kkjD\ngBVawIkwPCHnvEYIBdtgt0Eu5mVuQ3RcjYXhOHHi/MaC/0gRGSD3GQU1IX9WXBrD\nHYp6hsiRAL+Otf5xVGAvdHAWxneWYvl+2GSrBBLDy34hJC6t8tKPkyXVqCCEmneV\nl10Zck4qQmR+J/rFCsrfHc9JLMQ9GHVx3Od1ZRb7BtGtgWgAPqKmujSgdSQ1rTqP\nVyQq/T9G65MndXgWrhn+AypxEXs/SWJFY/BkSIf07rQk+tijN/+XnxS89O4b6xZ6\nKageqRpZGMBF1OpTfd99sFyOE5qpJOfCDouWg4Brc9lfn1/EidSbo68uPL3vl4/l\nzMLHhPxXAgMBAAECggEBAKlzm42lJtGUDWgUQFzMLMp4mkl3o3OP+fgjynHD1SqC\nF1mp6VHBbxCui2q3zlvKPM3sKqZ5GcXQsmajFA6ayZnIJzC4D9GnJ9veG2LmN0+2\n28sXL95BEAYHddwjEWltIEFJcxWrGYk55q9l8zVR6tM58vHnE9qo8kPKKX4bJuB0\nCLSn9k89HjgbOae6zWOuH3yxwaLeZmv++PQ4F5GdeDz+/xR44xlJxeG0e7XqeLW1\nyysMBA6WKzW4/63tYxQtQkS2RpdvW+Bf6lxx/iMCLZBrhGzVR4WeoijUcbLSEF9T\nHCe+SThV6lh8VaXTAjNUotRrugQoZ7BR7932Qj3lAokCgYEA8+j129HxTuyroZbp\n7moGFDkxg5beMeIHQnICclx9dZULy2douLSSW67nM3qz7F2o6UTK+xPP/b8/2hSv\nGbxGEnwrUwVsam1T+wqi75J5ML6bj3wSYOr22YJdHxURukawPO8bMwBn9K5fKkPX\nYvQyx+Sy80tA+nbCHEpFmXIXbhsCgYEA4C4wbdYo5iOXEQ3cEmhPODHDcyhh7SPd\nzLsF8f+2Ne+fIZYhFbIORrB4Ly3+M7AYsjtTs08DJ2zcwj91xlRLcUkBAei9yaeR\n7b8aHDQ/Y9KQqivd67xjRzHDk9u/ygOeAS/omkVaSSSeZ8C+MbFwf+uEq6ONw1cl\nvLc5MChBnnUCgYEAgiBDKqdy6fxyBJ+S5lNCMv/gXqfamxpPbS+OBp05gcWmqTne\nMMyFWMyTJG/OFchSGUFOWW1UhbfGxP5L/Jrpd2svYfd+w7jYGRKvosiuR0cpjv9O\nfs5cK+bU74Q6FPspgxi9lhQdYfi1ZMMU4gIOJX7pycrYO8en/5fQUfEAdwkCgYEA\nw5xqE50YKOALNA1U5xbvcQgzFCu7bvGp2reiU2weMOf6gZL/IXAxdssKw5gtRCq3\nEeYkfcRG60LZSgGXocvx3FKoN2M/H1NBSSNEBDIu0cptAp+uT8EdG4U3s6++pOYN\nG9oS63Hyevoh4kRTcQb0NBpstFvNGhLT0dxKYVPvFfUCgYEA1ymFiS9p1O6TFS+8\n/3YrdKUtSUAAPOKQl2bimVrD2IOQGFylso+a0LLJnpX+E/WXQ+M9FnimT3Lkg0M2\n8CmZju4dalDJ68Mah7hitqlY4HFTAeg+MdPeoQwejjWe0XpSzzuQYvekmDWhuNgP\nInWC/+yNuRMoBFTejM7FSbsFJZc=\n-----END PRIVATE KEY-----";
var newMR = new MedicalRecord_1.default("", "doct", "treatment", "diag");
var newTx = new Transaction_1.default(_publicKey, newMR);
newTx.signTx(_privateKey);
console.log(newTx);
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
function derivePublicKeyFromPrivateKeys(privateKeyPem) {
    try {
        // Convert the PEM-encoded private key to a forge PrivateKey object
        var privateKey_1 = forge.pki.privateKeyFromPem(privateKeyPem);
        // Generate the public key from the private key
        var publicKey = forge.pki.setRsaPublicKey(privateKey_1.n, privateKey_1.e);
        // Convert the public key to PEM format
        var publicKeyPem = forge.pki.publicKeyToPem(publicKey);
        return publicKeyPem;
    }
    catch (err) {
        throw err;
    }
}
function generateRSAKeyPair() {
    try {
        var _a = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096, // Adjust the modulus length as needed
            publicKeyEncoding: { type: 'spki', format: 'der' },
            privateKeyEncoding: { type: 'pkcs8', format: 'der' },
        }), publicKey = _a.publicKey, privateKey_2 = _a.privateKey;
        return { publicKey: publicKey.toString('base64'), privateKey: privateKey_2.toString('base64') };
    }
    catch (error) {
        throw new Error('Failed to generate RSA key pair: ' + error.message);
    }
}
// const { publicKey, privateKey } = generateRSAKeyPair();
// console.log("Pub: ")
// console.log(publicKey);
// console.log("Priv: ")
// console.log(privateKey);
var privateKey = "-----BEGIN PRIVATE KEY-----\n    MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChmYR4x1cDYu5R\n    z0e12djFYq3hgdE4MnClFeu8pxQYh1X80UJDlD+FuAs7n9FnjiGjjkC61HtIlUka\n    PtK2Qzxf2l3syP3KDGbOf8bHzyhHpg/BD01OqP6iWUut9vjFzlzw6U4c7+OrQIc2\n    IWJdvjytfaXkGfUjt/S0Lcmjok7O0Oiban+GXtjsDfanHQ8BCpQBE3Fa70kEIWUC\n    OGyR9287ZDZ5PG2jSO8lMKUSbDjXOdw69oxI7Rx5nsGaXHCQ7YbO2L1/wdrif2UU\n    89QuIN2/D/d6dOuBceXGAM1+Bct3igJBqzi4RLi6ugVkg2mzSE1ECCRAU6uILy4M\n    lpsr904nAgMBAAECggEAQ163BYtFUVobNOwPX1b0skWTbCIs0RrmL0zWPI4DKL6z\n    MHUlBPt3CA5UUIUuTdfJWmBhyAHxa68hDNoICog5UVS+N4sLkwJckdZfTsmkZ0pp\n    4vi4KAT4M0K69Em0KPMBeEYrlJDF/40lUYHVenNm5IUvdcsEkeGNGNjF6XwvErUH\n    zNqiL5M5+ws5Las42dwt/mRgtOu8PyVKkY+vyKd4Ps2BAw/ozyihv9ASdaQksN74\n    gN7MwDmTETPXO8ILIquW8E2oP834aoM+7vbgQqNJU+l95wfP9C9T/TCyliCHDbHq\n    v9kUV9Rudto6qQIqrl9jE+M9rP/KsWSRlnuarHN7AQKBgQDL+hNctA/NZtkpAn0C\n    rz9hvyhtmUX1jkSnf43MRr3opxugQ7HbOTvsUt3y/DTYlJxopV+SnpPNS6Y3IQPp\n    LNAEv/9NAVuNJwDrlNx2F1CXw0jnGKt1q9ZIuZef0RSn3BezshRn2+7Rz7Lwkphl\n    L3fpcQwaRYKL61I2aRL5jKN7QQKBgQDK0JQawvd1+g3qsxtnvUFGbz7OrJNL0z7T\n    S+N85Eu2myA0dW8tD6gliqo5pp34txC5UL9X+LupI/lmGryqDWtuMfYpcE4z3g2E\n    qsgWi91VydRG7X4P6RDwkMLntp6soNDOT2Onwal6MsZNs5IyBy1XyA5x+0pVU+YH\n    LsGN8gX3ZwKBgGoXlRCHmxyDnPnGkIzf58CIc5elvAx/Rdg08OTJ+qbSm/zcmNpk\n    R3WgmE50vWvUyBFpym7xSgDikv5jjqwuIbgGwNwlk5+0JLdjgtNtRv7YlMeWPkAC\n    8356AZIfZnX0dOODATgP3YSFWhXkuZ0PdngV02yqsL7j06v3NOZVLwbBAoGAY+uf\n    DBBCGr23XYogVlvHbQwhxXEAoLrSmQcqbL2ND8odc7rnqyuri9NlSkHsUjze4G4H\n    1y+URSCUHtnNWXqDEydKP+A0pxkfT91T9sexpDJrgwY+tVf+IIcxfzdZtXMFbJ9w\n    WZXwCWQ6js2JmVwv2q+VblJ/rMpI6gD/Gw/CIMECgYEApnRx7FBs46igwnLgnwhT\n    VhRNnIw3Pn/a6bR6WePEw41Bwhv7ASemAL/DVUTsxoCcR0n5o30YLwQYhW+yeD77\n    ZuGoh4QSeTzH9dBSBHJ7EM3FoqsFGkni6WNK1Qj8r64VBGTwhozjSlKClPWybdEe\n    gA3uztMlpfe8X0fLuXYKTzQ=\n    -----END PRIVATE KEY-----";
// This one keknya works
// console.log(derivePublicKeyFromPrivateKeys(privateKey));
// console.log(publicKey === _publicKey);
// console.log(publicKey);
// console.log(_publicKey);
// const { pub, priv } = generateRSAKeyPair();
// console.log(pub)
// console.log(priv)
