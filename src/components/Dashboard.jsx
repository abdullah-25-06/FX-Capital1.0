import React from "react";

const Dashboard = ({ setShowSidebar }) => {
  return (
    <div className='mb-16'>
      {/* Total Assets Section */}
      <div className='bg-poloniex-gray rounded-lg p-6 mb-6 shadow'>
        <h2 className='text-lg font-semibold mb-4'>
          Total assets equivalent (USDT)
        </h2>
        <p className='text-3xl font-bold'>0.00</p>
        <div className='flex flex-wrap gap-2 mt-4'>
          <button className='bg-poloniex-blue hover:bg-blue-700 text-white px-4 py-2 rounded text-sm'>
            Recharge
          </button>
          <button className='bg-poloniex-blue hover:bg-blue-700 text-white px-4 py-2 rounded text-sm'>
            Withdrawal
          </button>
          <button className='bg-poloniex-blue hover:bg-blue-700 text-white px-4 py-2 rounded text-sm'>
            Transaction
          </button>
          <button className='bg-poloniex-blue hover:bg-blue-700 text-white px-4 py-2 rounded text-sm'>
            Futures Market
          </button>
        </div>
      </div>

      {/* History Section */}
      <div className='bg-poloniex-gray rounded-lg p-6 mb-6 shadow'>
        <h3 className='text-lg font-semibold mb-2'>
          When and how did it all start?
        </h3>
        <p className='text-gray-300'>
          On the 15th of December 2013, when India started trading crypto
          assets!
        </p>
      </div>

      {/* Trading Pairs Section */}
      <div className='bg-poloniex-gray rounded-lg p-6 shadow'>
        <h3 className='text-lg font-semibold mb-4'>Trade</h3>
        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr className='border-b border-gray-700'>
                <th className='py-2 text-left'>Trading Pair</th>
                <th className='py-2 text-left'>Status</th>
                <th className='py-2 text-left'>Latest Price</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  pair: "BTC/USDT",
                  status: "in transaction",
                  price: "116593.00601",
                },
                {
                  pair: "ETH/USDT",
                  status: "in transaction",
                  price: "4348.52401",
                },
                {
                  pair: "BNB/USDT",
                  status: "in transaction",
                  price: "845.37701",
                },
                {
                  pair: "XRP/USDT",
                  status: "in transaction",
                  price: "3.08681",
                },
              ].map((coin, index) => (
                <tr key={index} className='border-b border-gray-700'>
                  <td className='py-3'>{coin.pair}</td>
                  <td className='py-3 text-green-400'>{coin.status}</td>
                  <td className='py-3'>{coin.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
