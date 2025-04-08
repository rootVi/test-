'use client'

import { getToOrder } from '@/etkinlikler/getToOrder';
import useCartStore from '@/hooks/useCartStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import moment from 'moment';
import { ArrowDownIcon } from 'lucide-react';
import MyorderItem from '../_components/MyOrderItem';

interface OrderItemData { // Renamed to OrderItemData
    color: string;
    size: string;
    quantity: number;
    amount: number;
    product: { // Update the product type according to your data structure
        images: { url: string }[]; // Assuming this is correct
        name: string; // Add any other properties if necessary
    };
}

interface Order {
    createdAt: string;
    subtotal: string;
    paymentText: string;
    orderItemList: OrderItemData[]; // Update here too
}

const MyOrderPage = () => {

    const { fetchItems } = useCartStore();
  
    const [orderList, setOrderList] = useState<Order[]>([]);
    const router = useRouter();

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

      useEffect(() => {
        fetchItems(userId, jwt);
    }, [userId, jwt, fetchItems]);

        const getMyorder = async () => {
            const orderList_ = await getToOrder(userId, jwt);
            console.log(orderList_);
            setOrderList(orderList_ as Order[]);
    }


    useEffect(()=>{
      if(!jwt){
        router.push('/')
      };
      getMyorder();
    },[])


  return (
    <div>
      <h2 className='p-3 bg-mycolor2 text-white font-bold text-4xl text-center'> Siparişim</h2>

      <div className='py-8 mx-7'>
        <h2 className='text-2xl textone font-bold'>Sipariş Tarihi</h2>

        <div className='mt-10'>
          {orderList.map((item, index)=>(
            <Collapsible key={index}>
            <CollapsibleTrigger className='grid grid-cols-7 mt-3 items-center border borderone p-2 bgone gap-8'>
              <h2> <span className='font-bol mr-2'>Sipariş Tarihi :</span> {moment(item?.createdAt).format('DD/MMM/yyy')} </h2>
              <h2> <span className='font-bol mr-2'>Toplam Fiyat: </span> {item?.subtotal} </h2>
              <h2> <span className='font-bol mr-2'>Durum :</span>  Hazırlanıyor </h2>
              <h2> <span className='font-bol mr-2'>Ödeme :</span> {item?.paymentText} </h2>
              <h2 className='col-span-2'> <span className='font-bold mr-2'> <ArrowDownIcon className='ml-auto'/> </span></h2>

              </CollapsibleTrigger>
            <CollapsibleContent>
            {item.orderItemList && item.orderItemList.map((order,index_)=>(
              <MyorderItem key={index_} orderItem={order}/>
            ))}
             


            </CollapsibleContent>
          </Collapsible>

          ))}


        </div>


      </div>


    </div>
  )
}

export default MyOrderPage