import { Amiri_Quran, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { PrayersContextProvider } from "./Context/PrayerContext";
import { AuthProvider } from "./Context/UserContext";
import { AlertContextProvider } from "./Context/AlertContext";
import { ReciterProvider } from "./Context/RecitersContext";
import { WeatherProvider } from "./Context/WeatherContext";
import { HadithProvider } from "./Context/HadithContext";
import { QuranProvider } from "./Context/QuranContext";


const AmiriQuran = Amiri_Quran({
  variable: "--font-amiri-quran",
  subsets: ["latin"],
  weight : ["400"],
});

const IBMArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Islam | الطريق إلى النور",
  description: "منصة إسلامية متكاملة للقرآن الكريم، الأحاديث النبوية، ومواقيت الصلاة بتصميم عصري وأنيق.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`min-h-screen bg-[#FDFCF0] ${AmiriQuran.variable} ${IBMArabic.variable} font-arabic antialiased text-slate-800 selection:bg-emerald-100 selection:text-emerald-900`}
      >
        <AlertContextProvider>
          <AuthProvider>
            <ReciterProvider>
              <QuranProvider>
                <HadithProvider>
                  <WeatherProvider>
                    <PrayersContextProvider>
                      <div className="relative z-10">
                        {children}
                      </div>
                    </PrayersContextProvider>
                  </WeatherProvider>
                </HadithProvider>
              </QuranProvider>
            </ReciterProvider>
          </AuthProvider>
        </AlertContextProvider>
      </body>
    </html>
  );
}

