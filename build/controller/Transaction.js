"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var forge = require("node-forge");
var Transaction = /** @class */ (function () {
    function Transaction(_sender, _medicalRecord) {
        this.hash = "";
        this.signature = "";
        this.sender = _sender;
        this.timestamp = Date.now();
        this.medicalRecord = _medicalRecord;
        this.hash = this.calculateTxHash();
        console.log(_medicalRecord);
    }
    ;
    // Sign a transaction using the private key.
    Transaction.prototype.signTx = function (privateKey) {
        return __awaiter(this, void 0, void 0, function () {
            var signer, signature;
            return __generator(this, function (_a) {
                signer = crypto.createSign('sha256');
                this.hash = this.calculateTxHash();
                signer.update(Buffer.from(this.hash));
                signature = signer.sign(privateKey);
                this.signature = signature.toString('hex');
                return [2 /*return*/];
            });
        });
    };
    Transaction.prototype.signWithForge = function (privateKeyPEM) {
        try {
            // Parse private key
            var privateKey = forge.pki.privateKeyFromPem(privateKeyPEM);
            // Calculate hash
            var md = forge.md.sha256.create();
            md.update(this.medicalRecord.toString(), 'utf8');
            var hash = md.digest().getBytes();
            // Sign the hash
            var signature = privateKey.sign(hash);
            // Convert the signature to hexadecimal string
            console.log(signature);
            return forge.util.bytesToHex(signature);
        }
        catch (error) {
            console.error('Error signing with Forge:', error.message);
            throw error;
        }
    };
    // PROD: Move this to util files. Transaction hash, not yet signed by sender.
    Transaction.prototype.calculateTxHash = function () {
        return crypto.createHash('sha256').update(this.sender + this.medicalRecord.toString() + this.timestamp).digest('hex');
    };
    // We sign the transaction hash using private key.
    Transaction.prototype.sign = function (key) {
        if (key.getPublic('hex') !== this.sender)
            throw new Error("Sender does not match with given keys.");
        var sign = key.sign(this.hash, 'base64');
        return sign.toDER('hex');
    };
    return Transaction;
}());
exports.default = Transaction;
