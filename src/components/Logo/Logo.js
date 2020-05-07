import React from 'react';
import burgerLogo from '../../assets/images/burgerlogo.png'
import classes from '../Logo/Logo.module.css'


const logo = (props) => (
    <div className={classes.Logo} style={{height:props.height}}>
        <img src={burgerLogo} alt='MyBurgerLogo'/>
    </div>
)

export default logo