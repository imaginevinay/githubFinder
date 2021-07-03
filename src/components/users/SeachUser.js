import React, {useState, useContext} from 'react'
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext'
const SearchUser = () => {
    const githubContext = useContext(GithubContext)
    const alertContext = useContext(AlertContext)
    const { searchUsers} = githubContext;
    const { setAlert } = alertContext;
    const [search, setSearch] = useState('');
    const onChangeHandler = (event) => {
        event.preventDefault();
        setSearch(event.target.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if(search === '') {
            setAlert('Please enter a text to search user', 'light')
        } else {
            searchUsers(search);
            setSearch('')
        }
    }

    return (
        <div>
            <form className="form" onSubmit={onSubmitHandler}>
                <input 
                    type="text" 
                    name="text" 
                    placeholder="Search Users..."
                    value={search}
                    onChange={onChangeHandler} 
                />
                <input type="submit" value="search" className="btn btn-dark btn-block" />
            </form>
            {githubContext.users.length > 0 && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>}
        </div>
    )
}

export default SearchUser
