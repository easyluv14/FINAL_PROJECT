"use client";
import { useState, useEffect } from "react";
import { FaHeadphonesAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePerson } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { ShoppingBag } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Image from "next/image";
import LoginModal from "./loginModal";
import ChatBox from "./chatbox";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import FavoritesPage from "../src/app/favorite/page";

export default function Headers() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);

  let cartCount = 0;

  try {
    const { cartItems } = useCart();
    cartCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  } catch (error) {
    console.error("❌ useCart failed:", error);
  }

  return (
    <>
      <header className="w-full border-b text-sm sticky top-0 z-40 bg-white shadow-sm">
        {/* Top Promo Bar */}
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 text-white text-center py-2 px-4 text-xs sm:text-sm">
          <div className="flex items-center justify-center gap-2">
            
            <span>20% Off! Code: <strong>SPRING21</strong> - Terms apply*</span>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden bg-white">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <HiOutlineMenuAlt3 className="w-6 h-6 text-gray-700" />
            </button>

            {/* Mobile Logo */}
            <div className="flex-1 flex justify-center">
              <Link href="/">
                <Image
                  src="/Logo-lockup.png"
                  alt="Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Mobile Right Icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <CiSearch className="w-6 h-6 text-gray-700" />
              </button>
              <Link href="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ShoppingBag className="w-6 h-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Category Tabs */}
          <div className="flex bg-gray-50 border-t">
            <Link
              href="/clothing?category=Women"
              className="flex-1 text-center py-3 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-white transition-all border-b-2 border-transparent hover:border-blue-600"
            >
              Women
            </Link>
            <Link
              href="/clothing?category=Men"
              className="flex-1 text-center py-3 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-white transition-all border-b-2 border-transparent hover:border-blue-600"
            >
              Men
            </Link>
            <Link
              href="/clothing?category=Children"
              className="flex-1 text-center py-3 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-white transition-all border-b-2 border-transparent hover:border-blue-600"
            >
              Kids
            </Link>
            <Link
              href="/flash-sales"
              className="flex-1 text-center py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-white transition-all border-b-2 border-transparent hover:border-red-600"
            >
              <span className="relative">
                Sale
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </span>
            </Link>
          </div>
        </div>

        {/* Tablet Header */}
        <div className="hidden md:block lg:hidden bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/">
                <Image
                  src="/Logo-lockup.png"
                  alt="Logo"
                  width={140}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>

              {/* Search Bar */}
              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <CiSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setChatOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaHeadphonesAlt className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={openLogin}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <MdOutlinePerson className="w-6 h-6 text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <FaRegHeart className="w-5 h-5 text-gray-600" />
                </button>
                <Link href="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <ShoppingBag className="w-6 h-6 text-gray-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex gap-8">
                <Link
                  href="/clothing?category=Women"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  WOMEN
                </Link>
                <Link
                  href="/clothing?category=Men"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  MEN
                </Link>
                <Link
                  href="/clothing?category=Children"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  KIDS
                </Link>
              </div>
              <div className="flex gap-6 text-sm">
                <Link
                  href="/flash-sales"
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  SALE
                </Link>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  NEW IN
                </Link>
                <Link
                  href="/brands"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  BRANDS
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {/* Top Section */}
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <Link href="/">
                <Image
                  src="/Logo-lockup.png"
                  alt="Logo"
                  width={160}
                  height={40}
                  className="h-12 w-auto"
                />
              </Link>

              {/* Search Bar */}
              <div className="flex-1 max-w-xl mx-12">
                <div className="relative">
                  <CiSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="Search products, articles, faq..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 text-sm">
                  <button
                    onClick={() => setChatOpen(true)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <FaHeadphonesAlt />
                    Support
                  </button>
                  <Link
                    href="/find-store"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <FaLocationDot />
                    Find Store
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={openLogin}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <MdOutlinePerson className="w-6 h-6 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Link
              href="/favorite">
                    <FaRegHeart className="w-6 h-6 text-gray-600" />
                    </Link>
                  </button>
                  <Link href="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <ShoppingBag className="w-6 h-6 text-gray-600" />
                    {cartCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between py-3 border-t">
              <div className="flex gap-8">
                <Link
                  href="/clothing?category=Women"
                  className="relative text-gray-600 font-medium hover:text-blue-600 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                >
                  WOMEN
                </Link>
                <Link
                  href="/clothing?category=Men"
                  className="relative text-gray-600 font-medium hover:text-blue-600 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                >
                  MEN
                </Link>
                <Link
                  href="/clothing?category=Children"
                  className="relative text-gray-600 font-medium hover:text-blue-600 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                >
                  KIDS
                </Link>
              </div>
              <div className="flex gap-6 text-sm">
                <Link
                  href="/flash-sales"
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition-all shadow-lg"
                >
                  SALE
                </Link>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors px-4 py-2"
                >
                  NEW IN
                </Link>
                <Link
                  href="/clothing"
                  className="text-gray-600 hover:text-blue-600 transition-colors px-4 py-2"
                >
                  CLOTHING
                </Link>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors px-4 py-2"
                >
                  SHOES
                </Link>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors px-4 py-2"
                >
                  ACCESSORIES
                </Link>
                <Link
                  href="/brands"
                  className="text-gray-600 hover:text-blue-600 transition-colors px-4 py-2"
                >
                  BRANDS
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <RiCloseLine className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="p-4 space-y-4">
                {/* User Section */}
                <div className="pb-4 border-b">
                  <button
                    onClick={() => {
                      openLogin();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <MdOutlinePerson className="w-6 h-6 text-blue-600" />
                    <span className="text-gray-800 font-medium">Sign In / Register</span>
                  </button>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Categories</h3>
                  {[
                    { href: "/clothing?category=Women", label: "Women's Fashion" },
                    { href: "/clothing?category=Men", label: "Men's Fashion" },
                    { href: "/clothing?category=Children", label: "Kids' Fashion" },
                    { href: "/flash-sales", label: "Sale Items", special: true },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                        item.special
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="font-medium">{item.label}</span>
                      {item.special && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">HOT</span>
                      )}
                    </Link>
                  ))}
                </div>

                {/* Services */}
                <div className="space-y-2 pt-4 border-t">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Services</h3>
                  <button
                    onClick={() => {
                      setChatOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <FaHeadphonesAlt className="w-5 h-5" />
                    <span>Customer Support</span>
                  </button>
                  <Link
                    href="/find-store"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <FaLocationDot className="w-5 h-5" />
                    <span>Find a Store</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 bg-white md:hidden">
            <div className="flex items-center gap-4 p-4 border-b">
              <button
                onClick={() => setSearchOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <RiCloseLine className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 relative">
                <CiSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-500 text-center">Start typing to search...</p>
            </div>
          </div>
        )}

        {/* Modals */}
        <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
      </header>

      {/* Chatbox */}
      <ChatBox isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}