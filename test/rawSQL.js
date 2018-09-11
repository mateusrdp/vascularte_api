import mysql from 'promise-mysql';
import dummyData from './dummyData';

/**
 * Database initial state setup
 */
const connect = function () {
    return mysql.createConnection({
        host: process.env.myHost, // NOTE: Must set the environment variable!
        user: process.env.myUser, // NOTE: Must set the environment variable!
        password: process.env.myPass, // NOTE: Must set the environment variable!
        database: process.env.myDb, // NOTE: Must set the environment variable!
    });
};

exports.resetDB = function() {
    let connection;
    return connect().then(function(conn){
        connection=conn;
        return connection.query('DROP TABLE IF EXISTS PAGAMENTOS');
    }).then(function(){
        return connection.query('DROP TABLE IF EXISTS CONSULTA_PACIENTE');
    }).then(function(){
        return connection.query('DROP TABLE IF EXISTS DADOS_PACIENTE');
    }).then(function(){
        return connection.query('DROP TABLE IF EXISTS CONVENIO');
    }).then(function(){
        return connection.query('DROP TABLE IF EXISTS DOC_TYPE');
    }).then(function(){
        return connection.query('DROP TABLE IF EXISTS MEDICO');
    }).then(function(){
        connection.query('CREATE TABLE IF NOT EXISTS `MEDICO` (\n' +
            '  `login` varchar(15) NOT NULL,\n' +
            '  `senha` tinytext NOT NULL,\n' +
            '  `cpf` char(14) default NULL,\n' +
            '  `crm` int(11) default NULL,\n' +
            '  `end` tinytext,\n' +
            '  `sexo` char(1) default NULL,\n' +
            '  `nome` tinytext,\n' +
            '  `teldono` char(13) default NULL,\n' +
            '  `cidade` varchar(25) default NULL,\n' +
            '  `estado` char(2) default NULL,\n' +
            '  `especialidade` tinytext default NULL,\n' +
            '  PRIMARY KEY  (`login`)\n' +
            ') ENGINE=InnoDB;');
    }).then(function(){
        return connection.query('CREATE TABLE IF NOT EXISTS `DOC_TYPE` (\n' +
            '  `login` varchar(15) NOT NULL,\n' +
            '  `nome` varchar(20) NOT NULL,\n' +
            '  `conteudo` text,\n' +
            '  PRIMARY KEY  (`login`,`nome`),\n' +
            '  FOREIGN KEY (`login`) REFERENCES `MEDICO` (`login`) ON DELETE CASCADE ON UPDATE CASCADE\n' +
            ') ENGINE=InnoDB;');
    }).then(function(){
        return connection.query('CREATE TABLE IF NOT EXISTS `CONVENIO` (\n' +
            '  `convenio` varchar(15) NOT NULL,\n' +
            '  `cobrado` decimal(9,2) NOT NULL,\n' +
            '  PRIMARY KEY  (`convenio`)\n' +
            ') ENGINE=InnoDB;');
    }).then(function(){
        connection.query('CREATE TABLE IF NOT EXISTS `DADOS_PACIENTE` (\n' +
            '  `id` int NOT NULL AUTO_INCREMENT,\n' +
            '  `nome` varchar(100) NOT NULL,\n' +
            '  `nascimento` char(10) NOT NULL,\n' +
            '  `sexo` char(1) NOT NULL,\n' +
            '  `cor` varchar(15) default NULL,\n' +
            '  `estado_civil` varchar(15) default NULL,\n' +
            '  `tel` char(13) default NULL,\n' +
            '  `end` tinytext,\n' +
            '  `profissao` varchar(30) default NULL,\n' +
            '  `naturalidade` varchar(50) default NULL,\n' +
            '  `procedencia` tinytext,\n' +
            '  `indicacao` tinytext,\n' +
            '  `obs` tinytext,\n' +
            '  PRIMARY KEY  (`id`),\n' +
            '  UNIQUE (nome, nascimento)\n' +
            ') ENGINE=InnoDB;');
    }).then(function(){
        return connection.query('CREATE TABLE IF NOT EXISTS `CONSULTA_PACIENTE` (\n' +
            '  `pac_id` int NOT NULL,\n' +
            '  `login` varchar(15) NOT NULL,\n' +
            '  `anamnese` mediumtext,\n' +
            '  `exame_fisico` mediumtext,\n' +
            '  `hip_diag` text,\n' +
            '  `conduta` text,\n' +
            '  `exames` mediumtext,\n' +
            '  `evolucao` mediumtext,\n' +
            '  `cirurgias` mediumtext,\n' +
            '  PRIMARY KEY (`pac_id`, `login`),\n' +
            '  FOREIGN KEY (`pac_id`) REFERENCES `DADOS_PACIENTE` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,\n' +
            '  FOREIGN KEY (`login`) REFERENCES `MEDICO` (`login`) ON DELETE CASCADE ON UPDATE CASCADE\n' +
            ') ENGINE=InnoDB;');
    }).then(function(){
        const result = connection.query('CREATE TABLE IF NOT EXISTS `PAGAMENTOS` (\n' +
            '  `pac_id` int NOT NULL,\n' +
            '  `login` varchar(15) NOT NULL,\n' +
            '  `data` date NOT NULL,\n' +
            '  `convenio` varchar(15) NOT NULL,\n' +
            '  `cobrado` decimal(9,2) NOT NULL,\n' +
            '  `recibo` decimal(9,2) NOT NULL,\n' +
            '  PRIMARY KEY (`pac_id`, `login`, `data`),\n' +
            '  FOREIGN KEY (`login`) REFERENCES `MEDICO` (`login`) ON DELETE CASCADE ON UPDATE CASCADE,\n' +
            '  FOREIGN KEY (`pac_id`) REFERENCES `DADOS_PACIENTE` (`id`) ON DELETE CASCADE ON UPDATE CASCADE\n' +
            ') ENGINE=InnoDB;');
        connection.end();
        return result;
    }).catch( (error) => {
        console.log(error);
    });
}

