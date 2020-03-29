import React from 'react'
import Button from '../UI/Button/Button'
import classes from './PageManager.module.css'

const PageManager = (props) =>{
    return(
        <div className={classes.PageManager}>
            {props.lower === 0 ? null : <Button clicked={props.previous} btnType="Info ">Previous</Button>}
            {props.upper >= 973 ? null: <Button clicked={props.next} btnType="Info ">Next</Button>}
            
        </div>

    );
}
export default PageManager