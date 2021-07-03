// all actions will be sent here
import React, { useReducer } from "react";
import axios from 'axios'
import githubContext from "./githubContext";
import GithubReducer from './githubReducer';
import { ALL_USERS, SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from '../types'

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repors: [],
        loading: false
    }


    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // get all users
    const getAllUsers = async () => {
        setLoading();
        const res =  await axios.get(`https://api.github.com/users`);
        dispatch({
            type : ALL_USERS,
            payload : res.data
        })
    }

    // search users
    const searchUsers = async (text) => {
        setLoading();        
        const res =  await axios.get(`https://api.github.com/search/users?q=${text}`);
        dispatch({
            type : SEARCH_USERS,
            payload : res.data.items
        })
    }
    // get user
    const getUser = async (userName) => {
         setLoading();
         const res =  await axios.get(`https://api.github.com/users/${userName}`);
         dispatch({
             type : GET_USER,
             payload : res.data
         })
    }
    // get repos
    const getUserRepos = async (userName) => {
        const res = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc`);
        dispatch({
            type : GET_REPOS,
            payload : res.data
        })
    }
    // clear users
    const clearUsers = () => {
        dispatch({type : CLEAR_USERS})
    }
    // set loading
    const setLoading = () => {
        dispatch({ type : SET_LOADING });
    }

    return <githubContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        getAllUsers,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
    }}>
        {props.children}
    </githubContext.Provider>
}

export default GithubState;