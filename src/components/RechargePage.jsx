      {/* Recharge Options */}
      <div className="mt-6">
        <p className="text-sm text-gray-300 mb-3">Number of recharges (USDT)</p>
        <div className="grid grid-cols-3 gap-2">
          {rechargeOptions.map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className={`py-2 rounded-lg text-sm font-medium transition ${
                amount === value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <input
          type="number"
          placeholder="Please enter the amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-4 w-full px-3 py-2 bg-gray-800 text-sm rounded-lg outline-none text-white placeholder-gray-400"
        />
      </div>

      {/* Upload Proof */}
      <div className="mt-6">
        <p className="text-sm text-gray-300 mb-2">Upload recharge certificate</p>
        <div className="w-full h-24 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400">
          <span className="text-gray-400 text-sm">Upload</span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={() => {
            console.log("Recharge submitted with amount:", amount);
            alert(`Recharge request submitted: ${amount} USDT`);
          }}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          Submit
        </button>
      </div>
    </div>
  );