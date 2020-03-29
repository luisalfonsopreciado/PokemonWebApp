import React from 'react'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import classes from '../Auth.module.css'
import {Redirect} from 'react-router-dom'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { updateObject, checkValidity} from '../../../shared/utility'

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
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Desired Username'
                },
                value: '',
                label: 'Username',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
            },
            password1: {
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
            password2: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Password'
                },
                value: '',
                label: 'Confirm Password',
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
    }

    switchAuthModeHandler = () =>{
        this.props.history.push('/login')
    }
    
    render(){

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
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
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



export default Auth