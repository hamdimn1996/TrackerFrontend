import http from '../utils/http'

const getAllProjects = async () => {
    return await http.get("/projet");
}

const updateOne = (id, data) => {
    return http.put(`/projet/${id}`, data);
};

const removeOne = id => {
    return http.delete(`/projet/${id}`);
};
const getOne = id => {
    return http.get(`/projet/${id}`);
};

const createOne = data => {
    return http.post("/projet", data);
};

const getUsersForProjects = async() => {
    return await http.get(`/respList`);
};

const projectService = {
    getAllProjects,
    updateOne,
    removeOne,
    getOne,
    createOne,
    getUsersForProjects
}

export default projectService