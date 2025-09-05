import { useState, useEffect } from "react";
import { BellRing } from "lucide-react";

export default function EnableAdhanButton() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // شوف هل المستخدم فعل الزر قبل كده (localStorage)
    const saved = localStorage.getItem("adhan-enabled");
    if (saved === "true") setEnabled(true);
  }, []);

  const handleEnable = async () => {
    try {
      // طلب إذن الإشعارات
      if (Notification.permission !== "granted") {
        await Notification.requestPermission();
      }

      // تشغيل صوت قصير صامت لتفعيل الـ autoplay
      const audio = new Audio("/silent.mp3");
      await audio.play();

      // حفظ الحالة
      setEnabled(true);
      localStorage.setItem("adhan-enabled", "true");
    } catch (err) {
      console.error("Autoplay blocked:", err);
    }
  };

  if (enabled) return null; // لو مفعل خلاص نخفي الزر

  return (
    <button
      onClick={handleEnable}
      className="flex items-center gap-2 px-6 py-3 rounded-xl 
                 bg-gradient-to-r from-green-700 to-green-600 
                 text-white font-bold shadow-lg hover:scale-105 
                 transition-all"
    >
      <BellRing className="w-5 h-5 text-yellow-300" />
      تفعيل تشغيل الأذان التلقائي
    </button>
  );
}
