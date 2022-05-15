import React from 'react'
import { useSelector } from 'react-redux';

function Profile() {
  const session = useSelector(state => state.session.userSession)

  return (
    <div>This is your Profile {session.user.username} </div>
  )
}

export default Profile;