"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MedicalRecord = /** @class */ (function () {
    function MedicalRecord(_hospital, _doctor, _treatment, _diagnosis) {
        this.hospital = _hospital;
        this.doctorInCharge = _doctor;
        this.treatment = _treatment;
        this.diagnosis = _diagnosis;
    }
    return MedicalRecord;
}());
exports.default = MedicalRecord;
