import React, { Fragment, useContext, useEffect } from 'react'
import Spinner from '../layout/spinner';
import { Link } from 'react-router-dom'
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';

const UserDetail = ({match}) => {
    const githubContext = useContext(GithubContext);
    const {user, loading, getUser, getUserRepos, repos} = githubContext
    useEffect(() => {
       getUser(match.params.username);
       getUserRepos(match.params.username);
    }, [])
    
    const {
        name, 
        avatar_url, 
        location, 
        bio, 
        blog, 
        login, 
        html_url, 
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
        company
    } = user

    const hireableHtml = <i className="fas fa-check text-success"></i>
    const nonHireableHtml = <i className="fas fa-times-circle text-danger"></i>
    const bioHtml = <Fragment>
        <h3><strong>Bio</strong></h3>
        <p>{bio}</p>
    </Fragment>
    
    if (loading) {
        return <Spinner />
    } else {
        return (
            <Fragment>
                <Link to='/' className="btn btn-light">Back to search</Link>
                Hireable : {' '}
                {hireable ? hireableHtml : nonHireableHtml}
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className="round-img" style={{width : '150px'}} alt="avatar" />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && bioHtml}
                        <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                    <strong>Username : </strong> {login}    
                                </Fragment>
                                }
                            </li>
                            <li>
                                {company && <Fragment>
                                    <strong>Company : </strong> {company}    
                                </Fragment>
                                }
                            </li>
                            <li>
                                {blog && <Fragment>
                                    <strong>Website : </strong> {blog}    
                                </Fragment>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers : {followers}</div>
                    <div className="badge badge-success">Following : {following}</div>
                    <div className="badge badge-light">Public Repos : {public_repos}</div>
                    <div className="badge badge-dark">Public Gists : {public_gists}</div>
                </div>
                {repos && repos.length && <Repos repos={repos} />}
            </Fragment>
        )
    }
}

export default UserDetail
