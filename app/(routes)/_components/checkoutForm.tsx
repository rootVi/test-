"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import useCartStore from '@/hooks/useCartStore'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { createOrder } from '@/etkinlikler/createOrder'
import { DeleteToCart } from '@/etkinlikler/deleteToCart'


const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    phone: z.string().min(2, { message: "Phone must be at least 2 characters." }),
    address: z.string().min(2, { message: "Address must be at least 2 characters." }),
    holdername: z.string().min(2, { message: "Holder Name must be at least 2 characters." }),
    ccnumber: z.string().regex(/^\d{16}$/, { message: "Credit Number must be 16 digits." }),
    month: z.preprocess((val) => Number(val), z.number().min(1, { message: "Month is required." }).max(12, { message: "Month must be between 1 and 12." })),
    year: z.preprocess((val) => Number(val), z.number().min(new Date().getFullYear(), { message: "Year must be the current year or later." })),
    cvc: z.string().regex(/^\d{3,4}$/, { message: "CVC must be 3 or 4 digits." })
  })
interface CheckoutFormProps{
  subtotal:string;
  userId:string;
  jwt:string;
}
interface CartItem {
  id: string;
  name: string;
  color?: string;
  size?: string;
  quantity: number;
  amount: number;
  product: number;
}
const Checkoutform = ({subtotal,jwt,userId}:CheckoutFormProps) => {
    const { items, fetchItems } = useCartStore()
    console.log(items);
    const setResponse = useState(null)[1];

    const router = useRouter();




    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "Mehmet Furkan Kurt",
          phone: "+90 *** *** ** **",
          address: "Çanakkale Türkiye",
          holdername: "Mehmet Furkan Kurt ",
          ccnumber: "**** **** **** ****",
          month: 1,
          year: new Date().getFullYear(),
          cvc: "***"
        }
      })

    const onSubmit = async(data: z.infer<typeof formSchema>) => {
      const paymentCard = {
        cardHolderName: data.holdername,
        cardNumber: data.ccnumber,
        expireMonth: data.month,
        expireYear: data.year,
        cvc: data.cvc,
        registerCard: '0'
      };

    const buyer = {
        id: 'BY789',
        name: data.name,
        surname: 'Youtube',
        gsmNumber: data.phone,
        email: 'john.doe@example.com',
        identityNumber: '74300864791',
        lastLoginDate: '2015-10-05 12:43:35',
        registrationDate: '2013-04-21 15:12:09',
        registrationAddress: data.address,
        ip: '85.34.78.112',
        city: 'Istanbul',
        country: 'Turkey',
        zipCode: '34732'
    };

    const shippingAddress = {
        contactName: data.name,
        city: 'Istanbul',
        country: 'Turkey',
        address: data.address,
        zipCode: '34742'
    };

    const billingAddress = {
      contactName: data.name,
      city: 'Istanbul',
      country: 'Turkey',
      address: data.address,
      zipCode: '34742'
    };

    const basketItems = items.map(item=>({
      id: item.id,
      name: item.name,
      category1: 'Collectibles',
      category2: 'Accessories',
      itemType: 'PHYSICAL',
      price: item.amount

    }));

    

    const paymentData = {
        price: subtotal,
        paidPrice: subtotal,
        currency: 'TRY',
        basketId: 'B67832',
        paymentCard: paymentCard,
        buyer: buyer,
        shippingAddress: shippingAddress,
        billingAddress: billingAddress,
        basketItems: basketItems
    };

    try {
        const response = await axios.post('http://localhost:5000/api/payment', paymentData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        setResponse(response.data);

        if(response.data.status === "success"){
          
          const deneme = items.map((item: CartItem) => ({
            color: item?.color,
            size: item?.size,
            quantity: item?.quantity,
            amount: item?.amount,
            product: item.product-12,
          }));
            console.log("datassss",deneme)
          const payload={
            "data":{
              name:data.name,
              address:data.address,
              phone:data.phone,
              userId:userId,
              subtotal:subtotal,
              paymentText:"Iyzico",
              OrderItemList:deneme,
            }
          }

          await createOrder(payload, jwt)

          items.forEach((item) => {
            DeleteToCart(item.id, jwt);
          })
         



            

            fetchItems(userId, jwt)

            router.push("/my-order")

        }
        else{
         

        }

    } catch (error) {
        
        console.error('Error:', error);
    }


    }


  return (
    <div className='p-8'>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <h2 className='border-b border-border text-2xl'>Adres</h2>
        <div className='flex flex-row gap-4'>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='textone'>İsim</FormLabel>
              <FormControl>
                <Input placeholder="John doe" {...field} />
              </FormControl>
              <FormMessage  className='validationLogin'/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem  className='w-full'>
              <FormLabel className='textone'>Telefonun</FormLabel>
              <FormControl >
                <Input placeholder="+90 *** *** ** **" {...field} />
              </FormControl>
              <FormMessage className='validationLogin'/>
            </FormItem>
          )}
        />

        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem  className='w-full'>
              <FormLabel className='textone'>Adres</FormLabel>
              <FormControl >
                <Input placeholder="Şehir mahalle" {...field} />
              </FormControl>
              <FormMessage className='validationLogin'/>
            </FormItem>
          )}
        />

        <div className='h-8'></div>
            <h2 className='border-b border-border text-2xl'>Kart Bilgisi</h2>

            <div className='flex flex-row gap-4'>
                    <FormField
                    control={form.control}
                    name="holdername"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                        <FormLabel className='textone'>Üzerindeki isim</FormLabel>
                        <FormControl>
                            <Input placeholder="Holder Name" {...field} />
                        </FormControl>
                        <FormMessage className='validationLogin' />
                        </FormItem>
                    )}
                    />

            <FormField
              control={form.control}
              name="ccnumber"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='textone'>Kredi numarası</FormLabel>
                  <FormControl>
                    <Input placeholder="Credit Number" {...field} />
                  </FormControl>
                  <FormMessage className='validationLogin' />
                </FormItem>
              )}
            />



            </div>

            <div className='flex flex-row gap-4'>

            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='textone'>Ay</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Month" {...field} />
                  </FormControl>
                  <FormMessage className='validationLogin' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='textone'>Yıl</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Year" {...field} />
                  </FormControl>
                  <FormMessage className='validationLogin' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='textone'>CVC</FormLabel>
                  <FormControl>
                    <Input placeholder="CVC" {...field} />
                  </FormControl>
                  <FormMessage className='validationLogin' />
                </FormItem>
              )}
            />



            </div>


        <Button type="submit">Gönder</Button>
      </form>
    </Form>


    </div>
  )
}

export default Checkoutform