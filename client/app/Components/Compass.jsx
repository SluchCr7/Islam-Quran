'use client'
import React, { useEffect, useRef, useState } from 'react'

/**
 * QiblaCompass.jsx
 * - Next.js / React client component
 * - Requires Tailwind (for classes) — can adapt to plain CSS easily
 *
 * Usage:
 * import QiblaCompass from '@/components/QiblaCompass'
 * <QiblaCompass size={220} />
 */

const KAABA = { lat: 21.4225, lon: 39.8262 }

function toRad(d) { return d * Math.PI / 180 }
function toDeg(r) { return r * 180 / Math.PI }

/** حساب Bearing (زاوية) من موقع (lat, lon) إلى الكعبة بالدرجات [0..360) */
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

export default function QiblaCompass({ size = 220 }) {
  const [status, setStatus] = useState('idle') // idle | loading | ready | error | denied
  const [errorMsg, setErrorMsg] = useState(null)
  const [qibla, setQibla] = useState(null) // bearing in degrees (0..360)
  const [heading, setHeading] = useState(null) // device heading in degrees (0..360) or null
  const [permissionNeeded, setPermissionNeeded] = useState(false)
  const watcherRef = useRef(null)
  const orientationHandlerRef = useRef(null)

  // طلب الموقع وحساب زاوية القبلة
  useEffect(() => {
    setStatus('loading')
    if (!navigator.geolocation) {
      setStatus('error')
      setErrorMsg('المتصفح لا يدعم Geolocation')
      return
    }

    const success = (pos) => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      const bearing = calculateQiblaBearing(lat, lon)
      setQibla(bearing)
      setStatus('ready')
    }

    const fail = (err) => {
      setStatus('error')
      if (err.code === 1) setErrorMsg('رفض الوصول للموقع — الرجاء السماح بالوصول للموقع')
      else setErrorMsg(err.message || 'حدث خطأ عند الحصول على الموقع')
    }

    watcherRef.current = navigator.geolocation.getCurrentPosition(success, fail, { enableHighAccuracy: true, maximumAge: 60 * 1000 })
    // no cleanup needed for getCurrentPosition
  }, [])

  // التعامل مع DeviceOrientation (حسّاس الاتجاه)
  useEffect(() => {
    // helper: normalize heading values to [0..360)
    const normalize = (v) => {
      if (typeof v !== 'number' || Number.isNaN(v)) return null
      let deg = v
      // on some devices alpha is 0..360; on iOS webkitCompassHeading exists and is relative to north clockwise
      if (deg < 0) deg = (deg + 360) % 360
      return deg
    }

    // handler when event arrives
    const handler = (e) => {
      // prefer absolute heading properties if available
      // some browsers provide e.webkitCompassHeading (iOS), some provide e.alpha relative to device orientation
      let h = null
      if (typeof e.webkitCompassHeading === 'number') {
        h = normalize(e.webkitCompassHeading) // iOS reports compass heading directly
      } else if (typeof e.absolute === 'boolean' && e.absolute === true && typeof e.alpha === 'number') {
        // absolute alpha (0..360) — heading from device to north
        h = normalize(e.alpha)
      } else if (typeof e.alpha === 'number') {
        // fallback: alpha (relative). This can be used but may be unreliable without screen orientation adjustments.
        h = normalize(e.alpha)
      }
      if (h !== null) setHeading(h)
    }

    // iOS 13+ requires explicit permission for DeviceOrientationEvent
    const tryAddListener = async () => {
      if (typeof window === 'undefined') return
      const DeviceOrientationEvent = window.DeviceOrientationEvent
      if (!DeviceOrientationEvent) {
        // not supported
        return
      }

      // If permission API exists (iOS Safari), ask later on button click; just mark that permission is needed
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        setPermissionNeeded(true)
        return
      }

      // otherwise add listener directly
      window.addEventListener('deviceorientation', handler, true)
      orientationHandlerRef.current = handler
    }

    tryAddListener()

    return () => {
      if (orientationHandlerRef.current) {
        window.removeEventListener('deviceorientation', orientationHandlerRef.current, true)
      }
    }
  }, [])

  // وظيفة لطلب أذن الحركة (iOS) عند الضغط زر
  const requestOrientationPermission = async () => {
    if (typeof DeviceOrientationEvent === 'undefined' || typeof DeviceOrientationEvent.requestPermission !== 'function') {
      setErrorMsg('هذا المتصفح لا يتطلب/لا يدعم طلب إذن الحركة')
      return
    }
    try {
      const res = await DeviceOrientationEvent.requestPermission()
      if (res === 'granted') {
        setPermissionNeeded(false)
        // الآن أضف المستمع
        const handler = (e) => {
          let h = null
          if (typeof e.webkitCompassHeading === 'number') h = e.webkitCompassHeading
          else if (typeof e.alpha === 'number') h = e.alpha
          if (typeof h === 'number') setHeading((h + 360) % 360)
        }
        window.addEventListener('deviceorientation', handler, true)
        orientationHandlerRef.current = handler
      } else {
        setErrorMsg('تم رفض إذن الحركة')
      }
    } catch (err) {
      setErrorMsg(err?.message || 'فشل طلب الإذن')
    }
  }

  // تنظيف عند إزالة الكمبوننت
  useEffect(() => {
    return () => {
      if (orientationHandlerRef.current) {
        window.removeEventListener('deviceorientation', orientationHandlerRef.current, true)
      }
      // no persistent geolocation watcher was set (we used getCurrentPosition)
    }
  }, [])

  // حساب دوران السهم المعروض: إذا عندنا heading (اتجاه الجهاز) => rotate = qibla - heading
  // وإلا إذا لا يوجد heading فنعرض السهم يشير مباشرة للبوصلة (rotate = qibla)
  const computedRotation = (() => {
    if (qibla == null) return 0
    if (heading == null) return qibla // point absolute to qibla assuming north=0
    // rotate so that arrow points correctly relative to device orientation
    // If heading is degrees from north to where device points, then the rotation needed is (qibla - heading)
    let r = qibla - heading
    // normalize
    r = ((r % 360) + 360) % 360
    return r
  })()

  // Small UI state strings
  const statusText = (() => {
    if (status === 'loading') return 'جاري الحصول على الموقع...'
    if (status === 'error') return errorMsg || 'حدث خطأ'
    if (status === 'ready') {
      if (qibla == null) return 'تم الحصول على الموقع لكن لم تُحسب القبلة'
      return `زاوية القبلة: ${qibla.toFixed(2)}°`
    }
    return ''
  })()

  return (
    <div className="max-w-md w-full min-h-[350px]">
      <div className="rounded-2xl bg-[#0d1117] border border-[#30363d] p-4 shadow-md text-center">
        <h3 className="text-lg font-bold mb-2">🧭 بوصلة القبلة</h3>

        <p className="text-sm text-[#9aa3ad] mb-3">{statusText}</p>

        <div className="relative mx-auto" style={{ width: size, height: size }}>
          {/* Outer ring / decoration */}
          <div
            className="rounded-full border border-[#2b3136] absolute inset-0 flex items-center justify-center"
            style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)' }}
          >
            {/* Degree labels (N) */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-[#9aa3ad]">N</div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-[#9aa3ad]">S</div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-[#9aa3ad]">W</div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#9aa3ad]">E</div>

            {/* Compass arrow (pivot at center-left; we rotate it) */}
            <div
              id="arrow"
              className="absolute"
              style={{
                width: size * 0.6,
                height: 6,
                left: `calc(50% - ${size * 0.6 / 2}px)`,
                top: `calc(50% - 3px)`,
                transform: `rotate(${computedRotation}deg)`,
                transformOrigin: '50% 50%',
                transition: 'transform 450ms ease',
                pointerEvents: 'none'
              }}
            >
              {/* arrow body */}
              <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-emerald-400 rounded-full shadow-md"></div>
              {/* arrow head */}
              <div
                style={{
                  width: 0,
                  height: 0,
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

            {/* center dot */}
            <div className="absolute w-6 h-6 bg-[#0d1117] border border-[#30363d] rounded-full" style={{ boxShadow: '0 0 10px rgba(16,185,129,0.08)' }}></div>
          </div>
        </div>

        {/* Permission / messages */}
        <div className="mt-4 space-y-2">
          {permissionNeeded && (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-[#9aa3ad]">يحتاج المتصفح إذن الوصول إلى حسّاسات الحركة للمحاكاة الحقيقية للقِبلة.</p>
              <button
                onClick={requestOrientationPermission}
                className="mx-auto px-4 py-2 bg-emerald-500 rounded-md text-black font-semibold hover:brightness-95"
              >
                السماح بحسّاسات الحركة
              </button>
            </div>
          )}

          {status === 'error' && (
            <p className="text-sm text-red-400">{errorMsg}</p>
          )}

          {/* Fallback explanation */}
          {status === 'ready' && (
            <p className="text-xs text-[#9aa3ad]">إن لم يتحرك السهم، تأكد من السماح بالوصول للموقع وحسّاسات الجهاز.</p>
          )}
        </div>
      </div>
    </div>
  )
}
