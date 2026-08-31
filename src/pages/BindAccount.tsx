/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSingleUserQuery } from "@/store/api/user/userApi";
import { useBindAccountMutation } from "@/store/api/withdraw/withdrawApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";

const BindAccount = () => {
  const id = localStorage.getItem("userId");
  const userId = id ? parseInt(id) : 0;
  const { data: userData } = useGetSingleUserQuery(userId, {
    refetchOnMountOrArgChange: true,
  });

  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState<"BankTransfer" | "MobileBanking" | "">("");

  // Bank Transfer fields
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchName, setBranchName] = useState("");
  const [districtName, setDistrictName] = useState("");

  // Mobile Banking fields
  const [provider, setProvider] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const navigate = useNavigate();

  // Check if user already has withdrawal address and method
  const hasWithdrawalAddress = userData?.data?.withdrawalAddressAndMethod &&
    Object.keys(userData.data.withdrawalAddressAndMethod).length > 0;

  useEffect(() => {
    if (userData?.data?.name) {
      setName(userData.data.name);
    }

    if (hasWithdrawalAddress) {
      const withdrawalData = userData.data.withdrawalAddressAndMethod;

      if (withdrawalData.withdrawMethod) {
        setAccountType(withdrawalData.withdrawMethod);
      }

      if (withdrawalData.withdrawMethod === "BankTransfer") {
        if (withdrawalData.bankName) setBankName(withdrawalData.bankName);
        if (withdrawalData.bankAccountNumber) setAccountNumber(withdrawalData.bankAccountNumber.toString());
        if (withdrawalData.branchName) setBranchName(withdrawalData.branchName);
        if (withdrawalData.district) setDistrictName(withdrawalData.district);
      } else if (withdrawalData.withdrawMethod === "MobileBanking") {
        if (withdrawalData.mobileBankingName) setProvider(withdrawalData.mobileBankingName);
        if (withdrawalData.mobileBankingAccountNumber) setMobileNumber(withdrawalData.mobileBankingAccountNumber.toString());
        if (withdrawalData.mobileUserDistrict) setDistrictName(withdrawalData.mobileUserDistrict);
      }
    }
  }, [userData, hasWithdrawalAddress]);

  const [bindAccount, { isLoading, isError }] = useBindAccountMutation();

  const handleSubmit = async () => {
    if (hasWithdrawalAddress) {
      navigate("/cash-out");
      return;
    }

    if (!accountType) {
      toast.error("Please select an account type");
      return;
    }

    if (!name) {
      toast.error("Please enter your name");
      return;
    }

    let payload: any = {
      userId,
      name,
      withdrawMethod: accountType,
    };

    if (accountType === "BankTransfer") {
      if (!bankName || !accountNumber || !districtName) {
        toast.error("Please fill all required fields");
        return;
      }
      payload = {
        ...payload,
        bankName,
        bankAccountNumber: Number(accountNumber),
        district: districtName,
      };

      if (branchName) {
        payload.branchName = branchName;
      }
    } else if (accountType === "MobileBanking") {
      if (!provider || !mobileNumber) {
        toast.error("Please fill all required fields");
        return;
      }
      payload = {
        ...payload,
        mobileBankingName: provider,
        mobileBankingAccountNumber: Number(mobileNumber),
        mobileUserDistrict: districtName,
      };
    }

    try {
      await bindAccount(payload).unwrap();
      toast.success("Account bound successfully");
      navigate("/account");
    } catch (err: any) {
      console.error("Bind account failed", err);
      toast.error(err?.data?.message || "Failed to bind account");
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg max-w-[500px] mx-auto pb-24 text-text-dark">
      {/* Top Sticky Header with Back Button */}
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
              Bind Account
            </h1>
            <p className="text-[11px] text-slate-400 font-light">
              NH Hotel Payout Method Setup
            </p>
          </div>
        </div>
      </div>

      {/* Form Container Card */}
      <div className="p-4 sm:p-6 space-y-4">
        <div className="bg-white rounded-2xl p-5 border border-amber-100/80 shadow-2xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-amber-100 pb-3">
            <CreditCard className="w-5 h-5 text-primary" />
            <h2 className="font-serif font-bold text-base text-text-dark">
              Account Details Form
            </h2>
          </div>

          <div>
            <label className="block text-xs font-serif font-semibold text-text-dark mb-1">
              Account Holder Name *
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Account Type Selection */}
          <div>
            <label className="block text-xs font-serif font-semibold text-text-dark mb-1">
              Cash Out Method *
            </label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as "BankTransfer" | "MobileBanking")}
              className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors cursor-pointer"
            >
              <option value="">Select Cash Out Method</option>
              <option value="BankTransfer">Bank Transfer</option>
              <option value="MobileBanking">Mobile Banking</option>
            </select>
          </div>

          {/* Bank Transfer Fields */}
          {accountType === "BankTransfer" && (
            <div className="space-y-3.5 pt-2">
              <div>
                <label className="block text-xs font-serif font-semibold text-text-dark mb-1">
                  Bank Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. City Bank / Brac Bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-semibold text-text-dark mb-1">
                  Account Number *
                </label>
                <input
                  type="text"
                  placeholder="Please enter bank account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-semibold text-text-dark mb-1">
                  Branch Name
                </label>
                <input
                  type="text"
                  placeholder="Enter branch name"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-semibold text-text-dark mb-1">
                  District *
                </label>
                <input
                  type="text"
                  placeholder="Please enter district name"
                  value={districtName}
                  onChange={(e) => setDistrictName(e.target.value)}
                  className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          )}

          {/* Mobile Banking Fields */}
          {accountType === "MobileBanking" && (
            <div className="space-y-3.5 pt-2">
              <div>
                <label className="block text-xs font-serif font-semibold text-text-dark mb-1">
                  Mobile Wallet Provider *
                </label>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="">Select Wallet</option>
                  <option value="bkash">bKash</option>
                  <option value="nagad">Nagad</option>
                  <option value="rocket">Rocket</option>
                  <option value="upay">Upay</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-serif font-semibold text-text-dark mb-1">
                  Wallet Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="Please enter wallet number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-semibold text-text-dark mb-1">
                  District *
                </label>
                <input
                  type="text"
                  placeholder="Please enter district name"
                  value={districtName}
                  onChange={(e) => setDistrictName(e.target.value)}
                  className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || (!hasWithdrawalAddress && (!accountType || !name))}
            className="w-full bg-primary hover:bg-primary-hover text-white font-serif font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-99 disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-5 h-5 text-amber-100" />
            <span>{isLoading ? "Binding..." : hasWithdrawalAddress ? "View / Edit Account" : "Bind Account"}</span>
          </button>

          {isError && (
            <p className="text-red-500 text-xs text-center font-medium mt-2">
              Failed to bind account. Please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BindAccount;