import React from "react";

const Dashboard = ({ setShowSidebar }) => {
  const navigationItems = [
    { icon: "💰", label: "Recharge", color: "bg-blue" },
    { icon: "💳", label: "Withdrawal", color: "bg-green" },
    { icon: "📊", label: "Transaction", color: "bg-orange" },
    { icon: "📈", label: "Futures Market", color: "bg-purple" },
  ];

  const tradingPairs = [
    {
      pair: "BTC/USDT",
      icon: "₿",
      status: "in transaction",
      price: "116593.00601",
      color: "text-orange",
    },
    {
      pair: "ETH/USDT",
      icon: "Ξ",
      status: "in transaction",
      price: "4348.52401",
      color: "text-purple",
    },
    {
      pair: "BNB/USDT",
      icon: "ⓑ",
      status: "in transaction",
      price: "845.37701",
      color: "text-yellow-400",
    },
    {
      pair: "XRP/USDT",
      icon: "✕",
      status: "in transaction",
      price: "3.08681",
      color: "text-white",
    },
  ];

  return (
    <div className='mb-16'>
      {/* Total Assets Section */}
      <div className='bg-card rounded-medium p-6 mb-6'>
        <h2 className='text-secondary text-sm font-normal mb-2'>
          Total assets equivalent (USDT)
        </h2>
        <p className='text-2xl font-semibold mb-4 text-primary'>0.00</p>

        {/* Navigation Icons Row */}
        <div className='flex justify-between mt-6'>
          {navigationItems.map((item, index) => (
            <div key={index} className='flex flex-col items-center'>
              <div
                className={`${item.color} rounded-circle w-12 h-12 flex items-center justify-center mb-2`}
              >
                <span className='text-xl'>{item.icon}</span>
              </div>
              <span className='text-secondary text-xs'>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* History Section */}
      <div className='bg-card rounded-medium p-6 mb-6'>
        <h3 className='text-lg font-semibold mb-2 text-primary'>
          When and how did it all start?
        </h3>
        <p className='text-secondary'>
          On the 15th of December 2013, when India started trading crypto
          assets!
        </p>
      </div>

      {/* Trading Pairs Section */}
      <div className='bg-card rounded-medium p-6'>
        <h3 className='text-lg font-semibold mb-4 border-b border-border-custom pb-2 text-primary'>
          Trade
        </h3>
        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr className='border-b border-border-custom'>
                <th className='py-3 text-left text-secondary font-normal text-sm'>
                  Trading Pair
                </th>
                <th className='py-3 text-left text-secondary font-normal text-sm'>
                  Status
                </th>
                <th className='py-3 text-left text-secondary font-normal text-sm'>
                  Latest Price
                </th>
              </tr>
            </thead>
            <tbody>
              {tradingPairs.map((coin, index) => (
                <tr key={index} className='border-b border-border-custom'>
                  <td className='py-3 font-medium flex items-center'>
                    <span className={`${coin.color} mr-2`}>{coin.icon}</span>
                    {coin.pair}
                  </td>
                  <td className='py-3 text-green text-sm'>{coin.status}</td>
                  <td className='py-3 text-green font-bold'>{coin.price}</td>
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
