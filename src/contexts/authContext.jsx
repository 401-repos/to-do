import cookie from 'react-cookies'
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import base64 from 'base-64';
import jwt from 'jsonwebtoken';

export const AuthContext = createContext()
const AuthContextProvider = (props) => {
    const url = "https://api-js401.herokuapp.com"
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const signIn = async (username, password) => {
        const encoded = base64.encode(`${username}:${password}`);
        const user = await axios.post(url + "/signin", {}, {
            headers: {
                'Authorization': `Basic ${encoded}`
            }
        });
        if (user.data) {
            cookie.save('auth-token', user.data.token)
            console.log(user.data.user);
            setUser(user.data.user)
            setIsLoggedIn(true);
        }

    }
    const signup = async ({ username, password, email, role }) => {
        const result = await axios({
            baseURL: url,
            url: '/signup',
            method: "post",
            data: { username, password, email, role }
        });
        if (result.data) {
            cookie.save('auth-token', result.data.token)
            setUser(result.data.user)
            setIsLoggedIn(true);
        }
    }
    const decodeToken = async () => {
        const token = cookie.load('auth-token');
        const result = await axios({
            baseURL: url,
            url: '/user',
            method: "get",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (result) {
            return result.data;
        }
        return false;
        // const data = jwt.decode(token);
        // if(data){
        //     return data;
        // }
        // return false;
    }
    const logOut = () => {
        setUser({});
        setIsLoggedIn(false);
        cookie.remove('auth-token')
    }
    useEffect(() => {
        const fetchApi = async () => {
            const data = await decodeToken();
            console.log("heeeeeeeer", data);
            if (data) {
                setUser(data.user);
                setIsLoggedIn(true);
            }
        }
        fetchApi();
    }, [])
    return (
        <AuthContext.Provider value={{ signIn, setIsLoggedIn, isLoggedIn, signup, user, logOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;