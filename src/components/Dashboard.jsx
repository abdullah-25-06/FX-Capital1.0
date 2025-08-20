import React from "react";

const Dashboard = ({ setShowSidebar }) => {
  return (
    <div className='mb-16'>
      {/* Total Assets Section */}
      <div className='bg-white rounded-lg p-6 mb-6 shadow-sm border border-poloniex-border'>
        <h2 className='text-gray-600 text-sm font-normal mb-2'>
          Total assets equivalent (USDT)
        </h2>
        <p className='text-2xl font-semibold mb-4'>0.00</p>
        <div className='flex flex-wrap gap-3'>
          <button className='btn-poloniex text-sm'>Recharge</button>
          <button className='btn-poloniex text-sm'>Withdrawal</button>
          <button className='btn-poloniex text-sm'>Transaction</button>
          <button className='btn-poloniex text-sm'>Futures Market</button>
        </div>
      </div>

      {/* History Section */}
      <div className='bg-white rounded-lg p-6 mb-6 shadow-sm border border-poloniex-border'>
        <h3 className='text-lg font-semibold mb-2'>
          When and how did it all start?
        </h3>
        <p className='text-poloniex-gray'>
          On the 15th of December 2013, when India started trading crypto
          assets!
        </p>
      </div>

      {/* Trading Pairs Section */}
      <div className='bg-white rounded-lg p-6 shadow-sm border border-poloniex-border'>
        <h3 className='text-lg font-semibold mb-4 border-b border-poloniex-border pb-2'>
          Trade
        </h3>
        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr className='border-b border-poloniex-border'>
                <th className='py-3 text-left text-poloniex-gray font-normal text-sm'>
                  Trading Pair
                </th>
                <th className='py-3 text-left text-poloniex-gray font-normal text-sm'>
                  Status
                </th>
                <th className='py-3 text-left text-poloniex-gray font-normal text-sm'>
                  Latest Price
                </th>
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
                <tr key={index} className='border-b border-poloniex-border'>
                  <td className='py-3 font-medium'>{coin.pair}</td>
                  <td className='py-3 text-green-500 text-sm'>{coin.status}</td>
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
