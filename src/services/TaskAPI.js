import axios from "axios";


export const getAllTaskByUser = (props) => {
    return axios.get(`http://127.0.0.1:8000/task/getAllByUser/${props.userName}`)
}


export const saveTask = (props) => {
    return axios.put(`http://127.0.0.1:8000/task/`, props.data)
}

export const createTask = (props) => {
    return axios.post(`http://127.0.0.1:8000/task/`, props.data)
}