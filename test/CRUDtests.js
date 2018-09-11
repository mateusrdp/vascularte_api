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
            // Template that works in case I need it later
            // it("Doctor can be (R)ead", async ()=>{
            //     const result = await SQL.getRows("MEDICO");
            //     chai.expect(result[0]).to.deep.equal(rubric.doctorCreated);
            // });
            //it("Doctor can be (R)ead", ()=>{});
            //it("Doctor can be (U)pdated", ()=>{});
            //it("Doctor can be (D)eleted", ()=>{});
        });
    });
    /*
    describe("Patient CRUD Functionality", ()=>{
        let result = myTester(testQueries.dummyPatientCreateQuery);
        //console.log("Query:\n"+testQueries.dummyPatientCreateQuery+"\n");
        it("Patient can be (C)reated", ()=>{
            return result.should.eventually
                .have.property('data').have.property('addPatient')
                .become(dummyData.dummyPatient);
        });
       describe("When a Patient exists", ()=>{
            //beforeEach(SQL.addDummyPatientDirectly);
            it("Patient can be (R)ead", ()=>{});
            it("Patient can be (U)pdated", ()=>{});
            it("Patient can be (D)eleted", ()=>{});
        });
    });
    */
    /*
    describe("InsuranceProvider CRUD Functionality", ()=>{
        it("InsuranceProvider can be (C)reated", ()=>{});
        describe("When an Insurance Provider exists", ()=>{
            //beforeEach(SQL.addDummyInsuranceProviderDirectly);
            it("InsuranceProvider can be (R)ead", ()=>{});
            it("InsuranceProvider can be (U)pdated", ()=>{});
            it("InsuranceProvider can be (D)eleted", ()=>{});
        });
    });

    describe("When both Doctor and Patient exist", ()=>{
        //beforeEach(SQL.addDummyDoctorDirectly);
        //beforeEach(SQL.addDummyPatientDirectly);
        it("Consultation can be (C)reated", ()=>{});
        describe("When a Consultation between a Doctor and Patient exists", ()=>{
            //beforeEach(SQL.addDummyConsultationDirectly);
            it("Consultation can be (R)ead", ()=>{});
            it("Consultation can be (U)pdated", ()=>{});
            it("Consultation can be (D)eleted", ()=>{});
        });

        describe("When an Insurance Provider is defined as well", ()=>{
            it("Payment can be (C)reated", ()=>{});
            describe("When a Payment from a Patient to a Doctor exists", ()=>{
                //beforeEach(SQL.addDummyPaymentDirectly);
                it("Payment can be (R)ead by via the Doctor", ()=>{});
                it("Payment can be (R)ead by via the Patient", ()=>{});
                it("Payment can be (U)pdated", ()=>{});
                it("Payment can be (D)eleted", ()=>{});
            });
        });

    });
    */
});
