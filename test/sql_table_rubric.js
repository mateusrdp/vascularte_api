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
        'senha': dummyData.dummyDoctor.password + updateSuffix ,
        'cpf': dummyData.dummyDoctor.identityDocument + updateSuffix ,
        'crm':  (dummyData.dummyDoctor.register + updateIncrement),
        'end': dummyData.dummyDoctor.address + updateSuffix ,
        'sexo': dummyData.dummyDoctor.gender + updateSuffix ,
        'nome': dummyData.dummyDoctor.name + updateSuffix ,
        'teldono': dummyData.dummyDoctor.phone + updateSuffix ,
        'cidade': dummyData.dummyDoctor.city + updateSuffix ,
        'estado': dummyData.dummyDoctor.state + updateSuffix ,
        'especialidade': dummyData.dummyDoctor.specialty + updateSuffix
};

exports.docTypeCreated = {
        'login': dummyData.dummyDocType.login ,
        'nome': dummyData.dummyDocType.name ,
        'conteudo': dummyData.dummyDocType.content
};

exports.docTypeUpdated = {
    'login': dummyData.dummyDocType.login ,
    'nome': dummyData.dummyDocType.name + updateSuffix ,
    'conteudo': dummyData.dummyDocType.content + updateSuffix
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
    'id': dummyData.dummyPatient.id + updateSuffix ,
    'nome': dummyData.dummyPatient.name + updateSuffix ,
    'nascimento': dummyData.dummyPatient.dob + updateSuffix ,
    'sexo': dummyData.dummyPatient.gender + updateSuffix ,
    'cor': dummyData.dummyPatient.ethnicity + updateSuffix ,
    'estado_civil': dummyData.dummyPatient.civilStatus + updateSuffix ,
    'tel': dummyData.dummyPatient.phone + updateSuffix ,
    'end': dummyData.dummyPatient.address + updateSuffix ,
    'profissao': dummyData.dummyPatient.profession + updateSuffix ,
    'naturalidade': dummyData.dummyPatient.naturalFrom + updateSuffix ,
    'procedencia': dummyData.dummyPatient.origin + updateSuffix ,
    'indicacao': dummyData.dummyPatient.referredBy + updateSuffix ,
    'obs': dummyData.dummyPatient.obs + updateSuffix
};

exports.insuranceProviderCreated = {
    'convenio': dummyData.dummyInsuranceProvider.name ,
    'cobrado': dummyData.dummyInsuranceProvider.amountCharged
};

exports.insuranceProviderUpdated = {
    'convenio': dummyData.dummyInsuranceProvider.name ,
    'cobrado': (dummyData.dummyInsuranceProvider.amountCharged + updateIncrement)
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
    'anamnese': dummyData.dummyConsultation.anamnesis + updateSuffix ,
    'exame_fisico': dummyData.dummyConsultation.physical + updateSuffix ,
    'hip_diag': dummyData.dummyConsultation.hypothesis + updateSuffix ,
    'conduta': dummyData.dummyConsultation.conduct + updateSuffix ,
    'exames': dummyData.dummyConsultation.examination + updateSuffix ,
    'evolucao': dummyData.dummyConsultation.evolution + updateSuffix ,
    'cirurgias': dummyData.dummyConsultation.surgicalProcedures + updateSuffix
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
    'convenio': dummyData.dummyPayment.insuranceProviderName + updateSuffix ,
    'cobrado': (dummyData.dummyPayment.amountCharged + updateIncrement) ,
    'recibo': (dummyData.dummyPayment.receipt + updateIncrement)
};