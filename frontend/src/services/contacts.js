import axios from "axios";

const BASEURL = "api/persons";

const getContacts = () => {
    const req = axios.get(BASEURL);
    return req.then(res => res.data);
}

const createContacts = (newContact) => {
    const req = axios.post(BASEURL, newContact);
    return req.then(res => res.data);
}

const deleteContacts = (id) => {
    const req = axios.delete(`${BASEURL}/${id}`);
    return req.then(res => res.data);
}

export default { getContacts, createContacts, deleteContacts };