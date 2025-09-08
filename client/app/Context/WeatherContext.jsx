'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(true);
  const [isNight, setIsNight] = useState(false);

  // 🔹 جلب اسم المدينة
  const fetchLocationName = useCallback(async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      if (res.data?.address) {
        const { city, town, village, country } = res.data.address;
        setLocationName(`${city || town || village || "موقعك"}، ${country || ""}`);
      }
    } catch (err) {
      console.error("❌ Location name error:", err);
    }
  }, []);

  // 🔹 جلب بيانات الطقس
  const fetchWeather = useCallback(async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature`
      );
      const current = res.data.current_weather;
      const humidity = res.data.hourly.relativehumidity_2m[0];
      const feelsLike = res.data.hourly.apparent_temperature[0];

      const data = { ...current, humidity, feelsLike };

      setWeather(data);
      localStorage.setItem("lastWeather", JSON.stringify(data));

      const localHour = new Date().getHours();
      setIsNight(localHour < 6 || localHour >= 18);
      setLoading(false);
    } catch (error) {
      console.error("❌ Weather error:", error);
      setLoading(false);
    }
  }, []);

  // 🔹 تحميل أولي
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeather(latitude, longitude);
          fetchLocationName(latitude, longitude);
        },
        () => {
          const last = localStorage.getItem("lastWeather");
          if (last) setWeather(JSON.parse(last));
          setLoading(false);
        }
      );
    } else {
      const last = localStorage.getItem("lastWeather");
      if (last) setWeather(JSON.parse(last));
      setLoading(false);
    }

    // تحديث كل 10 دقائق فقط
    const interval = setInterval(() => {
      navigator.geolocation?.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude)
      );
    }, 600000);

    return () => clearInterval(interval);
  }, [fetchWeather, fetchLocationName]);

  return (
    <WeatherContext.Provider value={{ weather, locationName, loading, isNight }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
