import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../cart/Cart';
import happyImg from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const auth = useAuth();

    
    const removeProduct = (productKey) => {
        console.log('clicked remove', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        console.log(productKeys)
        fetch('http://localhost:3000/getProductsByKey', {
            method: 'POST',
            body: JSON.stringify(productKeys),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const cartProducts = productKeys.map(key => {
                const product = data.find(pd => pd.key === key)
                product.quantity = savedCart[key]
                return product;
            }
            );
            setCart(cartProducts)
        })
    }, [])

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImg} alt=""/>  
    }   
    return (
        <div className='shop-container'>
            <div className='products-container'>
                <h1>Cart Items: {cart.length} </h1>
                {
                    cart.map(pd => <ReviewItem
                        removeProduct={removeProduct}
                        key={pd.key}
                        product={pd}></ReviewItem>)
                }
                {
                    thankYou
                }
                {
                    !cart.length && <h2>Your Cart is Empty! <a href="/shop">Keep Shopping</a></h2>
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <Link to="shipment">
                    {
                        auth.user ? 
                        <button className='buy-button'>Proceed Checkout</button>
                        :
                        <button className='buy-button'>Login to Proceed</button>
                    }
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Review;