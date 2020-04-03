import React, {Component} from 'react'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import * as actions from '../../store/actions/index'

class Profile extends Component {
   componentDidMount(){
       this.props.getUserFavoritePokemon(this.props.userId)
   }
    render(){
        let content = <Spinner/>
        console.log(this.props.isAuth)
        let isAuthenticated = null
        if(!this.props.isAuth){
           isAuthenticated =  <Redirect to="/login" />
        }
        if(!this.props.loading){
            content = <ProfileCard email={this.props.userData.email} first_name={this.props.userData.first_name} last_name={this.props.userData.last_name} username={this.props.userData.email}/>
        }

        return(
            <div>
                {isAuthenticated}
                {content}
                {this.props.userId}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.auth.userData,
        loading: state.auth.loading,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserData : (userId)=>{actions.getUserFavoritePokemon(userId)},
        getUserFavoritePokemon  : ()=>{return false}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)