import React, { Fragment, useEffect, useContext } from 'react'
import Users from '../users/Users';
import SearchUser from '../users/SeachUser';
import GithubContext from '../../context/github/githubContext';

const Home = () => {
    const githubContext = useContext(GithubContext);
    const {getAllUsers} = githubContext;
    useEffect(()=>{
        getAllUsers();
    }, [])
    return (
        <Fragment>
            <SearchUser />
            <Users />
        </Fragment>
    )
}

export default Home;
