import React from 'react'
import Button from '../UI/Button/Button'
import './Modal.css'

export const Modal = props => {
    const classes =['Modal',props.show  ? 'ModalOpen' :  'ModalClosed' ]
    return (
        <div className={classes.join(' ')}>
            <h1>Title</h1>
             {/* <img src={props.url} alt={props.alt}></img> */}
             <Button btnType="Danger" clicked={props.closed}>Dismiss</Button>
        </div>
    )
}
export default Modal