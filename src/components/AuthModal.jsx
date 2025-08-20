import React, { useState } from "react";

const AuthModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Password changed successfully!");
      onClose();
    }, 2000);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4'>
      <div className='bg-card-bg rounded-lg p-6 w-full max-w-md border border-border-custom'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold text-gold'>
            Modify login password
          </h2>
          <button onClick={onClose} className='text-teal hover:text-white'>
            ✕
          </button>
        </div>

        <div className='mb-4 p-3 bg-darker-bg rounded border border-border-custom'>
          <p className='text-teal text-sm'>Name</p>
          <p className='font-semibold text-gold'>Anas Naeem</p>
        </div>

        <div className='mb-4 p-3 bg-darker-bg rounded border border-border-custom'>
          <p className='text-teal text-sm'>Account</p>
          <p className='font-semibold text-gold'>anasnaeem</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-teal text-sm mb-2'>
              Current login password
            </label>
            <input
              type='password'
              name='currentPassword'
              value={formData.currentPassword}
              onChange={handleChange}
              className={`w-full border ${
                errors.currentPassword ? "border-red" : "border-border-custom"
              } bg-darker-bg text-white p-3 rounded`}
              placeholder='Please enter the current login password'
            />
            {errors.currentPassword && (
              <p className='text-red text-xs mt-1'>{errors.currentPassword}</p>
            )}
          </div>

          <div className='mb-4'>
            <label className='block text-teal text-sm mb-2'>
              New login password
            </label>
            <input
              type='password'
              name='newPassword'
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full border ${
                errors.newPassword ? "border-red" : "border-border-custom"
              } bg-darker-bg text-white p-3 rounded`}
              placeholder='Please enter a new login password'
            />
            {errors.newPassword && (
              <p className='text-red text-xs mt-1'>{errors.newPassword}</p>
            )}
          </div>

          <div className='mb-6'>
            <label className='block text-teal text-sm mb-2'>
              Confirm new password
            </label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border ${
                errors.confirmPassword ? "border-red" : "border-border-custom"
              } bg-darker-bg text-white p-3 rounded`}
              placeholder='Please enter a new password to confirm'
            />
            {errors.confirmPassword && (
              <p className='text-red text-xs mt-1'>{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-pink text-white py-3 rounded font-medium disabled:opacity-50'
          >
            {isSubmitting ? "Processing..." : "OK"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
