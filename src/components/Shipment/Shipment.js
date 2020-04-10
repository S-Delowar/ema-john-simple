import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const auth = useAuth();

    // const handlePlaceOrder = () => {
    //     setCart([]);
    //     setOrderPlaced(true);
    //     processOrder();
    // }


    const onSubmit = data => {
         console.log(auth.user.email);
         const savedCart = getDatabaseCart();
         const orderDetails = { email: auth.user.email, cart: savedCart};
         fetch('http://localhost:3000/placeOrder', {
            method: 'POST',
            body: JSON.stringify(orderDetails),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
         })
         .then(res => res.json())
         .then(data => {
             console.log('Order Placed',data);
             alert('Order Placed Successfully'+ data._id)
             processOrder();
         })

        }
    

    

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder='Your Name' />
            {errors.name && <span className='error'>Name is required</span>}

            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder='Your Email'/>
            {errors.email && <span className='error'>Email is required</span>}

            <input name="phoneNum1" ref={register({ required: true })} placeholder='Phone Number 1' />
            {errors.phoneNum1 && <span className='error'>Phone number is required</span>}

            <input name="phoneNum2" ref={register()} placeholder='Phone Number 2'/>

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
    )
}


export default Shipment;