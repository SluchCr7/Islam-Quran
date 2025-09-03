import { Clock, Calendar, Moon, Sunrise, Sun, Sunset, Sparkles, Compass, BookOpen } from 'lucide-react'

export const cites = [
    {
      id: 1,
      displayName: "القاهرة",
      code: "cairo"
    },
    {
      id: 2,
      displayName: "الاسكندرية",
      code: "alex"
    },
    {
      id: 3,
      displayName: "اسوان",
      code: "aswan"
    },
    {
      id: 4,
      displayName: "الغردقة",
      code: "Hurghada"
    },
    {
      id: 5,
      displayName: "الفيوم",
      code: "fayoum"
    },
    {
      id: 6,
      displayName: "المنيا",
      code: "Minya"
    },
    {
      id: 7,
      displayName: "الاسماعيلية",
      code: "ismailia"
    },
    {
      id: 8,
      displayName: "اسيوط",
      code: "Asyut"
    },
    {
      id: 9,
      displayName: "بني سويف",
      code: "Beni Suef"
    },
    {
      id: 10,
      displayName: "بورسعيد",
      code: "Port Said"
    },
    {
      id: 11,
      displayName: "دمياط",
      code: "Damietta"
    },
    {
      id: 12,
      displayName: "جنوب سيناء",
      code: "South Sinai"
    },
    {
      id: 13,
      displayName: "كفر الشيخ",
      code: "Kafr El-Shaikh"
    },
    {
      id: 14,
      displayName: "مطروح",
      code: "Marsa Matruh"
    },
    {
      id: 15,
      displayName: "المنصورة",
      code: "Mansoura"
    },
    {
      id: 16,
      displayName: "الاقصر",
      code: "Luxor"
    },
    {
      id: 17,
      displayName: "شمال سيناء",
      code: "North Sinai"
    },
    {
      id: 18,
      displayName: "سوهاج",
      code: "Sohag"
    },
    {
      id: 19,
      displayName: "قنا",
      code: "Qena"  
    },
    {
      id: 20,
      displayName: "البحيرة",
      code: "Beheira"
    },
    {
      id: 21,
      displayName: "الدقهلية",
      code: "Dakahlia"
    },
    {
      id: 22,
      displayName: "الشرقية",
      code: "Al-Sharqia"
    },
    {
      id: 23,
      displayName: "القليوبية",
      code: "Al-Qalyubia"
    },
    {
      id: 24,
      displayName: "الغربية",
      code: "Gharbia" 
    },
    {
      id: 25,
      displayName: "الفيوم",
      code: "Faiyum"
    },
    {
      id: 26,
      displayName: "الوادي الجديد",
      code: "The New Valley "
    },
]
  
