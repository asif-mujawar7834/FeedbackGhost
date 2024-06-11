"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import carouselData from "@/data/carouselData";
import Autoplay from "embla-carousel-autoplay";
import { Mail } from "lucide-react";
export default function CarouselSection() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-lg mx-auto mt-10"
      // className="w-full max-w-lg mx-auto"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="-mt-1 max-h-[300px]">
        {carouselData.map((message) => (
          <CarouselItem
            key={message.id}
            className="flex gap-2"
            // className="pt-1 md:basis-1/3 shadow-lg"
          >
            <div className="bg-[#EEEEEE] p-4 rounded-md">
              <h1 className="font-bold text-lg sm:text-xl mb-4">
                {message.title}
              </h1>
              <div className="flex gap-4 align-top">
                <Mail className="text-blue-500 font-bold shrink-0" size={30} />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">
                    {message.content}
                  </h3>
                  <p className="text-xs sm:text-sm">{message.time}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
