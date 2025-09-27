import React from "react";
import { ArrowLeft } from "lucide-react";

const Record = ({ onClose, records }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#0b1220] text-white font-sans">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-blue-900">
        <button onClick={onClose} className="text-gray-300 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <h1 className="flex-1 text-center text-base font-medium">record</h1>
        <div className="w-6" />
      </div>

      {/* Records List */}
      <div className="px-4 mt-4 space-y-4 text-sm">
        {records.length === 0 ? (
          <p className="text-center text-gray-400">No records found</p>
        ) : (
          records.map((rec) => (
            <div
              key={rec.id}
              className="p-3 rounded bg-[#121c30] border border-blue-900"
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">Withdrawal/Transfer</p>
                <span className="text-sm bg-gray-700 px-2 py-0.5 rounded">
                  {rec.status}
                </span>
                <p className="text-base font-semibold">{rec.amount} USDT</p>
              </div>
              <div className="mt-2 text-xs text-gray-400 space-y-1">
                <p>
                  Number of accounts received :{" "}
                  <span className="text-gray-200">{rec.amount} USDT</span>
                </p>
                <p>
                  handling fee :{" "}
                  <span className="text-gray-200">{rec.fee} USDT</span>
                </p>
                <p>
                  Remark :{" "}
                  <span className="text-gray-200">{rec.remark || "undefined"}</span>
                </p>
                <p className="text-[11px]">{rec.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Record;
