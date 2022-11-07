import http from '../utils/http'

const getAllCompanies = async () => {
    return await http.get("/company");
}

const updateOne = (id, data) => {
    return http.put(`/company/${id}`, data);
};

const removeOne = id => {
    return http.delete(`/company/${id}`);
};
const getOne = id => {
    return http.get(`/company/${id}`);
};

const createOne = data => {
    return http.post("/company", data);
};

const companyService = {
    getAllCompanies,
    updateOne,
    removeOne,
    getOne,
    createOne
}

export default companyService