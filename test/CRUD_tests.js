/**
 * This is to test if GraphQL+Sequelize are mapping into the legacy table correctly,
 * to assert backward compatibility with the client's existing system
 *
 * ASSUMPTIONS
 *  - MUST HAVE A MYSQL SERVER AVAILABLE AND AN USER WITH AT LEAST CREATE/DROP DATABASE PRIVILEGES
 * FOR THESE TESTS TO RUN
 */
const assert = require('assert');
const rawSQL = require('./rawSQL');

rawSQL.connect();
rawSQL.createTables();

/**
 * ACTUAL TESTS START HERE
 * TODO: Hook actual GraphQL operations here
 * TODO: Write functions to compare MySQL table final states for each test
 */
beforeEach(rawSQL.resetDB);
describe("DB CRUD Functionality", function() {

    describe("Doctor CRUD Functionality", function() {
        it("Doctor can be (C)reated", function(){
            assert();
        });
        describe("When a Doctor exists", function(){
            beforeEach(rawSQL.addDummyDoctorDirectly);
            it("Doctor can be (R)ead", function(){});
            it("Doctor can be (U)pdated", function(){});
            it("Doctor can be (D)eleted", function(){});

            it("Document Type can be (C)reated", function(){});
            describe("When Document Type exists", function(){
                beforeEach(rawSQL.addDummyDocTypeDirectly);
                it("Document Type can be (R)ead", function(){});
                it("Document Type can be (U)pdated", function(){});
                it("Document Type can be (D)eleted", function(){});
            });
        });
    });

    describe("Patient CRUD Functionality", function() {
        it("Patient can be (C)reated", function(){});
        describe("When a Patient exists", function(){
            beforeEach(rawSQL.addDummyPatientDirectly);
            it("Patient can be (R)ead", function(){});
            it("Patient can be (U)pdated", function(){});
            it("Patient can be (D)eleted", function(){});
        });
    });

    describe("InsuranceProvider CRUD Functionality", function() {
        it("InsuranceProvider can be (C)reated", function(){});
        describe("When a Patient exists", function(){
            beforeEach(rawSQL.addDummyInsuranceProviderDirectly);
            it("InsuranceProvider can be (R)ead", function(){});
            it("InsuranceProvider can be (U)pdated", function(){});
            it("InsuranceProvider can be (D)eleted", function(){});
        });
    });

    describe("When both Doctor and Patient exist", function() {
        beforeEach(rawSQL.addDummyDoctorDirectly);
        beforeEach(rawSQL.addDummyPatientDirectly);
        it("Consultation can be (C)reated", function(){});
        describe("When a Consultation between a Doctor and Patient exists", function() {
            beforeEach(rawSQL.addDummyConsultationDirectly);
            it("Consultation can be (R)ead", function(){});
            it("Consultation can be (U)pdated", function(){});
            it("Consultation can be (D)eleted", function(){});
        });

        describe("When an Insurance Provider is defined as well", function() {
            it("Payment can be (C)reated", function(){});
            describe("When a Payment from a Patient to a Doctor exists", function() {
                beforeEach(rawSQL.addDummyPaymentDirectly);
                it("Payment can be (R)ead", function(){});
                it("Payment can be (U)pdated", function(){});
                it("Payment can be (D)eleted", function(){});
            });
        });

    });
});

//Is this really necessary? It causes an error.
//rawSQL.disconnect();