/**
 * Database controlled stated setup
 */
exports.addDummyDoctorDirectly = function() {
    return connect().then(function(connection){
        const result = connection.query(
            'INSERT INTO ' +
            'MEDICO ( login, senha, cpf, crm, end, sexo, nome, teldono, cidade, estado, especialidade ) ' +
            'VALUES (' +
            "'" + dummyData.dummyDoctor.login +"',"  +
            "'" + dummyData.dummyDoctor.password +"',"  +
            "'" + dummyData.dummyDoctor.identityDocument +"',"  +
            dummyData.dummyDoctor.register +","  +
            "'" + dummyData.dummyDoctor.address +"',"  +
            "'" + dummyData.dummyDoctor.gender +"',"  +
            "'" + dummyData.dummyDoctor.name +"',"  +
            "'" + dummyData.dummyDoctor.phone +"',"  +
            "'" + dummyData.dummyDoctor.city +"',"  +
            "'" + dummyData.dummyDoctor.state +"',"  +
            "'" + dummyData.dummyDoctor.specialty  +"'"  +
            ')'
        );
        connection.end();
        return result;
    });
}

exports.addDummyDocTypeDirectly = function() {
    return connect().then(function(connection) {
        const result = connection.query(
            'INSERT INTO DOC_TYPE' +
            ' ( login, nome, conteudo ) ' +
            'VALUES (' +
            "'" + dummyData.dummyDocType.login + "'," +
            "'" + dummyData.dummyDocType.name + "'," +
            "'" +  dummyData.dummyDocType.content + "'" +
            ')',
        );
        connection.end();
        return result;
    });
}

exports.addDummyPatientDirectly = function() {
    return connect().then(function(connection){
        const result = connection.query(
            'INSERT INTO DADOS_PACIENTE' +
            ' ( nome, nascimento, sexo, cor, estado_civil, tel, end, profissao, naturalidade, procedencia, indicacao, obs ) ' +
            'VALUES (' +
            "'" +  dummyData.dummyPatient.name +"',"  +
            "'" + dummyData.dummyPatient.dob +"',"  +
            "'" + dummyData.dummyPatient.gender +"',"  +
            "'" + dummyData.dummyPatient.ethnicity +"',"  +
            "'" + dummyData.dummyPatient.civilStatus +"',"  +
            "'" + dummyData.dummyPatient.phone +"',"  +
            "'" + dummyData.dummyPatient.address +"',"  +
            "'" + dummyData.dummyPatient.profession +"',"  +
            "'" + dummyData.dummyPatient.naturalFrom +"',"  +
            "'" + dummyData.dummyPatient.origin +"',"  +
            "'" + dummyData.dummyPatient.referredBy +"',"  +
            "'" + dummyData.dummyPatient.obs +"'"  +
            ')'
        );
        connection.end();
        return result;
    });

}

exports.addDummyInsuranceProviderDirectly = function() {
    return connect().then(function(connection){
        const result = connection.query(
            'INSERT INTO CONVENIO' +
            ' ( convenio, cobrado ) ' +
            'VALUES (' +
            "'" + dummyData.dummyInsuranceProvider.name + "',"  +
            (dummyData.dummyInsuranceProvider.amountCharged + 100) + //+100 just to make it different from using Sequelize
            ')'
        );
        connection.end();
        return result;
    });
}

exports.addDummyConsultationDirectly = function() {
    return connect().then(function(connection){
        const result = connection.query(
            'INSERT INTO CONSULTA_PACIENTE' +
            ' ( pac_id, login, anamnese, exame_fisico, hip_diag, conduta, exames, evolucao, cirurgias ) ' +
            'VALUES (' +
            dummyData.dummyConsultation.id +','+
            "'" + dummyData.dummyConsultation.login + "'," +
            "'" +  dummyData.dummyConsultation.anamnesis + "'," +
            "'" + dummyData.dummyConsultation.physical + "'," +
            "'" + dummyData.dummyConsultation.hypothesis + "'," +
            "'" + dummyData.dummyConsultation.conduct + "'," +
            "'" + dummyData.dummyConsultation.examination + "'," +
            "'" + dummyData.dummyConsultation.evolution + "'," +
            "'" + dummyData.dummyConsultation.surgicalProcedures + "'" +
            ')'
        );
        connection.end();
        return result;
    });
}

exports.addDummyPaymentDirectly = function() {
    return connect().then(function(connection){
        const result = connection.query(
            'INSERT INTO PAGAMENTOS' +
            ' ( pac_id, login, data, convenio, cobrado, recibo ) ' +
            'VALUES (' +
            dummyData.dummyPayment.id +','+
            "'" + dummyData.dummyPayment.login + "'," +
            "'" + dummyData.dummyPayment.date + "'," +
            "'" + dummyData.dummyPayment.insuranceProviderName + "'," +
            (dummyData.dummyPayment.amountCharged + 100) + ','+ //+100 just to make it different from using Sequelize
            dummyData.dummyPayment.receipt +
            ')'
        );
        connection.end();
        return result;
    });

}

exports.getRows = function(table, callback) {
    return connect().then(function(connection){
        const result = connection.query("SELECT * FROM " + table);
        connection.end();
        return result;
    });

};