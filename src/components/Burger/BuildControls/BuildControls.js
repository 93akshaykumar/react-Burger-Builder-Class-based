import React from 'react';

import classes from '../BuildControls/BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];


const buildControls = (props) => (
    
    <div className={classes.BuildControls}>
        {console.log(props.purchasable)}
        <p>Price(CAD)::{props.totalPrice.toFixed(2)}</p>
        {controls.map( element =>(
            <BuildControl 
                            key={element.label} 
                            label={element.label}
                            added={()=> props.ingredientsAdded(element.type)}
                            removed={()=> props.ingredientsRemoved(element.type)}
                            disabled={props.disabled[element.type]}
                            />
        ))}
        <button disabled={props.purchasable} className={classes.OrderButton} onClick={()=>props.showSummary()}>ORDER NOW</button>
    </div>
);


export default buildControls;