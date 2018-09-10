/**
 * This is to test if GraphQL+Sequelize are mapping into the legacy table correctly,
 * to assert backward compatibility with the client's existing system
 *
 * ASSUMPTIONS
 *  - MUST HAVE A MYSQL SERVER AVAILABLE AND AN USER WITH AT LEAST CREATE/DROP DATABASE PRIVILEGES
 * FOR THESE TESTS TO RUN
 *
 * TODO: this needs to take the async nature of DB access into consideration! Either use direct callbacks or promises!
 */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.should();
chai.use(chaiAsPromised);

import * as SQL from './rawSQL';
//import * as rubric from './sql_table_rubric';
import Schema from '../src_old/schema.js';
import {tester} from 'graphql-tester';
import * as dummyData from './dummyData';
import * as testQueries from './CRUDtestData';

/**
 * ACTUAL TESTS START HERE
 * TODO: Hook actual GraphQL operations here
 * TODO: Write functions to compare MySQL table final states for each test
 */

describe("DB CRUD Functionality", ()=> {
    let myTester = tester({
        url: process.env.myServer
    });
    beforeEach(SQL.resetDB);
    describe("Doctor CRUD Functionality", ()=> {
        it("Doctor can be (C)reated", ()=>{
            return myTester(testQueries.dummyDoctorCreateQuery).should.eventually
                .have.property('data').have.property('addDoctor')
                .become(dummyData.dummyDoctor);
        });
        describe("When a Doctor exists", ()=>{
            beforeEach(SQL.addDummyDoctorDirectly);
            it("Document Type can be (C)reated", ()=>{
                return myTester(testQueries.dummyDocTypeCreateQuery).should.eventually
                    .have.property('data').have.property('addDocType')
                    .become(dummyData.dummyDocType);
            });
            describe("When Document Type exists", ()=>{ // We wanna do that before deleting the dr
                //beforeEach(SQL.addDummyDocTypeDirectly);
                it("Document Type can be (R)ead", ()=>{
                    return myTester(testQueries.dummyDocTypeReadQuery).should.eventually
                        .have.property('data').have.property('docType')
                        .become(dummyData.dummyDocType);
                });
                it("Document Type can be (U)pdated", ()=>{
                    return myTester(testQueries.dummyDocTypeUpdateQuery).should.eventually
                        .have.property('data').have.property('updateDocType')
                        .become(dummyData.dummyDocType);
                });
                it( "Document Type can be (D)eleted", ()=>{
                    return myTester(testQueries.dummyDocTypeDeleteQuery).should.eventually
                        .have.property('data').have.property('deleteDocType')
                        .become(dummyData.dummyDocType);
                });
            });
            // Template that works in case I need it later
            // it("Doctor can be (R)ead", async ()=>{
            //     const result = await SQL.getRows("MEDICO");
            //     chai.expect(result[0]).to.deep.equal(rubric.doctorCreated);
            // });
            it("Doctor can be (R)ead", ()=>{});
            it("Doctor can be (U)pdated", ()=>{});
            it("Doctor can be (D)eleted", ()=>{});
        });
    });
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
