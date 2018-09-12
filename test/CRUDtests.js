/**
 * This is to test if GraphQL+Sequelize are mapping into the legacy table correctly,
 * to assert backward compatibility with the client's existing system
 *
 * ASSUMPTIONS
 *  - MUST HAVE A MYSQL SERVER AVAILABLE AND AN USER WITH AT LEAST CREATE/DROP DATABASE PRIVILEGES
 * FOR THESE TESTS TO RUN
 */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.should();
chai.use(chaiAsPromised);

import * as SQL from './rawSQL';
import { tester } from 'graphql-tester';
import * as dummyData from './dummyData';
import * as testQueries from './CRUDtestData';

/**
 * Helper function to test update: extends a base promise to test that it has all child properties
 * from a prototype, but with different values. Allows also to ignore a subset of properties.
 *
 * @param basePromise e.g: result.should.eventually.have.property('data').have.property('updateDoctor')
 * @param sampleObjName e.g.: "dummyData.dummyDoctor" (yes, a string)
 * @param exceptions list of keys that should be ignored e.g. [ 'login', 'password' ]
 *
 * @returns {Array} of promises that need to be fulfilled
 */
function samePropertiesDifferentValues(basePromise, sampleObjName, exceptions) {
    let myTestPromises = [];
    for (let p of Object.keys(eval(sampleObjName))) {
        if (!(exceptions.includes(p))) {
            myTestPromises.push(
                eval(basePromise+".have.property('"+p+"').not.equal("+sampleObjName + "." + p + ")")
            );
        }
    }
    return myTestPromises;
}

/**
 * ACTUAL TESTS START HERE
 * TODO: test Authentication
 * TODO: test Authorization
 */
