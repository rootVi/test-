'use client'
import React,{ useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import CartItem from './cartItem'

import { useRouter } from 'next/navigation'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingBag } from 'lucide-react'
import { DeleteToCart } from '@/etkinlikler/deleteToCart'
import  useCartStore  from '@/hooks/useCartStore'

interface CartProps{
  jwt:string;
  userId:string;
}
const Cart = ({jwt,userId}:CartProps) => {
  const {items, fetchItems} = useCartStore();
  const [subtotal, setSubTotal] = useState(0);
  const router = useRouter();

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


  const onDeleteItem = async (id: string | number) => {
    await DeleteToCart(id, jwt);
    fetchItems(userId, jwt);
};


  return (
    <Sheet>
  <SheetTrigger>
    <div className='relative cursor-pointer'>
        <span className='absolute
        bg-mycolor3 text-mycolor1 text-xs font-semibold
        -right-2 -top-1 w-5 h-5
        rounded-lg items-center justify-center text-center'>{items.length}</span>
        <ShoppingBag/>

    </div>
  </SheetTrigger>
  <SheetContent className='bgone'>
    <SheetHeader>
      <SheetTitle>Alışveriş Sepetin</SheetTitle>
      <SheetDescription>
         Aldıkların
      </SheetDescription>
        <div>
          {items.length ===0 ? (
            <p>Sepetin boş.Hadi Bir şeyler al</p>
          ):(
            <ul>
              {items.map((item)=>(
                <CartItem key={item.id}  item={item} onDeleteItem={onDeleteItem}/>
              ))}
            </ul>
          )}

          
        </div>

        <SheetClose asChild>
          <div className='absolute w-[90%] bottom-6 flex-col'>
            <h2 className='text-lg flex justify-between'>Toplam Fiyat <span>₺{subtotal}</span> </h2>


            <div>
            <Button disabled={items.length == 0} onClick={()=>router.push(jwt?"/checkout": "/login")}> Öde </Button>
            </div>


          </div>

        </SheetClose>

     </SheetHeader>
  </SheetContent>
</Sheet>
  )
}

export default Cart