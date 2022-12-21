import http from '../utils/http'

const getAllTickets = async () => {
    return await http.get("/ticket");
}

const updateOne = (id, data) => {
    return http.put(`/ticket/${id}`, data);
};

const removeOne = id => {
    return http.delete(`/ticket/${id}`);
};
const getOne = id => {
    return http.get(`/ticket/${id}`);
};

const createOne = data => {
    return http.post("/ticket", data);
};

const getProjectsForTicket = async () => {
    return await http.get("/getProjectsForTicket");
}

const ticketService = {
    getAllTickets,
    updateOne,
    removeOne,
    getOne,
    createOne,
    getProjectsForTicket
}

export default ticketService