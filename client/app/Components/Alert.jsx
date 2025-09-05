'use client';
import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const Alert = ({ notify }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (notify) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // يختفي بعد 3 ثواني
      return () => clearTimeout(timer);
    }
  }, [notify]);

  return (
    <div
      className={`fixed top-6 right-6 z-[1000] transition-all duration-500 transform 
      ${visible ? 'opacity-100 translate-x-0 w-[80%] md:w-[360px]' : 'opacity-0 translate-x-10 w-0'}
      flex items-center gap-4 p-5 rounded-2xl shadow-xl 
      bg-emerald-600/90 backdrop-blur-lg border border-emerald-400/30`}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 shadow-md">
        <FaCheck className="text-white text-lg" />
      </div>
      <p className="text-white text-sm font-medium">{notify}</p>
    </div>
  );
};

export default Alert;
