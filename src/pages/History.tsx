import { useGetHistoryQuery, useGetSingleWithdrawHistoryQuery } from '@/store/api/withdraw/withdrawApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Receipt } from 'lucide-react';

type HistoryType = 'withdraw' | 'other';

interface HistoryItem {
  _id: string;
  userId: string;
  historyType: 'checkIn' | 'withdraw' | 'recharge';
  amount: number;
  notes?: string;
  time: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const History = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<HistoryType>('withdraw');
  const [subTab, setSubTab] = useState<'checkIn' | 'recharge'>('checkIn');

  const id = localStorage.getItem("mongodbId");
  const userId = id ? id : "";

  const singleWithdrawId = localStorage.getItem("userId");
  const singleWithdrawUserId = singleWithdrawId ? parseInt(singleWithdrawId, 10) : 0;

  // Fetch withdraw history using the new API
  const {
    data: withdrawData,
    isLoading: withdrawLoading,
    error: withdrawError
  } = useGetSingleWithdrawHistoryQuery(
    { userId: singleWithdrawUserId },
    { skip: activeTab !== 'withdraw' || !singleWithdrawUserId }
  );

  // Fetch checkIn/recharge history using the old API
  const {
    data: otherData,
    isLoading: otherLoading,
    error: otherError
  } = useGetHistoryQuery(
    { userId, historyType: subTab },
    { skip: activeTab !== 'other' }
  );

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const formatAmount = (amount: number | undefined) => {
    if (amount === undefined || amount === null || isNaN(amount)) return '৳0.00';

    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'BDT',
      currencyDisplay: 'symbol',
    });
  };

  const getHistoryIcon = (type: 'checkIn' | 'withdraw' | 'recharge') => {
    switch (type) {
      case 'checkIn':
        return '✓';
      case 'withdraw':
        return '↓';
      case 'recharge':
        return '↑';
    }
  };

  const getHistoryColor = (type: 'checkIn' | 'withdraw' | 'recharge') => {
    switch (type) {
      case 'checkIn':
        return 'text-[#2b6cb0]';
      case 'withdraw':
        return 'text-red-600';
      case 'recharge':
        return 'text-emerald-600';
    }
  };

  const tabs: { label: string; value: HistoryType }[] = [
    { label: 'Cashout', value: 'withdraw' },
    { label: 'Check In & Cash In', value: 'other' }
  ];

  const subTabs: { label: string; value: 'checkIn' | 'recharge' }[] = [
    { label: 'Check In', value: 'checkIn' },
    { label: 'Cash In', value: 'recharge' }
  ];

  const isLoading = activeTab === 'withdraw' ? withdrawLoading : otherLoading;
  const error = activeTab === 'withdraw' ? withdrawError : otherError;
  const hasData = activeTab === 'withdraw'
    ? withdrawData?.data && withdrawData.data.length > 0
    : otherData?.data && otherData.data.length > 0;

  return (
    <div className="min-h-screen bg-brand-bg max-w-[500px] mx-auto pb-24 text-text-dark">
      {/* Top Header with Back Button */}
      <div className="bg-white border-b border-amber-100 px-4 py-3.5 sticky top-0 z-20 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/account")}
            className="text-slate-600 hover:text-slate-900 transition-colors p-1"
            aria-label="Go back to Account"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-serif font-bold text-text-dark leading-tight">
              Transaction History
            </h1>
            <p className="text-[11px] text-slate-400 font-light">
              NH Hotel Financial Records
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Main Tabs */}
        <div className="flex bg-white rounded-2xl p-1.5 border border-amber-100/80 shadow-2xs gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex-1 py-2.5 rounded-xl font-serif font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer text-center ${
                activeTab === tab.value
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sub Tabs for Check In & Recharge */}
        {activeTab === 'other' && (
          <div className="flex bg-amber-50 rounded-xl p-1 border border-amber-200/60 gap-1">
            {subTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSubTab(tab.value)}
                className={`flex-1 py-2 rounded-lg font-medium text-xs transition-all duration-200 cursor-pointer text-center ${
                  subTab === tab.value
                    ? 'bg-white text-primary font-bold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Content Card */}
        <div className="bg-white rounded-2xl border border-amber-100/80 shadow-2xs overflow-hidden">
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {!isLoading && !error && !hasData && (
            <div className="p-12 text-center text-slate-500">
              <Receipt className="w-12 h-12 text-amber-300 mx-auto mb-3" />
              <p className="font-serif font-bold text-base text-text-dark">No transactions found</p>
              <p className="text-xs text-slate-400 mt-1">
                You haven't made any {activeTab === 'withdraw' ? 'Cashout' : subTab} transactions yet
              </p>
            </div>
          )}

          {/* Withdraw History List */}
          {!isLoading && !error && activeTab === 'withdraw' && withdrawData?.data && withdrawData.data.length > 0 && (
            <div className="divide-y divide-amber-100/70">
              {withdrawData.data.map((item) => (
                <div key={item._id} className="p-4 hover:bg-amber-50/40 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-50 text-red-600 font-bold border border-red-100">
                        <span>↓</span>
                      </div>
                      <div>
                        <p className="font-serif font-bold text-sm text-text-dark">Withdrawal</p>
                        <p className="text-[11px] text-slate-400 font-light">
                          {formatDate(item.applicationTime)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-serif font-bold text-red-600">
                        -{formatAmount(item.withdrawalAmount || item.amount)}
                      </p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        item.transactionStatus === 'APPROVED' || item.transactionStatus === 'completed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : item.transactionStatus === 'pending'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-800'
                      }`}>
                        {item.transactionStatus || 'Unknown'}
                      </span>
                    </div>
                  </div>

                  {/* Additional Withdraw Details */}
                  {(item.bankName || item.processingTime || item.reviewRemark) && (
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-amber-100/60 text-xs">
                      {item.bankName && (
                        <div>
                          <p className="text-[10px] text-slate-400 font-light">Bank Name</p>
                          <p className="font-medium text-slate-700">{item.bankName}</p>
                        </div>
                      )}
                      {item.processingTime && (
                        <div>
                          <p className="text-[10px] text-slate-400 font-light">Processing Time</p>
                          <p className="font-medium text-slate-700">{formatDate(item.processingTime)}</p>
                        </div>
                      )}
                      {item.reviewRemark && (
                        <div className="col-span-2">
                          <p className="text-[10px] text-slate-400 font-light">Review Remark</p>
                          <p className="font-medium text-slate-700">{item.reviewRemark}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Check In & Recharge History List */}
          {!isLoading && !error && activeTab === 'other' && otherData?.data && otherData.data.length > 0 && (
            <div className="divide-y divide-amber-100/70">
              {otherData.data.map((item: HistoryItem) => (
                <div key={item._id} className="p-4 hover:bg-amber-50/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border font-bold ${
                        item.historyType === 'checkIn'
                          ? 'bg-blue-50 border-blue-100 text-[#2b6cb0]'
                          : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                      }`}>
                        <span>{getHistoryIcon(item.historyType)}</span>
                      </div>
                      <div>
                        <p className="font-serif font-bold text-sm text-text-dark capitalize">
                          {item?.notes ? item?.notes : item?.historyType}
                        </p>
                        <p className="text-[11px] text-slate-400 font-light">
                          {formatDate(item.time)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-serif font-bold ${getHistoryColor(item.historyType)}`}>
                        +{formatAmount(item.amount)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;