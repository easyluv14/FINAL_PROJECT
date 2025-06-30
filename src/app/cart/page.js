'use client';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors w-full sm:w-auto"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-12 sm:py-16">
            <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6 sm:mb-8 px-4">Looks like you haven&apos;t added any items to your cart yet.</p>
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors w-full max-w-xs mx-auto sm:w-auto"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Items in your cart</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0 mx-auto sm:mx-0">
                          <Image
                            src={item.image || '/placeholder.jpg'}
                            alt={item.name}
                            className="w-32 h-32 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1 min-w-0 text-center sm:text-left">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                          {item.description && (
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                          )}
                          <p className="text-lg font-semibold text-gray-900 mb-3 sm:mb-0">${item.price.toFixed(2)}</p>
                          
                          {/* Mobile: Quantity and Remove in same row */}
                          <div className="flex items-center justify-center sm:justify-start space-x-4 sm:space-x-3 mt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2">
                              <label htmlFor={`quantity-${item.id}`} className="text-sm font-medium text-gray-700">
                                Qty:
                              </label>
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  onClick={() => updateQuantity && updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="px-3 py-2 sm:py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 touch-manipulation"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="px-4 py-2 sm:py-1 text-sm font-medium border-l border-r border-gray-300 min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity && updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-2 sm:py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 touch-manipulation"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            {/* Mobile Remove Button */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="sm:hidden text-sm text-red-600 hover:text-red-800 hover:underline flex items-center touch-manipulation"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                        
                        {/* Desktop: Item Total & Remove */}
                        <div className="hidden sm:flex flex-col items-end space-y-2 min-w-[120px]">
                          <p className="text-lg font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-red-600 hover:text-red-800 hover:underline flex items-center touch-manipulation"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </div>
                        
                        {/* Mobile: Item Total */}
                        <div className="sm:hidden text-center border-t border-gray-100 pt-3">
                          <p className="text-lg font-semibold text-gray-900">
                            Item Total: ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden lg:sticky lg:top-8">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                </div>
                
                <div className="px-4 sm:px-6 py-4 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {shipping === 0 && (
                    <p className="text-xs text-green-600">🎉 Free shipping on orders over $50!</p>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-semibold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors mb-3 touch-manipulation">
                    Proceed to Checkout
                  </button>
                  
                  <div className="text-center">
                    <Link href="/" className="text-sm text-blue-600 hover:underline touch-manipulation">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
                
                {/* Security Badge */}
                <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure checkout guaranteed
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}