"use client";
import { useEffect, useState, useRef } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Heart,
  ShoppingBag,
  Eye,
  ChevronDown,
  ChevronRight,
  X,
  Check,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from '../context/FavoritesContext';

const menNames = [
  "Casual Polo Shirt",
  "Slim Fit Jeans",
  "Leather Jacket",
  "Sports Hoodie",
  "Classic Trousers",
  "Formal Leather Shoes",
  "Cotton Shorts",
  "Graphic Tee",
  "Windbreaker",
  "Denim Jacket",
];

const womenNames = [
  "Floral Summer Dress",
  "High Waist Jeans",
  "Silk Blouse",
  "Knit Cardigan",
  "Maxi Skirt",
  "Wool Coat",
  "Crop Top",
  "Leather Handbag",
  "Platform Heels",
  "Wrap Dress",
  "Floral Summer Dress",
  "High Waist Jeans",
  "Silk Blouse",
  "Knit Cardigan",
  "Maxi Skirt",
  "Wool Coat",
  "Crop Top",
  "Leather Handbag",
  "Platform Heels",
  "Wrap Dress",
];

const childrenNames = [
  "Cartoon Hoodie",
  "Kids Denim Jacket",
  "Colorful T-Shirt",
  "Mini Sneakers",
  "Raincoat",
  "Patterned Leggings",
  "Soft Overalls",
  "Striped Sweater",
  "Canvas Shoes",
  "Playtime Shorts",
  "Cartoon Hoodie",
  "Kids Denim Jacket",
  "Colorful T-Shirt",
  "Mini Sneakers",
  "Raincoat",
  "Patterned Leggings",
  "Soft Overalls",
  "Striped Sweater",
  "Canvas Shoes",
  "Playtime Shorts",
  "Cartoon Hoodie",
  "Kids Denim Jacket",
  "Colorful T-Shirt",
  "Mini Sneakers",
  "Raincoat",
  "Patterned Leggings",
  "Soft Overalls",
  "Striped Sweater",
  "Canvas Shoes",
  "Playtime Shorts",
];

function getRandomName(category, i) {
  const index = i % 10;
  if (category === "Men") return menNames[index];
  if (category === "Women") return womenNames[index];
  return childrenNames[index];
}

function enhanceClothingItem(item, index) {
  const badges = ["Sale", "New", "Popular", "Limited", "Premium"];
  const subcategories = {
    Men: ["Clothes", "Shoes", "Accessories"],
    Women: ["Clothes", "Shoes", "Accessories"],
    Children: ["Clothes", "Shoes", "Accessories"],
  };

  let subcategory = "Clothes";
  const name = item.name.toLowerCase();
  if (
    name.includes("shoes") ||
    name.includes("sneakers") ||
    name.includes("heels")
  ) {
    subcategory = "Shoes";
  } else if (
    name.includes("handbag") ||
    name.includes("bag") ||
    name.includes("accessories")
  ) {
    subcategory = "Accessories";
  }

  let sizes = ["S", "M", "L", "XL"];
  if (item.category === "Children") {
    sizes = ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"];
  } else if (subcategory === "Shoes") {
    sizes =
      item.category === "Women"
        ? ["36", "37", "38", "39", "40", "41"]
        : ["40", "41", "42", "43", "44", "45"];
  } else if (subcategory === "Accessories") {
    sizes = ["One Size"];
  }

  const colorOptions = [
    ["Red", "Blue", "Black"],
    ["Black", "White", "Gray"],
    ["Navy", "Beige", "Brown"],
    ["Pink", "Purple", "White"],
    ["Green", "Yellow", "Orange"],
    ["Maroon", "Gold", "Silver"],
  ];

  return {
    ...item,
    price: Math.round(parseInt(item.price) / 100),
    originalPrice:
      Math.random() > 0.6
        ? Math.round((parseInt(item.price) / 100) * 1.2)
        : null,
    subcategory,
    colors: colorOptions[index % colorOptions.length],
    sizes,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    reviews: Math.floor(Math.random() * 200 + 20),
    badge: Math.random() > 0.7 ? badges[index % badges.length] : null,
    isNew: Math.random() > 0.8,
    isFavorite: false,
  };
}

