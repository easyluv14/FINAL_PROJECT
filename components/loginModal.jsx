'use client'
import React, { useState } from "react";
import { Eye, EyeOff, X, Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    code: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  if (!isOpen) return null;

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    return hasMinLength && hasLetters && hasNumbers;
  };

  const validateUsername = (username) => {
    return username.length >= 6;
  };

  const getFieldError = (field, value) => {
    switch (field) {
      case 'email':
        if (!value) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (!validatePassword(value)) return 'Password must be at least 8 characters and contain both letters and numbers';
        return '';
      case 'username':
        if (!value) return 'Username is required';
        if (!validateUsername(value)) return 'Username must be at least 6 characters';
        return '';
      case 'confirmPassword':
        if (mode === 'signup') {
          if (!value) return 'Please confirm your password';
          if (value !== formData.password) return 'Passwords do not match';
        }
        return '';
      case 'code':
        if (mode === 'signup' && !value) return 'Verification code is required';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = getFieldError(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    const fieldsToValidate = mode === 'login' 
      ? ['username', 'password'] 
      : ['username', 'email', 'password', 'confirmPassword', 'code'];

    fieldsToValidate.forEach(field => {
      const error = getFieldError(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    setTouched(fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle successful form submission
    }
  };

  const getInputClassName = (field) => {
    const baseClass = "w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all text-sm sm:text-base";
    const errorClass = touched[field] && errors[field] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500";
    return `${baseClass} ${errorClass}`;
  };

  const getPasswordInputClassName = (field) => {
    const baseClass = "w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all text-sm sm:text-base";
    const errorClass = touched[field] && errors[field] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500";
    return `${baseClass} ${errorClass}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-in fade-in duration-200 p-4 sm:p-0">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
          <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 pr-12">
            {mode === "login" ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm pr-12">
            {mode === "login" 
              ? "Sign in to your account to continue" 
              : "Join us and start your journey today"}
          </p>
        </div>

        <div className="p-4 sm:p-6">
          {/* Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4 sm:mb-6">
            <button
              className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
                mode === "login"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setMode("login")}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
                mode === "signup"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {/* Login Form */}
            {mode === "login" && (
              <>
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Username or Email"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      onBlur={() => handleBlur('username')}
                      className={getInputClassName('username')}
                    />
                  </div>
                  {touched.username && errors.username && (
                    <div className="mt-1 flex items-center text-red-500 text-xs">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.username}
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      className={getPasswordInputClassName('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {touched.password && errors.password && (
                    <div className="mt-1 flex items-center text-red-500 text-xs">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.password}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm gap-2 sm:gap-0">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="ml-2 text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Forgot password?
                  </a>
                </div>
              </>
            )}

            {/* Sign Up Form */}
            {mode === "signup" && (
              <>
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      onBlur={() => handleBlur('username')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {touched.username && errors.username && (
                    <div className="mt-1 flex items-center text-red-500 text-xs">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.username}
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {touched.email && errors.email && (
                    <div className="mt-1 flex items-center text-red-500 text-xs">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>
                
                <div>
                  <input
                    type="text"
                    placeholder="Verification Code"
                    value={formData.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    onBlur={() => handleBlur('code')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                  {touched.code && errors.code && (
                    <div className="mt-1 flex items-center text-red-500 text-xs">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.code}
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {touched.password && errors.password && (
                    <div className="mt-1 flex items-center text-red-500 text-xs">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.password}
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      onBlur={() => handleBlur('confirmPassword')}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="mt-1 flex items-center text-red-500 text-xs">
                      <AlertCircle size={12} className="mr-1" />
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 sm:py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 group text-sm sm:text-base"
            >
              {mode === "login" ? "Sign In" : "Create Account"}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Social Login */}
          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or {mode === "login" ? "sign in" : "sign up"} with
                </span>
              </div>
            </div>
            
            <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3">
              <button className="flex items-center justify-center px-2 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center px-2 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="#7B68EE" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Yahoo
              </button>
            </div>
          </div>

          {/* Terms for Sign Up */}
          {mode === "signup" && (
            <p className="mt-3 sm:mt-4 text-xs text-gray-600 text-center px-2">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}