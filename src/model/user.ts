import mongoose from 'mongoose';
import { IUser } from '../interface';
// import { TemplateModel } from './template.model';

const UserSchema: mongoose.Schema<IUser> = new mongoose.Schema({
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
})

export const User = mongoose.model('User', UserSchema);

export const getUserByUsername = (username: string) => User.findOne({ username });
export const createUser = (values: Record<string, any>) => new User(values).save().then(u => u.toObject());

export const getAllCustomers = () => User.find();
export const getCustomerById = (id: String) => User.findById(id);

export const deleteCustomerById = (id: String) => User.findOneAndDelete({ _id: id });
export const updateCustomerById = (id: String, values: Record<string, any>) => User.findByIdAndUpdate(id, values);