export const bigCitiesByCountry = {
    Egypt: [
    { en: "Cairo", ar: "القاهرة" },
    { en: "Giza", ar: "الجيزة" },
    { en: "Alexandria", ar: "الإسكندرية" },
    { en: "Port Said", ar: "بورسعيد" },
    { en: "Suez", ar: "السويس" },
    { en: "Aswan", ar: "أسوان" },
    { en: "Luxor", ar: "الأقصر" },
    { en: "Mansoura", ar: "المنصورة" },
    { en: "Zagazig", ar: "الزقازيق" },
    { en: "Tanta", ar: "طنطا" },
    { en: "Al-Wadi Al-Jadid", ar: "الوادي الجديد" },
    { en: "Al-Mansourah", ar: "المنصورة" },
    { en: "Al-Fayoum", ar: "الفيوم" },
    { en: "Al-Minya", ar: "المنيا" },
    ],
    SaudiArabia: [
      { en: "Riyadh", ar: "الرياض" },
      { en: "Jeddah", ar: "جدة" },
      { en: "Makkah", ar: "مكة المكرمة" },
      { en: "Medina", ar: "المدينة المنورة" },
      { en: "Dammam", ar: "الدمام" },
      { en: "Tabuk", ar: "تبوك" },
      { en: "Abha", ar: "أبها" },
      { en: "Al Khobar", ar: "الخبر" },
      { en: "Hail", ar: "حائل" }
    ],
    Algeria: [
      { en: "Algiers", ar: "الجزائر" },
      { en: "Oran", ar: "وهران" },
      { en: "Constantine", ar: "قسنطينة" },
      { en: "Annaba", ar: "عنابة" },
      { en: "Blida", ar: "البليدة" },
      { en: "Batna", ar: "باتنة" },
      { en: "Setif", ar: "سطيف" },
      { en: "Tlemcen", ar: "تلمسان" }
    ],
    Morocco: [
      { en: "Casablanca", ar: "الدار البيضاء" },
      { en: "Rabat", ar: "الرباط" },
      { en: "Marrakesh", ar: "مراكش" },
      { en: "Fez", ar: "فاس" },
      { en: "Tangier", ar: "طنجة" },
      { en: "Agadir", ar: "أكادير" },
      { en: "Oujda", ar: "وجدة" },
      { en: "Kenitra", ar: "القنيطرة" }
    ],
    Tunisia: [
      { en: "Tunis", ar: "تونس" },
      { en: "Sfax", ar: "صفاقس" },
      { en: "Sousse", ar: "سوسة" },
      { en: "Kairouan", ar: "القيروان" },
      { en: "Gabes", ar: "قابس" },
      { en: "Bizerte", ar: "بنزرت" },
      { en: "Ariana", ar: "أريانة" },
      { en: "Monastir", ar: "المنستير" }
    ],
    Libya: [
      { en: "Tripoli", ar: "طرابلس" },
      { en: "Benghazi", ar: "بنغازي" },
      { en: "Misrata", ar: "مصراتة" },
      { en: "Al Bayda", ar: "البيضاء" },
      { en: "Zawiya", ar: "الزاوية" },
      { en: "Sabha", ar: "سبها" },
      { en: "Derna", ar: "درنة" }
    ],
    Jordan: [
      { en: "Amman", ar: "عمّان" },
      { en: "Zarqa", ar: "الزرقاء" },
      { en: "Irbid", ar: "إربد" },
      { en: "Aqaba", ar: "العقبة" },
      { en: "Salt", ar: "السلط" },
      { en: "Madaba", ar: "مادبا" }
    ],
    Lebanon: [
      { en: "Beirut", ar: "بيروت" },
      { en: "Tripoli", ar: "طرابلس" },
      { en: "Sidon", ar: "صيدا" },
      { en: "Tyre", ar: "صور" },
      { en: "Zahle", ar: "زحلة" },
      { en: "Jounieh", ar: "جونية" }
    ],
    Syria: [
      { en: "Damascus", ar: "دمشق" },
      { en: "Aleppo", ar: "حلب" },
      { en: "Homs", ar: "حمص" },
      { en: "Latakia", ar: "اللاذقية" },
      { en: "Hama", ar: "حماة" },
      { en: "Tartus", ar: "طرطوس" }
    ],
    Iraq: [
      { en: "Baghdad", ar: "بغداد" },
      { en: "Basra", ar: "البصرة" },
      { en: "Mosul", ar: "الموصل" },
      { en: "Erbil", ar: "أربيل" },
      { en: "Kirkuk", ar: "كركوك" },
      { en: "Najaf", ar: "النجف" },
      { en: "Karbala", ar: "كربلاء" }
    ],
    Palestine: [
      { en: "Jerusalem", ar: "القدس" },
      { en: "Gaza", ar: "غزة" },
      { en: "Hebron", ar: "الخليل" },
      { en: "Nablus", ar: "نابلس" },
      { en: "Ramallah", ar: "رام الله" },
      { en: "Bethlehem", ar: "بيت لحم" }
    ],
    Yemen: [
      { en: "Sanaa", ar: "صنعاء" },
      { en: "Aden", ar: "عدن" },
      { en: "Taiz", ar: "تعز" },
      { en: "Ibb", ar: "إب" },
      { en: "Al Hudaydah", ar: "الحديدة" },
      { en: "Mukalla", ar: "المكلا" }
    ],
    UAE: [
      { en: "Abu Dhabi", ar: "أبو ظبي" },
      { en: "Dubai", ar: "دبي" },
      { en: "Sharjah", ar: "الشارقة" },
      { en: "Ajman", ar: "عجمان" },
      { en: "Al Ain", ar: "العين" },
      { en: "Ras Al Khaimah", ar: "رأس الخيمة" }
    ],
    Qatar: [
      { en: "Doha", ar: "الدوحة" },
      { en: "Al Wakrah", ar: "الوكرة" },
      { en: "Al Rayyan", ar: "الريان" },
      { en: "Umm Salal", ar: "أم صلال" }
    ],
    Bahrain: [
      { en: "Manama", ar: "المنامة" },
      { en: "Riffa", ar: "الرفاع" },
      { en: "Muharraq", ar: "المحرق" },
      { en: "Isa Town", ar: "مدينة عيسى" }
    ],
    Kuwait: [
      { en: "Kuwait City", ar: "مدينة الكويت" },
      { en: "Hawalli", ar: "حولي" },
      { en: "Farwaniya", ar: "الفروانية" },
      { en: "Ahmadi", ar: "الأحمدي" },
      { en: "Jahra", ar: "الجهراء" }
    ],
    Oman: [
      { en: "Muscat", ar: "مسقط" },
      { en: "Salalah", ar: "صلالة" },
      { en: "Sohar", ar: "صحار" },
      { en: "Nizwa", ar: "نزوى" },
      { en: "Sur", ar: "صور" },
      { en: "Ibri", ar: "عبري" }
    ]
  };
  


