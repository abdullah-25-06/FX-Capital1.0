import React from "react";

const Dashboard = ({ setShowSidebar }) => {
  return (
    <div className='mb-16'>
      {/* Total Assets Section */}
      <div className='bg-card-bg rounded-lg p-6 mb-6 border border-border-custom'>
        <h2 className='text-teal text-sm font-normal mb-2'>
          Total assets equivalent (USDT)
        </h2>
        <p className='text-2xl font-semibold mb-4 text-gold'>0.00</p>
        <div className='flex flex-wrap gap-3'>
          <button className='bg-teal text-dark-bg px-4 py-2 rounded text-sm font-medium'>
            Recharge
          </button>
          <button className='bg-green text-dark-bg px-4 py-2 rounded text-sm font-medium'>
            Withdrawal
          </button>
          <button className='bg-blue text-white px-4 py-2 rounded text-sm font-medium'>
            Transaction
          </button>
          <button className='bg-orange text-dark-bg px-4 py-2 rounded text-sm font-medium'>
            Futures Market
          </button>
        </div>
      </div>

      {/* History Section */}
      <div className='bg-card-bg rounded-lg p-6 mb-6 border border-border-custom'>
        <h3 className='text-lg font-semibold mb-2 text-gold'>
          When and how did it all start?
        </h3>
        <p className='text-teal'>
          On the 15th of December 2013, when India started trading crypto
          assets!
        </p>
      </div>

      {/* Trading Pairs Section */}
      <div className='bg-card-bg rounded-lg p-6 border border-border-custom'>
        <h3 className='text-lg font-semibold mb-4 border-b border-border-custom pb-2 text-gold'>
          Trade
        </h3>
        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr className='border-b border-border-custom'>
                <th className='py-3 text-left text-teal font-normal text-sm'>
                  Trading Pair
                </th>
                <th className='py-3 text-left text-teal font-normal text-sm'>
                  Status
                </th>
                <th className='py-3 text-left text-teal font-normal text-sm'>
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
                <tr key={index} className='border-b border-border-custom'>
                  <td className='py-3 font-medium text-gold'>{coin.pair}</td>
                  <td className='py-3 text-green text-sm'>{coin.status}</td>
                  <td className='py-3 text-red'>{coin.price}</td>
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
