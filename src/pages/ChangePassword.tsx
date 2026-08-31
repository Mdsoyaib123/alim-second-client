/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChangePasswordMutation } from "@/store/api/auth/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, KeyRound, Lock } from "lucide-react";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      await changePassword({
        oldPassword,
        newPassword,
      }).unwrap();

      toast.success("Password changed successfully");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/account");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

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
              Change Password
            </h1>
            <p className="text-[11px] text-slate-400 font-light">
              NH Hotel Account Security
            </p>
          </div>
        </div>
      </div>

      {/* Form Card Container */}
      <div className="p-4 sm:p-6">
        <div className="bg-white rounded-2xl p-5 border border-amber-100/80 shadow-2xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-amber-100 pb-3 mb-2">
            <KeyRound className="w-5 h-5 text-primary" />
            <h2 className="font-serif font-bold text-base text-text-dark">
              Security Credentials Form
            </h2>
          </div>

          {/* Old Password */}
          <div>
            <label className="block text-xs font-serif font-semibold text-text-dark mb-1">
              Old Password *
            </label>
            <input
              type="password"
              placeholder="Please enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-serif font-semibold text-text-dark mb-1">
              New Password *
            </label>
            <input
              type="password"
              placeholder="Please enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-serif font-semibold text-text-dark mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              placeholder="Please confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || !oldPassword || !newPassword || !confirmPassword}
            className="w-full bg-primary hover:bg-primary-hover text-white font-serif font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-99 disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4 text-amber-100" />
            <span>{isLoading ? "Updating..." : "CONFIRM THE CHANGES"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
