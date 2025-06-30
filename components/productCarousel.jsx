"use client";
import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Eye,
  Star,
  Heart,
  ShoppingBag,
  X,
  Check,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import FavoritesPage from "../src/app/favorite/page";

// Toast Notification Component
const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.isVisible, onClose]);

  if (!toast.isVisible) return null;

  const getToastStyle = () => {
    switch (toast.type) {
      case "cart":
        return "bg-green-500 text-white";
      case "favorite":
        return "bg-pink-500 text-white";
      case "favorite-remove":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-800 text-white";
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case "cart":
        return <ShoppingBag size={16} />;
      case "favorite":
        return <Heart size={16} className="fill-current" />;
      case "favorite-remove":
        return <Heart size={16} />;
      default:
        return <Check size={16} />;
    }
  };

  return (
    <div className="fixed top-4 right-2 sm:right-4 z-50 animate-slide-in">
      <div
        className={`${getToastStyle()} px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg flex items-center gap-2 sm:gap-3 min-w-72 sm:min-w-80 max-w-80 sm:max-w-96`}
      >
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1">
          <p className="font-medium text-xs sm:text-sm">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
        >
          <X size={12} className="sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onToast }) => {
  const { addToCart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } =
    useFavorites();

  // Check if product is already in favorites
  const isLiked = isFavorite(product.id);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace(" €", "")), // Converts "74.95 €" to 74.95
      image: product.image,
      quantity: 1,
    };
    addToCart(cartItem);
    onToast({
      isVisible: true,
      message: `${product.name} added to cart - ${product.price}`,
      type: "cart",
    });
  };

  const handleToggleFavorite = () => {
    // Create favorite item with all necessary product details
    const favoriteItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      reviews: product.reviews,
      image: product.image,
      isOnSale: product.isOnSale,
    };

    if (isLiked) {
      // Remove from favorites
      removeFromFavorites(product.id);
      onToast({
        isVisible: true,
        message: `${product.name} removed from favorites`,
        type: "favorite-remove",
      });
    } else {
      // Add to favorites
      addToFavorites(favoriteItem);
      onToast({
        isVisible: true,
        message: `${product.name} added to favorites`,
        type: "favorite",
      });
    }
  };

  return (
    <div className="group relative flex-shrink-0 w-40 sm:w-48 md:w-52 bg-white overflow-hidden hover:shadow-lg transition-all duration-300 rounded-lg sm:rounded-none">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTA1LjUyMyA3MCAxMTAgNzQuNDc3IDExMCA4MEMxMTAgODUuNTIzIDEwNS41MjMgOTAgMTAwIDkwQzk0LjQ3NyA5MCA5MCA4NS41MjMgOTAgODBDOTAgNzQuNDc3IDk0LjQ3NyA3MCAxMDAgNzBaIiBmaWxsPSIjOUI5Qjk2Ii8+CjxwYXRoIGQ9Ik02MCA5MEg2MEM2NS41MjMgOTAgNzAgOTQuNDc3IDcwIDEwMFYxMjBDNzAgMTI1LjUyMyA3NC40NzcgMTMwIDgwIDEzMEgxMjBDMTI1LjUyMyAxMzAgMTMwIDEyNS41MjMgMTMwIDEyMFYxMDBDMTMwIDk0LjQ3NyAxMzQuNDc3IDkwIDE0MCA5MEgxNDAiIHN0cm9rZT0iIzlCOUI5NiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+";
          }}
        />
        {product.isOnSale && (
          <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-red-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs">
            SALE
          </div>
        )}

        {/* Top Right Buttons - Favorite and View Details (visible on mobile, hover on desktop) */}
        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex flex-col gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleToggleFavorite}
            className="bg-white p-1.5 sm:p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-200 flex items-center justify-center"
          >
            <Heart
              size={14}
              className={`sm:w-4 sm:h-4 transition-all duration-200 ${
                isLiked
                  ? "fill-red-500 text-red-500"
                  : "text-gray-900 hover:text-red-400"
              }`}
            />
          </button>
          <button className="bg-white text-gray-900 p-1.5 sm:p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center">
            <Eye size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Bottom Add to Cart Button - Full Width (visible on mobile, hover on desktop) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-2 sm:p-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-white text-gray-900 px-2 sm:px-4 py-2 sm:py-3 rounded-md font-medium text-xs sm:text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2"
            >
              <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Add to Cart</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-2 sm:p-3 md:p-4">
        <h3 className="font-medium text-gray-900 text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1 sm:mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={`sm:w-3 sm:h-3 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-gray-500">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="font-bold text-gray-900 text-sm sm:text-base">
            {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              {product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductCarousel = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "cart",
  });

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
      isOnSale: true,
    },
    {
      id: 2,
      name: "Women ligerie",
      price: "74.95 €",
      originalPrice: "89.99 €",
      rating: 4.8,
      reviews: 156,
      image: "/clothing/women15.jpg",
      isOnSale: true,
    },
    {
      id: 3,
      name: "Nike Dunk Low Retro",
      price: "74.95 €",
      originalPrice: "89.99 €",
      rating: 4.3,
      reviews: 89,
      image: "/sneaker3.jpg",
      isOnSale: true,
    },
    {
      id: 4,
      name: "Men baggie shirt",
      price: "74.95 €",
      originalPrice: "89.99 €",
      rating: 4.6,
      reviews: 312,
      image: "/clothing/men13.jpg",
      isOnSale: false,
    },
    {
      id: 5,
      name: "Vans Old Skool",
      price: "74.95 €",
      originalPrice: "89.99 €",
      rating: 4.4,
      reviews: 178,
      image: "/sneaker5.jpg",
      isOnSale: false,
    },
    {
      id: 6,
      name: "Kid full outfit",
      price: "74.95 €",
      originalPrice: "89.99 €",
      rating: 4.7,
      reviews: 203,
      image: "/clothing/children15.jpg",
      isOnSale: true,
    },
    {
      id: 7,
      name: "Brown Leather bag",
      price: "74.95 €",
      originalPrice: "89.99 €",
      rating: 4.2,
      reviews: 145,
      image: "clothing/women18.jpg",
      isOnSale: false,
    },
    {
      id: 8,
      name: "Reebok Classic Leather",
      price: "74.95 €",
      originalPrice: "89.99 €",
      rating: 4.5,
      reviews: 267,
      image: "/sneaker8.jpg",
      isOnSale: false,
    },
  ];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Responsive scroll amounts based on screen size
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

    let scrollAmount;
    if (isMobile) {
      scrollAmount = 168; // Mobile card width (160px) + gap (8px)
    } else if (isTablet) {
      scrollAmount = 208; // Tablet card width (192px) + gap (16px)
    } else {
      scrollAmount = 220; // Desktop card width (208px) + gap (16px)
    }

    const newScrollLeft =
      container.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });

    // Update navigation button states
    setTimeout(() => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }, 300);
  };

  const handleToast = (toastData) => {
    setToast(toastData);
  };

  const closeToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  // Update scroll buttons state on mount and resize
  useEffect(() => {
    const updateScrollButtons = () => {
      const container = scrollContainerRef.current;
      if (container) {
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }
    };

    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
      {/* Toast Notification */}
      <Toast toast={toast} onClose={closeToast} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          TRENDING NOW
        </h2>
      </div>

      {/* Products Carousel */}
      <div className="relative">
        {/* Left Navigation Button - Hidden on mobile */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 -ml-4 rounded-md border transition-all duration-200 bg-white shadow-md ${
            canScrollLeft
              ? "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              : "border-gray-200 text-gray-300 cursor-not-allowed"
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Navigation Button - Hidden on mobile */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 -mr-4 rounded-md border transition-all duration-200 bg-white shadow-md ${
            canScrollRight
              ? "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              : "border-gray-200 text-gray-300 cursor-not-allowed"
          }`}
        >
          <ChevronRight size={20} />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth sm:mx-8"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToast={handleToast}
            />
          ))}
        </div>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="flex justify-center mt-4 sm:hidden">
        <div className="flex gap-2">
          {Array.from({ length: Math.ceil(products.length / 2) }).map(
            (_, index) => (
              <div key={index} className="w-2 h-2 rounded-full bg-gray-300" />
            )
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
      `}</style>
    </div>
  );
};

export default ProductCarousel;
