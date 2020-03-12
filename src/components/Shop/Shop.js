import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import Cart from '../cart/Cart';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10)
    //console.log(fakeData);
    const [cart, setCart] = useState([])

    const handleAddProduct = (product) =>{
        console.log('Product Added', product);
        const newCart = [...cart, product];
        setCart(newCart);
    }



    return (
        <div className= 'shop-container'>
            <div className="products-container">
                
                {
                    products.map(pd => <Product 
                        handleAddProduct = {handleAddProduct}
                        product={pd}
                        ></Product>)
                }
            
            </div>
            <div className="card-container">
                <Cart cart={cart}></Cart>
            </div>

            
            
        </div>
    );
};

export default Shop;