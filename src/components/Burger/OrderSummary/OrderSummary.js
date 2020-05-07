import React from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../../components/Button/Button'
const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map(
        igkey => {
        return <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span> : {props.ingredients[igkey]}
        </li>
        }
    );
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Order Total:: CAD {props.totalPrice.toFixed(2)}  </p>
            <Button clicked={props.modalClosed} btnType="Danger">CLOSE</Button>
            <Button clicked={props.modalPuchase} btnType="Success">CONTINUE</Button>
        </Aux>
    )


}

export default orderSummary;