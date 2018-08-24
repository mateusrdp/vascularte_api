import Sequelize from 'sequelize';
//import _ from 'lodash';
//import Faker from 'faker';

const Conn = new Sequelize(
    'CONSULTORIO',
    'USERNAME',
    'PASSWORD', {
        dialect: 'mysql',
        host: 'localhost'
    }
);

// Tables / Objects
const Patient = Conn.define('patient', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        field: 'nome',
        allowNull: false
    },
    dob: {
        type: Sequelize.DataTypes.STRING,
        field: 'nascimento'
    },
    gender: {
        type: Sequelize.DataTypes.STRING,
        field: 'sexo'
    },
    ethnicity:  {
        type: Sequelize.DataTypes.STRING,
        field: 'cor'
    },
    civil_status: {
        type: Sequelize.DataTypes.STRING,
        field: 'estado_civil'
    },
    phone: {
        type: Sequelize.DataTypes.STRING,
        field: 'tel'
    },
    address: {
        type: Sequelize.DataTypes.STRING,
        field: 'end'
    },
    profession: {
        type: Sequelize.DataTypes.STRING,
        field: 'profissao'
    },
    natural_from: {
        type: Sequelize.DataTypes.STRING,
        field: 'naturalidade'
    },
    origin: {
        type: Sequelize.DataTypes.STRING,
        field: 'procedencia'
    },
    referred_by: {
        type: Sequelize.DataTypes.STRING,
        field: 'indicacao'
    },
    obs: {
        type: Sequelize.DataTypes.STRING,
        field: 'obs'
    },
}, {
    tableName: 'DADOS_PACIENTE',
    timestamps: false
});

const Consultation = Conn.define('consultation', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'pac_id',
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.DataTypes.STRING,
        field: 'login',
        allowNull: false
    },
    anamnesis: {
        type: Sequelize.DataTypes.STRING,
        field: 'anamnese'
    },
    physical: {
        type: Sequelize.DataTypes.STRING,
        field: 'exame_fisico'
    },
    hypothesis: {
        type: Sequelize.DataTypes.STRING,
        field: 'hip_diag'
    },
    conduct: {
        type: Sequelize.DataTypes.STRING,
        field: 'conduta'
    },
    evolution: {
        type: Sequelize.DataTypes.STRING,
        field: 'evolucao'
    },
    examination: {
        type: Sequelize.DataTypes.STRING,
        field: 'exames'
    },
    surgical_procedures: {
        type: Sequelize.DataTypes.STRING,
        field: 'cirurgias'
    },
    //payments: IPayment[];
}, {
    tableName: 'CONSULTA_PACIENTE',
    timestamps: false
});

// Relationships
Patient.hasOne(Consultation, {foreignKey: 'id'});
Consultation.belongsTo(Patient, {foreignKey: 'pac_id'});

Conn.sync();

//Conn.sync({
//    //force: true
//}).then(()=> {
//    _.times(10, ()=>{
//        return Patient.create({
//            id: 0,
//            name: 'Bozo',
//            dob: '',
//            gender: '',
//            ethnicity: '',
//            civil_status: '',
//            phone: '',
//            profession: '',
//            address: '',
//            natural_from: '',
//            origin: '',
//            referred_by: '',
//            obs: '',
//        });
//    });
//});

export default Conn;