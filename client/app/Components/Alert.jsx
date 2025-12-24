'use client';
import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Alert = ({ notify, type = "success" }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (notify) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notify]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          className="fixed top-24 left-6 z-[9999] flex items-center gap-4 p-4 pr-6 rounded-2xl shadow-2xl bg-white border border-emerald-50 max-w-[90vw] md:max-w-md overflow-hidden group"
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-sm">
            <CheckCircle2 size={24} />
          </div>

          <div className="flex-1">
            <h4 className="text-sm font-black text-slate-800 tracking-tight">تنبيه النظام</h4>
            <p className="text-xs font-bold text-slate-400 mt-1">{notify}</p>
          </div>

          <div className="absolute bottom-0 right-0 h-1 bg-emerald-500 origin-right w-full animate-progress-timer" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;

