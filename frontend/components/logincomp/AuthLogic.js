//import React, { createContext, useState, useContext } from 'react';
//import axiosInstance from './axiosInstance';
//
//const AuthContext = createContext();
//
//    export const useAuth = () => useContext(AuthContext);
//
//export const AuthProvider = ({ children }) => {
//    const [user, setUser] = useState(null);
//    const [token, setToken] = useState(localSotrage.getItem("token"));
//
//    const login = async (username, pasword) => {
//        try {
//            const response = await axiosInstance.post("/login", { username, password });
//            const { data } = response;
//            localStorage.setItem("token", data);
//            setToken(data);
//            setUser(username);
//        } catch (error) {
//            console.error("Authentication failed:", error);
//        }
//    }
//
//    const logout = () => {
//        setUser(null);
//        setToken(null);
//        localStorage.removeItem("token");
//    };
//
//    return (
//        <AuthContext.Provider value={{user, token, login, logout}}>
//            {children}
//        </AuthContext.Provider>
//    );
//}
