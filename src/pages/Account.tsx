import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  CreditCard,
  LogIn,
  HelpCircle,
  Info,
  Settings,
  Building2,
  ChevronRight,
} from "lucide-react";
import { MdHistory } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/store/Slices/AuthSlice/authSlice";
import { useGetSingleUserQuery } from "@/store/api/user/userApi";
import AccountDetailsModal from "@/components/modal/AccountDetailsModal";

const Account: React.FC = () => {
  const [openAccountModal, setOpenAccountModal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.auth.token);

  const isAuthenticated = !!token || !!localStorage.getItem("accessToken");

  const id = localStorage.getItem("userId");
  const userId = id ? parseInt(id) : 0;

  const { data: userData } = useGetSingleUserQuery(userId, {
    skip: !isAuthenticated || !userId,
    refetchOnMountOrArgChange: true,
  });

  const user = userData?.data;

  const accountDetailsData = {
    name: user?.name || "de",
    userId: user?.userId || 6450110,
    quantityOfOrders: user?.quantityOfOrders || 25,
    userBalance: user?.userBalance || 0,
    memberTotalRecharge: user?.memberTotalRecharge || 0,
    userType: user?.userType || "Normal",
    dailyProfit: user?.dailyProfit || 0,
    outOfBalance: user?.outOfBalance || 0,
    completedOrdersCount: user?.completedOrdersCount || 0,
    trialRoundBalance: user?.trialRoundBalance || 0,
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const displayName = user?.name || "Guest";
  const displayUserId =
    localStorage.getItem("userId") || user?.userId || "6450110";

  return (
    <div className="min-h-screen bg-brand-bg max-w-125 mx-auto pb-28 text-text-dark">
      {/* =========================================================
          HEADER
      ========================================================== */}
      <header className="relative bg-card-beige px-6 pt-5 pb-7 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full border border-primary/10" />
        <div className="absolute -bottom-24 -left-20 w-48 h-48 rounded-full border border-primary/10" />

        {/* Top bar */}
        <div className="relative flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold">
              NOVA
            </p>

            <h1 className="font-serif text-lg font-semibold tracking-tight text-text-dark">
              Hotel
            </h1>
          </div>
        </div>

        {/* Guest profile */}
        <div className="relative flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-white border border-primary/30 flex items-center justify-center shadow-lg">
              <div className="w-21 h-21 rounded-full bg-brand-bg flex items-center justify-center">
                <User className="w-9 h-9 text-primary stroke-[1.5]" />
              </div>
            </div>

            {/* Online/member dot */}
            <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-emerald-500 border border-white" />
            </div>
          </div>

          {/* Name */}
          <h2 className="font-serif text-2xl font-semibold text-text-dark">
            {displayName}
          </h2>

          {/* Member information */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] text-slate-500 tracking-wide">
              UID {displayUserId}
            </span>

            <span className="w-1 h-1 rounded-full bg-primary/50" />

            <span className="text-[10px] uppercase tracking-wider font-bold text-primary">
              VIP Member
            </span>
          </div>

          {/* Edit/profile action */}
        </div>
      </header>

      {/* =========================================================
          ACCOUNT OVERVIEW
      ========================================================== */}

      {/* =========================================================
          QUICK ACTIONS
      ========================================================== */}
      <section className="px-5 pt-7">
        <SectionTitle eyebrow="Services" title="Quick Actions" />

        <div className="grid grid-cols-2 gap-3 mt-4">
          {/* Cash Out */}
          <Link
            to="/cash-out"
            className="group bg-white border border-primary/10 rounded-2xl p-4 hover:border-primary/30 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-brand-bg border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <TbCurrencyTaka className="w-6 h-6" />
              </div>

              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
            </div>

            <p className="mt-4 font-serif font-semibold text-sm text-text-dark">
              Cash Out
            </p>

            <p className="text-[11px] text-slate-400 mt-1">Withdraw balance</p>
          </Link>

          {/* Contact */}
          <Link
            to="/contact"
            className="group bg-white border border-primary/10 rounded-2xl p-4 hover:border-primary/30 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-brand-bg border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </div>

              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
            </div>

            <p className="mt-4 font-serif font-semibold text-sm text-text-dark">
              Contact Us
            </p>

            <p className="text-[11px] text-slate-400 mt-1">Get in touch</p>
          </Link>
        </div>

        {/* Account details */}
        <button
          onClick={() => setOpenAccountModal(true)}
          className="w-full mt-3 bg-white border border-primary/10 rounded-2xl p-4 flex items-center justify-between hover:border-primary/30 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-bg border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <CreditCard className="w-5 h-5" />
            </div>

            <div className="text-left">
              <p className="font-serif font-semibold text-sm text-text-dark">
                Account Details
              </p>

              <p className="text-[11px] text-slate-400 mt-0.5">
                View complete account information
              </p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
        </button>
      </section>

      {/* =========================================================
          ACCOUNT & SERVICES
      ========================================================== */}
      <section className="px-5 pt-7">
        <SectionTitle eyebrow="Manage" title="Account & Services" />

        <div className="mt-4 overflow-hidden rounded-2xl border border-primary/10 bg-white">
          <AccountMenuItem
            icon={<CreditCard className="w-[18px] h-[18px]" />}
            title="Bind Account"
            description="Manage your payment account"
            to="/bind-account"
          />

          <AccountMenuItem
            icon={<LogIn className="w-[18px] h-[18px]" />}
            title="Check In"
            description="Access your check-in service"
            to="/check-in"
          />

          <AccountMenuItem
            icon={<MdHistory className="w-[20px] h-[20px]" />}
            title="History"
            description="View your order history"
            to="/history"
          />

          <AccountMenuItem
            icon={<Settings className="w-[18px] h-[18px]" />}
            title="Change Password"
            description="Update your account password"
            to="/forgot-password"
          />
        </div>
      </section>

      {/* =========================================================
          INFORMATION
      ========================================================== */}
      <section className="px-5 pt-7">
        <SectionTitle eyebrow="Information" title="Need Assistance?" />

        <div className="mt-4 overflow-hidden rounded-2xl border border-primary/10 bg-white">
          <AccountMenuItem
            icon={<HelpCircle className="w-[18px] h-[18px]" />}
            title="Help"
            description="Find answers and support"
            to="/help"
          />

          <AccountMenuItem
            icon={<Info className="w-[18px] h-[18px]" />}
            title="About Us"
            description="Learn more about NOVA Hotel"
            to="/about"
            last
          />
        </div>
      </section>

      {/* =========================================================
          ACCOUNT STATUS
      ========================================================== */}
      <section className="px-5 pt-7">
        <div className="rounded-2xl border border-primary/10 bg-card-beige p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>

            <div>
              <p className="font-serif font-semibold text-sm text-text-dark">
                NOVA Hotel
              </p>

              <p className="text-[11px] text-slate-500 mt-0.5">
                Guest Account · {accountDetailsData.userType}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-primary/10 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Completed Orders
              </p>

              <p className="font-serif font-semibold text-lg text-text-dark mt-1">
                {accountDetailsData.completedOrdersCount}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Account Status
              </p>

              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />

                <span className="text-xs font-semibold text-emerald-700">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SIGN OUT
      ========================================================== */}
      <section className="px-5 pt-8 pb-4">
        <button
          onClick={handleLogOut}
          className="w-full py-3.5 rounded-2xl border border-red-200 bg-white text-red-600 text-sm font-semibold hover:bg-red-50 hover:border-red-300 transition-all active:scale-[0.99]"
        >
          Sign Out
        </button>

        <div className="flex items-center justify-center gap-2 mt-5">
          <div className="h-px w-8 bg-primary/15" />

          <span className="font-serif text-[10px] tracking-[0.25em] uppercase text-primary/60">
            NOVA HOTEL
          </span>

          <div className="h-px w-8 bg-primary/15" />
        </div>
      </section>

      {/* =========================================================
          MODAL
      ========================================================== */}
      <AccountDetailsModal
        open={openAccountModal}
        onClose={() => setOpenAccountModal(false)}
        data={accountDetailsData}
      />
    </div>
  );
};

