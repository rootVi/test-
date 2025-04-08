"use client";

import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import ProductItem from "../_components/product/productItem";
import HomeProductSkeleton from "../_components/Skeleton/navSkeleton";

interface ProductFilters {
  search?: string;
  category?: string;
  color?: string;
  size?: string;
  page?: number;
}

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const pageSize = 8;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts({
      search: searchParams.get("q") || "",
      category: searchParams.get("category") || "",
      color: searchParams.get("color") || "",
      size: searchParams.get("size") || "",
      page: Number(searchParams.get("page")) || 1,
    });
  }, [searchParams]);

  const fetchProducts = async (filters: ProductFilters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("filters[name][$contains]", filters.search);
      if (filters.category && filters.category !== "all") params.append("filters[category][name][$eq]", filters.category);
      if (filters.color && filters.color !== "all") params.append("filters[colors][name][$eq]", filters.color);
      if (filters.size && filters.size !== "all") params.append("filters[sizes][name][$eq]", filters.size);
      params.append("pagination[page]", String(filters.page ?? 1));
      params.append("pagination[pageSize]", String(pageSize));

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products?populate=*&${params.toString()}`
      );

      setProducts(response.data.data);
      setTotalPages(response.data.meta.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateURL = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== "page") {
      newParams.set("page", "1");
    }
    router.push(`/search?${newParams.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    updateURL("page", newPage.toString());
  };

  return (
    <div className="flex justify-center items-center mt-8">
      {loading ? (
        <HomeProductSkeleton />
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8 mb-8 mx-5">
            {products.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        if (page === 1) {
                          e.preventDefault(); // Prevent navigation if disabled
                          return;
                        }
                        handlePageChange(page - 1);
                      }}
                      className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(i + 1);
                        }}
                        className={i + 1 === page ? "border border-blue-500" : ""}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        if (page === totalPages) {
                          e.preventDefault(); // Prevent navigation if disabled
                          return;
                        }
                        handlePageChange(page + 1);
                      }}
                      className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SearchPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchPage />
  </Suspense>
);

export default SearchPageWithSuspense;
