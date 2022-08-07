import axios from "axios";
import hash from "hash.js";

// const server = 'http://127.0.0.1:8000'
const server = 'https://taskpriority-be.herokuapp.com'

export const createUser = (props) => {
    return axios.post(`${server}/user/createUser`, props.data)
}


export const updateDisplayName = (props) => {
    return axios.put(`${server}/user/updateDisplayName`, props.data)
}

export const changePassword = (props) => {
    return axios.put(`${server}/user/changePassword`, props.data)
}

export const logIn = (props) => {
    const pass = hash.sha1().update(props.data.password).digest('hex')
    props.data.password = pass
    console.log(pass);
    return axios.post(`${server}/user/logIn`, props.data)
}