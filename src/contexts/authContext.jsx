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
            setUser(jwt.decode(user.data.token))
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
            console.log(result.data);
            cookie.save('auth-token', result.data.token)
            setUser(jwt.decode(result.data.token))
            setIsLoggedIn(true);
        }
    }
    const logOut = () => {
        setUser({});
        setIsLoggedIn(false);
        cookie.remove('auth-token')
    }

    useEffect(() => {
        const token = cookie.load('auth-token');
        if (!token) {
            return false;
        }
        const data = jwt.decode(token);
        if (data) {
            setUser(data)
            setIsLoggedIn(true);
        }
    }, [])


    return (
        <AuthContext.Provider value={{ signIn, isLoggedIn, signup, user, logOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;