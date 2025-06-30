'use client'
import React, { useState, useEffect } from 'react';
import { Clock, Zap, Star, Flame, ShoppingCart, ArrowRight, Heart, Sparkles } from 'lucide-react';

const FlashSalesPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fashionDeals = [
    {
      id: 1,
      title: "Premium Leather Jacket",
      originalPrice: "€299.99",
      salePrice: "€89.99",
      discount: "70% OFF",
      image: "🧥",
      rating: 4.8,
      sold: "2.1k sold",
      timeLeft: "6h 23m",
      badge: "BESTSELLER",
      sizes: "XS-XL",
      colors: "3 colors"
    },
    {
      id: 2,
      title: "Designer Denim Jeans",
      originalPrice: "€149.99",
      salePrice: "€49.99",
      discount: "67% OFF",
      image: "👖",
      rating: 4.9,
      sold: "1.8k sold",
      timeLeft: "4h 15m",
      badge: "TRENDING",
      sizes: "26-36",
      colors: "5 washes"
    },
    {
      id: 3,
      title: "Silk Summer Dress",
      originalPrice: "€199.99",
      salePrice: "€59.99",
      discount: "70% OFF",
      image: "👗",
      rating: 4.7,
      sold: "956 sold",
      timeLeft: "8h 42m",
      badge: "NEW ARRIVAL",
      sizes: "XS-XXL",
      colors: "4 colors"
    },
    {
      id: 4,
      title: "Luxury Cashmere Sweater",
      originalPrice: "€189.99",
      salePrice: "€67.99",
      discount: "64% OFF",
      image: "🧶",
      rating: 4.6,
      sold: "743 sold",
      timeLeft: "5h 18m",
      badge: "PREMIUM",
      sizes: "S-XL",
      colors: "6 colors"
    },
    {
      id: 5,
      title: "Statement Sneakers",
      originalPrice: "€129.99",
      salePrice: "€39.99",
      discount: "69% OFF",
      image: "👟",
      rating: 4.5,
      sold: "1.2k sold",
      timeLeft: "7h 55m",
      badge: "LIMITED",
      sizes: "6-12",
      colors: "2 colorways"
    },
    {
      id: 6,
      title: "Vintage Band Tee",
      originalPrice: "€59.99",
      salePrice: "€19.99",
      discount: "67% OFF",
      image: "👕",
      rating: 4.8,
      sold: "889 sold",
      timeLeft: "3h 37m",
      badge: "CULT CLASSIC",
      sizes: "XS-XXL",
      colors: "3 designs"
    }
  ];

  const handleBuyNow = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Fashion-inspired floating elements - adjusted for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-20 left-20 sm:top-40 sm:left-40 w-30 h-30 sm:w-60 sm:h-60 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        
        {/* Floating sparkles - hidden on mobile for cleaner look */}
        <div className="hidden sm:block absolute top-20 right-20 animate-bounce">
          <Sparkles className="w-6 h-6 text-pink-400 opacity-60" />
        </div>
        <div className="hidden sm:block absolute bottom-32 left-32 animate-bounce" style={{animationDelay: '1s'}}>
          <Sparkles className="w-4 h-4 text-purple-400 opacity-60" />
        </div>
        <div className="hidden sm:block absolute top-1/2 right-1/4 animate-bounce" style={{animationDelay: '2s'}}>
          <Sparkles className="w-5 h-5 text-rose-400 opacity-60" />
        </div>
      </div>

      {/* Header - Responsive */}
      <div className="relative z-10 pt-4 sm:pt-8 pb-4 px-4">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500 animate-bounce" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
                FLASH
              </span>
              <span className="text-gray-800 ml-2 sm:ml-3">FASHION</span>
            </h1>
            <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500 animate-bounce" />
          </div>
          <p className="text-gray-600 text-lg sm:text-xl mb-1 sm:mb-2 font-medium">Runway-Ready Deals</p>
          <p className="text-gray-500 text-base sm:text-lg mb-6 sm:mb-8">Curated styles, limited time only ✨</p>
          
          {/* Main countdown timer - Mobile responsive */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="text-white font-bold text-sm sm:text-lg">Sale ends in:</span>
            </div>
            <div className="flex gap-2 sm:gap-3">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-white shadow-xl px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-pink-100">
                  <div className="text-xl sm:text-3xl font-mono font-bold text-gray-800">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-500 uppercase font-medium">{unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid - Mobile responsive */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {fashionDeals.map((deal, index) => (
            <div
              key={deal.id}
              className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2 sm:hover:-translate-y-3 border border-gray-100 hover:border-pink-200"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Deal Badge - Responsive */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-20">
                <div className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs font-bold text-white transform rotate-12 shadow-lg ${
                  deal.badge === 'BESTSELLER' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                  deal.badge === 'TRENDING' ? 'bg-gradient-to-r from-pink-500 to-rose-500' :
                  deal.badge === 'NEW ARRIVAL' ? 'bg-gradient-to-r from-purple-500 to-indigo-500' :
                  deal.badge === 'PREMIUM' ? 'bg-gradient-to-r from-gray-700 to-gray-900' :
                  deal.badge === 'LIMITED' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                  'bg-gradient-to-r from-indigo-500 to-purple-600'
                } animate-pulse`}>
                  <span className="hidden sm:inline">{deal.badge}</span>
                  <span className="sm:hidden">
                    {deal.badge === 'BESTSELLER' ? 'BEST' : 
                     deal.badge === 'NEW ARRIVAL' ? 'NEW' : 
                     deal.badge === 'CULT CLASSIC' ? 'CULT' : 
                     deal.badge}
                  </span>
                </div>
              </div>

              {/* Discount Badge - Responsive */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold z-10 shadow-lg">
                {deal.discount}
              </div>

              {/* Heart Icon - Responsive */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 hover:text-pink-500 hover:fill-current transition-all cursor-pointer" />
              </div>

              {/* Product Image - Responsive */}
              <div className="text-center mb-4 sm:mb-6 pt-6 sm:pt-8">
                <div className="text-6xl sm:text-7xl lg:text-8xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                  {deal.image}
                </div>
              </div>

              {/* Product Info - Responsive */}
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-gray-800 font-bold text-lg sm:text-xl mb-2 sm:mb-3 group-hover:text-pink-600 transition-colors leading-tight px-2">
                  {deal.title}
                </h3>
                
                {/* Size and Color Info - Responsive */}
                <div className="flex justify-center gap-2 sm:gap-4 mb-2 sm:mb-3 text-xs sm:text-sm">
                  <span className="text-gray-500 font-medium">{deal.sizes}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 font-medium">{deal.colors}</span>
                </div>
                
                {/* Rating - Responsive */}
                <div className="flex justify-center items-center gap-1 mb-2 sm:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        i < Math.floor(deal.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-gray-500 text-xs sm:text-sm ml-1 sm:ml-2">({deal.rating}) • {deal.sold}</span>
                </div>

                {/* Pricing - Responsive */}
                <div className="mb-3 sm:mb-4">
                  <div className="flex justify-center items-center gap-2 sm:gap-3">
                    <span className="text-gray-400 line-through text-sm sm:text-lg font-medium">{deal.originalPrice}</span>
                    <span className="text-pink-600 font-bold text-2xl sm:text-3xl">{deal.salePrice}</span>
                  </div>
                </div>

                {/* Timer - Responsive */}
                <div className="flex justify-center items-center gap-1 mb-4 sm:mb-6">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                  <span className="text-orange-600 text-xs sm:text-sm font-semibold">{deal.timeLeft} left</span>
                </div>
              </div>

              {/* Buy Button - Responsive */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-lg"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                SHOP NOW
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section - Mobile responsive */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Style Waiting Room 👗
            </h2>
            <p className="text-pink-100 text-base sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Join thousands who&apos;ve already upgraded their wardrobe. These exclusive pieces won&apos;t last!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl">
                <div className="text-yellow-300 font-bold text-xl sm:text-2xl">2,847</div>
                <div className="text-pink-100 text-xs sm:text-sm font-medium">Pieces Sold</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl">
                <div className="text-yellow-300 font-bold text-xl sm:text-2xl">1,203</div>
                <div className="text-pink-100 text-xs sm:text-sm font-medium">Fashion Lovers</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl">
                <div className="text-yellow-300 font-bold text-xl sm:text-2xl">4.8★</div>
                <div className="text-pink-100 text-xs sm:text-sm font-medium">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Fashion Quote - Mobile responsive */}
        <div className="text-center mt-8 sm:mt-12 px-4">
          <p className="text-gray-500 text-sm sm:text-lg italic font-light">
            &quot;Fashion is about dressing according to what&apos;s fashionable. Style is more about being yourself.&quot; 
          </p>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">– Oscar de la Renta</p>
        </div>
      </div>
    </div>
  );
};

export default FlashSalesPage;