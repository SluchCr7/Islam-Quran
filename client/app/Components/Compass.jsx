'use client'
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Compass as CompassIcon, Navigation } from 'lucide-react'

const KAABA = { lat: 21.4225, lon: 39.8262 }

function toRad(d) { return d * Math.PI / 180 }
function toDeg(r) { return r * 180 / Math.PI }

function calculateQiblaBearing(lat, lon) {
  const φ1 = toRad(lat)
  const φ2 = toRad(KAABA.lat)
  const Δλ = toRad(KAABA.lon - lon)

  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x = Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)
  const θ = Math.atan2(y, x)
  return (toDeg(θ) + 360) % 360
}

function correctedHeading(alpha) {
  const orientation = window.screen.orientation?.angle || 0
  return (alpha + orientation) % 360
}

function smoothHeading(newVal, oldVal, factor = 0.2) {
  if (oldVal == null) return newVal
  let diff = newVal - oldVal
  if (diff > 180) diff -= 360
  if (diff < -180) diff += 360
  return (oldVal + diff * factor + 360) % 360
}

export default function QiblaCompass({ size = 220 }) {
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState(null)
  const [qibla, setQibla] = useState(null)
  const [heading, setHeading] = useState(null)
  const [permissionNeeded, setPermissionNeeded] = useState(false)

  const watcherRef = useRef(null)
  const orientationHandlerRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('error')
      setErrorMsg('المتصفح لا يدعم تحديد الموقع')
      return
    }

    setStatus('loading')
    watcherRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        setQibla(calculateQiblaBearing(lat, lon))
        setStatus('ready')
      },
      (err) => {
        setStatus('error')
        if (err.code === 1) setErrorMsg('تم رفض الوصول للموقع')
        else setErrorMsg('حدث خطأ في تحديد الموقع')
      },
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 15000 }
    )

    return () => {
      if (watcherRef.current)
        navigator.geolocation.clearWatch(watcherRef.current)
    }
  }, [])

  const orientationHandler = useCallback((e) => {
    let h = null
    if (typeof e.webkitCompassHeading === 'number') {
      h = e.webkitCompassHeading
    } else if (typeof e.alpha === 'number') {
      h = correctedHeading(e.alpha)
    }
    if (h != null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        setHeading(prev => smoothHeading(h, prev))
      })
    }
  }, [])

  useEffect(() => {
    const DeviceOrientationEvent = window.DeviceOrientationEvent
    if (!DeviceOrientationEvent) return

    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      setPermissionNeeded(true)
      return
    }

    window.addEventListener('deviceorientation', orientationHandler, true)
    orientationHandlerRef.current = orientationHandler

    return () => {
      if (orientationHandlerRef.current)
        window.removeEventListener('deviceorientation', orientationHandlerRef.current, true)
      cancelAnimationFrame(frameRef.current)
    }
  }, [orientationHandler])

  const requestOrientationPermission = async () => {
    if (typeof DeviceOrientationEvent?.requestPermission !== 'function') return
    try {
      const res = await DeviceOrientationEvent.requestPermission()
      if (res === 'granted') {
        setPermissionNeeded(false)
        window.addEventListener('deviceorientation', orientationHandler, true)
        orientationHandlerRef.current = orientationHandler
      }
    } catch (err) { }
  }

  const computedRotation = useMemo(() => {
    if (qibla == null) return 0
    if (heading == null) return qibla
    return ((qibla - heading + 360) % 360)
  }, [qibla, heading])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full h-full p-4 flex flex-col items-center justify-center space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Navigation size={20} className="transform rotate-45" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">اتجاه القبلة</h3>
        </div>
        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full inline-block">
          {status === 'loading' ? 'جاري التحديد...' : status === 'error' ? errorMsg : `زاوية القبلة: ${qibla?.toFixed(1)}°`}
        </p>
      </div>

      <div className="relative group" style={{ width: size, height: size }}>
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-[10px] border-emerald-50 shadow-inner translate-z-0" />
        <div className="absolute inset-2 rounded-full border-2 border-emerald-100/50" />

        {/* Compass Face */}
        <div className="absolute inset-4 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/patterns/subtle-pattern.png')] opacity-10" />

          {/* Compass Marks */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-400">N</div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-400">S</div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">W</div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">E</div>

          {/* Needle Container */}
          <div
            style={{
              width: '100%',
              height: '100%',
              transform: `rotate(${computedRotation}deg)`,
              transition: 'transform 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
            className="absolute flex items-center justify-center"
          >
            {/* The Needle */}
            <div className="relative w-1.5 h-[70%] flex flex-col items-center">
              <div className="w-full flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-full shadow-lg" />
              <div className="w-full flex-1 bg-gradient-to-b from-white to-slate-200 rounded-b-full shadow-lg" />

              {/* Arrow Head */}
              <div className="absolute top-0 -translate-y-[80%] scale-150">
                <div className="w-4 h-4 rounded-full bg-gold-accent flex items-center justify-center shadow-lg border-2 border-white">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-green animate-ping" />
                </div>
              </div>
            </div>
          </div>

          {/* Center Nut */}
          <div className="z-10 w-6 h-6 rounded-full bg-white border-4 border-emerald-500 shadow-xl" />
        </div>
      </div>

      {permissionNeeded && (
        <button
          onClick={requestOrientationPermission}
          className="mt-4 px-6 py-2 bg-primary-green text-white text-xs font-bold rounded-full shadow-lg shadow-emerald-900/10 hover:bg-emerald-800 transition-all"
        >
          تفعيل المستشعرات للهاتف
        </button>
      )}

      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
        <MapPin size={12} className="text-emerald-500" />
        <span>إلى مكة المكرمة</span>
      </div>
    </motion.div>
  )
}

