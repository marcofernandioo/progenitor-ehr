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
var express = require('express');
var mongoose_1 = require("mongoose");
var cors = require('cors');
var path = require("path");
// import { derivePrivateKeyFromPublicKey } from './util';
var util_1 = require("./util");
var index_1 = require("./protocol/index");
// import Progenitor from './controller/BlockchainInstance';
var Blockchain_1 = require("./controller/Blockchain");
var Transaction_1 = require("./controller/Transaction");
var user_1 = require("./model/user");
var dbString = "mongodb+srv://marco:marco@comingback.2ovq7pl.mongodb.net/progenitor-ehr?retryWrites=true&w=majority&appName=ComingBack";
var app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static('public'));
// Test endpoint
app.get('/', function (req, res) {
    res.json({ data: "yo this fire." });
});
// [DONE] Registration
app.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, role, _b, publicKey, privateKey, _user, e_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, username = _a.username, role = _a.role;
                _b = util_1.util.generateRSAKeyPair(), publicKey = _b.publicKey, privateKey = _b.privateKey;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, user_1.createUser)({ username: username, role: role, publicKey: publicKey })];
            case 2:
                _user = _c.sent();
                return [2 /*return*/, res.json({ data: { publicKey: publicKey, privateKey: privateKey } })];
            case 3:
                e_1 = _c.sent();
                return [2 /*return*/, res.json({ e: e_1 })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Login
app.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, privateKey, user, _publicKey, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, username = _a.username, privateKey = _a.privateKey;
                return [4 /*yield*/, (0, user_1.getUserByUsername)(username)];
            case 1:
                user = _b.sent();
                _publicKey = util_1.util.derivePublicKeyFromPrivateKey(privateKey);
                if (user.publicKey === _publicKey) {
                    return [2 /*return*/, res.json({ data: "logged in" })];
                }
                return [3 /*break*/, 3];
            case 2:
                e_2 = _b.sent();
                return [2 /*return*/, res.json({ e: e_2 })];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Pass the blockchain state to the network
app.get('/get-data', function (req, res) {
    // 1. Actually have the blockchain data as an object.
    // 2. Propagate.
});
// Mine the transactions in the blockchain.
app.get('/mine', function (req, res) {
    // 0. Get the current state of the bc.
    // 1. Mine transactions
    // 2. Propagate new blockchain state.
});
// Endpoint to receive any data from the network
app.post('/receive', function (req, res) {
    // Note: Before overriding the current bc with the new, make sure the whole bc is valid.
    // 1. Node receives the newest blockchain state.
    var data = req.body;
    console.log('Data received: ', data.data);
    // 2. Node returns the newest bc state to the response/ pass it to its client.
});
app.post('/override', function (req, res) {
    // const newBc = new Blockchain();
    var newBc = new Blockchain_1.default();
});
// Create a new Transaction
app.get('/create/transaction', function (req, res) {
    var body = req.body.body;
    // const { publicKey, body, privateKey } = req.body;
    var publicKey = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ZfZINmIeZJIw4AVWsCJ\nMDwh57xGCAXbYLdBLuZlbkN0XI2F4Thx4vzGgv9IERkg9xkFNSF/Vlwawx2KeobI\nkQC/jrX+cVRgL3RwFsZ3lmL5fthkqwQSw8t+ISQurfLSj5Ml1agghJp3lZddGXJO\nKkJkfif6xQrK3x3PSSzEPRh1cdzndWUW+wbRrYFoAD6ipro0oHUkNa06j1ckKv0/\nRuuTJ3V4Fq4Z/gMqcRF7P0liRWPwZEiH9O60JPrYozf/l58UvPTuG+sWeimoHqka\nWRjARdTqU33ffbBcjhOaqSTnwg6LloOAa3PZX59fxInUm6OvLjy975eP5czCx4T8\nVwIDAQAB\n-----END PUBLIC KEY-----";
    var privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEwAIBADANBgkqhkiG9w0BAQEFAASCBKowggSmAgEAAoIBAQDVl9kg2Yh5kkjD\ngBVawIkwPCHnvEYIBdtgt0Eu5mVuQ3RcjYXhOHHi/MaC/0gRGSD3GQU1IX9WXBrD\nHYp6hsiRAL+Otf5xVGAvdHAWxneWYvl+2GSrBBLDy34hJC6t8tKPkyXVqCCEmneV\nl10Zck4qQmR+J/rFCsrfHc9JLMQ9GHVx3Od1ZRb7BtGtgWgAPqKmujSgdSQ1rTqP\nVyQq/T9G65MndXgWrhn+AypxEXs/SWJFY/BkSIf07rQk+tijN/+XnxS89O4b6xZ6\nKageqRpZGMBF1OpTfd99sFyOE5qpJOfCDouWg4Brc9lfn1/EidSbo68uPL3vl4/l\nzMLHhPxXAgMBAAECggEBAKlzm42lJtGUDWgUQFzMLMp4mkl3o3OP+fgjynHD1SqC\nF1mp6VHBbxCui2q3zlvKPM3sKqZ5GcXQsmajFA6ayZnIJzC4D9GnJ9veG2LmN0+2\n28sXL95BEAYHddwjEWltIEFJcxWrGYk55q9l8zVR6tM58vHnE9qo8kPKKX4bJuB0\nCLSn9k89HjgbOae6zWOuH3yxwaLeZmv++PQ4F5GdeDz+/xR44xlJxeG0e7XqeLW1\nyysMBA6WKzW4/63tYxQtQkS2RpdvW+Bf6lxx/iMCLZBrhGzVR4WeoijUcbLSEF9T\nHCe+SThV6lh8VaXTAjNUotRrugQoZ7BR7932Qj3lAokCgYEA8+j129HxTuyroZbp\n7moGFDkxg5beMeIHQnICclx9dZULy2douLSSW67nM3qz7F2o6UTK+xPP/b8/2hSv\nGbxGEnwrUwVsam1T+wqi75J5ML6bj3wSYOr22YJdHxURukawPO8bMwBn9K5fKkPX\nYvQyx+Sy80tA+nbCHEpFmXIXbhsCgYEA4C4wbdYo5iOXEQ3cEmhPODHDcyhh7SPd\nzLsF8f+2Ne+fIZYhFbIORrB4Ly3+M7AYsjtTs08DJ2zcwj91xlRLcUkBAei9yaeR\n7b8aHDQ/Y9KQqivd67xjRzHDk9u/ygOeAS/omkVaSSSeZ8C+MbFwf+uEq6ONw1cl\nvLc5MChBnnUCgYEAgiBDKqdy6fxyBJ+S5lNCMv/gXqfamxpPbS+OBp05gcWmqTne\nMMyFWMyTJG/OFchSGUFOWW1UhbfGxP5L/Jrpd2svYfd+w7jYGRKvosiuR0cpjv9O\nfs5cK+bU74Q6FPspgxi9lhQdYfi1ZMMU4gIOJX7pycrYO8en/5fQUfEAdwkCgYEA\nw5xqE50YKOALNA1U5xbvcQgzFCu7bvGp2reiU2weMOf6gZL/IXAxdssKw5gtRCq3\nEeYkfcRG60LZSgGXocvx3FKoN2M/H1NBSSNEBDIu0cptAp+uT8EdG4U3s6++pOYN\nG9oS63Hyevoh4kRTcQb0NBpstFvNGhLT0dxKYVPvFfUCgYEA1ymFiS9p1O6TFS+8\n/3YrdKUtSUAAPOKQl2bimVrD2IOQGFylso+a0LLJnpX+E/WXQ+M9FnimT3Lkg0M2\n8CmZju4dalDJ68Mah7hitqlY4HFTAeg+MdPeoQwejjWe0XpSzzuQYvekmDWhuNgP\nInWC/+yNuRMoBFTejM7FSbsFJZc=\n-----END PRIVATE KEY-----";
    // 1. Create a new tx object
    var newTransaction = new Transaction_1.default(publicKey, body, privateKey);
    // Blockchain.addTransaction(newTransaction);
    // 2. Add the tx obj into the blockchain
    console.log(Blockchain_1.default);
});
var callback = function (port) {
    console.log("Node is running on port", port);
    // I guess we can instantiate the blockchain here?
    // const progenitor = new Blockchain();
    console.log(Blockchain_1.default);
    index_1.default.propagateRequest('POST', '/receive', { data: 'dllm' });
    mongoose_1.default.connect(dbString)
        .then(function () { return console.log("DB Connected"); })
        .catch(function (err) { return console.log("ERROR:", err); });
};
index_1.default.startServerOnAvailablePort(app, callback);
