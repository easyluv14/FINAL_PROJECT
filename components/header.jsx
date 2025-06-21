"use client";
import { useState } from "react";
import { FaHeadphonesAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlinePerson } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
// import { MdOutlineShoppingBag } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import LoginModal from "./loginModal";
import ChatBox from "./chatbox";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Headers() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);

   let cartCount = 0; // ✅ declare cartCount at the top

  try {
    const { cartItems } = useCart(); // ✅ safely call useCart
    cartCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  } catch (error) {
    console.error("❌ useCart failed:", error);
  }

  return (
    <>
      <header className="w-full border-b text-sm">
        {/* Top Bar */}
        <div className="bg-[#1b1833] text-white text-center py-1 text-xs sm:text-sm">
          20% Off! Code: <strong>SPRING21</strong> - Terms apply*
        </div>

        {/* Main Navigation */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto w-full px-4 flex justify-between items-center py-4 flex-wrap sm:flex-nowrap">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/Logo-lockup.png"
                alt="Logo"
                width={100}
                height={100}
                className="logo w-25 h-10"
              />
            </div>

            {/* Support and Location - Centered */}
            <div className="hidden sm:flex items-center gap-6 text-xs mx-auto">
              <div className="flex items-center gap-1">
                <FaHeadphonesAlt />
                <button
                  className="hover:text-blue-900"
                  onClick={() => setChatOpen(true)}
                >
                  Support
                </button>
              </div>
              <div className="flex items-center gap-1">
                <FaLocationDot />
                <Link
                  href="/find-store"
                  className="text-sm px-4 py-2 rounded hover:text-blue-900"
                >
                  Find a Store
                </Link>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4 text-lg mt-3 sm:mt-0">
              <FaRegHeart className="cursor-pointer hidden sm:block" />
              <MdOutlinePerson className="cursor-pointer" onClick={openLogin} />
              <span>
                {" "}
                <Link href="/cart" className="text-sm">
                  🛒 Cart ({cartCount})
                </Link>
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Menu and Search */}
        <div className="bg-white px-4 md:hidden flex justify-between items-center pb-3">
          {/* Hamburger Menu */}
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Search Bar */}
          <div className="relative w-4/5">
            <CiSearch className="absolute top-2.5 left-3 text-xl text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 py-2 text-sm border rounded"
            />
          </div>
        </div>

        {/* Mobile Dropdown Menu - Updated */}
        {isMobileMenuOpen && (
          <div className="fixed top-0 left-0 h-full w-4/5 bg-white z-50 p-6 text-base space-y-6 shadow-md">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
            >
              ×
            </button>
            <Link
              href="/clothing?category=Women"
              className="block text-gray-800 hover:text-blue-900"
            >
              Women
            </Link>
            <Link
              href="/clothing?category=Men"
              className="block text-gray-800 hover:text-blue-900"
            >
              Men
            </Link>
            <Link
              href="/clothing?category=Children"
              className="block text-gray-800 hover:text-blue-900"
            >
              Kids
            </Link>
            <span className="block text-gray-800 hover:text-blue-900">
              Sales
            </span>
            <hr />
            <span className="block" onClick={openLogin}>
              Account
            </span>
            <button
              className="block text-left"
              onClick={() => setChatOpen(true)}
            >
              Help
            </button>
            <Link href="/newsletter" className="block">
              Newsletter
            </Link>
          </div>
        )}

        {/* Desktop/Tablet Category Links */}
        <div className="bg-white hidden md:block">
          <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between">
            <div className="flex gap-6 text-sm py-2 font-medium">
              <span className="text-gray-600 hover:text-black cursor-pointer">
                <Link href="/clothing?category=Women">
                  <button>WOMEN</button>
                </Link>
              </span>
              <span className="text-gray-600 hover:scale-130 transition-transform duration-300 text-black cursor-pointer">
                <Link href="/clothing?category=Men">
                  <button>MEN</button>
                </Link>
              </span>
              <span className="text-gray-600 hover:text-black cursor-pointer">
                <Link href="/clothing?category=Children">
                  <button>KIDS</button>
                </Link>
              </span>
            </div>
          </div>
        </div>

        {/* Desktop/Tablet Bottom Nav + Search */}
        <div className="bg-white hidden md:block">
          <div className="max-w-7xl mx-auto w-full px-4 flex justify-between items-center">
            {/* Sub Nav */}
            <div className="flex gap-4 text-xs pb-3 text-gray-600">
              <span className="hover:text-black cursor-pointer">SALE</span>
              <span className="hover:text-black cursor-pointer">NEW IN</span>
              <Link href="/clothing">
                <span className="hover:text-black cursor-pointer">
                  CLOTHING
                </span>
              </Link>
              <span className="hover:text-black cursor-pointer">SHOES</span>
              <span className="hover:text-black cursor-pointer">
                ACCESSORIES
              </span>
              <Link href="/brands">
                <span className="hover:text-black cursor-pointer">BRANDS</span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative pb-4 w-74">
              <CiSearch className="absolute pt-3 pl-2 text-[25px] text-gray-500" />
              <input
                type="text"
                placeholder="Search products, articles, faq, ..."
                className="pl-9 rounded border border-gray-300 px-3 py-2 w-full text-sm"
              />
            </div>
          </div>
        </div>

        {/* Modals */}
        <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
      </header>

      {/* Chatbox */}
      <ChatBox isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
