"use client"
import { Gender } from '@/constans/type';
import { Category } from '@/constans/type';
import React, { useEffect, useState } from "react";
import { getCategorieMen } from "@/etkinlikler/getCategoriesMen";
 
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import NavSkeleton from '../Skeleton/navSkeleton';


interface erkekItemProsps1{
  erkek1:Gender;
}
const Men = ({erkek1}:erkekItemProsps1) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    
    
    
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategorieMen("/categories?populate=*&filters[genders][name][$eq]="+erkek1.name);
        setCategories(categories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  return (
    <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>     
          {erkek1.name}
         </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-4 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] ">
                
                  {loading?(
            <NavSkeleton/>
          ):(
            categories.map((aaa)=>(
              
              <ListItem
              href={`/search?gender=`+erkek1.name+`&category=`+aaa.name} key={aaa.id}
              >
                  {aaa?.name}
              </ListItem>
            ))
            
            
          )}
        
               
             
           
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      
      
    </NavigationMenuList>
  </NavigationMenu>

  )
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
export default Men