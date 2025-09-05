'use client'
import React, { useEffect, useRef, useState } from 'react'

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

// تصحيح زاوية الجهاز حسب اتجاه الشاشة
function correctedHeading(alpha) {
  const orientation = window.screen.orientation?.angle || 0
  return (alpha + orientation) % 360
}

// فلتر تنعيم (moving average بسيط)
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

  // الموقع (تحديث مستمر)
  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('error')
      setErrorMsg('المتصفح لا يدعم Geolocation')
      return
    }

    setStatus('loading')
    watcherRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        const bearing = calculateQiblaBearing(lat, lon)
        setQibla(bearing)
        setStatus('ready')
      },
      (err) => {
        setStatus('error')
        if (err.code === 1) setErrorMsg('رفض الوصول للموقع')
        else setErrorMsg(err.message || 'خطأ في الموقع')
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    )

    return () => {
      if (watcherRef.current)
        navigator.geolocation.clearWatch(watcherRef.current)
    }
  }, [])

  // حساسات الاتجاه
  useEffect(() => {
    const handler = (e) => {
      let h = null
      if (typeof e.webkitCompassHeading === 'number') {
        h = e.webkitCompassHeading
      } else if (typeof e.alpha === 'number') {
        h = correctedHeading(e.alpha)
      }
      if (h != null) {
        setHeading((prev) => smoothHeading(h, prev))
      }
    }

    const tryAddListener = () => {
      const DeviceOrientationEvent = window.DeviceOrientationEvent
      if (!DeviceOrientationEvent) return

      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        setPermissionNeeded(true)
        return
      }

      window.addEventListener('deviceorientation', handler, true)
      orientationHandlerRef.current = handler
    }

    tryAddListener()

    return () => {
      if (orientationHandlerRef.current)
        window.removeEventListener('deviceorientation', orientationHandlerRef.current, true)
    }
  }, [])

  // طلب إذن iOS
  const requestOrientationPermission = async () => {
    if (typeof DeviceOrientationEvent?.requestPermission !== 'function') {
      setErrorMsg('المتصفح لا يتطلب إذن للحساسات')
      return
    }
    try {
      const res = await DeviceOrientationEvent.requestPermission()
      if (res === 'granted') {
        setPermissionNeeded(false)
        const handler = (e) => {
          let h = null
          if (typeof e.webkitCompassHeading === 'number') {
            h = e.webkitCompassHeading
          } else if (typeof e.alpha === 'number') {
            h = correctedHeading(e.alpha)
          }
          if (h != null) {
            setHeading((prev) => smoothHeading(h, prev))
          }
        }
        window.addEventListener('deviceorientation', handler, true)
        orientationHandlerRef.current = handler
      } else {
        setErrorMsg('تم رفض إذن الحساسات')
      }
    } catch (err) {
      setErrorMsg(err?.message || 'فشل طلب الإذن')
    }
  }

  const computedRotation = (() => {
    if (qibla == null) return 0
    if (heading == null) return qibla
    return ((qibla - heading + 360) % 360)
  })()

  return (
    <div className="max-w-md w-full h-full">
      <div className="rounded-2xl bg-[#0d1117] h-full border border-[#30363d] p-4 shadow-md text-center">
        <h3 className="text-lg font-bold mb-2">🧭 بوصلة القبلة</h3>

        <p className="text-sm text-[#9aa3ad] mb-3">
          {status === 'loading' && 'جاري تحديد الموقع...'}
          {status === 'error' && errorMsg}
          {status === 'ready' && qibla != null && `زاوية القبلة: ${qibla.toFixed(1)}°`}
        </p>

        <div className="relative mx-auto" style={{ width: size, height: size }}>
          <div className="rounded-full border border-[#2b3136] absolute inset-0 flex items-center justify-center">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-[#9aa3ad]">N</div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-[#9aa3ad]">S</div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-[#9aa3ad]">W</div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#9aa3ad]">E</div>

            <div
              style={{
                width: size * 0.6,
                height: 6,
                transform: `rotate(${computedRotation}deg)`,
                transformOrigin: '50% 50%',
                transition: 'transform 300ms ease',
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-emerald-400 rounded-full"></div>
              <div
                style={{
                  width: 0, height: 0,
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderTop: '14px solid rgba(250, 204, 21, 1)',
                  position: 'absolute',
                  right: -10,
                  top: -4,
                  transform: 'translateX(-50%) rotate(90deg)'
                }}
              />
            </div>

            <div className="absolute w-6 h-6 bg-[#0d1117] border border-[#30363d] rounded-full"></div>
          </div>
        </div>

        {permissionNeeded && (
          <div className="mt-4">
            <button
              onClick={requestOrientationPermission}
              className="px-4 py-2 bg-emerald-500 rounded-md text-black font-semibold hover:brightness-95"
            >
              السماح بحسّاسات الحركة
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
