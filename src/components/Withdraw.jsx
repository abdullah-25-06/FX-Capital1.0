import React, { useState } from "react";
import { ArrowLeft, Trash2, Clock } from "lucide-react";
import Record from "./Record"; // ✅ Record page import

const Withdraw = ({ onClose }) => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentPassword, setPaymentPassword] = useState("");
  const [activeTab, setActiveTab] = useState("wallet"); // "wallet" or "bank"

  // 🔹 Wallet states
  const [walletAddresses, setWalletAddresses] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [showWalletForm, setShowWalletForm] = useState(false);
  const [newWalletAddress, setNewWalletAddress] = useState("");

  // 🔹 Bank states
  const [bankCards, setBankCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showBankForm, setShowBankForm] = useState(false);
  const [accountHolder, setAccountHolder] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // 🔹 Record states
  const [records, setRecords] = useState([]);
  const [showRecord, setShowRecord] = useState(false);

  const availableAmount = 485.07;
  const handlingFee = 0;

  // 🔹 Withdraw function
  const handleWithdraw = () => {
    if (!withdrawAmount || !paymentPassword) {
      alert("Please fill in all fields!");
      return;
    }
    if (activeTab === "wallet" && !selectedWallet) {
      alert("Please select a wallet address!");
      return;
    }
    if (activeTab === "bank" && !selectedCard) {
      alert("Please select a bank card!");
      return;
    }

    // ✅ Add record
    const newRecord = {
      id: Date.now(),
      amount: withdrawAmount,
      fee: handlingFee,
      status: "Under review",
      remark: "undefined",
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    setRecords([newRecord, ...records]);

    // ✅ Show record page directly
    setShowRecord(true);
  };

  // 🔹 Wallet functions
  const handleAddWalletAddress = () => {
    if (!newWalletAddress) {
      alert("Please enter a wallet address!");
      return;
    }
    const newAddress = { id: Date.now(), address: newWalletAddress };
    setWalletAddresses([...walletAddresses, newAddress]);
    setSelectedWallet(newAddress.id);
    setNewWalletAddress("");
    setShowWalletForm(false);
  };

  const handleDeleteWallet = (id) => {
    setWalletAddresses(walletAddresses.filter((w) => w.id !== id));
    if (selectedWallet === id) setSelectedWallet(null);
  };

  // 🔹 Bank functions
  const handleAddBankCard = () => {
    if (!accountHolder || !bankName || !accountNumber) {
      alert("Please fill in all bank details!");
      return;
    }
    const newCard = {
      id: Date.now(),
      accountHolder,
      bankName,
      accountNumber,
    };
    setBankCards([...bankCards, newCard]);
    setSelectedCard(newCard.id);
    setAccountHolder("");
    setBankName("");
    setAccountNumber("");
    setShowBankForm(false);
  };

  const handleDeleteCard = (id) => {
    setBankCards(bankCards.filter((card) => card.id !== id));
    if (selectedCard === id) setSelectedCard(null);
  };

  // 🔹 Show Record Page
  if (showRecord) {
    return <Record onClose={() => setShowRecord(false)} records={records} />;
  }

  // 🔹 Wallet Form
  if (showWalletForm) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0b1220] text-white font-sans">
        <div className="flex items-center px-4 py-3 border-b border-blue-900">
          <button
            onClick={() => setShowWalletForm(false)}
            className="text-gray-300 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="flex-1 text-center text-base font-medium">
            Add Wallet Address
          </h1>
          <div className="w-6" />
        </div>

        <div className="px-4 mt-6 space-y-4 text-sm">
          <input
            type="text"
            placeholder="Enter Wallet Address"
            className="w-full p-2 rounded border border-blue-900 bg-[#121c30]"
            value={newWalletAddress}
            onChange={(e) => setNewWalletAddress(e.target.value)}
          />
          <button
            onClick={handleAddWalletAddress}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  // 🔹 Bank Form
  if (showBankForm) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0b1220] text-white font-sans">
        <div className="flex items-center px-4 py-3 border-b border-blue-900">
          <button
            onClick={() => setShowBankForm(false)}
            className="text-gray-300 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="flex-1 text-center text-base font-medium">
            Add Bank Card
          </h1>
          <div className="w-6" />
        </div>

        <div className="px-4 mt-6 space-y-4 text-sm">
          <input
            type="text"
            placeholder="Account Holder Name"
            className="w-full p-2 rounded border border-blue-900 bg-[#121c30]"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bank Name"
            className="w-full p-2 rounded border border-blue-900 bg-[#121c30]"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bank Account Number"
            className="w-full p-2 rounded border border-blue-900 bg-[#121c30]"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <button
            onClick={handleAddBankCard}
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  // 🔹 Main Page
  return (
    <div className="fixed inset-0 z-50 bg-[#0b1220] min-h-screen text-white font-sans">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-blue-900">
        <button onClick={onClose} className="text-gray-300 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="flex-1 text-center text-base font-medium">Withdrawal</h1>

        {/* 🔹 Record Icon Button */}
        <button
          onClick={() => setShowRecord(true)}
          className="text-gray-300 hover:text-white"
        >
          <Clock size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-4 px-4">
        <div className="relative bg-[#1a2438] rounded-full h-7 flex overflow-hidden">
          <div
            className="absolute top-0 left-0 h-7 w-1/2 bg-blue-500 rounded-full transition-all duration-300"
            style={{
              transform:
                activeTab === "wallet" ? "translateX(0%)" : "translateX(100%)",
            }}
          ></div>

          <button
            onClick={() => setActiveTab("wallet")}
            className={`flex-1 z-10 text-[11px] font-medium flex items-center justify-center transition-colors ${
              activeTab === "wallet" ? "text-white" : "text-gray-300"
            }`}
          >
            mentioned wallet address
          </button>
          <button
            onClick={() => setActiveTab("bank")}
            className={`flex-1 z-10 text-[11px] font-medium flex items-center justify-center transition-colors ${
              activeTab === "bank" ? "text-white" : "text-gray-300"
            }`}
          >
            mentioned bank card
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 mt-6 space-y-4 text-sm">
        {activeTab === "wallet" ? (
          <>
            {/* Wallet List */}
            <div>
              <p className="mb-1 text-gray-400 text-xs">Wallet Addresses</p>
              {walletAddresses.length === 0 ? (
                <button
                  onClick={() => setShowWalletForm(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded text-sm font-medium"
                >
                  Add Wallet Address
                </button>
              ) : (
                <div className="space-y-2">
                  {walletAddresses.map((wallet) => (
                    <div
                      key={wallet.id}
                      className={`flex items-center justify-between p-2 rounded border cursor-pointer ${
                        selectedWallet === wallet.id
                          ? "border-blue-500 bg-[#1a2438]"
                          : "border-blue-900 bg-[#121c30]"
                      }`}
                    >
                      <div
                        onClick={() => setSelectedWallet(wallet.id)}
                        className="flex-1 text-xs text-gray-300"
                      >
                        {wallet.address}
                      </div>
                      <button
                        onClick={() => handleDeleteWallet(wallet.id)}
                        className="ml-2 text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setShowWalletForm(true)}
                    className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-1 rounded text-xs font-medium"
                  >
                    + Add another wallet
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Bank List */}
            <div>
              <p className="mb-1 text-gray-400 text-xs">Bank Cards</p>
              {bankCards.length === 0 ? (
                <button
                  onClick={() => setShowBankForm(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded text-sm font-medium"
                >
                  Add Bank Card
                </button>
              ) : (
                <div className="space-y-2">
                  {bankCards.map((card) => (
                    <div
                      key={card.id}
                      className={`flex items-center justify-between p-2 rounded border cursor-pointer ${
                        selectedCard === card.id
                          ? "border-blue-500 bg-[#1a2438]"
                          : "border-blue-900 bg-[#121c30]"
                      }`}
                    >
                      <div
                        onClick={() => setSelectedCard(card.id)}
                        className="flex-1"
                      >
                        <p className="text-xs text-gray-300">
                          {card.bankName} - {card.accountNumber}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {card.accountHolder}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="ml-2 text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setShowBankForm(true)}
                    className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-1 rounded text-xs font-medium"
                  >
                    + Add another card
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Withdrawal Amount */}
        <div>
          <p className="mb-1 text-gray-400 text-xs">withdrawal amount</p>
          <div className="flex items-center justify-between p-2 rounded border border-blue-900 bg-[#121c30]">
            <input
              type="number"
              className="bg-transparent outline-none flex-1 text-white text-sm"
              placeholder="0.00"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <div className="flex flex-col items-end text-right text-xs">
              <span className="text-gray-400">
                available {availableAmount.toFixed(2)} INR
              </span>
              <button
                onClick={() => setWithdrawAmount(availableAmount)}
                className="text-blue-400 text-xs"
              >
                all
              </button>
            </div>
          </div>
        </div>

        {/* Handling Fee */}
        <div>
          <p className="mb-1 text-gray-400 text-xs">handling fee</p>
          <div className="p-2 rounded border border-blue-900 bg-[#121c30] text-xs text-gray-200">
            {handlingFee}%
          </div>
        </div>

        {/* Number of Accounts */}
        <div>
          <p className="mb-1 text-gray-400 text-xs">
            Number of accounts received
          </p>
          <div className="p-2 rounded border border-blue-900 bg-[#121c30] text-xs text-gray-200">
            {withdrawAmount ? withdrawAmount : availableAmount}
          </div>
        </div>

        {/* Payment Password */}
        <div>
          <p className="mb-1 text-gray-400 text-xs">Current Payment Password</p>
          <input
            type="password"
            className="w-full p-2 rounded border border-blue-900 bg-[#121c30] text-sm placeholder-gray-500"
            placeholder="Please enter the current payment password"
            value={paymentPassword}
            onChange={(e) => setPaymentPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-4 mt-8">
        <button
          onClick={handleWithdraw}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white py-2 rounded text-sm font-medium"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
