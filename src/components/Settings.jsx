import React, { useState } from "react";

const Settings = ({ setShowSidebar, setShowAuthModal }) => {
  const [settings, setSettings] = useState({
    authentication: false,
    defaultCurrency: "USDT",
    language: "English",
  });

  return (
    <div className='mb-16'>
      <div className='bg-card-bg rounded-lg p-6 border border-border-custom'>
        <h2 className='text-xl font-semibold mb-6 border-b border-border-custom pb-3 text-gold'>
          Settings
        </h2>

        <div className='space-y-4 mb-6'>
          <div className='flex items-center justify-between p-4 bg-darker-bg rounded border border-border-custom'>
            <span className='text-teal'>Authentication</span>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                className='sr-only peer'
                checked={settings.authentication}
                onChange={() =>
                  setSettings({
                    ...settings,
                    authentication: !settings.authentication,
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
            </label>
          </div>

          <div className='flex items-center justify-between p-4 bg-darker-bg rounded border border-border-custom'>
            <span className='text-teal'>Personal information</span>
            <span className='text-green'>✓</span>
          </div>

          <div className='flex items-center justify-between p-4 bg-darker-bg rounded border border-border-custom'>
            <span className='text-teal'>Default Fiat Currency</span>
            <select
              className='bg-card-bg border border-border-custom text-teal px-3 py-1 rounded text-sm'
              value={settings.defaultCurrency}
              onChange={(e) =>
                setSettings({ ...settings, defaultCurrency: e.target.value })
              }
            >
              <option value='USDT'>USDT</option>
              <option value='USD'>USD</option>
              <option value='EUR'>EUR</option>
            </select>
          </div>

          <div className='flex items-center justify-between p-4 bg-darker-bg rounded border border-border-custom'>
            <span className='text-teal'>Select language</span>
            <select
              className='bg-card-bg border border-border-custom text-teal px-3 py-1 rounded text-sm'
              value={settings.language}
              onChange={(e) =>
                setSettings({ ...settings, language: e.target.value })
              }
            >
              <option value='English'>English</option>
              <option value='Chinese'>Chinese</option>
              <option value='Spanish'>Spanish</option>
            </select>
          </div>

          <div className='flex items-center justify-between p-4 bg-darker-bg rounded border border-border-custom'>
            <span className='text-teal'>About Us</span>
            <button className='text-blue text-sm'>View</button>
          </div>
        </div>

        <button
          className='w-full bg-pink text-white py-3 rounded font-medium'
          onClick={() => setShowAuthModal(true)}
        >
          Modify Password
        </button>
      </div>
    </div>
  );
};

export default Settings;
