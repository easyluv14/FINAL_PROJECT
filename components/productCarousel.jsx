'use client'
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/productCard';

const ProductCarousel = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Nike Air Force 1 '07",
      price: "74.95 €",
      originalPrice: "89.99 €",
      rating: 4.5,
      reviews: 234,
      image: "/sneaker1.jpg",
      isOnSale: true
    },
    {
      id: 2,
      name: "Adidas Ultraboost 22",
      price: "74.95 €",
      originalPrice: "89.99 €",
      rating: 4.8,
      reviews: 156,
      image: "/sneaker2.jpg",
      isOnSale: true
    },
    {
      id: 3,
      name: "Nike Dunk Low Retro",
      price: "74.95 €",
      originalPrice: "89.99 €",
      rating: 4.3,
      reviews: 89,
      image: "/sneaker3.jpg",
      isOnSale: true
    },
    {
      id: 4,
      name: "Converse Chuck Taylor",
      price: "74.95 €",
      originalPrice: "89.99 €",
      rating: 4.6,
      reviews: 312,
      image: "/sneaker4.jpg",
      isOnSale: false
    },
    {
      id: 5,
      name: "Vans Old Skool",
      price: "74.95 €",
      originalPrice: "89.99 €",
      rating: 4.4,
      reviews: 178,
      image: "/sneaker5.jpg",
      isOnSale: false
    },
    {
      id: 6,
      name: "New Balance 990v5",
      price: "74.95 €",
      originalPrice: "89.99 €",
      rating: 4.7,
      reviews: 203,
      image: "/sneaker6.jpg",
      isOnSale: true
    },
    {
      id: 7,
      name: "Puma RS-X3",
      price: "74.95 €",
      originalPrice: "89.99 €",
      rating: 4.2,
      reviews: 145,
      image: "/snaeker7.jpg",
      isOnSale: false
    },
    {
      id: 8,
      name: "Reebok Classic Leather",
      price: "74.95 €",
      originalPrice: "89.99 €",
      rating: 4.5,
      reviews: 267,
      image: "/sneaker8.jpg",
      isOnSale: false
    }
  ];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 220; // Width of one card plus gap
    const newScrollLeft = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    // Update navigation button states
    setTimeout(() => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    }, 300);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          TRENDING NOW
        </h2>
      </div>

      {/* Products Carousel */}
      <div className="relative">
                {/* Navigation Buttons */}
        {/* Left Navigation Button */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-md border transition-all duration-200 bg-white shadow-md ${
            canScrollLeft 
              ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-50' 
              : 'border-gray-200 text-gray-300 cursor-not-allowed'
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-md border transition-all duration-200 bg-white shadow-md ${
            canScrollRight 
              ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-50' 
              : 'border-gray-200 text-gray-300 cursor-not-allowed'
          }`}
        >
          <ChevronRight size={20} />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' }
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel