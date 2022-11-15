import http from '../utils/http'
const getAllEvents = async () => {
    return await http.get("/event");
}

const updateOne = (id, data) => {
    return http.put(`/event/${id}`, data);
};

const removeOne = id => {
    return http.delete(`/event/${id}`);
};
const getOne = id => {
    return http.get(`/event/${id}`);
};

const createOne = data => {
    return http.post("/event", data);
};

const eventService = {
    getAllEvents,
    updateOne,
    removeOne,
    getOne,
    createOne
}

export default eventService