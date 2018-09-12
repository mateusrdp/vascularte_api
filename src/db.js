/*
    (could )TODO: maybe replace Sequelize with Prisma,
    Just so it has better compatibility with graphql-yoga, but sequelize seems fine and doesn't require a subscription
    Last time I tried prisma, it didn't play ball with npm and linux for some reason, and I couldn't find a  way
    to make it work with the legacy database, while Sequelize did that perfectly.
    Perhaps the new database could use Prisma, and keep the old one with Sequelize, and GraphQL does its magic
    and makes the migration to the better system transparent
 */

import Sequelize from 'sequelize';

const myDBConnection = new Sequelize(

    process.env.myDb, // NOTE: Must set the environment variable!
    process.env.myUser, // NOTE: Must set the environment variable!
    process.env.myPass, { // NOTE: Must set the environment variable!
        dialect: 'mysql',
        host: process.env.myHost, // NOTE: Must set the environment variable!
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
    }
);

// Tables / Objects

const Doctor = myDBConnection.define('doctor', {
    login: {
        type: Sequelize.DataTypes.STRING,
        field: 'login',
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        field: 'senha',
        allowNull: false
    },
    identityDocument: {
        type: Sequelize.DataTypes.STRING,
        field: 'cpf',
    },
    register: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'crm',
    },
    address: {
        type: Sequelize.DataTypes.STRING,
        field: 'end',
    },
    gender: {
        type: Sequelize.DataTypes.STRING,
        field: 'sexo',
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        field: 'nome',
    },
    phone: {
        type: Sequelize.DataTypes.STRING,
        field: 'teldono',
    },
    city: {
        type: Sequelize.DataTypes.STRING,
        field: 'cidade',
    },
    state: {
        type: Sequelize.DataTypes.STRING,
        field: 'estado',
    },
    specialty: {
        type: Sequelize.DataTypes.STRING,
        field: 'especialidade',
    },
}, {
    tableName: 'MEDICO',
    timestamps: false
});

const DocType = myDBConnection.define('docType', {
    login: {
        type: Sequelize.DataTypes.STRING,
        field: 'login',
        allowNull: false
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        field: 'nome',
    },
    content: {
        type: Sequelize.DataTypes.STRING,
        field: 'conteudo',
    },
},{
    tableName: 'DOC_TYPE',
    timestamps: false
});

const InsuranceProvider = myDBConnection.define('insuranceProvider', {
    name: {
        type: Sequelize.DataTypes.STRING,
        field: 'convenio',
        primaryKey: true,
        allowNull: false
    },
    amountCharged: {
        type: Sequelize.DataTypes.FLOAT,
        field: 'cobrado',
        primaryKey: false,
        allowNull: false
    },
}, {
    tableName: 'CONVENIO',
    timestamps: false
});

const Payment = myDBConnection.define('payment', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'pac_id',
        primaryKey: true,
        allowNull: false
    },
    login: {
        type: Sequelize.DataTypes.STRING,
        field: 'login',
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: Sequelize.DataTypes.DATEONLY,
        field: 'data',
        primaryKey: true,
        allowNull: false
    },
    insuranceProviderName: {
        type: Sequelize.DataTypes.STRING,
        field: 'convenio',
        allowNull: false
    },
    amountCharged: {
        type: Sequelize.DataTypes.FLOAT,
        field: 'cobrado',
        allowNull: false
    },
    receipt: {
        type: Sequelize.DataTypes.FLOAT,
        field: 'recibo',
        allowNull: false
    },
}, {
    tableName: 'PAGAMENTOS',
    timestamps: false
});

const Patient = myDBConnection.define('patient', {
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
    civilStatus: {
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
    naturalFrom: {
        type: Sequelize.DataTypes.STRING,
        field: 'naturalidade'
    },
    origin: {
        type: Sequelize.DataTypes.STRING,
        field: 'procedencia'
    },
    referredBy: {
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

const Consultation = myDBConnection.define('consultation', {
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
        type: Sequelize.DataTypes.TEXT,
        field: 'anamnese'
    },
    physical: {
        type: Sequelize.DataTypes.TEXT,
        field: 'exame_fisico'
    },
    hypothesis: {
        type: Sequelize.DataTypes.TEXT,
        field: 'hip_diag'
    },
    conduct: {
        type: Sequelize.DataTypes.TEXT,
        field: 'conduta'
    },
    evolution: {
        type: Sequelize.DataTypes.TEXT,
        field: 'evolucao'
    },
    examination: {
        type: Sequelize.DataTypes.TEXT,
        field: 'exames'
    },
    surgicalProcedures: {
        type: Sequelize.DataTypes.TEXT,
        field: 'cirurgias'
    },
}, {
    tableName: 'CONSULTA_PACIENTE',
    timestamps: false
});

// Relationships
Patient.hasMany(Consultation, {foreignKey: 'id'}); // At most one with each registered dr
Doctor.hasMany(Consultation, {foreignKey: 'login'}); // At most one with each patient
/*
    Consultation doesn't really have a primary key - it has a compound one: (id, login),
    to indicate the relationship between dr and patient. Sequelize doesn't support that,
    so we just say to what the foreign keys point to
 */
Consultation.belongsTo(Doctor, {foreignKey: 'login', target:'login'});
Consultation.belongsTo(Patient, {foreignKey: 'id', target: 'id'});

Doctor.hasMany(DocType, {foreignKey: 'login'});
/*
    Similar to Consultation. The primary key is compound (name, login), so we assume 'name' is
    the primary key, and point the foreign key to a custom location
 */

DocType.belongsTo(Doctor, {foreignKey: 'login', target:'login'});

/*
    This one is even more complicated than the previous two. The primary key is [id, login, date],
    so we completely disregard the existance of primary keys - the DB should worry about that.
    In the future, we should introduce an id here for indexing purposes.

    For our purposes here, however, it suffices to point Payment to the correct owners using
    foreign keys
 */
Patient.hasMany(Payment, {foreignKey: 'id'});
Doctor.hasMany(Payment, {foreignKey: 'login'});
InsuranceProvider.hasMany(Payment, {foreignKey: 'insuranceProviderName'});
Payment.belongsTo(Patient, {foreignKey: 'id', target: 'id'});
Payment.belongsTo(Doctor, {foreignKey: 'login', target: 'login'});
Payment.belongsTo(InsuranceProvider, {foreignKey: 'insuranceProviderName', target:'insuranceProviderName'});

export default { myDBConnection, Doctor, Patient, Consultation, DocType, InsuranceProvider, Payment };