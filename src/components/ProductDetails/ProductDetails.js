import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetails = () => {
    const {productKey} = useParams();
    
    const [product, setProduct] = useState(null)

    useEffect(()=>{
        fetch('http://localhost:3000/product/'+ productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data)
            console.log(data)
        })
    },[productKey])

   
    return (
        <div>
            <h3>Your product Detail</h3>
            {
                product && <Product showAddTOCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetails;