import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../cart/Cart';
import { Link } from 'react-router-dom';

import { addToDatabaseCart, getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3000/products')
        .then(res => res.json())
        .then(data =>{
            //console.log(data)
            setProducts(data)
        })
    }, [])
    
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        if(products.length){
            const previousCart = productKeys.map(pdKey =>{
                const product = products.find(product => product.key === pdKey);
                product.quantity = savedCart[pdKey];
                return product;
            })
            setCart(previousCart);
        }
    }, [products])

    const handleAddProduct = (product) =>{
        const toBeAddedKey = product.key
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);       
        addToDatabaseCart(product.key, count)
    }



    return (
        <div className= 'shop-container'>
            <div className="products-container">
                
                {
                    products.map(pd => <Product
                        key={pd.key}  
                        showAddToCart={true}
                        handleAddProduct = {handleAddProduct}
                        product={pd}
                        ></Product>)
                }
            
            </div>
            <div className="card-container">
                <Cart cart={cart}>
                <Link to='/review'>
                <button className='buy-button'>Order Review</button>
            </Link>
                </Cart>
            </div>

            
            
        </div>
    );
};

export default Shop;