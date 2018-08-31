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
const SQL = require('./rawSQL');

/**
 * ACTUAL TESTS START HERE
 * TODO: Hook actual GraphQL operations here
 * TODO: Write functions to compare MySQL table final states for each test
 */

describe("DB CRUD Functionality", ()=> {
    beforeEach(SQL.resetDB);
    describe("Doctor CRUD Functionality", ()=> {
        it("Doctor can be (C)reated", ()=>{});
        describe("When a Doctor exists", ()=>{
            beforeEach(SQL.addDummyDoctorDirectly);
            it("Document Type can be (C)reated", ()=>{
                SQL.getRows("MEDICO").then((rows)=>{
                    console.log(rows);
                });
            });
            describe("When Document Type exists", ()=>{ // We wanna do that before deleting the dr
                beforeEach(SQL.addDummyDocTypeDirectly);
                it("Document Type can be (R)ead", ()=>{});
                it("Document Type can be (U)pdated", ()=>{});
                it("Document Type can be (D)eleted", ()=>{});
            });
            it("Doctor can be (R)ead", ()=>{});
            it("Doctor can be (U)pdated", ()=>{});
            it("Doctor can be (D)eleted", ()=>{});
        });
    });
    describe("Patient CRUD Functionality", function() {
        it("Patient can be (C)reated", function(){});
        describe("When a Patient exists", function(){
            beforeEach(SQL.addDummyPatientDirectly);
            it("Patient can be (R)ead", function(){});
            it("Patient can be (U)pdated", function(){});
            it("Patient can be (D)eleted", function(){});
        });
    });

    describe("InsuranceProvider CRUD Functionality", function() {
        it("InsuranceProvider can be (C)reated", function(){});
        describe("When an Insurance Provider exists", function(){
            beforeEach(SQL.addDummyInsuranceProviderDirectly);
            it("InsuranceProvider can be (R)ead", function(){});
            it("InsuranceProvider can be (U)pdated", function(){});
            it("InsuranceProvider can be (D)eleted", function(){});
        });
    });

    describe("When both Doctor and Patient exist", function() {
        beforeEach(SQL.addDummyDoctorDirectly);
        beforeEach(SQL.addDummyPatientDirectly);
        it("Consultation can be (C)reated", function(){});
        describe("When a Consultation between a Doctor and Patient exists", function() {
            beforeEach(SQL.addDummyConsultationDirectly);
            it("Consultation can be (R)ead", function(){});
            it("Consultation can be (U)pdated", function(){});
            it("Consultation can be (D)eleted", function(){});
        });

        describe("When an Insurance Provider is defined as well", function() {
            it("Payment can be (C)reated", function(){});
            describe("When a Payment from a Patient to a Doctor exists", function() {
                beforeEach(SQL.addDummyPaymentDirectly);
                it("Payment can be (R)ead", function(){});
                it("Payment can be (U)pdated", function(){});
                it("Payment can be (D)eleted", function(){});
            });
        });

    });
});
