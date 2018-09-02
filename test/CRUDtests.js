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

import * as SQL from './rawSQL';
import * as rubric from './sql_table_rubric';
import Schema from '../src/schema.js';
import tester from 'graphql-tester';
import * as dummyData from 'dummyData';

let check_mysql_tables = process.env.testMySQLTables; // NOTE: Must set the environment variable!


/**
 * ACTUAL TESTS START HERE
 * TODO: Hook actual GraphQL operations here
 * TODO: Write functions to compare MySQL table final states for each test
 */

describe("DB CRUD Functionality", ()=> {
    let myTest = tester({
       url: process.env.myServer
    });
    beforeEach(SQL.resetDB);
    describe("Doctor CRUD Functionality", ()=> {
        it("Doctor can be (C)reated", async ()=>{
            let result = Schema(

            );
        });
        describe("When a Doctor exists", async ()=>{
            beforeEach(SQL.addDummyDoctorDirectly);
            it("Document Type can be (C)reated", async ()=>{});
            describe("When Document Type exists", async ()=>{ // We wanna do that before deleting the dr
                beforeEach(SQL.addDummyDocTypeDirectly);
                it("Document Type can be (R)ead", async ()=>{});
                it("Document Type can be (U)pdated", async ()=>{});
                it("Document Type can be (D)eleted", async ()=>{});
            });
            it("Doctor can be (R)ead", async ()=>{
                const result = await SQL.getRows("MEDICO");
                chai.expect(result[0]).to.deep.equal(rubric.doctorCreated);
            });
            it("Doctor can be (U)pdated", async ()=>{});
            it("Doctor can be (D)eleted", async ()=>{});
        });
    });
    describe("Patient CRUD Functionality", async ()=>{
        it("Patient can be (C)reated", async ()=>{});
        describe("When a Patient exists", ()=>{
            beforeEach(SQL.addDummyPatientDirectly);
            it("Patient can be (R)ead", async ()=>{});
            it("Patient can be (U)pdated", async ()=>{});
            it("Patient can be (D)eleted", async ()=>{});
        });
    });

    describe("InsuranceProvider CRUD Functionality", ()=>{
        it("InsuranceProvider can be (C)reated", async ()=>{});
        describe("When an Insurance Provider exists", ()=>{
            beforeEach(SQL.addDummyInsuranceProviderDirectly);
            it("InsuranceProvider can be (R)ead", async ()=>{});
            it("InsuranceProvider can be (U)pdated", async ()=>{});
            it("InsuranceProvider can be (D)eleted", async ()=>{});
        });
    });

    describe("When both Doctor and Patient exist", ()=>{
        beforeEach(SQL.addDummyDoctorDirectly);
        beforeEach(SQL.addDummyPatientDirectly);
        it("Consultation can be (C)reated", async ()=>{});
        describe("When a Consultation between a Doctor and Patient exists", ()=>{
            beforeEach(SQL.addDummyConsultationDirectly);
            it("Consultation can be (R)ead", async ()=>{});
            it("Consultation can be (U)pdated", async ()=>{});
            it("Consultation can be (D)eleted", async ()=>{});
        });

        describe("When an Insurance Provider is defined as well", ()=>{
            it("Payment can be (C)reated", async ()=>{});
            describe("When a Payment from a Patient to a Doctor exists", ()=>{
                beforeEach(SQL.addDummyPaymentDirectly);
                it("Payment can be (R)ead by via the Doctor", async ()=>{});
                it("Payment can be (R)ead by via the Patient", async ()=>{});
                it("Payment can be (U)pdated", async ()=>{});
                it("Payment can be (D)eleted", async ()=>{});
            });
        });

    });
});
