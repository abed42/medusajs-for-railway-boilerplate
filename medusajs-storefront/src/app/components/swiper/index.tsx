'use client'
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

// Dynamically import swiper without SSR
const DynamicSwiper = dynamic(
  () => import('swiper/react').then((mod) => mod.Swiper),
  { ssr: false }
);

export default function SwiperComponent({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  const swiperRef = useRef(null);

  return (
    <div ref={swiperRef} className="swiper-container">
      <DynamicSwiper {...props}>
        {children}
      </DynamicSwiper>
    </div>
  );
}