export const PRAYER_META = {
  Fajr: { ar: 'الفجر', Icon: Sunrise },
  Dhuhr: { ar: 'الظهر', Icon: Sun },
  Asr: { ar: 'العصر', Icon: Sun },
  Maghrib: { ar: 'المغرب', Icon: Sunset },
  Isha: { ar: 'العشاء', Icon: Moon },
}

export const PRAYER_BG = {
  Fajr: '/fajr-prayer.png',
  Dhuhr: '/dhhr-prayer-mosque.png',
  Asr: '/asr-prayer-mosque.png',
  Maghrib: '/sunset-prayer-mosque.png',
  Isha: '/night-prayer-mosque.png',
}


export const AsmaulHusnaNames = [
  "ٱلرَّحْمَـٰن",
  "ٱلرَّحِيم",
  "ٱلْمَلِك",
  "ٱلْقُدُّوس",
  "ٱلسَّلَام",
  "ٱلْمُؤْمِن",
  "ٱلْمُهَيْمِن",
  "ٱلْعَزِيز",
  "ٱلْجَبَّار",
  "ٱلْمُتَكَبِّر",
  "ٱلْخَالِق",
  "ٱلْبَارِئ",
  "ٱلْمُصَوِّر",
  "ٱلْغَفَّار",
  "ٱلْقَهَّار",
  "ٱلْوَهَّاب",
  "ٱلرَّزَّاق",
  "ٱلْفَتَّاح",
  "ٱلْعَلِيم",
  "ٱلْقَابِض",
  "ٱلْبَاسِط",
  "ٱلْخَافِض",
  "ٱلرَّافِع",
  "ٱلْمُعِز",
  "ٱلْمُذِل",
  "ٱلسَّمِيع",
  "ٱلْبَصِير",
  "ٱلْحَكَم",
  "ٱلْعَدْل",
  "ٱلْخَبِير",
  "ٱلْحَلِيم",
  "ٱلْعَظِيم",
  "ٱلْغَفُور",
  "ٱلشَّكُور",
  "ٱلْعَلِيّ",
  "ٱلْكَبِير",
  "ٱلْحَفِيظ",
  "ٱلْمُقِيت",
  "ٱلْحَسِيب",
  "ٱلْجَلِيل",
  "ٱلْكَرِيم",
  "ٱلرَّقِيب",
  "ٱلْمُجِيب",
  "ٱلْوَاسِع",
  "ٱلْحَكِيم",
  "ٱلْوَدُود",
  "ٱلْمَجِيد",
  "ٱلْبَاعِث",
  "ٱلشَّهِيد",
  "ٱلْحَق",
  "ٱلْوَكِيل",
  "ٱلْقَوِي",
  "ٱلْمَتِين",
  "ٱلْوَلِيّ",
  "ٱلْحَمِيد",
  "ٱلْمُحْصِي",
  "ٱلْمُبْدِئ",
  "ٱلْمُعِيد",
  "ٱلْمُحْيِي",
  "ٱلْمُمِيت",
  "ٱلْحَيّ",
  "ٱلْقَيُّوم",
  "ٱلْوَاجِد",
  "ٱلْمَاجِد",
  "ٱلْواحِد",
  "ٱلْأَحَد",
  "ٱلصَّمَد",
  "ٱلْقَادِر",
  "ٱلْمُقْتَدِر",
  "ٱلْمُقَدِّم",
  "ٱلْمُؤَخِّر",
  "ٱلأَوَّل",
  "ٱلْآخِر",
  "ٱلظَّاهِر",
  "ٱلْبَاطِن",
  "ٱلْوَالِي",
  "ٱلْمُتَعَالِي",
  "ٱلْبَرّ",
  "ٱلتَّوَّاب",
  "ٱلْمُنْتَقِم",
  "ٱلْعَفُو",
  "ٱلرَّؤُوف",
  "مَالِكُ ٱلْمُلْك",
  "ذُو ٱلْجَلَال وَٱلْإِكْرَام",
  "ٱلْمُقْسِط",
  "ٱلْجَامِع",
  "ٱلْغَنِي",
  "ٱلْمُغْنِي",
  "ٱلْمَانِع",
  "ٱلضَّار",
  "ٱلنَّافِع",
  "ٱلنُّور",
  "ٱلْهَادِي",
  "ٱلْبَدِيع",
  "ٱلْبَاقِي",
  "ٱلْوَارِث",
  "ٱلرَّشِيد",
  "ٱلصَّبُور"
];

