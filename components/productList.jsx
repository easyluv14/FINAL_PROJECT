'use client'
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, ShoppingBag, Eye, Star, Heart, X, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import FavoritesPage from "../src/app/favorite/page";

export default function ProductList() {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [notifications, setNotifications] = useState([]);

  // Sample product data - you can replace this with your actual data
  const products = [
    {
      id: 1,
      image: "/clothing/women11.jpg",
      name: "Bum short",
      brand: "addidas",
      price: 74.95,
      originalPrice: 120.00,
      rating: 5,
      reviews: 0,
      isNew: true,
      isSpecial: true
    },
    {
      id: 2,
      image: "/sneaker8.jpg",
      name: "Female Sneaker",
      brand: "Nike",
      price: 74.95,
      originalPrice: null,
      rating: 5,
      reviews: 423,
      isNew: false,
      isSpecial: false
    },
    {
      id: 3,
      image: "/clothing/women20.jpg",
      name: "Crop Top",
      brand: "FILA",
      price: 74.95,
      originalPrice: 120.00,
      rating: 4,
      reviews: 65,
      isNew: false,
      isSpecial: false
    },
    {
      id: 4,
      image: "/sneaker4.jpg",
      name: "Top Boy Sneakers",
      brand: "Top Boy",
      price: 74.95,
      originalPrice: 120.00,
      rating: 5,
      reviews: 412,
      isNew: false,
      isSpecial: false
    },
    {
      id: 5,
      image: "/clothing/women8.jpg",
      name: "Black Leather Bag",
      brand: "Amiri",
      price: 74.95,
      originalPrice: 120.00,
      rating: 0,
      reviews: 0,
      isNew: true,
      isSpecial: true
    },
    {
      id: 6,
      image: "/clothing/men7.jpg",
      name: "Top Boy Outfit",
      brand: "Top Boy",
      price: 74.95,
      originalPrice: 120.00,
      rating: 0,
      reviews: 0,
      isNew: true,
      isSpecial: true
    }
  ];

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand
    });
    
    // Add notification
    const newNotification = {
      id: Date.now(),
      message: `${product.name} added to cart`,
      type: 'cart' // Changed to 'cart' type for green color
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== newNotification.id));
    }, 3000);
  };

  const handleViewDetails = (product) => {
    // Add your view details logic here
    console.log('View details for:', product.name);
  };

  const handleToggleFavorite = (product) => {
    const productIsFavorite = isFavorite(product.id);
    
    if (productIsFavorite) {
      removeFromFavorites(product.id);
      // Add notification for removal
      const newNotification = {
        id: Date.now(),
        message: `${product.name} removed from favorites`,
        type: 'info'
      };
      setNotifications(prev => [...prev, newNotification]);
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        brand: product.brand,
        rating: product.rating,
        reviews: product.reviews,
        isNew: product.isNew,
        isSpecial: product.isSpecial
      });
      // Add notification for addition
      const newNotification = {
        id: Date.now(),
        message: `${product.name} added to favorites`,
        type: 'favorite' // Changed to 'favorite' type for pink color
      };
      setNotifications(prev => [...prev, newNotification]);
    }
    
    // Auto remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id >= Date.now() - 100));
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <>
      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`${
              notification.type === 'cart' ? 'bg-green-500' : 
              notification.type === 'favorite' ? 'bg-pink-500' : 
              notification.type === 'info' ? 'bg-gray-500' : 'bg-gray-500'
            } text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[280px] animate-slide-in`}
          >
            <CheckCircle size={20} className="flex-shrink-0" />
            <span className="flex-1 text-sm font-medium">{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <section className="bg-white py-6 sm:py-8 lg:py-10 px-3 sm:px-4 lg:px-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">NEW IN... BONAZA</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
        {products.map((product) => (
          <div 
            key={product.id}
            className="bg-white overflow-hidden relative group  shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Product Image Container */}
            <div className="relative aspect-square bg-gray-100  overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Sale Badge */}
              {product.originalPrice && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                  SALE
                </div>
              )}
              
              {/* Top Right Buttons - Always visible on mobile/tablet, hover on desktop */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10">
                
                <button 
                  onClick={() => handleToggleFavorite(product)}
                  className={`bg-white p-1.5 sm:p-2 rounded-full shadow-md transition-colors duration-200 flex items-center justify-center ${
                    isFavorite(product.id) 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-gray-800 hover:text-red-500'
                  }`}
                >
                  <Heart 
                    size={14} 
                    className={`sm:w-4 sm:h-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} 
                  />
                </button>
                <button 
                  onClick={() => handleViewDetails(product)}
                  className="bg-white text-gray-800 p-1.5 sm:p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                >
                  <Eye size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
              
              {/* Bottom Add to Cart Button - Always visible on mobile/tablet, hover on desktop */}
              <div className="absolute bottom-0 left-0 right-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-[80%] rounded-lg ml-4 mb-2 bg-white text-gray-900 py-2 sm:py-3 font-medium text-xs sm:text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag size={12} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-2 sm:p-3 lg:p-4">
              {/* Badges */}
              {(product.isNew || product.isSpecial) && (
                <div className="flex items-center gap-1 sm:gap-2 text-xs mb-2 flex-wrap">
                  {product.isNew && (
                    <span className="bg-green-100 text-green-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">NEW</span>
                  )}
                  {product.isSpecial && (
                    <span className="bg-orange-100 text-orange-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">SPECIAL</span>
                  )}
                </div>
              )}
              
              {/* Product Name & Brand */}
              <h3 className="text-xs sm:text-sm text-gray-700 font-semibold leading-tight line-clamp-2">{product.name}</h3>
              <p className="text-gray-500 text-xs mt-1">{product.brand}</p>
              
              {/* Price */}
              <div className="mt-2 sm:mt-3 flex justify-between items-center">
                <span className="text-sm sm:text-base font-bold text-gray-800">{product.price}€</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-500 line-through">{product.originalPrice}€</span>
                )}
              </div>
              
              {/* Rating */}
              {product.reviews > 0 && (
                <div className="text-xs mt-2 flex items-center">
                  <div className="flex">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-gray-500 ml-1">({product.reviews})</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
    
    <style jsx>{`
      @keyframes slide-in {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      .animate-slide-in {
        animation: slide-in 0.3s ease-out;
      }
    `}</style>
    </>
  );
}