'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock } from "lucide-react";
import { useAuth } from "../../Context/UserContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ Email: "", Password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // ✅ مرر القيم بالـ Uppercase
      await login(form.Email, form.Password);
    } catch (err) {
      setError(err.message || "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] relative"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
      >
        <h2 className="text-2xl font-bold text-yellow-400 text-center mb-6">
          تسجيل الدخول
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <User className="absolute right-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              name="Email" // ✅ Capitalized
              placeholder="البريد الإلكتروني"
              value={form.Email}
              onChange={handleChange}
              className="w-full pl-3 pr-10 py-2 rounded-xl bg-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              name="Password" // ✅ Capitalized
              placeholder="كلمة المرور"
              value={form.Password}
              onChange={handleChange}
              className="w-full pl-3 pr-10 py-2 rounded-xl bg-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>
          

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold shadow-lg mt-4 disabled:opacity-50"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          ليس لديك حساب؟{" "}
          <a href="/Register" className="text-yellow-400 hover:underline">
            أنشئ حسابًا الآن
          </a>
        </p>
      </motion.div>
    </div>
  );
}
