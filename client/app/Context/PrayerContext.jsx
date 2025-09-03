// 'use client'
// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// export const PrayersCon = createContext();

// export const PrayersContextProvider = ({ children }) => {
//     const [prayers, setPrayers] = useState([]);
//     const [selectedCity, setSelectedCity] = useState('cairo');
//     const [selectedCountry, setSelectedCountry] = useState('egypt');
    
//     const [info, setInfo] = useState({
//         date: '',
//         hijri: '',
//         hijriMonth: '',
//         day: '',
//     });
//     useEffect(() => {
//         const getPrayers = async () => {
//             try {
//                 const res = await axios(
//                     `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=${selectedCountry}&method=8`
//                 );
//                 setPrayers(res.data.data.timings);
//                 setInfo({
//                     date: res.data.data.date.readable,
//                     hijri: res.data.data.date.hijri.date,
//                     hijriMonth: res.data.data.date.hijri.month.ar,
//                     day: res.data.data.date.hijri.weekday.ar
//                 })
//             } catch (err) {
//                 console.log("Error fetching prayer times:", err);
//             }
//         };

//         if (selectedCity && selectedCountry) {
//             getPrayers();
//         }
//     }, [selectedCity, selectedCountry]);

//     return (
//         <PrayersCon.Provider value={{
//             prayers,
//             selectedCity,
//             selectedCountry,
//             setSelectedCity,
//             setSelectedCountry,
//             info
//         }}>
//             {children}
//         </PrayersCon.Provider>
//     );
// };

// export const usePrayer = () => useContext(PrayersCon);


'use client'
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const PrayersCon = createContext();

export const PrayersContextProvider = ({ children }) => {
    const [prayers, setPrayers] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [coords, setCoords] = useState(null);

    const [info, setInfo] = useState({
        date: '',
        hijri: '',
        hijriMonth: '',
        day: '',
        year: "",
        daynum : ""
    });

    // تحديد الموقع الجغرافي
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoords({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("خطأ في تحديد الموقع:", error);
                }
            );
        } else {
            console.error("المتصفح لا يدعم تحديد الموقع الجغرافي");
        }
    }, []);

    // جلب اسم المدينة والدولة من الإحداثيات
    useEffect(() => {
        const getCityAndCountry = async () => {
            if (coords) {
                try {
                    const res = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`
                    );

                    const address = res.data.address;
                    setSelectedCity(address.city || address.town || address.village || "");
                    setSelectedCountry(address.country || "");
                } catch (err) {
                    console.error("خطأ في جلب اسم المدينة والدولة:", err);
                }
            }
        };

        getCityAndCountry();
    }, [coords]);

    // جلب مواقيت الصلاة
    useEffect(() => {
        const getPrayers = async () => {
            try {
                if (!coords) return;

                const res = await axios.get(
                    `https://api.aladhan.com/v1/timings?latitude=${coords.lat}&longitude=${coords.lng}&method=8`
                );

                setPrayers(res.data.data.timings);
                setInfo({
                    date: res.data.data.date.readable,
                    hijri: res.data.data.date.hijri.date,
                    hijriMonth: res.data.data.date.hijri.month.ar,
                    day: res.data.data.date.hijri.weekday.ar,
                    year: res.data.data.date.hijri.year,
                    daynum : res.data.data.date.hijri.day 
                });
            } catch (err) {
                console.log("Error fetching prayer times:", err);
            }
        };

        getPrayers();
    }, [coords]);

    return (
        <PrayersCon.Provider
            value={{
                prayers,
                selectedCity,
                selectedCountry,
                setSelectedCity,
                setSelectedCountry,
                info,
                coords,
            }}
        >
            {children}
        </PrayersCon.Provider>
    );
};

export const usePrayer = () => useContext(PrayersCon);
