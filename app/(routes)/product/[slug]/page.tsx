"use client";
import { getProducts } from "@/etkinlikler/getProducts";
import { Product } from "@/constans/type";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams from next/navigation
import ProductDetailSkeleton from "../../_components/Skeleton/navSkeleton";
import ProductImages from "../../_components/product/productImage";
import ProductForm from "../../_components/product/productForm";

const Page = () => {
  const params = useParams(); // Use useParams to get route parameters
  const [productDetail, setProductDetail] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!params?.slug) return; // Ensure params.slug exists before using it

      try {
        const productDetail = await getProducts(
          `/products?filters[slug][$eq]=${params.slug}&populate=*`
        );
        setProductDetail(productDetail);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params?.slug]); // Added dependency to avoid re-fetching unnecessarily

  return (
    <>
      {loading ? (
        <ProductDetailSkeleton />
      ) : (
        <div className="-mt-5 container mx-auto">
          {productDetail.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8 container"
            >
              <div>
                <ProductImages images={product?.images} />
              </div>
              <div>
                <div className="flex flex-col gap-3 mx-2">
                  <h2 className="text-3xl font-semibold mt-6">
                    {product?.name}
                  </h2>
                  <h2 className="text-lg font-semibold text-mycolor2 dark:text-mycolor5">
                    {product?.category?.name}
                  </h2>
                  <p>{product?.description}</p>
                  <div className="flex gap-3">
                    {product?.sellingPrice && (
                      <h2 className="font-bold text-mycolor2 text-3xl">
                        ₺{product?.sellingPrice}
                      </h2>
                    )}
                    <h2
                      className={product?.sellingPrice ? "line-through text-gray-500" : ""}
                    >
                      {`₺${product?.mrp}`} {/* Fixed currency symbol */}
                    </h2>
                  </div>
                  <ProductForm product={product} btnVisible={false} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Page;