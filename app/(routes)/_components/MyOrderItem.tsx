import Image from 'next/image';
import React from 'react';

interface OrderItem {
    color: string;
    size: string;
    quantity: number;
    amount: number;
    product: {
        images: { url: string }[]; // Assuming product has images with url
        name: string; // Add other properties as necessary
    };
}

interface MyOrderItemProps {
    orderItem: OrderItem; // Use the OrderItem type here
}

const MyOrderItem = ({ orderItem }: MyOrderItemProps) => {
    return (
        <div className='container'>
            <div className='grid grid-cols-6 mt-3 items-center border borderone p-2 bgone gap-8'>
                <Image
                    unoptimized={true}
                    src={
                        process.env.NEXT_PUBLIC_BACKEND_URL +
                        orderItem.product.images[0].url
                    }
                    width={80}
                    height={80}
                    alt='image'
                    className='bgone borderone p-2 col-span-1 rounded-md border'
                />

                <div className='col-span-1'><h2>{orderItem.product.name}</h2></div>
                <div className='col-span-1'><h2>Adet: {orderItem.quantity}</h2></div>
                <div className='col-span-1'><h2>Adet Ücreti: {orderItem.amount}</h2></div>
                <div className='col-span-1'><h2>Renk: {orderItem.color}</h2></div>
                <div className='col-span-1'><h2>Size: {orderItem.size}</h2></div>
            </div>
        </div>
    );
}

export default MyOrderItem;
