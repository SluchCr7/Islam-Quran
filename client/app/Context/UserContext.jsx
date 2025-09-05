'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useAlert } from "./AlertContext";
import Swal from "sweetalert2";
// ✅ إنشاء السياق
const AuthContext = createContext();

// ✅ Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // بيانات المستخدم
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [isLogin , setIsLogin] = useState(false)
  // ------------------- AUTH ACTIONS -------------------


  // ✅ جلب المستخدم من localStorage عند أول تحميل
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const loginState = localStorage.getItem('loginState');

    if (storedUser && loginState === 'true') {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setLoading(false)
    setIsAuthChecked(true);
  }, []);
  // ✅ تسجيل الدخول
  const login = async (Email, Password) => {
    try {
      const res =
        await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/login`,
        { Email, Password },
        { withCredentials: true }
      )
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data));
      localStorage.setItem('loginState', 'true');
  
      showAlert(res.data.message || 'Login successful');
  
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      throw err.response?.data || { message: "خطأ في تسجيل الدخول" };
    }
  };

  const registerUser = async (Name, Email, Password) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/register`,
        { Name, Email, Password },   // أول حرف كابيتال زي Joi
        { withCredentials: true }
      );
      showAlert(res.data.message);
      setTimeout(() => window.location.href = '/Login', 2000);
    } catch (err) {
      throw err.response?.data || { message: "خطأ في التسجيل" };
    }
  };

  // ✅ تسجيل الخروج
  const logout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/logout`);

      Swal.fire({
        title: "هل أنت متأكد؟",
        text: "سيتم تسجيل خروجك من الحساب",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم، سجل الخروج",
        cancelButtonText: "إلغاء",
        background: "#0d1117",  // خلفية داكنة (لو تحب)
        color: "#fff",          // لون النص
      }).then((result) => {
        if (result.isConfirmed) {
          setUser(null);
          setIsLogin(false);
          localStorage.removeItem("user");
          Swal.fire("تم تسجيل الخروج!", "", "success");
        }
      });
    } catch (err) {
      console.error("خطأ في تسجيل الخروج", err);
    }
  };

  // ✅ حذف مستخدم
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/${id}`);
      if (user?._id === id) {
        logout();
      }
    } catch (err) {
      console.error("خطأ في حذف المستخدم", err);
    }
  };

  // ✅ جلب مستخدم محدد
  const getUserById = async (id) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/${id}`);
      return res.data;
    } catch (err) {
      console.error("خطأ في جلب بيانات المستخدم", err);
    }
  };

  // ✅ جلب جميع المستخدمين
  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth`);
      return res.data;
    } catch (err) {
      console.error("خطأ في جلب جميع المستخدمين", err);
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
        const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/${id}`,
        updatedData,
        { withCredentials: true } // لو بتستخدم كوكيز
        )
        return res.data
    } catch (error) {
        console.error("Error updating user:", error.response?.data || error.message)
        throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        registerUser,
        logout,
        deleteUser,
        getUserById,
        getAllUsers,
        updateUser, 
        isAuthChecked, 
        isLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook للاستخدام السهل
export const useAuth = () => useContext(AuthContext);
