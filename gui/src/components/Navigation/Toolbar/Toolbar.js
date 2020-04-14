import React from 'react'
import classes from './Toolbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import { connect } from 'react-redux'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = props =>{
    return (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth} userId={props.email}/>
        </nav>
    </header>
    )
}
const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        email: state.auth.userData.email,
    }
}
export default connect(mapStateToProps)(toolbar)