export const seerahEvents = [
  // 📍 المرحلة الأولى: قبل البعثة
  {
    title: "مولد النبي ﷺ",
    commentary: ["وُلد النبي ﷺ عام الفيل بمكة المكرمة، وسمّاه جده عبد المطلب."],
    notes: "",
    hijriDate: "12 ربيع الأول عام الفيل",
    start: "0571-04-20"
  },
  // {
  //   title: "الختان",
  //   commentary: ["ختنه جده في اليوم السابع كما كانت عادة العرب."],
  //   notes: "",
  //   hijriDate: "",
  //   start: "0571-04-27"
  // },
  {
    title: "رضاعة النبي ﷺ من ثويبة",
    commentary: ["ثويبة كانت أول مرضعة للنبي ﷺ."],
    notes: "(التواريخ تقريبية)",
    hijriDate: "",
    start: "0571-04-30",
    end: "0571-05-30"
  },
  {
    title: "رضاعة النبي ﷺ عند حليمة السعدية",
    commentary: [
      "كان من المفترض أن تعيده بعد عامين، لكنها طلبت أن يبقى عندها بسبب البركة التي رأت.",
      "فبقي عندها حتى بلغ 4 أو 5 سنوات."
    ],
    notes: "(التواريخ تقريبية)",
    hijriDate: "",
    start: "0571-06-01",
    end: "0576-05-30"
  },
  {
    title: "حادثة شق صدر النبي ﷺ",
    commentary: ["نزل جبريل وشق صدر النبي ﷺ وطهّر قلبه."],
    notes: "(تاريخ تقريبي)",
    hijriDate: "",
    start: "0576-05-30"
  },
  {
    title: "عودة النبي ﷺ إلى أمه",
    commentary: [
      "بعد حادثة شق الصدر، خافت حليمة وأعادته إلى أمه،",
      "فبقي معها حتى بلغ 6 سنوات."
    ],
    notes: "(تاريخ تقريبي)",
    hijriDate: "",
    start: "0576-06-01",
    end: "0577-06-01"
  },
  {
    title: "وفاة أم النبي ﷺ",
    commentary: ["توفيت أمه آمنة بنت وهب في الأبواء بين مكة والمدينة."],
    notes: "",
    hijriDate: "",
    start: "0577-06-01"
  },
  {
    title: "كفالة جده عبد المطلب",
    commentary: ["كفله جده عبد المطلب حتى وفاته."],
    notes: "",
    hijriDate: "",
    start: "0577-06-01",
    end: "0579-06-30"
  },
  {
    title: "كفالة عمه أبي طالب",
    commentary: ["بعد وفاة جده، كفله عمه أبو طالب وكان يحبه كثيرًا."],
    notes: "",
    hijriDate: "",
    start: "0579-07-01"
  },
  {
    title: "رحلته مع عمه إلى الشام ولقاء بحيرا الراهب",
    commentary: [
      "خرج مع عمه أبي طالب في تجارة إلى الشام.",
      "قابله بحيرا الراهب الذي لاحظ علامات النبوة عليه."
    ],
    notes: "",
    hijriDate: "",
    start: "0583-01-01"
  },

  // 📍 المرحلة الثانية: البعثة والدعوة
  {
    title: "نزول الوحي",
    commentary: [
      "نزل جبريل عليه السلام بالوحي في غار حراء وهو في عمر الأربعين.",
      "كانت بداية الرسالة الإسلامية."
    ],
    notes: "",
    hijriDate: "17 رمضان 13 قبل الهجرة",
    start: "0610-08-10"
  },
  {
    title: "الدعوة السرية",
    commentary: [
      "استمرت الدعوة سرًا ثلاث سنوات.",
      "آمن معه قليل من الصحابة مثل خديجة، أبو بكر، علي بن أبي طالب، وزيد بن حارثة."
    ],
    notes: "",
    hijriDate: "",
    start: "0610-08-10",
    end: "0613-08-10"
  },
  {
    title: "الدعوة الجهرية",
    commentary: [
      "بدأ النبي ﷺ بدعوة عشيرته وأهل مكة جهراً.",
      "تعرض للأذى والاستهزاء من قريش."
    ],
    notes: "",
    hijriDate: "",
    start: "0613-08-11"
  },
  {
    title: "الهجرة إلى المدينة",
    commentary: [
      "بعد اشتداد أذى قريش، أذن الله للمسلمين بالهجرة.",
      "هاجر النبي ﷺ من مكة إلى المدينة في حدث عظيم غيّر مجرى التاريخ."
    ],
    notes: "",
    hijriDate: "1 هـ",
    start: "0622-09-24"
  },

  // 📍 المرحلة الثالثة: في المدينة
  {
    title: "غزوة بدر الكبرى",
    commentary: [
      "أول معركة فاصلة بين المسلمين وقريش.",
      "نصر الله المسلمين رغم قلة عددهم."
    ],
    notes: "",
    hijriDate: "17 رمضان 2 هـ",
    start: "0624-03-13"
  },
  {
    title: "غزوة أحد",
    commentary: [
      "خرج المسلمون لملاقاة قريش في أحد.",
      "استشهد سبعون من الصحابة ومنهم حمزة رضي الله عنه."
    ],
    notes: "",
    hijriDate: "شوال 3 هـ",
    start: "0625-03-23"
  },
  {
    title: "غزوة الخندق (الأحزاب)",
    commentary: [
      "اجتمعت قريش والأحزاب على حرب المسلمين.",
      "حفر المسلمون الخندق وحفظهم الله من الأعداء."
    ],
    notes: "",
    hijriDate: "شوال 5 هـ",
    start: "0627-03-31"
  },
  {
    title: "صلح الحديبية",
    commentary: [
      "خرج النبي ﷺ مع أصحابه لأداء العمرة.",
      "منعته قريش، فتم الصلح الذي كان فتحًا مبينًا للإسلام."
    ],
    notes: "",
    hijriDate: "ذو القعدة 6 هـ",
    start: "0628-03-18"
  },
  {
    title: "فتح مكة",
    commentary: [
      "عاد النبي ﷺ بجيش عظيم إلى مكة.",
      "دخلها فاتحًا عزيزًا، فعفا عن أهلها وقال: اذهبوا فأنتم الطلقاء."
    ],
    notes: "",
    hijriDate: "رمضان 8 هـ",
    start: "0630-01-11"
  },

  // 📍 المرحلة الأخيرة: الوداع
  {
    title: "حجة الوداع",
    commentary: [
      "حج النبي ﷺ حجته الوحيدة.",
      "خطب خطبة جامعة أوصى فيها المسلمين بالتمسك بالقرآن والسنة."
    ],
    notes: "",
    hijriDate: "ذو الحجة 10 هـ",
    start: "0632-02-06"
  },
  {
    title: "وفاة النبي ﷺ",
    commentary: [
      "توفي النبي ﷺ في المدينة المنورة عن عمر 63 سنة.",
      "دفن في حجرة عائشة رضي الله عنها."
    ],
    notes: "",
    hijriDate: "12 ربيع الأول 11 هـ",
    start: "0632-06-08"
  }
]
