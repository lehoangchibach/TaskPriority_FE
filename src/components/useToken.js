import { useState } from 'react';

const useToken = () => {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
        // return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (props) => {
        if (!props) {
            sessionStorage.clear()
            setToken(null)
            return
        }
        const userToken = props.data
        sessionStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }

}
export default useToken
