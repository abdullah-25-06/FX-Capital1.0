import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

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
    // Clear error when user starts typing
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
    <div className='fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50 p-4'>
      <div className='bg-gray-800 rounded-xl w-full max-w-md overflow-hidden border border-gray-700 shadow-2xl'>
        <div className='px-6 py-4 border-b border-gray-700 flex justify-between items-center bg-gray-900'>
          <h2 className='text-xl font-bold text-white'>
            {isLoginMode ? "Login to FX Capital" : "Create Account"}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-white transition-colors'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 bg-gray-800'>
          {errors.submit && (
            <div className='mb-4 p-3 bg-red-900 bg-opacity-50 text-red-200 rounded-lg text-sm'>
              {errors.submit}
            </div>
          )}

          {!isLoginMode && (
            <div className='mb-4'>
              <label className='block text-gray-300 text-sm font-medium mb-2'>
                Full Name
              </label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${
                  errors.name ? "border-red-500" : "border-gray-600"
                } text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder='Enter your full name'
              />
              {errors.name && (
                <p className='text-red-400 text-xs mt-1'>{errors.name}</p>
              )}
            </div>
          )}

          <div className='mb-4'>
            <label className='block text-gray-300 text-sm font-medium mb-2'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-gray-700 border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder='Enter your email'
            />
            {errors.email && (
              <p className='text-red-400 text-xs mt-1'>{errors.email}</p>
            )}
          </div>

          <div className='mb-4'>
            <label className='block text-gray-300 text-sm font-medium mb-2'>
              Password
            </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className={`w-full bg-gray-700 border ${
                errors.password ? "border-red-500" : "border-gray-600"
              } text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder='Enter your password'
            />
            {errors.password && (
              <p className='text-red-400 text-xs mt-1'>{errors.password}</p>
            )}
          </div>

          {!isLoginMode && (
            <div className='mb-6'>
              <label className='block text-gray-300 text-sm font-medium mb-2'>
                Confirm Password
              </label>
              <input
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full bg-gray-700 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-600"
                } text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder='Confirm your password'
              />
              {errors.confirmPassword && (
                <p className='text-red-400 text-xs mt-1'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center disabled:opacity-50'
          >
            {isSubmitting ? (
              <>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
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
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                {isLoginMode ? "Logging in..." : "Creating account..."}
              </>
            ) : isLoginMode ? (
              "Login"
            ) : (
              "Create Account"
            )}
          </button>

          <div className='mt-4 text-center'>
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
          <div className='px-6 py-4 border-t border-gray-700 bg-gray-900'>
            <p className='text-gray-400 text-sm text-center'>
              Forgot your password?{" "}
              <button className='text-blue-400 hover:text-blue-300 transition-colors'>
                Reset it here
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
