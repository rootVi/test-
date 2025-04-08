
import { Product } from '@/constans/type';
import React from "react";
import Link from "next/link";
import ProductImages from "./productImage";
interface ProductItemProps {
  product: Product;
}
const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div
      className="group flex flex-col items-center justify-center
      rounded-xl hover:shadow-2xl hover:shadow-black  duration-300 transition-all cursor-pointer "
    >
     
        <Link href={""} key={product.id}>
        <ProductImages images={product?.images} />

          <h2 className="font-bold text-lg">{product?.name}</h2>
          <div className="flex gap-3 my-2">
            {product?.sellingPrice && <h2>₺{product?.sellingPrice}</h2>}
            <h2 className={product?.sellingPrice ? "line-through text-gray-500" : ""}>
            {`$${product?.mrp}`}
</h2>
          </div>
        </Link>
    
    </div>
  );
};

export default ProductItem;
