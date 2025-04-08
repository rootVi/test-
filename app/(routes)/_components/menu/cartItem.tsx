import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

// Define the CartItemProps interface
interface CartItemProps {
    item: {
        id: string | number; // Adjust the type based on your data
        name: string;
        quantity: number;
        color: string;
        size: string;
        amount: number;
        images: string; // Assuming images is an array of image URLs
    };
    onDeleteItem: (id: string | number) => void;
}

const CartItem = ({ item, onDeleteItem }: CartItemProps) => {
    return (
        <div className='flex justify-between items-center p-2 mb-1'>
            <div className='flex gap-4 items-center'>
                <Image
                    unoptimized={true}
                    src={
                        process.env.NEXT_PUBLIC_BACKEND_URL +
                        item.images // Assuming the first image is used
                    }
                    width={90}
                    height={90}
                    alt={item.name}
                    className='border borderone p-2'
                />
                <div className='space-y-2'>
                    <h2 className='font-bold'>{item.name}</h2>
                    <h2 className='text-xs'>Adet: {item.quantity}</h2>
                    <h2 className='text-xs'>{item.color} {item.size}</h2>
                    <h2 className='text-lg font-bold text-mycolor2'>₺{item.amount}</h2>
                </div>
            </div>
            <Button onClick={() => onDeleteItem(item.id)} />
        </div>
    );
}

export default CartItem;
