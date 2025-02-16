'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Image from 'next/image';
import { CAROUSEL_DATA } from '@/widgets/home/model';

export default function FeatureCarousel() {
  return (
    <div className="pb-20 pt-16">
      <div className="swiper-container flex h-[500px] w-[894px] overflow-x-scroll md:h-[559px] md:w-[1000px]">
        <Swiper
          pagination={{ clickable: true }}
          navigation={true}
          speed={2000}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {CAROUSEL_DATA.map((data) => (
            <SwiperSlide key={data.id}>
              <Image
                src={data.image}
                alt={`${data.id}`}
                width={1000}
                height={559}
                priority={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
