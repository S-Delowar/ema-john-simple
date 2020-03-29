import React from 'react';

const ReviewItem = (props) => {
    //console.log(props)
    const { name, quantity, key, price } = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        marginLeft: '200px',
        padding: '5px'
    }
    return (
        <div style={reviewItemStyle}>
            <h4 className='product-name'>{name} </h4>
            <p>Quantity: {quantity} </p>
            <p><small>Price: {price}</small></p>
            <br />
            <button
                onClick={() => props.removeProduct(key)}
                className='buy-button'>Remove</button>

        </div>
    );
};

export default ReviewItem;