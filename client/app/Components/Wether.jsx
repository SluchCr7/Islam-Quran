'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Wind, Droplets, Thermometer, Compass, MapPin } from 'lucide-react';

// خلفيات ديناميكية
const weatherColors = {
  day: {
    Clear: 'from-yellow-300 via-orange-400 to-amber-600',
    Clouds: 'from-gray-300 via-gray-400 to-gray-600',
    Rain: 'from-blue-400 via-blue-500 to-blue-700',
    Snow: 'from-sky-200 via-sky-300 to-gray-200',
    Thunderstorm: 'from-purple-500 via-purple-600 to-indigo-800',
    Mist: 'from-gray-200 via-gray-300 to-gray-400',
  },
  night: {
    Clear: 'from-indigo-900 via-blue-900 to-slate-900',
    Clouds: 'from-gray-600 via-gray-700 to-gray-900',
    Rain: 'from-blue-900 via-blue-800 to-slate-800',
    Snow: 'from-gray-500 via-gray-400 to-slate-200',
    Thunderstorm: 'from-purple-900 via-indigo-900 to-black',
    Mist: 'from-gray-600 via-gray-700 to-gray-800',
  },
};

// ترجمة الحالات الجوية
const weatherTranslations = {
  Clear: "صافي",
  Clouds: "غائم",
  Rain: "ممطر",
  Snow: "ثلجي",
  Thunderstorm: "عاصفة رعدية",
  Mist: "ضباب",
};

export default function WeatherWidgetPremium() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNight, setIsNight] = useState(false);
  const [locationName, setLocationName] = useState("");

  // جلب اسم المدينة عبر reverse geocoding
  const fetchLocationName = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      if (res.data?.address) {
        const { city, town, village, country } = res.data.address;
        setLocationName(`${city || town || village || "موقعك"}، ${country || ""}`);
      }
    } catch (err) {
      console.error("Error fetching location name:", err);
    }
  };

  const fetchWeather = async (lat, lon) => {
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
      setLoading(false);

      // تحديد الليل/النهار
      const localHour = new Date().getHours();
      setIsNight(localHour < 6 || localHour >= 18);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeather(latitude, longitude);
          fetchLocationName(latitude, longitude);
        },
        () => {
          // fallback: حاول تجيب آخر بيانات مخزنة
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

    // تحديث كل 10 دقائق
    const interval = setInterval(() => {
      navigator.geolocation?.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude)
      );
    }, 600000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-center text-gray-500">جاري تحميل الطقس...</p>;
  if (!weather) return <p className="text-center text-red-500">تعذر الحصول على بيانات الطقس</p>;

  const temp = Math.round(weather.temperature);
  const feelsLike = Math.round(weather.feelsLike);
  const humidity = weather.humidity;
  const windSpeed = weather.windspeed;
  const windDirection = weather.winddirection;

  // تحديد الحالة الجوية
  const weatherCode = weather.weathercode;
  let mainWeather = 'Clear';
  if ([1,2,3].includes(weatherCode)) mainWeather = 'Clouds';
  else if ([51,53,55,61,63,65].includes(weatherCode)) mainWeather = 'Rain';
  else if ([71,73,75].includes(weatherCode)) mainWeather = 'Snow';
  else if ([95].includes(weatherCode)) mainWeather = 'Thunderstorm';
  else if ([45,48].includes(weatherCode)) mainWeather = 'Mist';

  const colors = isNight ? weatherColors.night[mainWeather] : weatherColors.day[mainWeather];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`max-w-md mx-auto p-6 rounded-3xl shadow-2xl bg-gradient-to-br ${colors} text-white text-center relative overflow-hidden`}
    >
      {/* خلفية زجاجية */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10 rounded-3xl"></div>

      {/* المحتوى */}
      <div className="relative z-10 flex items-center flex-col justify-center">
        {/* أيقونة الطقس */}
        <motion.div
          initial={{ rotate: -20 }}
          animate={{ rotate: 20 }}
          transition={{ repeat: Infinity, duration: 6, repeatType: 'reverse' }}
          className="mx-auto mb-4"
        >
          <span className="text-7xl">
            {mainWeather === 'Rain' ? '🌧️' : 
             mainWeather === 'Snow' ? '❄️' : 
             mainWeather === 'Thunderstorm' ? '⛈️' : 
             mainWeather === 'Clouds' ? '☁️' : '☀️'}
          </span>
        </motion.div>

        {/* حالة الطقس + المدينة */}
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MapPin className="w-5 h-5" /> {locationName || "موقعك"}
        </h2>
        <p className="text-lg mt-1">{weatherTranslations[mainWeather]}</p>
        <p className="text-5xl font-extrabold mt-2">{temp}°C</p>
        <p className="text-sm mt-1">
          {new Date().toLocaleDateString('ar-EG', { weekday: 'long', hour: '2-digit', minute: '2-digit' })}
        </p>

        {/* معلومات إضافية */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
          <div className="flex flex-col items-center">
            <Thermometer className="w-6 h-6 mb-1" />
            <p>الإحساس</p>
            <p className="font-bold">{feelsLike}°</p>
          </div>
          <div className="flex flex-col items-center">
            <Droplets className="w-6 h-6 mb-1" />
            <p>الرطوبة</p>
            <p className="font-bold">{humidity}%</p>
          </div>
          <div className="flex flex-col items-center">
            <Compass className="w-6 h-6 mb-1 transform" style={{ transform: `rotate(${windDirection}deg)` }} />
            <p>الرياح</p>
            <p className="font-bold">{windSpeed} كم/س</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
