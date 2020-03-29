import React from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import {Redirect} from 'react-router-dom'
import Spinner from '../../components/UI/Spinner/Spinner'
import { updateObject, checkValidity} from '../../shared/utility'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class Auth extends React.Component{
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                label: 'Email',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                label: 'Password',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false
            },
        },
        IsSignup: true
    }

    componentDidMount(){
        if(this.props.auth.token != null){
            console.log("ONSETAUTHREDIRECT")
            this.props.onSetAuthRedirectPath()
        }       
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName] : updateObject(this.state.controls[controlName], {
                        value : event.target.value,
                        valid : checkValidity(event.target.value, this.state.controls[controlName].validation),
                        touched : true,
                    })
        })
        this.setState({
            controls: updatedControls
        })
    }

    submitHandler = (event) =>{
        event.preventDefault()
        const email = this.state.controls.email.value
        const password = this.state.controls.password.value
        this.props.onLogin(email, password)
    }

    switchAuthModeHandler = () =>{
        this.props.history.push('/signup')
    }
    
    render(){
        console.log(this.props.auth)
        const formElementsArray= [] //Convert State to an Array to loop Thru
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
       
        
        let form =  formElementsArray.map((formElement, key) =>{
                    return <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        value={formElement.config.value} 
                        touched={formElement.config.touched}
                        label={formElement.config.label}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                })
                
         if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null
        if(this.props.error) {
            errorMessage = ( 
                <p>Incorrect Credentials</p>
            )
        }
        let authRedirect = null
        if (this.props.auth.token !== null){
            authRedirect = <Redirect to={this.props.auth.authRedirectPath}/>
        }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    { form }
                    <Button btnType="Success"> SUBMIT </Button>
                    <Button btnType="Danger" clicked={this.switchAuthModeHandler}> { this.state.isSignup ? 'SIGN IN' : 'SIGNUP' } </Button>
                </form>
                
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        auth : state.auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email ,password) => { dispatch(actions.login(email, password))},
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth)