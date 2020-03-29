import React from 'react'
import classes from './Toolbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import { connect } from 'react-redux'

const toolbar = props =>{
    console.log(props.isAuth)
    return (
    <header className={classes.Toolbar}>
        <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth} userId={props.userId}/>
        </nav>
    </header>
    )
}
const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        userId: state.auth.userId,

    }
}
export default connect(mapStateToProps)(toolbar)