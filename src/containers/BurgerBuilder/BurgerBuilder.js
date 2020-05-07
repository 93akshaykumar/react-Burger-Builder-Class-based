import React, { Component } from "react";
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese:0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurferBuilder extends Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients: {
                salad:0,
                bacon:0,
                cheese:0,
                meat:0
            },
            totalPrice: 4.00,
            purchasable:true,
            purchasing:false
        }
    }

    updatePurchaseState(updatedIngredients) {
        const values=Object.values(updatedIngredients)
        let sum =values.reduce((val,el)=> (val+el),0)
        console.log(sum)
        this.setState({purchasable : sum === 0 })
    }
    

    purchaseHnadler= () =>{
        this.setState({purchasing: true})
        
    }

    addIngredientHandler = (type) => {
        const update = this.state.ingredients[type]+1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]=update
        let totalPrice=INGREDIENT_PRICES[type]+this.state.totalPrice
        const settoupdate={
            totalPrice: totalPrice,
            ingredients: updatedIngredients
        }
        this.setState(settoupdate)
        this.updatePurchaseState(updatedIngredients)
        
    }
    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type]>0){
        const update = this.state.ingredients[type]-1;

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]=update
        let totalPrice=this.state.totalPrice-INGREDIENT_PRICES[type];
        const settoupdate={
            totalPrice: totalPrice,
            ingredients: updatedIngredients
        }
        this.setState(settoupdate)
        this.updatePurchaseState(updatedIngredients)
    }
        
    }

    purchaseContinue= () => {
        alert("You selected to continue the purchase")
    }

    purchaseCancel= () => {
        this.setState({purchasing: false})
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients}
                    modalClosed={this.purchaseCancel}
                    modalPuchase={this.purchaseContinue}
                    totalPrice={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                
                <BuildControls purchasable={this.state.purchasable} 
                               totalPrice={this.state.totalPrice} 
                               disabled={disabledInfo} 
                               ingredientsAdded={this.addIngredientHandler} 
                               ingredientsRemoved={this.removeIngredientHandler}
                               showSummary={this.purchaseHnadler}/>
            </Aux>
        );
    }

}

export default BurferBuilder;