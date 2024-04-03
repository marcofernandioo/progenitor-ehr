"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerById = exports.deleteCustomerById = exports.getCustomerById = exports.getAllCustomers = exports.createUser = exports.getUserByUsername = exports.User = void 0;
var mongoose_1 = require("mongoose");
// import { TemplateModel } from './template.model';
var UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true
    },
    publicKey: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    }
});
exports.User = mongoose_1.default.model('User', UserSchema);
var getUserByUsername = function (username) { return exports.User.findOne({ username: username }); };
exports.getUserByUsername = getUserByUsername;
var createUser = function (values) { return new exports.User(values).save().then(function (u) { return u.toObject(); }); };
exports.createUser = createUser;
var getAllCustomers = function () { return exports.User.find(); };
exports.getAllCustomers = getAllCustomers;
var getCustomerById = function (id) { return exports.User.findById(id); };
exports.getCustomerById = getCustomerById;
var deleteCustomerById = function (id) { return exports.User.findOneAndDelete({ _id: id }); };
exports.deleteCustomerById = deleteCustomerById;
var updateCustomerById = function (id, values) { return exports.User.findByIdAndUpdate(id, values); };
exports.updateCustomerById = updateCustomerById;
