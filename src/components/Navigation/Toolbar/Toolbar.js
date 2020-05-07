import React from 'react';
import classes from '../Toolbar/Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../Navigationitems/NavigationItems'
const toolbar = (porps) => (
    <header className={classes.Toolbar}>
        <div className={classes.MobileOnly} onClick={porps.ShowSideMenu}>
            <div className={classes.DrawerToggle}></div>
            <div></div>
            <div className={classes.DrawerToggle}></div>
            <div></div>
            <div className={classes.DrawerToggle}></div>
        </div>
        <Logo height='80%'/>
        <nav className={classes.DesktopOnly}>
        <NavigationItems />
        </nav>
        </header>
    
    );


export default toolbar;
