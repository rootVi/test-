'use client'
import { Product } from '@/constans/type'
import { useProductFormStore } from '@/hooks/useForm';
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Loader2Icon, Minus, PlusIcon } from 'lucide-react';
import { addToCart } from '@/etkinlikler/addToCart';
import useCartStore from '@/hooks/useCartStore';
import { useRouter } from 'next/navigation';

interface ProductForm{
    product:Product;
    btnVisible?: boolean;
}
const ProductForm = ({product}:ProductForm) => {

    const [loading,setLoading]=useState(false);

    const fetchItems = useCartStore((state) => state.fetchItems);
    
    const router = useRouter();


    const { decrementQuantity,incrementQuantity,quantity,
        reset,selectedColor,selectedSize,setColor,setSize } = useProductFormStore();

    useEffect(()=>{
            reset();
    },[product])

    const handleColorChange = (color: string) => {
        setColor(color);
    };
    
    const handlesizeChange = (size: string) => {
        setSize(size);
    };
    
    const TotalPrice = (quantity * product?.sellingPrice).toFixed(2)

    let jwt="";
    let user="";
    let userId="";

    try {
        if (typeof window != "undefined") {
            jwt = localStorage.getItem("jwt") || "";
            user = localStorage.getItem("user") || "";
            if (user) {
              const userObj = JSON.parse(user);
              userId = userObj.id;
            }
          }
    } catch (error) {
        console.log("Error", error)
        
    }

    const onAddCart = async()=>{

        if(!userId && !jwt){
            router.push("/login")
        }

        if(!selectedColor || !selectedSize){
           
              return;

        }
        try {
            setLoading(true);

            const data = {
                "data":{
                    quantity:quantity,
                    amount: TotalPrice,
                    size:selectedSize,
                    color:selectedColor,
                    products:product.id,
                    users_permissions_user:userId,
                    userId:userId
                }  
            }
console.log("datas",data)
            await addToCart(data, jwt)
            fetchItems(userId, jwt)
          
            
        } catch (error) {
            console.log("error", error)
            
        }finally{
            setLoading(false)
        }


    }


  return (
    <>
    <div className='flex flex-row'>

        <Select onValueChange={handleColorChange}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Renk" />
        </SelectTrigger>
        <SelectContent>
            {product?.colors?.map((color)=>(
                    <SelectItem key={product.id} value={color?.name}>{color?.name} </SelectItem>

            ))}

        </SelectContent>
        </Select>


        <Select onValueChange={handlesizeChange}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
            {product?.sizes?.map((size)=>(
                    <SelectItem key={size.id} value={size?.name}>{size?.name} </SelectItem>

            ))}

        </SelectContent>
        </Select>
        
      


    </div>

    <div  className='flex flex-row items-center gap-4 mt-8'>
            <Button size="lg" disabled={quantity===1} onClick={decrementQuantity}>
                <Minus/>
            </Button>
                <h2>{quantity}</h2>
            <Button  size="lg" onClick={incrementQuantity}>
                <PlusIcon/>
            </Button>
            ₺{TotalPrice}
       
    </div>

    <div className='flex flex-row gap-2 mt-8'>
        <Button onClick={onAddCart} variant="destructive">
          {loading ? <Loader2Icon className='animate-spin'/> : "At sepete bacım"}  
        </Button>

    </div>

   

    </>
  )
}

export default ProductForm