/* ===============================================================
   SECTION TITLE
================================================================ */

const SectionTitle = ({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) => {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[0.25em] text-primary font-bold">
        {eyebrow}
      </p>

      <h3 className="font-serif text-lg font-semibold text-text-dark mt-1">
        {title}
      </h3>
    </div>
  );
};

/* ===============================================================
   STAT CARD
================================================================ */

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-2xl border border-primary/10 p-4">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-xl bg-brand-bg flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>

      <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-4">
        {label}
      </p>

      <p className="font-serif text-lg font-semibold text-text-dark mt-1 truncate">
        {value}
      </p>
    </div>
  );
};

/* ===============================================================
   ACCOUNT MENU ITEM
================================================================ */

const AccountMenuItem = ({
  icon,
  title,
  description,
  to,
  last = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
  last?: boolean;
}) => {
  return (
    <Link
      to={to}
      className={`group flex items-center justify-between px-4 py-4 hover:bg-brand-bg transition-colors ${
        !last ? "border-b border-primary/8" : ""
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-bg border border-primary/8 flex items-center justify-center text-primary group-hover:bg-white group-hover:border-primary/20 transition-all">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-serif font-semibold text-text-dark">
            {title}
          </p>

          <p className="text-[10px] text-slate-400 mt-0.5 truncate">
            {description}
          </p>
        </div>
      </div>

      <ChevronRight className="w-4 h-4 shrink-0 ml-3 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
};

export default Account;
