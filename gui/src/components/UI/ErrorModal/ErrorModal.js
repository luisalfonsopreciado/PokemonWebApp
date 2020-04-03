import React from 'react'
import Button from '../UI/Button/Button'
import './Modal.css'

export const Modal = props => {
    const classes =['Modal',props.show  ? 'ModalOpen' :  'ModalClosed' ]
    console.log(props.pokemon.url)
    const getErrorFields = () => {
        errorFields = props.errors.map((error) => {
        return <p>{error}</p>
        })
    }
    return (
        <div className={classes.join(' ')}>
             
             <Button btnType="Danger" clicked={props.closed}>Dismiss</Button>
        </div>
    )
}
export default Modal