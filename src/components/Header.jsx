import React from "react";

const Header = ({
  setShowSidebar,
  isAuthenticated,
  user,
  onLogout,
  onLogin,
  onSignup,
}) => {
  return (
    <header className='bg-dark py-3 px-6 diamond-pattern'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center space-x-3'>
          <button
            onClick={() => setShowSidebar(true)}
            className='text-gold focus:outline-none'
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
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>

          {/* FX CAPITAL Logo */}
          <div className='flex items-center space-x-2'>
            <div className='bg-gold rounded-circle p-2'>
              <svg
                className='w-6 h-6 text-dark'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
              </svg>
            </div>
            <h1 className='text-xl font-bold text-white uppercase'>
              FX CAPITAL
            </h1>
          </div>
        </div>

        <div className='flex items-center space-x-4'>
          {isAuthenticated ? (
            <>
              <span className='text-sm text-teal'>{user?.name}</span>
              <button
                onClick={onLogout}
                className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onLogin}
                className='text-teal hover:text-white px-3 py-1 text-sm font-medium transition-colors'
              >
                Login
              </button>
              <button
                onClick={onSignup}
                className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors'
              >
                Sign Up
              </button>
            </>
          )}
          {/* <button className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors'>
            Exit
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
