import * as data from './dummyData';
import {updateSuffix, updateIncrement} from './sql_table_rubric';

// Token for God Mode, password "mateus"
exports.godToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJfX2dvZF9fIiwiaWF0IjoxNTM2OTI4NDA4fQ.tocIXmX_cm_2dyjDQyr6mvhDLA95MXG2kW-1XFjroJY";
// Token for the dummyDoctor login/passwd="mateusrp"/"mateus" below and app_secret "MySecret"
exports.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtYXRldXNycCIsImlhdCI6MTUzNjY2OTA2N30.EDlbnbXymwcoB9hCkx8spVuW63ekNcr7ZWHvrHvLI2s";
// Same as above, first letter changed so it's wrong
exports.badtoken = "ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtYXRldXNycCIsImlhdCI6MTUzNjY2OTA2N30.EDlbnbXymwcoB9hCkx8spVuW63ekNcr7ZWHvrHvLI2s";

// hardcoding the password because the dummy object should not contain it
exports.dummyDoctorCreateQuery =
    "mutation { " +
        "addDoctor(" +
            "login: \"" + data.dummyDoctor.login + "\"," +
            "password: \"" + data.dummyPassword + "\"," +
            "identityDocument: \"" + data.dummyDoctor.identityDocument + "\"," +
            "register: " + data.dummyDoctor.register + "," +
            "address: \"" + data.dummyDoctor.address + "\"," +
            "gender: \"" + data.dummyDoctor.gender + "\"," +
            "name: \"" + data.dummyDoctor.name + "\"," +
            "phone: \"" + data.dummyDoctor.phone + "\"," +
            "city: \"" + data.dummyDoctor.city + "\"," +
            "state: \"" + data.dummyDoctor.state + "\"," +
            "specialty: \"" + data.dummyDoctor.specialty + "\"" +
        ") {" +
            "token" +
        "}" +
    "}";
exports.dummyDoctorReadQuery =
    "query { " +
        "doctor {" +
            "login," +
            "identityDocument," +
            "register," +
            "address," +
            "gender," +
            "name," +
            "phone," +
            "city," +
            "state," +
            "specialty," +
        "}" +
    "}";
// Hardcoded state and gender because they have a restricted number of chars, so I couldn't just use the suffix
exports.dummyDoctorUpdateQuery =
    "mutation { " +
        "updateDoctor(" +
            // "password: \"" + data.dummyDoctor.password + "\"," +
            "identityDocument: \"" + data.dummyDoctor.identityDocument + updateSuffix + "\"," +
            "register: " + (data.dummyDoctor.register + updateIncrement) + "," +
            "address: \"" + data.dummyDoctor.address + updateSuffix + "\"," +
            "gender: \"Z\"," +
            "name: \"" + data.dummyDoctor.name + updateSuffix + "\"," +
            "phone: \"" + data.dummyDoctor.phone + updateSuffix + "\"," +
            "city: \"" + data.dummyDoctor.city + updateSuffix + "\"," +
            "state: \"AA\"," +
            "specialty: \"" + data.dummyDoctor.specialty + updateSuffix + "\"" +
        ") {" +
            "login," +
            "identityDocument," +
            "register," +
            "address," +
            "gender," +
            "name," +
            "phone," +
            "city," +
            "state," +
            "specialty" +
        "}" +
    "}";
exports.dummyDoctorDeleteQuery =
    "mutation { " +
        "removeDoctor {" +
            "login," +
            "identityDocument," +
            "register," +
            "address," +
            "gender," +
            "name," +
            "phone," +
            "city," +
            "state," +
            "specialty" +
        "} " +
    "}";

exports.dummyPatientCreateQuery =
    "mutation { " +
        "addPatient(" +
            "name: \"" + data.dummyPatient.name + "\", " +
            "dob: \"" + data.dummyPatient.dob + "\", " +
            "gender: \"" + data.dummyPatient.gender + "\", " +
            "ethnicity: \"" + data.dummyPatient.ethnicity + "\", " +
            "civilStatus: \"" + data.dummyPatient.civilStatus + "\", " +
            "phone: \"" + data.dummyPatient.phone + "\", " +
            "address: \"" + data.dummyPatient.address + "\", " +
            "profession: \"" + data.dummyPatient.profession + "\", " +
            "naturalFrom: \"" + data.dummyPatient.naturalFrom + "\", " +
            "origin: \"" + data.dummyPatient.origin + "\"," +
            "referredBy: \"" + data.dummyPatient.referredBy + "\", " +
            "obs: \"" + data.dummyPatient.obs + "\"" +
        "){" +
            "id," +
            "name," +
            "dob," +
            "gender," +
            "ethnicity," +
            "civilStatus," +
            "phone," +
            "address," +
            "profession," +
            "naturalFrom," +
            "origin," +
            "referredBy," +
            "obs" +
        "} " +
    "}";
