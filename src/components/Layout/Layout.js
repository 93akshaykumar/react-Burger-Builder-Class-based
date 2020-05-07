import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import classes from '../Layout/Layout.module.css'
import Toolbar from  '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'
class Layout extends Component {
    state = {
        ShowSideDrawer : false
    }
    sideDrawerClosedHnadler = () => {
        this.setState({ShowSideDrawer: false});

    }


    ShowsideDrawerhandler = () => {
        console.log("Akshay")
        this.setState({ShowSideDrawer: true});
    }

    render(){
        return (
    <Aux>
    <SideDrawer closed={this.sideDrawerClosedHnadler} open={this.state.ShowSideDrawer} />
    <Toolbar ShowSideMenu={this.ShowsideDrawerhandler}/>
    <main className={classes.Content}>
        {this.props.children}
    </main>
    </Aux>
    )}
}



export default Layout