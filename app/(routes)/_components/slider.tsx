'use client'
import { getSlider } from "@/etkinlikler/getSliders";
import { Product } from '@/constans/type';
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";

const Slider = () => {
  const [Slider, setSlider] = useState<Product[]>([]);
  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const Slider = await getSlider();
        setSlider(Slider);
      } catch (error) {
        console.error("Failed to fetch Slider", error);
      } 
    };

    fetchSlider();
  }, []);
  return (
    <>
      <div className="px-24  ">
        <h2 className=" text font-semibold text-2xl lg:text-3xl border-b-2 border-mycolor2 mt-4">
          Yeni Ürünler
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="mx-20 my-5">
          {Slider.map((image, index) => (
            <CarouselItem className="basis-1/1 md:basis-1/2 lg:basis-1/3 " key={image?.id || index}>
              <div className="group flex flex-col my-7 rounded-xl hover:shadow-2xl hover:shadow-black  duration-400">
                <Link href={`/product/${image?.slug}`} key={image.id}>
                  <Image
                    width={1196}
                    alt="alt"
                    height={1600} 
                    unoptimized={true}
                    src={process.env.NEXT_PUBLIC_BACKEND_URL + image?.main.url}

                    className=" w-full h-[300px] lg:h-[400px] md:h-[300px] xl:h-[500px] scale-95  group-hover:scale-100 rounded-lg object-cover duration-300"
                  />

                  <h2 className="font-bold text-lg">{image?.name}</h2>
                  <div className="flex gap-3 my-2">
                    {image?.sellingPrice && <h2>₺{image?.sellingPrice}</h2>}
                    <h2
                      className={
                        "line-through text-gray-500"
                      }
                    >
                      
                    </h2>

                  </div>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </>
  );
};

export default Slider;
