import React from 'react'
import Button from '../UI/Button/Button'
import './Modal.css'

export const Modal = props => {
    const classes =['Modal',props.show  ? 'ModalOpen' :  'ModalClosed' ]
    console.log(props.pokemon.url)
    return (
        <div className={classes.join(' ')}>
            <h1>{props.pokemon.name}</h1>

              <img src={props.pokemon.url} alt="Pokemon"></img> 
             <Button btnType="Danger" clicked={props.closed}>Dismiss</Button>
        </div>
    )
}
export default Modal