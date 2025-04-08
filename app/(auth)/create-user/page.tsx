"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Label } from '@/components/ui/label'
import useAuthManage from '@/hooks/useAuth'
import registerUser from '@/etkinlikler/register'
import { startSession } from '@/lib/session'
import {useRouter} from 'next/navigation'
import { Loader2Icon } from 'lucide-react'

const formSchema = z.object({
 
  email: z.string().min(2, {
    message: "Email en az 2 karakter içermeli.",
  }),
  kullaniciadi: z.string().min(2, {
    message: "Kullanıcı adı en az 2 karakter içermeli.",
  }),
  password: z.string().min(8, {
    message: "Şifre en az 8 karakter içermeli.",
  }),
})

const CreateUser = () => {
  const {loader,setLoader} = useAuthManage() ;
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      kullaniciadi:"",
      password:""
    },
  })
  
  const onSubmit=(data:z.infer<typeof formSchema>)=>{
     setLoader(true);
     registerUser(data.kullaniciadi, data.email,data.password).then(
      (resp)=>{
        startSession(resp.user,resp.jwt)
       
        setLoader(false);
        router.push("/")
      },
     
     ).finally(()=>{
      setLoader(false);
     })

  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-3/5">
      <FormField
        control={form.control}
        name="kullaniciadi"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text'>Kullanıcı Adı</FormLabel>
            <FormControl>
              <Input placeholder="Kullanıcı Adı" {...field} />
            </FormControl>
            <FormDescription>
            </FormDescription>
            <FormMessage className='yanlis'/>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text'>Email</FormLabel>
            <FormControl>
              <Input placeholder="email@gmail.com" {...field} />
            </FormControl>
            <FormDescription>
            </FormDescription>
            <FormMessage className='yanlis'/>
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text'>Şifre</FormLabel>
            <FormControl>
              <Input placeholder="Şifre" type="password"{...field} />
            </FormControl>
            <FormDescription>
            </FormDescription>
            <FormMessage className='yanlis'/>
          </FormItem>
        )}
      />
      <Button className='w-full font-semibold 'type="submit">
        {loader? <Loader2Icon className='animate-spin'/> : "Hesap Oluştur"}
        </Button>
    </form>
    <div className='mt-5'>
       <Label className='flex flex-col items-center'>
        Zaten hesabın var mı?
       
       <Link href="/login" className='text font-semibold mt-4'>
       Giriş yapmak için tıkla.

       </Link>
       </Label>

    </div>
  </Form>
  )
}

export default CreateUser