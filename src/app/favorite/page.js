'use client'
import { useState } from 'react';
import { Heart, ShoppingBag, X, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useFavorites } from '../../../context/FavoritesContext';
import { useCart } from '../../../context/CartContext';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, clearFavorites, getFavoritesCount } = useFavorites();
  const { addToCart } = useCart();
  const [notifications, setNotifications] = useState([]);

  const handleRemoveFromFavorites = (productId, productName) => {
    removeFromFavorites(productId);
    
    // Add notification
    const newNotification = {
      id: Date.now(),
      message: `${productName} removed from favorites`,
      type: 'info'
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== newNotification.id));
    }, 3000);
  };

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
      type: 'success'
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== newNotification.id));
    }, 3000);
  };

  const handleClearAllFavorites = () => {
    if (favorites.length > 0) {
      clearFavorites();
      
      const newNotification = {
        id: Date.now(),
        message: 'All favorites cleared',
        type: 'info'
      };
      
      setNotifications(prev => [...prev, newNotification]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(notif => notif.id !== newNotification.id));
      }, 3000);
    }
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
      {/* Notification Container - Enhanced Mobile Responsiveness */}
      <div className="fixed top-2 right-2 left-2 sm:top-4 sm:right-4 sm:left-auto z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`${
              notification.type === 'success' ? 'bg-green-500' : 
              notification.type === 'info' ? 'bg-blue-500' : 'bg-gray-500'
            } text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-lg flex items-center gap-2 sm:gap-3 w-full sm:min-w-[280px] sm:w-auto animate-slide-in`}
          >
            <Heart size={18} className="flex-shrink-0 sm:w-5 sm:h-5" />
            <span className="flex-1 text-xs sm:text-sm font-medium leading-tight">{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-white hover:text-gray-200 transition-colors p-1"
            >
              <X size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8 lg:py-10 px-2 sm:px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header - Enhanced Mobile Layout */}
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
                <Heart className="text-red-500 fill-current w-6 h-6 sm:w-8 sm:h-8" />
                <span className="leading-tight">My Favorites</span>
              </h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                {getFavoritesCount()} {getFavoritesCount() === 1 ? 'item' : 'items'} in your favorites
              </p>
            </div>
            
            {favorites.length > 0 && (
              <button
                onClick={handleClearAllFavorites}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2.5 sm:py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-sm sm:text-base font-medium"
              >
                <Trash2 size={16} />
                Clear All
              </button>
            )}
          </div>

          {/* Favorites Content */}
          {favorites.length === 0 ? (
            <div className="text-center py-12 sm:py-16 px-4">
              <Heart size={48} className="mx-auto text-gray-300 mb-4 sm:w-16 sm:h-16" />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No favorites yet</h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
                Start adding items to your favorites to see them here.
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 text-sm sm:text-base font-medium">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
              {favorites.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
                >
                  {/* Product Image Container */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Sale Badge */}
                    {product.originalPrice && (
                      <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded z-10">
                        SALE
                      </div>
                    )}
                    
                    {/* Remove from Favorites Button */}
                    <button
                      onClick={() => handleRemoveFromFavorites(product.id, product.name)}
                      className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-white text-red-500 p-1.5 sm:p-2 rounded-full shadow-md hover:bg-red-50 active:bg-red-100 transition-colors duration-200 z-10"
                    >
                      <X size={14} className="sm:w-4 sm:h-4" />
                    </button>
                    
                    {/* Add to Cart Button - Mobile: Always visible, Desktop: Hover */}
                    <div className="absolute bottom-0 left-0 right-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="w-[90%] mx-auto block mb-1 sm:mb-2 bg-white text-gray-900 py-1.5 sm:py-2 font-medium text-xs sm:text-sm hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2 shadow-lg rounded-md sm:rounded-lg"
                      >
                        <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
                        <span className="hidden xs:inline sm:inline">Add to Cart</span>
                        <span className="xs:hidden sm:hidden">Add</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-2 sm:p-3 md:p-4">
                    {/* Badges */}
                    {(product.isNew || product.isSpecial) && (
                      <div className="flex items-center gap-1 sm:gap-2 text-xs mb-1 sm:mb-2 flex-wrap">
                        {product.isNew && (
                          <span className="bg-green-100 text-green-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs">NEW</span>
                        )}
                        {product.isSpecial && (
                          <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs">SPECIAL</span>
                        )}
                      </div>
                    )}
                    
                    {/* Product Name & Brand */}
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight mb-0.5 sm:mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs mb-2 sm:mb-3 truncate">{product.brand}</p>
                    
                    {/* Price */}
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <span className="text-sm sm:text-base font-bold text-gray-900">{product.price}€</span>
                      {product.originalPrice && (
                        <span className="text-xs sm:text-sm text-gray-500 line-through">{product.originalPrice}€</span>
                      )}
                    </div>
                    
                    {/* Rating */}
                    {product.reviews > 0 && (
                      <div className="text-xs flex items-center">
                        <div className="flex">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-gray-500 ml-1 truncate">({product.reviews})</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (max-width: 640px) {
          .xs\\:hidden {
            display: none;
          }
          .xs\\:inline {
            display: inline;
          }
        }
      `}</style>
    </>
  );
}