import React from 'react'
import classes from './ProfileCard.module.css'
import Button from '../UI/Button/Button'
const ProfileCard = props => {
    return(
        <div className={classes.Container}>
                <h2>Username</h2>
            <img alt="User"className={classes.ProfileImage}/>
            <div>
                <p>{props.email}</p>
                <p>{props.first_name}</p>
                <p>{props.last_name}</p>
            </div>
            <Button btnType="Info">SUBMIT CHANGES</Button>
           
           
        </div>
    )
}
export default ProfileCard