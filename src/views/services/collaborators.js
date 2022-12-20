import http from '../utils/http'

const getAllUtilisateurs = async () => {
    return await http.get("/utilisateurs");
}

const updateOne = (id, data) => {
    return http.put(`/utilisateurs/${id}`, data);
};

const removeOne = id => {
    return http.delete(`/utilisateurs/${id}`);
};
const getOne = id => {
    return http.get(`/utilisateurs/${id}`);
};

const createOne = data => {
    return http.post("/utilisateurs", data);
};

const utilisateursService = {
    getAllUtilisateurs,
    updateOne,
    removeOne,
    getOne,
    createOne
}

export default utilisateursService