exports.dummyPatientReadQuery =
    "query { " +
        "patient(" +
            "name: \"" + data.dummyPatient.name + "\"" +
        "){" +
            "id," +
            "name," +
            "dob," +
            "gender," +
            "ethnicity," +
            "civilStatus," +
            "phone," +
            "address," +
            "profession," +
            "naturalFrom," +
            "origin," +
            "referredBy," +
            "obs" +
        "} " +
    "}";

// Hardcoded gender and dob because they have a restricted number of chars, so I couldn't just use the suffix
exports.dummyPatientUpdateQuery =
    "mutation { " +
        "updatePatient(" +
            "id: " + data.dummyPatient.id + "," +
            "name: \"" + data.dummyPatient.name + updateSuffix + "\"," +
            "dob: \"1970-01-01\"," +
            "gender: \"Z\"," +
            "ethnicity: \"" + data.dummyPatient.ethnicity + updateSuffix + "\"," +
            "civilStatus: \"" + data.dummyPatient.civilStatus + updateSuffix + "\"," +
            "phone: \"" + data.dummyPatient.phone + updateSuffix + "\"," +
            "address: \"" + data.dummyPatient.address + updateSuffix + "\"," +
            "profession: \"" + data.dummyPatient.profession + updateSuffix + "\"," +
            "naturalFrom: \"" + data.dummyPatient.naturalFrom + updateSuffix + "\"," +
            "origin: \"" + data.dummyPatient.origin + updateSuffix +"\"," +
            "referredBy: \"" + data.dummyPatient.referredBy + updateSuffix + "\"," +
            "obs: \"" + data.dummyPatient.obs + updateSuffix + "\"" +
        "){" +
            "id," +
            "name," +
            "dob," +
            "gender," +
            "ethnicity," +
            "civilStatus," +
            "phone," +
            "address," +
            "profession," +
            "naturalFrom," +
            "origin," +
            "referredBy," +
            "obs" +
        "} " +
    "}";
exports.dummyPatientDeleteQuery =
    "mutation { " +
        "removePatient(" +
            "id: " + data.dummyPatient.id +
    "){" +
        "id," +
        "name," +
        "dob," +
        "gender," +
        "ethnicity," +
        "civilStatus," +
        "phone," +
        "address," +
        "profession," +
        "naturalFrom," +
        "origin," +
        "referredBy," +
        "obs" +
    "} }";

exports.dummyInsuranceProviderCreateQuery =
    "mutation {" +
        "addInsuranceProvider(" +
            "name: \"" + data.dummyInsuranceProvider.name + "\", " +
            "amountCharged: " + data.dummyInsuranceProvider.amountCharged +
        "){" +
            "name," +
            "amountCharged" +
        "}" +
    "}";
exports.dummyInsuranceProviderReadQuery =
    "query { " +
        "insuranceProvider (" +
            "name: \"" + data.dummyInsuranceProvider.name + "\" " +
        "){" +
            "name," +
            "amountCharged" +
        "} " +
    "}";
exports.dummyInsuranceProviderUpdateQuery =
    "mutation { " +
        "updateInsuranceProvider(" +
            "name: \"" + data.dummyInsuranceProvider.name + "\", " +
            "amountCharged: " + (data.dummyInsuranceProvider.amountCharged + updateIncrement) +
        "){" +
            "name," +
            "amountCharged" +
        "} " +
    "}";
exports.dummyInsuranceProviderDeleteQuery =
    "mutation { " +
        "removeInsuranceProvider(" +
            "name: \"" + data.dummyInsuranceProvider.name + "\"" +
        "){" +
            "name," +
            "amountCharged" +
        "} " +
    "}";

exports.dummyConsultationCreateQuery =
    "mutation {" +
        "addConsultation(" +
            "id: " + data.dummyConsultation.id + "," +
            "anamnesis: \"" + data.dummyConsultation.anamnesis + "\"," +
            "physical: \"" + data.dummyConsultation.physical + "\"," +
            "hypothesis: \"" + data.dummyConsultation.hypothesis + "\"," +
            "conduct: \"" + data.dummyConsultation.conduct + "\"," +
            "evolution: \"" + data.dummyConsultation.evolution + "\"," +
            "examination: \"" + data.dummyConsultation.examination + "\"," +
            "surgicalProcedures: \"" + data.dummyConsultation.surgicalProcedures + "\"" +
        "){" +
            "id," +
            "login," +
            "anamnesis," +
            "physical," +
            "hypothesis," +
            "conduct," +
            "evolution," +
            "examination," +
            "surgicalProcedures" +
        "}" +
    "}";
exports.dummyConsultationReadQuery =
    "query { " +
        "consultation (" +
            "name: \"" + data.dummyPatient.name + "\"" +
        "){" +
            "id," +
            "login," +
            "anamnesis," +
            "physical," +
            "hypothesis," +
            "conduct," +
            "evolution," +
            "examination," +
            "surgicalProcedures" +
        "}" +
    "}";
