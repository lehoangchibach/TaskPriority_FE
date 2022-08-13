import axios from "axios";
import hash from "hash.js";

// const server = 'http://127.0.0.1:8000'
const server = 'https://taskpriority-be.herokuapp.com'

export const createUser = (props) => {
    props.data.password = hash.sha1().update(props.data.password).digest('hex')
    return axios.post(`${server}/user/createUser`, props.data)
}


export const updateDisplayName = (props) => {
    return axios.put(`${server}/user/updateDisplayName`, props.data)
}

export const changePassword = (props) => {
    const payload = {
        "userName": props.data.userName,
        "oldPassword": hash.sha1().update(props.data.oldPassword).digest('hex'),
        "newPassword": hash.sha1().update(props.data.newPassword).digest('hex'),
    }
    return axios.put(`${server}/user/changePassword`, payload)
}

export const logIn = (props) => {
    const pass = hash.sha1().update(props.data.password).digest('hex')
    props.data.password = pass
    return axios.post(`${server}/user/logIn`, props.data)
}