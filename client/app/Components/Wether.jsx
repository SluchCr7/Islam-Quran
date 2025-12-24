'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplets, Thermometer, MapPin, CloudSun, Sun, CloudRain, CloudLightning, Snowflake, Cloud } from 'lucide-react';
import { useWeather } from '../Context/WeatherContext';

const weatherTranslations = {
  Clear: "صافي",
  Clouds: "غائم",
  Rain: "ممطر",
  Snow: "ثلجي",
  Thunderstorm: "عاصفة رعدية",
  Mist: "ضباب",
};

const getWeatherIcon = (main) => {
  switch (main) {
    case 'Rain': return <CloudRain size={48} className="text-blue-500" />
    case 'Snow': return <Snowflake size={48} className="text-sky-400" />
    case 'Thunderstorm': return <CloudLightning size={48} className="text-indigo-500" />
    case 'Clouds': return <Cloud size={48} className="text-slate-400" />
    case 'Clear': return <Sun size={48} className="text-gold-accent animate-sun" />
    default: return <CloudSun size={48} className="text-emerald-500" />
  }
}

export default function WeatherWidgetPremium() {
  const { weather, locationName, loading, isNight } = useWeather();

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white rounded-[2.5rem] border border-emerald-50">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-green border-t-transparent" />
      </div>
    );
  }

  if (!weather) return null;

  const temp = Math.round(weather.temperature);
  const feelsLike = Math.round(weather.feelsLike);
  const humidity = weather.humidity;
  const windSpeed = weather.windspeed;

  const weatherCode = weather.weathercode;
  let mainWeather = 'Clear';
  if ([1, 2, 3].includes(weatherCode)) mainWeather = 'Clouds';
  else if ([51, 53, 55, 61, 63, 65].includes(weatherCode)) mainWeather = 'Rain';
  else if ([71, 73, 75].includes(weatherCode)) mainWeather = 'Snow';
  else if ([95].includes(weatherCode)) mainWeather = 'Thunderstorm';
  else if ([45, 48].includes(weatherCode)) mainWeather = 'Mist';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full h-full p-8 rounded-[2.5rem] bg-white border border-emerald-50 shadow-2xl shadow-emerald-900/5 overflow-hidden group"
    >
      <div className="absolute inset-0 bg-[url('/patterns/subtle-pattern.png')] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-100 transition-colors duration-700" />

      <div className="relative z-10 h-full flex flex-col items-center justify-between">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-emerald-600" />
            <span className="text-xs font-black text-slate-800 tracking-tight">{locationName || "موقعك الحالي"}</span>
          </div>
          <div className="px-3 py-1 bg-emerald-50 rounded-full">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
              {isNight ? 'ليلاً' : 'نهاراً'}
            </span>
          </div>
        </div>

        {/* Temperature & Icon */}
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-3xl bg-white shadow-xl shadow-emerald-900/5 transform group-hover:scale-110 transition-transform duration-500">
            {getWeatherIcon(mainWeather)}
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-black text-slate-800 flex items-start gap-1">
              {temp}<span className="text-xl text-emerald-500">°C</span>
            </h4>
            <p className="text-sm font-bold text-slate-400 mt-1">{weatherTranslations[mainWeather]}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-3 gap-2">
          {[
            { label: 'الرطوبة', value: `${humidity}%`, icon: Droplets, color: 'text-blue-500' },
            { label: 'الرياح', value: `${windSpeed} ك/س`, icon: Wind, color: 'text-emerald-500' },
            { label: 'يشبه', value: `${feelsLike}°`, icon: Thermometer, color: 'text-orange-500' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100/50">
              <stat.icon size={16} className={`${stat.color} mb-2`} />
              <span className="text-[10px] font-black text-slate-800">{stat.value}</span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

