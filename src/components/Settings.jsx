import React, { useState } from "react";

const Settings = ({ setShowSidebar, setShowAuthModal }) => {
  const [settings, setSettings] = useState({
    authentication: false,
    defaultCurrency: "USDT",
    language: "English",
  });

  return (
    <div className='mb-16'>
      <div className='bg-white rounded-lg p-6 shadow-sm border border-poloniex-border'>
        <h2 className='text-xl font-semibold mb-6 border-b border-poloniex-border pb-3'>
          Settings
        </h2>

        <div className='space-y-4 mb-6'>
          <div className='flex items-center justify-between p-4 bg-poloniex-section rounded border border-poloniex-border'>
            <span>Authentication</span>
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
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-poloniex-blue"></div>
            </label>
          </div>

          <div className='flex items-center justify-between p-4 bg-poloniex-section rounded border border-poloniex-border'>
            <span>Personal information</span>
            <span className='text-green-500'>✓</span>
          </div>

          <div className='flex items-center justify-between p-4 bg-poloniex-section rounded border border-poloniex-border'>
            <span>Default Fiat Currency</span>
            <select
              className='bg-white border border-poloniex-border text-poloniex-text px-3 py-1 rounded text-sm'
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

          <div className='flex items-center justify-between p-4 bg-poloniex-section rounded border border-poloniex-border'>
            <span>Select language</span>
            <select
              className='bg-white border border-poloniex-border text-poloniex-text px-3 py-1 rounded text-sm'
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

          <div className='flex items-center justify-between p-4 bg-poloniex-section rounded border border-poloniex-border'>
            <span>About Us</span>
            <button className='text-poloniex-blue text-sm'>View</button>
          </div>
        </div>

        <button
          className='w-full btn-poloniex py-3'
          onClick={() => setShowAuthModal(true)}
        >
          Modify Password
        </button>
      </div>
    </div>
  );
};

export default Settings;
