import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#1d1d32] text-white py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          {/* ABOUT US */}
          <div>
            <h3 className="font-bold mb-3">ABOUT US</h3>
            <ul className="space-y-1">
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Our Blog</li>
              <li>Forum</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* PAYMENT */}
          <div>
            <h3 className="font-bold mb-3">PAYMENT</h3>
            <ul className="space-y-1">
              <li>MoniePay</li>
              <li>Wallet</li>
              <li>Verve</li>
              <li>Mastercard</li>
              <li>Visa</li>
            </ul>
          </div>

          {/* BUYING ON SPENCER */}
          <div>
            <h3 className="font-bold mb-3">BUYING ON SPENCER</h3>
            <ul className="space-y-1">
              <li>Buyer Safety Centre</li>
              <li>FAQs</li>
              <li>Delivery</li>
              <li>Spencer Return Policy</li>
              <li>Bulk Purchase</li>
            </ul>
          </div>

          {/* MORE INFO */}
          <div>
            <h3 className="font-bold mb-3">MORE INFO</h3>
            <ul className="space-y-1">
              <li>Site Map</li>
              <li>Track My Order</li>
              <li>Privacy Policy</li>
              <li>Authentic Items Policy</li>
            </ul>
          </div>

          {/* MAKE MONEY */}
          <div>
            <h3 className="font-bold mb-3">MAKE MONEY ON SPENCER</h3>
            <ul className="space-y-1">
              <li>Become a Spencer Affiliate</li>
            </ul>

            {/* SOCIAL MEDIA */}
            <div className="text-center pt-10 pr-4">
              <h4 className="font-bold mb-2">CONNECT WITH US</h4>
              <div className="flex gap-4 justify-center">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600">
                  <FaFacebookF />
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600">
                  <FaXTwitter />
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600">
                  <FaInstagram />
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600">
                  <FaYoutube />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section Placeholder */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-10 gap-6 px-4">
          {/* Example: Add app download or copyright */}
          {/* Left: copyright */}
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Spencer Inc. All rights reserved.</p>

          {/* Right: App Store (placeholder) */}
          {/* <div className="flex gap-4">
            <Image src="/google-play.png" alt="Google Play" width={120} height={40} />
            <Image src="/app-store.png" alt="App Store" width={120} height={40} />
          </div> */}
        </div>
      </footer>

      {/* Branding Tag */}
      <div className="bg-[#35355c] py-6 text-center">
        <div className="inline-block bg-white text-black px-2 py-1 text-xs font-bold rounded transform rotate-[-10deg]">
          SW
        </div>
      </div>
    </>
  );
}
