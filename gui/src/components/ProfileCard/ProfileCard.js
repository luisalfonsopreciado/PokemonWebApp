import React from 'react'
import classes from './ProfileCard.module.css'
import Button from '../UI/Button/Button'

const ProfileCard = ({username, email, first_name, last_name}) => {
    
    return(
        <div className={classes.Container}>
                <h2>{username}</h2>
            <img alt="User"className={classes.ProfileImage}/>
            <div>
                <p>{email}</p>
                <p>{first_name}</p>
                <p>{last_name}</p>
            </div>
            <Button btnType="Info">SUBMIT CHANGES</Button>       
        </div>
    )
}
export default ProfileCard