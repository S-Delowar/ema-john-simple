import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, clearLocalShoppingCart } from '../../utilities/databaseManager';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '../CheckOutForm/CheckOutForm';
import { useState } from 'react';




const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const [shipInfo, setShipInfo] = useState(null);
    const [orderId, setOrderId] = useState(null);
    
    const auth = useAuth();

    //payment:
    const stripePromise = loadStripe('pk_test_q0DEs0NvtqrwkhPjtL2Thbth009TPtZ4pf');

    const onSubmit = data => {
        setShipInfo(data);        
    }

    const handlePlaceOrder =(payment) =>{
        const savedCart = getDatabaseCart();
        const orderDetails = {
            email: auth.user.email,
            cart: savedCart,
            shipment: shipInfo,
            payment: payment
        };
        fetch('https://cryptic-atoll-39128.herokuapp.com/placeOrder', {
            method: 'POST',
            body: JSON.stringify(orderDetails),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(order => {
                console.log(order)
                setOrderId(order._id)
                 clearLocalShoppingCart();               
            })
        }


    return (
        <div className="container">
            <div className="row">
                <div className="col-6" style={{display: shipInfo && 'none'}}>
                    <h2 className="text-center">Shipment Information</h2>
                    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

                        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder='Your Name' />
                        {errors.name && <span className='error'>Name is required</span>}

                        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder='Your Email' />
                        {errors.email && <span className='error'>Email is required</span>}

                        <input name="phoneNum1" ref={register({ required: true })} placeholder='Phone Number 1' />
                        {errors.phoneNum1 && <span className='error'>Phone number is required</span>}

                        <input name="phoneNum2" ref={register()} placeholder='Phone Number 2' />

                        <input name="address" ref={register({ required: true })} placeholder='Address' />
                        {errors.address && <span className='error'>Address required</span>}

                        <input name="zipCode" ref={register({ required: true })} placeholder='Zip Code' />
                        {errors.zipCode && <span className='error'>Zip Code is required</span>}

                        <input name="city" ref={register({ required: true })} placeholder='City' />
                        {errors.city && <span className='error'>City is required</span>}

                        <input name="country" ref={register({ required: true })} placeholder='Country' />
                        {errors.country && <span className='error'>Country is required</span>}


                        <input type="submit" />
                    </form>
                </div>
                <div className="col-6 mt-4" style={{display: shipInfo ? 'block' : 'none'}}>
                    <h2 className="text-center">Payment information</h2>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm handlePlaceOrder={handlePlaceOrder}/>
                    </Elements>
                    <br/>
                    {
                        orderId && <div>
                            <h3>Thank you for shopping with ema-john</h3>
                            <p>Your Order id is : {orderId}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}


export default Shipment;