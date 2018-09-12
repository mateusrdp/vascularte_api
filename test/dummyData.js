exports.dummyDoctor = {
    login: "mateusrp",
    identityDocument: "10",
    register: 15,
    address: "My address",
    gender: "M",
    name: "Mateus",
    phone: "00000",
    city: "BH",
    state: "MG",
    specialty: "Comp Sci",
};

exports.dummyPatient = {
    id: 1,
    name: "Stacey",
    dob:  "1988-07-24",
    gender: "F",
    ethnicity:  "Caucasian",
    civilStatus: "Single",
    phone: "11111",
    address: "Her address",
    profession: "Nurse",
    naturalFrom: "Wingham",
    origin: "Wah?",
    referredBy: "No one",
    obs: "Cute",
};

exports.dummyInsuranceProvider = {
    name: "MateusMed",
    amountCharged: 100.0
};

exports.dummyConsultation = {
    id: exports.dummyPatient.id,
    login: exports.dummyDoctor.login,
    anamnesis: "Her anamnesis",
    physical: "Her physical",
    hypothesis: "Her hypothesis",
    conduct: "Her conduct",
    evolution: "Her evolution",
    examination: "Her examination",
    surgicalProcedures: "Her procedures",
};

exports.dummyDocType = {
    login: exports.dummyDoctor.login,
    name: "My document",
    content: "Something",
};

exports.dummyPayment = {
    id: 1,
    login: exports.dummyDoctor.login,
    date: "2018-10-30",
    insuranceProviderName: exports.dummyInsuranceProvider.name,
    amountCharged: exports.dummyInsuranceProvider.amountCharged,
    receipt: exports.dummyInsuranceProvider.amountCharged,
};
