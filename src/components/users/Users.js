import React, {useContext} from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/spinner';
import GithubContext from '../../context/github/githubContext'

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}

const Users = () => {
  const githubContext = useContext(GithubContext)
  const {loading, users}  = githubContext;
  if (loading) {
    return <Spinner />
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => {
          return <UserItem key={user.id} user={user} />
        })}
      </div>
    )
  }
}

export default Users
