/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/store/api/auth/authApi";
import CountryCodeSelect from "@/components/Common/CountryCodeSelect";
import { toast } from "sonner";
import { UserPlus, Phone, Lock, Mail, KeyRound, RefreshCw } from "lucide-react";

// Schema: phone, captcha (4 digits), password, confirmPassword, invitationCode (optional), email
const signupSchema = z
  .object({
    phone: z.string().min(8, "Phone number must be at least 8 digits"),
    captcha: z
      .string()
      .min(4, "Enter the 4 digit verification code")
      .max(4, "Enter the 4 digit verification code"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    invitationCode: z.string().optional(),
    email: z.string().email("Invalid email format"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignupFormInputs = z.infer<typeof signupSchema>;

const generateCaptcha = () =>
  Math.floor(1000 + Math.random() * 9000).toString();

const Signup = () => {
  const [captchaCode, setCaptchaCode] = useState<string>(generateCaptcha());
  const [countryCode, setCountryCode] = useState("+880");
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();

  const refreshCaptcha = () => setCaptchaCode(generateCaptcha());

  const onSubmit = async (data: SignupFormInputs) => {
    if (data.captcha !== captchaCode) {
      setError("captcha", {
        type: "manual",
        message: "Verification code does not match",
      });
      return;
    }

    try {
      await registerUser({
        name: data.email.split("@")[0],
        phoneNumber: `${countryCode}${data.phone}`,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        invitationCode: data.invitationCode,
      }).unwrap();
      toast.success("Registration successful! Please sign in");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed");
      console.error("Registration failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg max-w-[500px] mx-auto pb-24 text-text-dark">
      {/* Top Luxury Banner */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900 shadow-sm flex items-center justify-center text-center">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
          alt="NH Hotel Lobby"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

        <div className="relative z-10 px-6">
          <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-amber-200/40 mb-2">
            <span className="font-serif font-bold text-xs text-white">NH HOTEL</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Guest Registration
          </h1>
          <p className="text-amber-100/90 text-xs sm:text-sm font-light mt-0.5">
            Join NH Hotel membership for exclusive benefits
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="p-4 sm:p-6">
        <div className="bg-white rounded-2xl p-6 border border-amber-100/80 shadow-2xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-amber-100 pb-3 mb-2">
            <UserPlus className="w-5 h-5 text-primary" />
            <h2 className="font-serif font-bold text-base text-text-dark">
              Create New Account
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Phone Field */}
            <div>
              <label className="block text-xs font-serif font-semibold text-text-dark mb-1 flex items-center gap-1.5">
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

            {/* Verification Code */}
            <div>
              <label className="block text-xs font-serif font-semibold text-text-dark mb-1 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-primary" />
                Verification Code *
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  {...register("captcha")}
                  placeholder="Enter 4 digit code"
                  maxLength={4}
                  className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary pr-28 transition-colors"
                />
                <div className="absolute right-2 flex items-center space-x-2">
                  <span className="bg-amber-100 border border-amber-300 text-primary px-2.5 py-1 rounded-lg font-mono font-bold text-sm select-none">
                    {captchaCode}
                  </span>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="text-slate-400 hover:text-primary p-1 transition-colors"
                    title="Refresh Code"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {errors.captcha && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.captcha.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-serif font-semibold text-text-dark mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-primary" />
                Password *
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Enter password (min 6 chars)"
                className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-serif font-semibold text-text-dark mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-primary" />
                Confirm Password *
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Re-enter password"
                className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Invitation Code */}
            <div>
              <label className="block text-xs font-serif font-semibold text-text-dark mb-1">
                Invitation Code (Optional)
              </label>
              <input
                type="text"
                {...register("invitationCode")}
                placeholder="Enter invitation code"
                className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-serif font-semibold text-text-dark mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-primary" />
                Email *
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="e.g. guest@example.com"
                className="w-full border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm bg-brand-bg/50 focus:outline-none focus:border-primary transition-colors"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-serif font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-99 disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isLoading ? "Registering..." : "Register"}</span>
            </button>
          </form>

          {/* Already have an account */}
          <div className="pt-3 border-t border-amber-100 text-center text-xs">
            <span className="text-slate-500">Already have an account? </span>
            <Link to="/login" className="text-primary font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
