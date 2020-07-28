import React from 'react'
import pokeLogo from '../../assets/images/logo.png'
import classes from './Logo.module.css'
const logo = () => (
    <div className={classes.Logo}>
        <img src={pokeLogo} alt="Poke Logo"></img>
    </div>
)

export default logo