import React from "react";

const Header = ({ setShowSidebar }) => {
  return (
    <header className='bg-poloniex-blue py-3 px-6 text-white'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center space-x-3'>
          <button
            onClick={() => setShowSidebar(true)}
            className='text-white focus:outline-none'
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
            <div className='bg-white rounded-lg p-1'>
              <svg
                className='w-6 h-6 text-poloniex-blue'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
              </svg>
            </div>
            <h1 className='text-xl font-bold'>FX CAPITAL</h1>
          </div>
        </div>

        <div className='flex items-center space-x-4'>
          <span className='text-sm'>1058788[Anas Naeem]</span>
          <button className='bg-white text-poloniex-blue px-3 py-1 rounded text-sm font-medium'>
            Exit
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
