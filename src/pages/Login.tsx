import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setOtpSent(true);
    toast.success("OTP sent to your email!");
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === "123456") {
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid OTP. Try 123456");
    }
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      toast.success("Login successful!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="funky-card p-8">
          {/* Header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-3xl gradient-cyber flex items-center justify-center shadow-2xl glow-effect">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
          </motion.div>

          <h1 className="text-3xl font-bold text-center mb-2 text-gradient">
            Electronics Astra
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Admin Panel - {isLogin ? "Login" : "Sign Up"}
          </p>

          {/* Toggle Login/Signup */}
          <div className="flex gap-2 mb-6 p-1 bg-muted rounded-2xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-xl transition-all duration-300 font-medium ${
                isLogin
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-xl transition-all duration-300 font-medium ${
                !isLogin
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* OTP Flow */}
          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@electroastra.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 rounded-2xl"
                  />
                </div>
              </div>

              {isLogin && (
                <div>
                  <Label htmlFor="password">Password (optional)</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 h-12 rounded-2xl"
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                onClick={password ? handlePasswordLogin : undefined}
                className="w-full h-12 rounded-2xl gradient-cyber text-white font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                {password ? (
                  <>
                    Login with Password
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Use OTP for passwordless login
              </p>
            </form>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleVerifyOTP}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-2 h-12 rounded-2xl text-center text-2xl tracking-widest"
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  OTP sent to {email}
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-2xl gradient-cyber text-white font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                Verify & Login
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setOtpSent(false)}
                className="w-full"
              >
                Change Email
              </Button>
            </motion.form>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          For demo: Use any email and OTP: 123456
        </p>
      </motion.div>
    </div>
  );
}
