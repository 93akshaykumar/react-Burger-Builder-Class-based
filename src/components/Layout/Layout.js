import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import classes from '../Layout/Layout.module.css'
import Toolbar from  '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'
class Layout extends Component {
    state = {
        ShowSideDrawer : true
    }
    sideDrawerClosedHnadler = () => {
        this.setState({ShowSideDrawer: false});

    }
    render(){
        return (
    <Aux>
    <SideDrawer closed={this.sideDrawerClosedHnadler} open={this.state.ShowSideDrawer}/>
    <Toolbar />
    <main className={classes.Content}>
        {this.props.children}
    </main>
    </Aux>
    )}
}



export default Layout