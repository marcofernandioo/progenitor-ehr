import * as I from '../interface';

class MedicalRecord implements I.IMedicalRecord {

    hospital: string;
    doctorInCharge: string;
    treatment: string;
    diagnosis: string;

    constructor (_hospital: string, _doctor: string, _treatment: string, _diagnosis: string) {
        this.hospital = _hospital;
        this.doctorInCharge = _doctor;
        this.treatment = _treatment;
        this.diagnosis = _diagnosis;
    }

}

export default MedicalRecord;