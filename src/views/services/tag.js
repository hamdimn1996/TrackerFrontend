import http from '../utils/http'

const getAllTags = async () => {
    return await http.get("/tag");
}
const getAllTagsForSelect = async () => {
    return await http.get("/newTagForm");
}

const updateOne = (id, data) => {
    return http.put(`/tag/${id}`, data);
};

const removeOne = id => {
    return http.delete(`/tag/${id}`);
};
const getOne = id => {
    return http.get(`/tag/${id}`);
};

const createOne = data => {
    return http.post("/tag", data);
};

const TagService = {
    getAllTags,
    getAllTagsForSelect,
    updateOne,
    removeOne,
    getOne,
    createOne
}

export default TagService