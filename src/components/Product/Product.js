import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { img, name, seller, price, stock, key } = props.product;

    return (
        <div className='product-style'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'><Link to={'/product/'+key}>{name}</Link> </h4>
                <p>by:{seller} </p>
                <p>${price} </p>
                <p>only {stock} left in stock - order soon</p>
                { props.showAddToCart && <button 
                    className='buy-button'
                    onClick ={() =>props.handleAddProduct(props.product)}
                    ><FontAwesomeIcon icon={faShoppingCart} /> add to cart
                </button>}
            </div>


        </div>
    );
};

export default Product;