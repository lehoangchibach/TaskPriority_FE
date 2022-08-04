import axios from "axios";

// const server = 'http://127.0.0.1:8000'
const server = 'https://taskpriority-be.herokuapp.com'

export const getAllTaskByUser = (props) => {
    return axios.get(`${server}/task/getAllByUser/${props.userName}`)
}


export const saveTask = (props) => {
    return axios.put(`${server}/task/`, props.data)
}

export const createTask = (props) => {
    return axios.post(`${server}/task/`, props.data)
}

export const deleteTask = (props) => {
    return axios.delete(`${server}/task/${props.taskId}`)
}