let myTester = tester({
    url: process.env.myServer,
    authorization: `Bearer ${testQueries.token}`,
});
let result = {};
describe("DB CRUD Functionality", ()=> {
    beforeEach(SQL.resetDB);
    // Show something useful to help me debug, which f*cking mocha/chai don't when dealing with GraphQL
    afterEach(async ()=>{
        const r = await result;
        // console.log(r.raw);
        if (r.errors) {
            console.log("ERROR:");
            console.log(r.errors);
        }
    });
    describe("Doctor CRUD Functionality", ()=> {
        it("Doctor can be (C)reated", ()=>{
            const result = myTester(testQueries.dummyDoctorCreateQuery);
            return result.should.eventually
                .have.property('data').have.property('addDoctor')
                .have.property('token');
        });
        describe("When a Doctor exists", ()=>{
            beforeEach(SQL.addDummyDoctorDirectly);
            it("Document Type can be (C)reated", ()=>{
                result = myTester(testQueries.dummyDocTypeCreateQuery);
                return result.should.eventually
                    .have.property('data').have.property('addDocType')
                    .become(dummyData.dummyDocType);
            });
            describe("When Document Type exists", ()=>{ // We wanna do that before deleting the dr
                beforeEach(SQL.addDummyDocTypeDirectly);
                it("Document Type can be (R)ead", ()=>{
                    result = myTester(testQueries.dummyDocTypeReadQuery);
                    return result.should.eventually
                        .have.property('data').have.property('docType')
                        .deep.include(dummyData.dummyDocType);
                });
                it("Document Type can be (U)pdated", ()=>{
                    result = myTester(testQueries.dummyDocTypeUpdateQuery);
                    return result.should.eventually
                        .have.property('data').have.property('updateDocType')
                        .have.property('content').not.equal(dummyData.dummyDocType.content);
                });
                it( "Document Type can be (D)eleted", ()=>{
                    result = myTester(testQueries.dummyDocTypeDeleteQuery);
                    return result.should.eventually
                        .have.property('data').have.property('removeDocType')
                        .become(dummyData.dummyDocType);
                });
            });

            it("Doctor can be (R)ead", ()=>{
                result = myTester(testQueries.dummyDoctorReadQuery);
                return result.should.eventually
                    .have.property('data').have.property('doctor')
                    .become(dummyData.dummyDoctor);
            });
            it("Doctor can be (U)pdated", ()=>{
                result = myTester(testQueries.dummyDoctorUpdateQuery);
                return Promise.all(samePropertiesDifferentValues(
                    "result.should.eventually.have.property('data').have.property('updateDoctor')",
                    "dummyData.dummyDoctor",
                    ['login']
                ));
            });
            it("Doctor can be (D)eleted", ()=>{
                result = myTester(testQueries.dummyDoctorDeleteQuery);
                return result.should.eventually
                    .have.property('data').have.property('removeDoctor')
                    .become(dummyData.dummyDoctor);
            });
        });
    });
    describe("Patient CRUD Functionality", ()=>{
        it("Patient can be (C)reated", ()=>{
            result = myTester(testQueries.dummyPatientCreateQuery);
            return result.should.eventually
                .have.property('data').have.property('addPatient')
                .become(dummyData.dummyPatient);
        });
       describe("When a Patient exists", ()=>{
            beforeEach(SQL.addDummyPatientDirectly);
            it("Patient can be (R)ead", ()=>{
                result = myTester(testQueries.dummyPatientReadQuery);
                return result.should.eventually
                    .have.property('data').have.property('patient')
                    .become([dummyData.dummyPatient]);
            });
            it("Patient can be (U)pdated", ()=>{
                result = myTester(testQueries.dummyPatientUpdateQuery);
                return Promise.all(samePropertiesDifferentValues(
                    "result.should.eventually.have.property('data').have.property('updatePatient')",
                    "dummyData.dummyPatient",
                    ['id']
                ));
            });
            it("Patient can be (D)eleted", ()=>{
                result = myTester(testQueries.dummyPatientDeleteQuery);
                return result.should.eventually
                    .have.property('data').have.property('removePatient')
                    .become(dummyData.dummyPatient);
            });
        });
    });
    describe("InsuranceProvider CRUD Functionality", ()=>{
        it("InsuranceProvider can be (C)reated", ()=>{
            result = myTester(testQueries.dummyInsuranceProviderCreateQuery);
            return result.should.eventually
                .have.property('data').have.property('addInsuranceProvider')
                .become(dummyData.dummyInsuranceProvider);
        });
        describe("When an Insurance Provider exists", ()=>{
            beforeEach(SQL.addDummyInsuranceProviderDirectly);
            it("InsuranceProvider can be (R)ead", ()=>{
                result = myTester(testQueries.dummyInsuranceProviderReadQuery);
                return result.should.eventually
                    .have.property('data').have.property('insuranceProvider')
                    .become([dummyData.dummyInsuranceProvider]);
            });
            it("InsuranceProvider can be (U)pdated", ()=>{
                result = myTester(testQueries.dummyInsuranceProviderUpdateQuery);
                return result.should.eventually
                    .have.property('data').have.property('updateInsuranceProvider')
                    .have.property('amountCharged').not.equal(dummyData.dummyInsuranceProvider.amountCharged);
            });
            it("InsuranceProvider can be (D)eleted", ()=>{
                result = myTester(testQueries.dummyInsuranceProviderDeleteQuery);
                return result.should.eventually
                    .have.property('data').have.property('removeInsuranceProvider')
                    .become(dummyData.dummyInsuranceProvider);
            });
        });
    });
    describe("When both Doctor and Patient exist", ()=>{
        beforeEach(SQL.addDummyDoctorDirectly);
        beforeEach(SQL.addDummyPatientDirectly);
        it("Consultation can be (C)reated", ()=>{
            result = myTester(testQueries.dummyConsultationCreateQuery);
            return result.should.eventually
                .have.property('data').have.property('addConsultation')
                .become(dummyData.dummyConsultation);
        });
        describe("When a Consultation between a Doctor and Patient exists", ()=>{
            beforeEach(SQL.addDummyConsultationDirectly);
            it("Consultation can be (R)ead", ()=>{
                result = myTester(testQueries.dummyConsultationReadQuery);
                return result.should.eventually
                    .have.property('data').have.property('consultation')
                    .become([dummyData.dummyConsultation]);
            });
            it("Consultation can be (U)pdated", ()=>{
                result = myTester(testQueries.dummyConsultationUpdateQuery);
                return Promise.all(samePropertiesDifferentValues(
                    "result.should.eventually.have.property('data').have.property('updateConsultation')",
                    "dummyData.dummyConsultation",
                    ['login', 'id']
                ));
            });
            it("Consultation can be (D)eleted", ()=>{
                result = myTester(testQueries.dummyConsultationDeleteQuery);
                return result.should.eventually
                    .have.property('data').have.property('removeConsultation')
                    .become(dummyData.dummyConsultation);
            });
        });

        it("Payment can be (C)reated", ()=>{
            result = myTester(testQueries.dummyPaymentCreateQuery);
            return result.should.eventually
                .have.property('data').have.property('addPayment')
                .become(dummyData.dummyPayment);
        });
        describe("When a Payment from a Patient to a Doctor exists", ()=>{
            beforeEach(SQL.addDummyPaymentDirectly);
            it("Payment can be (R)ead", ()=>{
                result = myTester(testQueries.dummyPaymentReadQuery);
                return result.should.eventually
                    .have.property('data').have.property('payment')
                    .become([dummyData.dummyPayment]);
            });
            it("Payment can be (U)pdated", ()=>{
                result = myTester(testQueries.dummyPaymentUpdateQuery);
                return Promise.all(samePropertiesDifferentValues(
                    "result.should.eventually.have.property('data').have.property('updatePayment')",
                    "dummyData.dummyPayment",
                    ['id', 'login', 'date']
                ));
            });
            it("Payment can be (D)eleted", ()=>{
                result = myTester(testQueries.dummyPaymentDeleteQuery);
                return result.should.eventually
                    .have.property('data').have.property('removePayment')
                    .become(dummyData.dummyPayment);
            });
        });
    });
});