exports.dummyConsultationUpdateQuery =
    "mutation {" +
        "updateConsultation(" +
            "id: " + data.dummyConsultation.id + "," +
            "anamnesis: \"" + data.dummyConsultation.anamnesis + updateSuffix + "\"," +
            "physical: \"" + data.dummyConsultation.physical + updateSuffix + "\"," +
            "hypothesis: \"" + data.dummyConsultation.hypothesis + updateSuffix + "\"," +
            "conduct: \"" + data.dummyConsultation.conduct + updateSuffix + "\"," +
            "evolution: \"" + data.dummyConsultation.evolution + updateSuffix + "\"," +
            "examination: \"" + data.dummyConsultation.examination + updateSuffix + "\"," +
            "surgicalProcedures: \"" + data.dummyConsultation.surgicalProcedures + updateSuffix + "\"" +
        "){" +
            "id," +
            "login," +
            "anamnesis," +
            "physical," +
            "hypothesis," +
            "conduct," +
            "evolution," +
            "examination," +
            "surgicalProcedures" +
        "}" +
    "}";
exports.dummyConsultationDeleteQuery =
    "mutation { " +
        "removeConsultation(" +
            "id: " + data.dummyConsultation.id + "" +
        "){" +
            "id," +
            "login," +
            "anamnesis," +
            "physical," +
            "hypothesis," +
            "conduct," +
            "evolution," +
            "examination," +
            "surgicalProcedures" +
        "} " +
    "}";

exports.dummyDocTypeCreateQuery =
    "mutation {" +
        "addDocType(" +
            "name: \"" + data.dummyDocType.name + "\", " +
            "content: \"" + data.dummyDocType.content + "\"" +
        "){" +
            "login," +
            "name," +
            "content" +
        "}" +
    "}";

exports.dummyDocTypeReadQuery =
    "query { " +
        "docType (" +
            "name: \"" + data.dummyDocType.name + "\"" +
        "){" +
            "login," +
            "name," +
            "content" +
        "}" +
    "}";
exports.dummyDocTypeUpdateQuery =
    "mutation {" +
        "updateDocType(" +
            "name: \"" + data.dummyDocType.name + "\", " +
            "content: \"" + data.dummyDocType.content + updateSuffix + "\"" +
        "){" +
            "login," +
            "name," +
            "content" +
        "}" +
    "}";
exports.dummyDocTypeDeleteQuery =
    "mutation {" +
        "removeDocType(" +
            "name: \"" + data.dummyDocType.name + "\"" +
    "){" +
        "login," +
        "name," +
        "content" +
    "} }";

exports.dummyPaymentCreateQuery =
    "mutation {" +
        "addPayment(" +
            "id: " + data.dummyPayment.id + ", " +
            "date: \"" + data.dummyPayment.date + "\", " +
            "insuranceProviderName: \"" + data.dummyPayment.insuranceProviderName + "\", " +
            "amountCharged: " + data.dummyPayment.amountCharged + ", " +
            "receipt: " + data.dummyPayment.receipt +
        "){" +
            "id," +
            "login," +
            "date," +
            "insuranceProviderName," +
            "amountCharged," +
            "receipt" +
        "}" +
    "}";
exports.dummyPaymentReadQuery =
    "query { " +
        "payment(" +
            "name: \"" + data.dummyPatient.name + "\", " +
            "date: \"" + data.dummyPayment.date + "\"" +
        "){" +
            "id," +
            "login," +
            "date," +
            "insuranceProviderName," +
            "amountCharged," +
            "receipt" +
        "}" +
    "}";

exports.dummyPaymentUpdateQuery =
    "mutation {" +
        "updatePayment(" +
            "id: " + data.dummyPayment.id + ", " +
            "date: \"" + data.dummyPayment.date + "\", " +
            "insuranceProviderName: \"" + data.dummyPayment.insuranceProviderName + updateSuffix + "\", " +
            "amountCharged:" + (data.dummyPayment.amountCharged+updateIncrement) + "," +
            "receipt:" + (data.dummyPayment.receipt+updateIncrement) +
        "){" +
            "id," +
            "login," +
            "date," +
            "insuranceProviderName," +
            "amountCharged," +
            "receipt" +
        "}" +
    "}";
exports.dummyPaymentDeleteQuery =
    "mutation { " +
        "removePayment(" +
            "id: " + data.dummyPayment.id + "," +
            "date: \"" + data.dummyPayment.date + "\" " +
        "){" +
            "id," +
            "login," +
            "date," +
            "insuranceProviderName," +
            "amountCharged," +
            "receipt" +
        "} " +
    "}";

exports.dummyDoctorSignInQuery = "mutation { " +
    "signIn(" +
        "login:\"" + data.dummyDoctor.login + "\", " +
        "password:\"" + data.dummyPassword + "\"" +
    "){ token} }";

exports.dummyDoctorWrongLoginSignInQuery = "mutation { " +
    "signIn(" +
    "login:\"aWrongLogin\", " +
    "password:\"" + data.dummyPassword + "\"" +
    "){token} }";

exports.dummyDoctorWrongPasswordSignInQuery = "mutation { " +
    "signIn(" +
    "login:\"" + data.dummyDoctor.login + "\", " +
    "password:\"aWrongPassword\"" +
    "){ token} }";
