/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonModal from "@/components/Common/CommonModal";
import { useLoginMutation } from "@/store/api/auth/authApi";
import CountryCodeSelect from "@/components/Common/CountryCodeSelect";
import { useAppDispatch } from "@/hooks/useRedux";
import { setCredentials } from "@/store/Slices/AuthSlice/authSlice";
import { toast } from "sonner";
import ErrorModalBlack from "@/components/modal/ErrorModalBlack";
import { connectSocket } from "@/utils/socket";
import { LogIn, Lock, Phone } from "lucide-react";

const loginSchema = z.object({
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [loginUser, { isLoading }] = useLoginMutation();
  const [countryCode, setCountryCode] = useState("+880");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    content: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = (title: string, content: string) => {
    setModalConfig({ isOpen: true, title, content });
  };

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const phoneNumber = `${countryCode}${data.phone}`;

      const res = await loginUser({
        phoneNumber,
        password: data.password,
      }).unwrap();

      dispatch(
        setCredentials({
          user: {
            userId: res.data.userId,
            role: res.data.role,
            email: res.data.email,
            _id: res.data.user_id,
          },
          token: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        }),
      );

      connectSocket(res.data.accessToken);

      navigate("/index");
      toast.success("Welcome! Login successful");
    } catch (err: any) {
      console.error("Login failed", err);

      const errorMessage =
        err?.data?.message ||
        err?.data?.errorSources?.[0]?.message ||
        "Login failed. Please try again.";

      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg max-w-125 mx-auto pb-24 text-text-dark">
      {/* Top Luxury Banner */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900 shadow-sm flex items-center justify-center text-center">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
          alt="NH Hotel Lobby"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/20" />

        <div className="relative z-10 px-6">
          <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-amber-200/40 mb-2">
            <span className="font-serif font-bold text-xs text-white">
              NH HOTEL
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Guest Sign In
          </h1>
          <p className="text-amber-100/90 text-xs sm:text-sm font-light mt-0.5">
            Welcome to NH Hotel luxury reservation portal
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="p-4">
        <div className="bg-white rounded-md p-6 border border-amber-100/80 shadow-2xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-amber-100 pb-3 mb-2">
            <LogIn className="w-5 h-5 text-primary" />
            <h2 className="font-serif font-bold text-base text-text-dark">
              Sign In to Your Account
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Phone Field */}
            <div>
              <label className="block text-xs font-serif font-semibold text-text-dark mb-1 items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-primary" />
                Phone Number *
              </label>
              <div className="flex items-center border border-amber-200/80 rounded-xl bg-brand-bg/50 focus-within:border-primary overflow-hidden transition-colors">
                <CountryCodeSelect
                  value={countryCode}
                  onChange={setCountryCode}
                />
                <input
                  type="number"
                  {...register("phone")}
                  placeholder="1XXXXXXXXX"
                  className="w-full px-3 py-2.5 text-sm focus:outline-none bg-transparent"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-serif font-semibold text-text-dark items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  Password *
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-serif font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-99 disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isLoading ? "Signing In..." : "Sign In"}</span>
            </button>
          </form>

          {/* Registration Prompt Section */}
          <div className="pt-4 border-t border-amber-100 space-y-3">
            <h3 className="font-serif font-bold text-sm text-text-dark">
              Don't have an account?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Create an account and join NH Hotel Guest Rewards to manage
              bookings and earn exclusive commissions.
            </p>
            <Link
              to="/signup"
              className="w-full block text-center border-2 border-primary text-primary font-serif font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition-all shadow-2xs"
            >
              Register New Account
            </Link>
          </div>

          {/* Legal Terms Footer */}
          <p className="text-[11px] text-slate-400 font-light text-center pt-2">
            By signing in, you agree to our{" "}
            <span
              onClick={() =>
                openModal(
                  "Terms & Conditions",
                  "NH Hotel Terms & Conditions Content",
                )
              }
              className="underline text-primary cursor-pointer font-medium"
            >
              Terms & Conditions
            </span>
            ,{" "}
            <span
              onClick={() =>
                openModal("Privacy Policy", "NH Hotel Privacy Policy Content")
              }
              className="underline text-primary cursor-pointer font-medium"
            >
              Privacy Policy
            </span>{" "}
            and{" "}
            <span
              onClick={() =>
                openModal("Agreement", "NH Hotel Guest Agreement Content")
              }
              className="underline text-primary cursor-pointer font-medium"
            >
              Guest Agreement
            </span>
            .
          </p>
        </div>
      </div>

      <ErrorModalBlack
        isOpen={!!errorMessage}
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      />
      <CommonModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      >
        <p className="text-sm text-slate-600 font-light leading-relaxed">
          {modalConfig.content}
        </p>
      </CommonModal>
    </div>
  );
};

export default Login;
