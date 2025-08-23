import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { FiX, FiMail, FiLock, FiUser } from "react-icons/fi";

const AuthModal = ({ mode = "login", onClose, onSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(mode === "login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, signup } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLoginMode) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      } else if (formData.name.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      if (isLoginMode) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.name, formData.email, formData.password);
      }
      onSuccess();
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrors({});
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50 p-4'>
      <AnimatePresence>
        <motion.div
          key='modal'
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className='bg-[#1a1a1a] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-700'
        >
          {/* Header */}
          <div className='px-6 py-4 border-b border-gray-700 flex justify-between items-center bg-[#0f172a]'>
            <h2 className='text-xl font-bold text-white'>
              {isLoginMode ? "Login to FX Capital" : "Create Account"}
            </h2>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-white transition-colors'
            >
              <FiX size={22} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='p-6 space-y-5'>
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='p-3 bg-red-900 bg-opacity-50 text-red-200 rounded-lg text-sm'
              >
                {errors.submit}
              </motion.div>
            )}

            {!isLoginMode && (
              <div>
                <label className='block text-gray-300 text-sm mb-2'>
                  Full Name
                </label>
                <div className='relative'>
                  <FiUser className='absolute left-3 top-3 text-gray-400' />
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Enter your full name'
                    className={`w-full pl-10 bg-gray-800 border ${
                      errors.name ? "border-red-500" : "border-gray-700"
                    } text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                {errors.name && (
                  <p className='text-red-400 text-xs mt-1'>{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <label className='block text-gray-300 text-sm mb-2'>Email</label>
              <div className='relative'>
                <FiMail className='absolute left-3 top-3 text-gray-400' />
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter your email'
                  className={`w-full pl-10 bg-gray-800 border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.email && (
                <p className='text-red-400 text-xs mt-1'>{errors.email}</p>
              )}
            </div>

            <div>
              <label className='block text-gray-300 text-sm mb-2'>
                Password
              </label>
              <div className='relative'>
                <FiLock className='absolute left-3 top-3 text-gray-400' />
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter your password'
                  className={`w-full pl-10 bg-gray-800 border ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  } text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.password && (
                <p className='text-red-400 text-xs mt-1'>{errors.password}</p>
              )}
            </div>

            {!isLoginMode && (
              <div>
                <label className='block text-gray-300 text-sm mb-2'>
                  Confirm Password
                </label>
                <div className='relative'>
                  <FiLock className='absolute left-3 top-3 text-gray-400' />
                  <input
                    type='password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder='Confirm your password'
                    className={`w-full pl-10 bg-gray-800 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-700"
                    } text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className='text-red-400 text-xs mt-1'>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            <motion.button
              type='submit'
              disabled={isSubmitting}
              whileTap={{ scale: 0.95 }}
              className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center disabled:opacity-50'
            >
              {isSubmitting ? (
                <svg
                  className='animate-spin h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.3 0 0 5.3 0 12h4z'
                  ></path>
                </svg>
              ) : isLoginMode ? (
                "Login"
              ) : (
                "Create Account"
              )}
            </motion.button>

            <div className='text-center'>
              <button
                type='button'
                onClick={switchMode}
                className='text-blue-400 hover:text-blue-300 text-sm transition-colors'
              >
                {isLoginMode
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Log in"}
              </button>
            </div>
          </form>

          {isLoginMode && (
            <div className='px-6 py-4 border-t border-gray-700 bg-[#0f172a] text-center'>
              <p className='text-gray-400 text-sm'>
                Forgot your password?{" "}
                <button className='text-blue-400 hover:text-blue-300 transition-colors'>
                  Reset it here
                </button>
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthModal;
