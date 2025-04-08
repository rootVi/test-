"use client";
import Men from '../gender/men';
import Logo from "@/components/logo";
import React, { useEffect, useState } from "react";
import Search from "./search";
import Cart from "./cart";
import UserMenu from "./usermenu";
import NavSkeleton from "../Skeleton/navSkeleton";
import { getGender } from '@/etkinlikler/getGender';
import { Gender } from '@/constans/type';




const Navbar = () => {
  const [genders, setGenders] = useState<Gender[]>([]);
  const [loading1, setLoading1] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const genders = await getGender();
        setGenders(genders);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading1(false);
      }
    };

    fetchCategories();
  }, []);
 

  let jwt = "";
  let user = "";
  let userId = "";

  try {
    if (typeof window != "undefined") {
      jwt = localStorage.getItem("jwt") || "";
      user = localStorage.getItem("user") || "";
      if (user) {
        const userObj = JSON.parse(user);
        userId = userObj.id;
      }
    }
  } catch (e) {
    console.error("Error:", e);
  }

  return (
    <>
     <header className='sticky top-0 py-6 border-b-2 background2 background z-20'>
      
        <div className='flex items-center justify-between mx-auto px-4'>
          <Logo/>

          <div className='hidden lg:flex gap-4 -mr-36'>
        {loading1?(
            <NavSkeleton/>
          ):(
            genders.map((erkek1,index)=>(
              
           <Men
           key={index}
           erkek1={erkek1}
           />
           
            ))
            
            
          )}
        
        </div>
        
        <div className='space-x-4 flex items-center'>
          <Search/>

          <Cart jwt={jwt} userId={userId}/>
          <UserMenu />
        </div>
        </div>

      </header>
    </>


  );
};


export default Navbar;
