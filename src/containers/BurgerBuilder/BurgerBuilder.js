import React, { Component } from "react";
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese:0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    constructor(props){
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 4.00,
            purchasable:true,
            purchasing:false,
            loading: false,
        }
    }

    componentDidMount() {
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})

        })
        .catch(error=>{
            
            console.log("Data ERROR NOT added::",error)
        })
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
        //alert("You selected to continue the purchase")
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Akshay Kumar',
                street: '1333 South Park Street',
                zipCode: 'B3J2K9',
                country: 'Canada'
            },
            delivery: 'Fastest'
        }
        axios.post('/orders.json',order)
        .then(response => {
            this.setState({loading: true,purchasing: false})
            console.log("Data added::",response)
        })
        .catch(error=>{
            this.setState({loading: true,purchasing: false})
            console.log("Data ERROR NOT added::",error)
        })
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


        let orderSummary = null 
        let burger = <Spinner />;

        if (this.state.ingredients) {
            burger = (<Aux><Burger ingredients={this.state.ingredients}/>
            <BuildControls purchasable={this.state.purchasable} 
                           totalPrice={this.state.totalPrice} 
                           disabled={disabledInfo} 
                           ingredientsAdded={this.addIngredientHandler} 
                           ingredientsRemoved={this.removeIngredientHandler}
                           showSummary={this.purchaseHnadler}/></Aux>)
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                           modalClosed={this.purchaseCancel}
                           modalPuchase={this.purchaseContinue}
                           totalPrice={this.state.totalPrice}/>
        }
        
        if (this.state.loading){
            orderSummary= <Spinner />;
        }
        
        

        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

export default withErrorHandler(BurgerBuilder,axios);
// export default BurgerBuilder;