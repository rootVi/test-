export type Category = {
    id: number;
    name: string;
    slug: string;
    genders:string[];
    image: {
      url: string;
    };
  };
  
  export type Size = {
    id: number;
    name: string;
  };
  
  export type Color = {
    id: number;
    name: string;
  };
  
  export type Gender = {
    id: number;
    name: string;
  };
  
  export type ProductImage = {
    id: number;
    
      url: string;
   
  };
  export type main = {
    id: number;
    url: string;
  };
  export type Product = {
    id: number;
    name: string;
    description: string;
    slug: string;
    mrp: Number;
    sellingPrice: number;
    isTop: boolean;
    new: boolean;
    images:ProductImage[];
      main:main;
    category: Category;
    colors: Color[];
    sizes: Size[];
  };
 
  