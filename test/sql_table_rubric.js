/**
 * For our purposes here, created === read
 */

import dummyData from './dummyData';

exports.updateSuffix = " updated";
exports.updateIncrement = 10;

exports.doctorCreated =  {
        'login': dummyData.dummyDoctor.login ,
        'senha': dummyData.dummyDoctor.password ,
        'cpf': dummyData.dummyDoctor.identityDocument ,
        'crm': dummyData.dummyDoctor.register ,
        'end': dummyData.dummyDoctor.address ,
        'sexo': dummyData.dummyDoctor.gender ,
        'nome': dummyData.dummyDoctor.name ,
        'teldono': dummyData.dummyDoctor.phone ,
        'cidade': dummyData.dummyDoctor.city ,
        'estado': dummyData.dummyDoctor.state ,
        'especialidade': dummyData.dummyDoctor.specialty
};

exports.doctorUpdated  = {
        'login': dummyData.dummyDoctor.login ,
        'senha': dummyData.dummyDoctor.password + exports.updateSuffix ,
        'cpf': dummyData.dummyDoctor.identityDocument + exports.updateSuffix ,
        'crm':  (dummyData.dummyDoctor.register + exports.updateIncrement),
        'end': dummyData.dummyDoctor.address + exports.updateSuffix ,
        'sexo': dummyData.dummyDoctor.gender + exports.updateSuffix ,
        'nome': dummyData.dummyDoctor.name + exports.updateSuffix ,
        'teldono': dummyData.dummyDoctor.phone + exports.updateSuffix ,
        'cidade': dummyData.dummyDoctor.city + exports.updateSuffix ,
        'estado': dummyData.dummyDoctor.state + exports.updateSuffix ,
        'especialidade': dummyData.dummyDoctor.specialty + exports.updateSuffix
};

exports.docTypeCreated = {
        'login': dummyData.dummyDocType.login ,
        'nome': dummyData.dummyDocType.name ,
        'conteudo': dummyData.dummyDocType.content
};

exports.docTypeUpdated = {
    'login': dummyData.dummyDocType.login ,
    'nome': dummyData.dummyDocType.name + exports.updateSuffix ,
    'conteudo': dummyData.dummyDocType.content + exports.updateSuffix
};

exports.patientCreated = {
    'id': dummyData.dummyPatient.id ,
    'nome': dummyData.dummyPatient.name ,
    'nascimento': dummyData.dummyPatient.dob ,
    'sexo': dummyData.dummyPatient.gender ,
    'cor': dummyData.dummyPatient.ethnicity ,
    'estado_civil': dummyData.dummyPatient.civilStatus ,
    'tel': dummyData.dummyPatient.phone ,
    'end': dummyData.dummyPatient.address ,
    'profissao': dummyData.dummyPatient.profession ,
    'naturalidade': dummyData.dummyPatient.naturalFrom ,
    'procedencia': dummyData.dummyPatient.origin ,
    'indicacao': dummyData.dummyPatient.referredBy ,
    'obs': dummyData.dummyPatient.obs
};

exports.patientUpdated = {
    'id': dummyData.dummyPatient.id + exports.updateSuffix ,
    'nome': dummyData.dummyPatient.name + exports.updateSuffix ,
    'nascimento': dummyData.dummyPatient.dob + exports.updateSuffix ,
    'sexo': dummyData.dummyPatient.gender + exports.updateSuffix ,
    'cor': dummyData.dummyPatient.ethnicity + exports.updateSuffix ,
    'estado_civil': dummyData.dummyPatient.civilStatus + exports.updateSuffix ,
    'tel': dummyData.dummyPatient.phone + exports.updateSuffix ,
    'end': dummyData.dummyPatient.address + exports.updateSuffix ,
    'profissao': dummyData.dummyPatient.profession + exports.updateSuffix ,
    'naturalidade': dummyData.dummyPatient.naturalFrom + exports.updateSuffix ,
    'procedencia': dummyData.dummyPatient.origin + exports.updateSuffix ,
    'indicacao': dummyData.dummyPatient.referredBy + exports.updateSuffix ,
    'obs': dummyData.dummyPatient.obs + exports.updateSuffix
};

exports.insuranceProviderCreated = {
    'convenio': dummyData.dummyInsuranceProvider.name ,
    'cobrado': dummyData.dummyInsuranceProvider.amountCharged
};

exports.insuranceProviderUpdated = {
    'convenio': dummyData.dummyInsuranceProvider.name ,
    'cobrado': (dummyData.dummyInsuranceProvider.amountCharged + exports.updateIncrement)
};

exports.consultationCreated = {
    'pac_id': dummyData.dummyConsultation.id ,
    'login': dummyData.dummyConsultation.login ,
    'anamnese': dummyData.dummyConsultation.anamnesis ,
    'exame_fisico': dummyData.dummyConsultation.physical,
    'hip_diag': dummyData.dummyConsultation.hypothesis ,
    'conduta': dummyData.dummyConsultation.conduct ,
    'exames': dummyData.dummyConsultation.examination ,
    'evolucao': dummyData.dummyConsultation.evolution ,
    'cirurgias': dummyData.dummyConsultation.surgicalProcedures
};

exports.consultationUpdated = {
    'pac_id': dummyData.dummyConsultation.id ,
    'login': dummyData.dummyConsultation.login ,
    'anamnese': dummyData.dummyConsultation.anamnesis + exports.updateSuffix ,
    'exame_fisico': dummyData.dummyConsultation.physical + exports.updateSuffix ,
    'hip_diag': dummyData.dummyConsultation.hypothesis + exports.updateSuffix ,
    'conduta': dummyData.dummyConsultation.conduct + exports.updateSuffix ,
    'exames': dummyData.dummyConsultation.examination + exports.updateSuffix ,
    'evolucao': dummyData.dummyConsultation.evolution + exports.updateSuffix ,
    'cirurgias': dummyData.dummyConsultation.surgicalProcedures + exports.updateSuffix
};

exports.paymentCreated = {
    'pac_id': dummyData.dummyPayment.id ,
    'login': dummyData.dummyPayment.login ,
    'data': dummyData.dummyPayment.date ,
    'convenio': dummyData.dummyPayment.insuranceProviderName,
    'cobrado': dummyData.dummyPayment.amountCharged ,
    'recibo': dummyData.dummyPayment.receipt
};

exports.paymentUpdated = {
    'pac_id': dummyData.dummyPayment.id ,
    'login': dummyData.dummyPayment.login ,
    'data': dummyData.dummyPayment.date ,
    'convenio': dummyData.dummyPayment.insuranceProviderName + exports.updateSuffix ,
    'cobrado': (dummyData.dummyPayment.amountCharged + exports.updateIncrement) ,
    'recibo': (dummyData.dummyPayment.receipt + exports.updateIncrement)
};