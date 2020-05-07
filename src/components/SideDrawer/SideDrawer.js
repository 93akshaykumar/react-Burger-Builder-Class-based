import React from 'react';
import Logo from '../../components/Logo/Logo';
import NavigationItems from '../Navigation/Navigationitems/NavigationItems';
import classes from '../SideDrawer/SideDrawer.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import Aux from '../../hoc/Aux'
const sideDrawer =(props)=> {
    let attachedClasses = [classes.SideDrawer,classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer,classes.Open];
    }
    return (
        <Aux>
        <Backdrop show={props.open} modalClose={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <Logo height='10%'/>
            <NavigationItems />
            </div>
        </Aux>
    );

}

export default sideDrawer