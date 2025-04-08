'use client'
import { DeleteToCart } from '@/etkinlikler/deleteToCart';
import useCartStore from '@/hooks/useCartStore';
import React, { useEffect, useState } from 'react'
import CartItem from '../_components/menu/cartItem';
import Checkoutform from '../_components/checkoutForm';

const CheckoutPage = () => {

    const {items, fetchItems} = useCartStore();
    const [subtotal, setSubTotal] = useState(0);

    let jwt = ""; 
    let user = '';
    let userId = '';

    try {
      if(typeof window !="undefined"){
      jwt = localStorage.getItem("jwt") || "";
      user = localStorage.getItem('user') || '';
      if (user) {
        const userObj = JSON.parse(user);
        userId = userObj.id;
      }
    }
    } catch (e) {
      console.error('Error:', e);
    }

    useEffect(()=>{
        fetchItems(userId,jwt)
      }, [fetchItems])
    
      useEffect(()=>{
        let total =0;
        items.forEach(element =>{
          total = total+element.amount
        });
        setSubTotal(parseFloat(total.toFixed(2)));

      },[items])

      const onDeleteItem= async(id: string | number)=>{
        await DeleteToCart(id,jwt)
        fetchItems(userId,jwt)
    
      }

  return (
    <div className='container mt-8 mb-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            <div className='col-span-1 lg:col-span-3 background border border-border rounded-md lg:h-screen'>
                <Checkoutform subtotal={subtotal.toString()} userId={userId} jwt={jwt} />
            </div>

            <div className='col-span-1 background border border-border justify-center items-center rounded-md lg:h-screen'>
              {items.map((item)=>(
                <CartItem key={item.id}  item={item} onDeleteItem={onDeleteItem}/>
              ))}
              <div className='flex border border-background justify-center items-center'>
              Toplam Fiyat: {subtotal}
              </div>
                    
                    
            </div>

        </div>
    </div>
  )
}

export default CheckoutPage