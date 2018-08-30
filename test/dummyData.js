exports.dummyDoctor = {
    login: "mateusrp",
    password: "mafera",
    identityDocument: "10",
    register: 10,
    address: "My address",
    gender: "M",
    name: "Mateus",
    phone: "00000",
    city: "BH",
    state: "MG",
    specialty: "Comp Sci",

};

exports.dummyPatient = {
    id: 0,
    name: "Stacey",
    dob:  "24/07/1988",
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
    amountCharged: "100.0"
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
    id: 0,
    login: exports.dummyDoctor.login,
    date: "10/10/2018",
    insuranceProviderName: exports.dummyInsuranceProvider.name,
    amountCharged: exports.dummyInsuranceProvider.amountCharged+10,
    receipt: "PAID",
};
