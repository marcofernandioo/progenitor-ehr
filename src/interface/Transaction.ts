import { IMedicalRecord } from "./MedicalRecord";

export interface ITransaction {
    sender: String,
    timestamp: Number,
    medicalRecord: IMedicalRecord,
    hash: String,
    signature: String
}