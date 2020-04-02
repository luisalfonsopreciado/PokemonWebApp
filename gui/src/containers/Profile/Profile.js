import React, {Component} from 'react'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router'
import * as actions from '../../store/actions/index'

class Profile extends Component {
   componentDidMount(){
       console.log(this.props.userId)
       console.log(this.props.userData)
       this.props.getUserFavoritePokemon(this.props.userId)
   }
    render(){
        let content = <Spinner/>
        if(!this.props.userId){
           content =  <Redirect to="/login" />
        }

        return(
            <div>
                {content}
                {this.props.userId}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        userId : state.auth.userId,
        userData : state.auth.userData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserData : (userId)=>{actions.getUserFavoritePokemon(userId)},
        getUserFavoritePokemon  : ()=>{return false}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)