const clothingItems = Array.from({ length: 100 }).map((_, i) => {
  const categoryIndex = i % 3;

  let category = "";
  let image = "";

  if (categoryIndex === 0) {
    category = "Men";
    const menImageIndex = (Math.floor(i / 3) % 30) + 1;
    image = `/clothing/men${menImageIndex}.jpg`;
  } else if (categoryIndex === 1) {
    category = "Women";
    const womenImageIndex = (Math.floor((i - 1) / 3) % 30) + 1;
    image = `/clothing/women${womenImageIndex}.jpg`;
  } else {
    category = "Children";
    const childrenImageIndex = (Math.floor((i - 2) / 3) % 30) + 1;
    image = `/clothing/children${childrenImageIndex}.jpg`;
  }

  const baseItem = {
    id: i + 1,
    name: getRandomName(category, i),
    price: (Math.random() * 5000 + 5000).toFixed(0),
    image,
    colors: ["Red", "Blue", "Black"],
    category,
  };

  return enhanceClothingItem(baseItem, i);
});

const mainCategories = ["Men", "Women", "Children"];
const subCategories = ["Clothes", "Shoes", "Accessories"];
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Customer Rating", value: "rating" },
  { label: "Newest", value: "newest" },
];

const Toast = ({ message, isVisible, type, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case "favorite":
        return {
          bg: "bg-pink-500",
          iconBg: "bg-pink-400",
          textColor: "text-pink-100",
          icon: <Heart size={16} fill="currentColor" />,
          title: "Added to Favorites!",
        };
      case "remove":
        return {
          bg: "bg-gray-500",
          iconBg: "bg-gray-400",
          textColor: "text-gray-100",
          icon: <X size={16} />,
          title: "Removed from Favorites",
        };
      default:
        return {
          bg: "bg-green-500",
          iconBg: "bg-green-400",
          textColor: "text-green-100",
          icon: <Check size={16} />,
          title: "Added to Cart!",
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`${styles.bg} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]`}
      >
        <div
          className={`flex-shrink-0 w-6 h-6 ${styles.iconBg} rounded-full flex items-center justify-center`}
        >
          {styles.icon}
        </div>
        <div className="flex-1">
          <p className="font-medium">{styles.title}</p>
          <p className={`text-sm ${styles.textColor}`}>{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${styles.textColor} hover:text-white transition-colors`}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default function AdvancedClothingStore() {
  // Get URL parameters using native URLSearchParams
  const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      category: params.get('category') || 'All',
      subcategory: params.get('subcategory') || 'All'
    };
  };

  const [selectedCategory, setSelectedCategory] = useState(() => getUrlParams().category);
  const [selectedSubcategory, setSelectedSubcategory] = useState(() => getUrlParams().subcategory);
  const [openCategory, setOpenCategory] = useState(() => {
    const category = getUrlParams().category;
    return category !== 'All' ? category : null;
  });
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [cart, setCart] = useState([]);

  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "cart",
  });

  // Update URL when category changes
  const updateURL = (category, subcategory = 'All') => {
    const params = new URLSearchParams();
    if (category !== 'All') params.set('category', category);
    if (subcategory !== 'All') params.set('subcategory', subcategory);
    
    const newURL = params.toString() ? `?${params.toString()}` : '/';
    window.history.pushState({}, '', newURL);
  };

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = getUrlParams();
      setSelectedCategory(urlParams.category);
      setSelectedSubcategory(urlParams.subcategory);
      setOpenCategory(urlParams.category !== 'All' ? urlParams.category : null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const filteredItems = clothingItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSubcategory =
      selectedSubcategory === "All" || item.subcategory === selectedSubcategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesColors =
      selectedColors.length === 0 ||
      selectedColors.some((color) => item.colors.includes(color));
    const matchesSizes =
      selectedSizes.length === 0 ||
      selectedSizes.some((size) => item.sizes.includes(size));

    return (
      matchesCategory &&
      matchesSubcategory &&
      matchesSearch &&
      matchesPrice &&
      matchesColors &&
      matchesSizes
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.isNew - a.isNew;
      default:
        return 0;
    }
  });

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setOpenCategory(openCategory === category ? null : category);
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory("All");
      setOpenCategory(category);
      updateURL(category, "All");
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    updateURL(selectedCategory, subcategory);
  };

  const handleAllCategoriesClick = () => {
    setSelectedCategory("All");
    setSelectedSubcategory("All");
    setOpenCategory(null);
    updateURL("All", "All");
  };

  const toggleFavorite = (itemId) => {
    const item = clothingItems.find((item) => item.id === itemId);
    const isCurrentlyFavorite = favorites.some(fav => fav.id === itemId);

    if (isCurrentlyFavorite) {
      removeFromFavorites(itemId);
      setToast({
        isVisible: true,
        message: `${item.name} removed from favorites`,
        type: "remove",
      });
    } else {
      addToFavorites({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        colors: item.colors,
        rating: item.rating,
        reviews: item.reviews,
      });
      setToast({
        isVisible: true,
        message: `${item.name} - €${item.price.toLocaleString()}`,
        type: "favorite",
      });
    }
  };

  const { addToCart } = useCart();
  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    setToast({
      isVisible: true,
      message: `${item.name} - €${item.price.toLocaleString()}`,
      type: "cart",
    });
  };

  const closeToast = () => {
    setToast({ isVisible: false, message: "", type: "cart" });
  };

  const allColors = [...new Set(clothingItems.flatMap((item) => item.colors))];
  const allSizes = [...new Set(clothingItems.flatMap((item) => item.sizes))];

  const FilterSidebar = () => (
    <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            Filters
          </h2>
          <button
            onClick={() => setShowFilters(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4 md:mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4 md:mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">
            Categories
          </h3>
          <div className="space-y-1 md:space-y-2 max-h-64 overflow-y-auto">
            <button
              onClick={handleAllCategoriesClick}
              className={`w-full text-left px-3 md:px-4 py-2 text-sm md:text-base rounded-lg transition-all ${
                selectedCategory === "All"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              All Categories
            </button>

            {mainCategories.map((category) => (
              <div key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full flex items-center justify-between px-3 md:px-4 py-2 text-sm md:text-base rounded-lg transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <span>{category}</span>
                  {openCategory === category ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>

                {openCategory === category && (
                  <div className="ml-2 md:ml-4 mt-1 md:mt-2 space-y-1">
                    <button
                      onClick={() => handleSubcategoryClick("All")}
                      className={`block w-full text-left px-2 md:px-3 py-1 text-xs md:text-sm rounded ${
                        selectedSubcategory === "All"
                          ? "text-blue-600 font-medium"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      All {category}
                    </button>
                    {subCategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleSubcategoryClick(sub)}
                        className={`block w-full text-left px-2 md:px-3 py-1 text-xs md:text-sm rounded ${
                          selectedSubcategory === sub
                            ? "text-blue-600 font-medium"
                            : "text-gray-600 hover:text-blue-600"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 md:mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">
            Price Range
          </h3>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="1500"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full accent-blue-600 h-2 md:h-auto"
            />
            <div className="flex justify-between text-xs md:text-sm text-gray-600">
              <span>€{priceRange[0].toLocaleString()}</span>
              <span>€{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mb-4 md:mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">
            Colors
          </h3>
          <div className="flex flex-wrap gap-1 md:gap-2 max-h-24 overflow-y-auto">
            {allColors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColors((prev) =>
                    prev.includes(color)
                      ? prev.filter((c) => c !== color)
                      : [...prev, color]
                  );
                }}
                className={`px-2 md:px-3 py-1 text-xs rounded-full border transition-all touch-manipulation ${
                  selectedColors.includes(color)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 md:mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">
            Sizes
          </h3>
          <div className="flex flex-wrap gap-1 md:gap-2 max-h-24 overflow-y-auto">
            {allSizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((s) => s !== size)
                      : [...prev, size]
                  );
                }}
                className={`px-2 md:px-3 py-1 text-xs rounded-lg border transition-all touch-manipulation ${
                  selectedSizes.includes(size)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedCategory("All");
            setSelectedSubcategory("All");
            setSelectedColors([]);
            setSelectedSizes([]);
            setPriceRange([0, 1500]);
            setSearchQuery("");
            updateURL("All", "All");
          }}
          className="w-full py-2 md:py-3 px-4 text-sm md:text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors touch-manipulation"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );

  const ProductCard = ({ item, isListView = false }) => (
    <div
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden ${
        isListView ? "flex flex-col sm:flex-row" : "flex flex-col"
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          isListView ? "w-full sm:w-48 h-48 sm:h-48" : "w-full h-48 sm:h-64"
        }`}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {item.badge && (
          <div
            className={`absolute top-2 md:top-3 left-2 md:left-3 px-2 py-1 text-xs font-semibold rounded-full ${
              item.badge === "Sale"
                ? "bg-red-500 text-white"
                : item.badge === "New"
                ? "bg-green-500 text-white"
                : item.badge === "Popular"
                ? "bg-orange-500 text-white"
                : item.badge === "Premium"
                ? "bg-purple-500 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {item.badge}
          </div>
        )}

        <div className="absolute top-2 md:top-3 right-2 md:right-3 flex flex-col gap-1 md:gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => toggleFavorite(item.id)}
            className="p-2 md:p-2 rounded-full shadow-lg transition-all touch-manipulation bg-white hover:bg-gray-50"
          >
            <Heart
              size={14}
              fill={favorites.some(fav => fav.id === item.id) ? "#ef4444" : "none"}
              className={favorites.some(fav => fav.id === item.id) ? "text-red-500" : "text-gray-600"}
            />
          </button>
          <button className="p-2 bg-white text-gray-600 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all touch-manipulation">
            <Eye size={14} />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 md:p-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleAddToCart(item)}
            className="w-full bg-white text-gray-900 py-2 px-3 md:px-4 text-sm md:text-base rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 touch-manipulation"
          >
            <ShoppingBag size={14} />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      <div className={`p-3 md:p-4 ${isListView ? "flex-1" : ""}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-sm md:text-base text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {item.name}
          </h3>
          <div className="flex items-center gap-1 text-xs md:text-sm text-gray-600 ml-2">
            <Star size={12} fill="currentColor" className="text-yellow-400" />
            <span>{item.rating}</span>
            <span className="text-gray-400 hidden sm:inline">
              ({item.reviews})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <span className="text-lg md:text-xl font-bold text-gray-900">
            €{item.price.toLocaleString()}
          </span>
          {item.originalPrice && (
            <span className="text-xs md:text-sm text-gray-500 line-through">
              €{item.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
          {item.colors.slice(0, 3).map((color) => (
            <span
              key={color}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {color}
            </span>
          ))}
          {item.colors.length > 3 && (
            <span className="text-xs text-gray-500">
              +{item.colors.length - 3}
            </span>
          )}
        </div>

        {isListView && (
          <div className="flex flex-col sm:flex-row gap-2 mt-3 md:mt-4">
            <button
              onClick={() => handleAddToCart(item)}
              className="flex-1 bg-blue-600 text-white py-2 px-3 md:px-4 text-sm md:text-base rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 touch-manipulation"
            >
              <ShoppingBag size={14} />
              Add to Cart
            </button>
            <button className="px-3 md:px-4 py-2 border border-gray-300 text-gray-700 text-sm md:text-base rounded-lg hover:bg-gray-50 transition-colors touch-manipulation">
              Details
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        type={toast.type}
        onClose={closeToast}
      />

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <nav className="text-xs md:text-sm text-gray-700 mb-2 md:mb-4 pl-0 md:pl-8 pt-2 md:pt-4">
                <ol className="list-reset flex">
                  <li>
                    <a href="/" className="text-[#4263EB] hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <span className="mx-2">›</span>
                  </li>
                  <li className="text-gray-500">Clothing</li>
                  {selectedCategory !== 'All' && (
                    <>
                      <li>
                        <span className="mx-2">›</span>
                      </li>
                      <li className="text-gray-500">{selectedCategory}</li>
                    </>
                  )}
                </ol>
              </nav>
              <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {selectedCategory !== 'All' ? `${selectedCategory} Fashion Collection` : 'Premium Fashion Collection'}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap touch-manipulation"
            >
              <Filter size={18} />
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="flex bg-white border border-gray-300 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 md:p-3 touch-manipulation ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 md:p-3 touch-manipulation ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar />
          </div>

          <div className="flex-1">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-sm md:text-base text-gray-600">
                Showing {sortedItems.length} of {clothingItems.length} products
              </p>
            </div>

            {sortedItems.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto md:w-12 md:h-12" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
                    : "space-y-3 md:space-y-4"
                }
              >
                {sortedItems.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    isListView={viewMode === "list"}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full sm:w-80 bg-white overflow-y-auto">
            <FilterSidebar />
          </div>
        </div>
      )}
    </div>
  );
}
