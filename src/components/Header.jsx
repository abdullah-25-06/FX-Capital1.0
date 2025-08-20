import React from "react";

const Header = ({ setShowSidebar }) => {
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
          <span className='text-sm text-teal'>1058788[Anas Naeem]</span>
          <button className='bg-red text-white px-3 py-1 rounded-small text-sm font-medium'>
            Exit
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
