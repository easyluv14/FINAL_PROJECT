'use client'
import React, { useState, useEffect } from 'react';
import { Heart, Star, ShoppingCart, Eye, X , ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import FavoritesPage from "../src/app/favorite/page";

const ProductShowcase = () => {
  const [notifications, setNotifications] = useState([]);
  
  // Use the cart context
  const { addToCart, cartItems } = useCart();
  
  // Use the favorites context
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const products = [
    {
      id: 1,
      image: '/sneaker2.jpg',
      name: 'AirForce Nike Sneaker',
      subtitle: 'Air Jordan',
      price: '74.95',
      originalPrice: '99.95',
      rating: 4.5,
      reviews: 127,
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
      isNew: true,
      hasDiscount: true
    },
    {
      id: 2,
      image: '/clothing/women7.jpg',
      name: 'Gym Pants',
      subtitle: 'For women',
      price: '74.95',
      originalPrice: null,
      rating: 4.8,
      reviews: 89,
      colors: ['#E8E8E8', '#C8C8C8', '#A8A8A8'],
      isNew: false,
      hasDiscount: false,
     
    },
    {
      id: 3,
      image: '/clothing/men9.jpg',
      name: 'chewingGum Boxer',
      subtitle: 'For men',
      price: '74.95',
      originalPrice: '89.95',
      rating: 4.6,
      reviews: 203,
      colors: ['#2C3E50', '#34495E', '#7F8C8D'],
      isNew: false,
      hasDiscount: true
    },
    {
      id: 4,
      image: '/sneaker3.jpg',
      name: 'Dunk Sneakers',
      subtitle: 'Nike',
      price: '74.95',
      originalPrice: null,
      rating: 4.7,
      reviews: 156,
      colors: ['#F8F8F8', '#E0E0E0', '#D0D0D0', '#C0C0C0'],
      isNew: false,
      hasDiscount: false
    }
  ];

  const showNotification = (message, type = 'success') => {
    const id = Date.now();
    const notification = { id, message, type };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleAddToCart = (product) => {
    // Create cart item object with all necessary properties
    const cartItem = {
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: parseFloat(product.price),
      originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : null,
      image: product.image,
      colors: product.colors,
      quantity: 1 // Default quantity
    };

    try {
      // Add to cart using the context function
      addToCart(cartItem);
      
      // Show success notification for cart
      showNotification(`${product.name} added to cart!`, 'cart');
      
      console.log('Added to cart:', cartItem);
    } catch (error) {
      console.error('Error adding to cart:', error);
      showNotification('Failed to add item to cart', 'error');
    }
  };

  const handleViewDetails = (product) => {
    console.log('View details for:', product.name);
  };

  const handleToggleFavorite = (product) => {
    const isCurrentlyFavorite = isFavorite(product.id);
    
    try {
      if (isCurrentlyFavorite) {
        // Remove from favorites
        removeFromFavorites(product.id);
        showNotification(`${product.name} removed from favorites`, 'remove');
      } else {
        // Create favorite item object with all necessary properties
        const favoriteItem = {
          id: product.id,
          name: product.name,
          subtitle: product.subtitle,
          price: parseFloat(product.price),
          originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : null,
          image: product.image,
          colors: product.colors,
          rating: product.rating,
          reviews: product.reviews,
          isNew: product.isNew,
          hasDiscount: product.hasDiscount
        };
        
        // Add to favorites
        addToFavorites(favoriteItem);
        showNotification(`${product.name} added to favorites!`, 'favorite');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      showNotification('Failed to update favorites', 'error');
    }
  };

  // Get cart item count for a specific product (optional - to show if item is in cart)
  const getProductCartQuantity = (productId) => {
    const cartItem = cartItems?.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-3 w-3 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-3 w-3 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-gray-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8 relative" style={{minHeight: '35rem'}}>
      {/* Notification Container - Responsive positioning */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 space-y-2 max-w-xs sm:max-w-sm">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 transform translate-x-0 ${
              notification.type === 'cart' 
                ? 'bg-green-500/90 text-white' 
                : notification.type === 'favorite'
                ? 'bg-pink-500/90 text-white'
                : notification.type === 'remove'
                ? 'bg-gray-500/90 text-white'
                : notification.type === 'error'
                ? 'bg-red-500/90 text-white'
                : 'bg-gray-500 text-white'
            } animate-slide-in`}
          >
            <Heart 
              className={`h-4 w-4 sm:h-5 sm:w-5 ${
                notification.type === 'cart' || notification.type === 'favorite' || notification.type === 'remove' ? 'fill-white' : ''
              }`} 
            />
            <span className="text-xs sm:text-sm font-medium flex-1 leading-tight">{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-1 sm:ml-2 hover:bg-black/20 rounded-full p-1 transition-colors"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header - Responsive typography */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 text-center sm:text-left">
            SPRING/SUMMER 2025
          </h1>
        </div>

        {/* Product Grid - Improved responsiveness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
          {products.map((product) => {
            const cartQuantity = getProductCartQuantity(product.id);
            const isProductFavorite = isFavorite(product.id);
            
            return (
              <div key={product.id} className={`bg-white  shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group ${
                // Responsive column spanning
                product.id === 1 || product.id === 4 
                  ? 'sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-2' 
                  : 'sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1'
              }`}>
                {/* Product Image Container - Responsive heights */}
                <div className="relative bg-gray-100 h-40 sm:h-48 md:h-52 lg:h-48 xl:h-52 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges - Responsive positioning and sizing */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded font-medium">
                        NEW
                      </span>
                    )}
                    {product.badge && (
                      <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded font-medium">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Top Right Buttons - Better mobile interaction */}
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <button 
                        onClick={() => handleToggleFavorite(product)}
                        className="bg-white/90 backdrop-blur-sm text-gray-900 p-2 rounded-full hover:bg-white transition-colors duration-200 shadow-md active:scale-95"
                      >
                        <Heart 
                          size={14} 
                          className={`sm:w-4 sm:h-4 transition-all duration-200 ${
                            isProductFavorite 
                              ? 'text-red-500 fill-red-500 scale-110' 
                              : 'text-gray-900'
                          }`} 
                        />
                      </button>
                      <button 
                        onClick={() => handleViewDetails(product)}
                        className="bg-white/90 backdrop-blur-sm text-gray-900 p-2 rounded-full hover:bg-white transition-colors duration-200 shadow-md active:scale-95"
                      >
                        <Eye size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Add to Cart Button - Always visible on mobile */}
                  <div className="absolute bottom-0 left-0 right-0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2 sm:p-3">
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-white/95 backdrop-blur-sm text-gray-900 px-3 sm:px-4 py-2 sm:py-3 rounded-md font-medium text-xs sm:text-sm hover:bg-white transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-95"
                      >
                        <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
                        <span className="hidden xs:inline">Add to Cart</span>
                        <span className="xs:hidden">Add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info - Responsive padding and typography */}
                <div className="p-3 sm:p-4">
                  {/* Product Name - Responsive text sizing */}
                  <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                    {product.subtitle}
                  </p>

                  {/* Color Options - Responsive sizing */}
                  <div className="flex gap-1 mb-2 sm:mb-3">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-300 hover:scale-110 transition-transform cursor-pointer"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Price - Responsive layout */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                      €{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        €{product.originalPrice}
                      </span>
                    )}
                    {product.hasDiscount && (
                      <span className="text-xs text-red-600 font-medium bg-red-50 px-1 py-0.5 rounded">
                        -15%
                      </span>
                    )}
                  </div>

                  {/* Rating - Responsive layout */}
                  <div className="flex items-center gap-1 flex-wrap">
                    <div className="flex items-center gap-0.5">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
        
        /* Custom breakpoint for extra small screens */
        @media (min-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
          .xs\\:hidden {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductShowcase;