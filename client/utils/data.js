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

  // خريطة تحويل الأسماء
  export const recitersMap = {
    "AbdulBaset AbdulSamad": "عبدالباسط عبدالصمد",
    "Abdur-Rahman as-Sudais": "عبدالرحمن السديس",
    "Abu Bakr al-Shatri": "أبو بكر الشاطري",
    "Hani ar-Rifai": "هاني الرفاعي",
    "Mahmoud Khalil Al-Husary": "محمود خليل الحصري",
    "Mishari Rashid al-`Afasy": "مشاري بن راشد العفاسي",
    "Mohamed Siddiq al-Minshawi": "محمد صديق المنشاوي",
    "Sa`ud ash-Shuraym": "سعود الشريم",
    "Mohamed al-Tablawi": "محمد محمود الطبلاوي"
  };

export const surahNamesArabic = [
  "الفاتحة",
  "البقرة",
  "آل عمران",
  "النساء",
  "المائدة",
  "الأنعام",
  "الأعراف",
  "الأنفال",
  "التوبة",
  "يونس",
  "هود",
  "يوسف",
  "الرعد",
  "إبراهيم",
  "الحجر",
  "النحل",
  "الإسراء",
  "الكهف",
  "مريم",
  "طه",
  "الأنبياء",
  "الحج",
  "المؤمنون",
  "النور",
  "الفرقان",
  "الشعراء",
  "النمل",
  "القصص",
  "العنكبوت",
  "الروم",
  "لقمان",
  "السجدة",
  "الأحزاب",
  "سبإ",
  "فاطر",
  "يس",
  "الصافات",
  "ص",
  "الزمر",
  "غافر",
  "فصلت",
  "الشورى",
  "الزخرف",
  "الدخان",
  "الجاثية",
  "الأحقاف",
  "محمد",
  "الفتح",
  "الحجرات",
  "ق",
  "الذاريات",
  "الطور",
  "النجم",
  "القمر",
  "الرحمن",
  "الواقعة",
  "الحديد",
  "المجادلة",
  "الحشر",
  "الممتحنة",
  "الصف",
  "الجمعة",
  "المنافقون",
  "التغابن",
  "الطلاق",
  "التحريم",
  "الملك",
  "القلم",
  "الحاقة",
  "المعارج",
  "نوح",
  "الجن",
  "المزمل",
  "المدثر",
  "القيامة",
  "الإنسان",
  "المرسلات",
  "النبأ",
  "النازعات",
  "عبس",
  "التكوير",
  "الإنفطار",
  "المطففين",
  "الإنشقاق",
  "البروج",
  "الطارق",
  "الأعلى",
  "الغاشية",
  "الفجر",
  "البلد",
  "الشمس",
  "الليل",
  "الضحى",
  "الشرح",
  "التين",
  "العلق",
  "القدر",
  "البينة",
  "الزلزلة",
  "العاديات",
  "القارعة",
  "التكاثر",
  "العصر",
  "الهمزة",
  "الفيل",
  "قريش",
  "الماعون",
  "الكوثر",
  "الكافرون",
  "النصر",
  "المسد",
  "الإخلاص",
  "الفلق",
  "الناس",
];


export const menshQuran = [
  { "id": 1, "name": "الفاتحة", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/001.mp3" },
  { "id": 2, "name": "البقرة", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/002.mp3" },
  { "id": 3, "name": "آل عمران", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/003.mp3" },
  { "id": 4, "name": "النساء", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/004.mp3" },
  { "id": 5, "name": "المائدة", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/005.mp3" },
  { "id": 6, "name": "الأنعام", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/006.mp3" },
  { "id": 7, "name": "الأعراف", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/007.mp3" },
  { "id": 8, "name": "الأنفال", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/008.mp3" },
  { "id": 9, "name": "التوبة", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/009.mp3" },
  { "id": 10, "name": "يونس", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/010.mp3" },
  { "id": 11, "name": "هود", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/011.mp3" },
  { "id": 12, "name": "يوسف", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/012.mp3" },
  { "id": 13, "name": "الرعد", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/013.mp3" },
  { "id": 14, "name": "إبراهيم", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/014.mp3" },
  { "id": 15, "name": "الحجر", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/015.mp3" },
  { "id": 16, "name": "النحل", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/016.mp3" },
  { "id": 17, "name": "الإسراء", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/017.mp3" },
  { "id": 18, "name": "الكهف", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/018.mp3" },
  { "id": 19, "name": "مريم", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/019.mp3" },
  { "id": 20, "name": "طه", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/020.mp3" },
  { "id": 21, "name": "الأنبياء", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/021.mp3" },
  { "id": 22, "name": "الحج", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/022.mp3" },
  { "id": 23, "name": "المؤمنون", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/023.mp3" },
  { "id": 24, "name": "النور", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/024.mp3" },
  { "id": 25, "name": "الفرقان", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/025.mp3" },
  { "id": 26, "name": "الشعراء", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/026.mp3" },
  { "id": 27, "name": "النمل", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/027.mp3" },
  { "id": 28, "name": "القصص", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/028.mp3" },
  { "id": 29, "name": "العنكبوت", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/029.mp3" },
  { "id": 30, "name": "الروم", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/030.mp3" },
  { "id": 31, "name": "لقمان", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/031.mp3" },
  { "id": 32, "name": "السجدة", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/032.mp3" },
  { "id": 33, "name": "الأحزاب", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/033.mp3" },
  { "id": 34, "name": "سبإ", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/034.mp3" },
  { "id": 35, "name": "فاطر", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/035.mp3" },
  { "id": 36, "name": "يس", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/036.mp3" },
  { "id": 37, "name": "الصافات", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/037.mp3" },
  { "id": 38, "name": "ص", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/038.mp3" },
  { "id": 39, "name": "الزمر", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/039.mp3" },
  { "id": 40, "name": "غافر", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/040.mp3" },
  { "id": 41, "name": "فصلت", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/041.mp3" },
  { "id": 42, "name": "الشورى", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/042.mp3" },
  { "id": 43, "name": "الزخرف", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/043.mp3" },
  { "id": 44, "name": "الدخان", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/044.mp3" },
  { "id": 45, "name": "الجاثية", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/045.mp3" },
  { "id": 46, "name": "الأحقاف", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/046.mp3" },
  { "id": 47, "name": "محمد", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/047.mp3" },
  { "id": 48, "name": "الفتح", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/048.mp3" },
  { "id": 49, "name": "الحجرات", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/049.mp3" },
  { "id": 50, "name": "ق", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/050.mp3" },
  { "id": 51, "name": "الذاريات", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/051.mp3" },
  { "id": 52, "name": "الطور", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/052.mp3" },
  { "id": 53, "name": "النجم", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/053.mp3" },
  { "id": 54, "name": "القمر", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/054.mp3" },
  { "id": 55, "name": "الرحمن", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/055.mp3" },
  { "id": 56, "name": "الواقعة", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/056.mp3" },
  { "id": 57, "name": "الحديد", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/057.mp3" },
  { "id": 58, "name": "المجادلة", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/058.mp3" },
  { "id": 59, "name": "الحشر", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/059.mp3" },
  { "id": 60, "name": "الممتحنة", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/060.mp3" },
  { "id": 61, "name": "الصف", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/061.mp3" },
  { "id": 62, "name": "الجمعة", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/062.mp3" },
  { "id": 63, "name": "المنافقون", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/063.mp3" },
  { "id": 64, "name": "التغابن", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/064.mp3" },
  { "id": 65, "name": "الطلاق", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/065.mp3" },
  { "id": 66, "name": "التحريم", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/066.mp3" },
  { "id": 67, "name": "الملك", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/067.mp3" },
  { "id": 68, "name": "القلم", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/068.mp3" },
  { "id": 69, "name": "الحاقة", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/069.mp3" },
  { "id": 70, "name": "المعارج", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/070.mp3" },
  { "id": 71, "name": "نوح", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/071.mp3" },
  { "id": 72, "name": "الجن", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/072.mp3" },
  { "id": 73, "name": "المزمل", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/073.mp3" },
  { "id": 74, "name": "المدثر", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/074.mp3" },
  { "id": 75, "name": "القيامة", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/075.mp3" },
  { "id": 76, "name": "الإنسان", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/076.mp3" },
  { "id": 77, "name": "المرسلات", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/077.mp3" },
  { "id": 78, "name": "النبأ", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/078.mp3" },
  { "id": 79, "name": "النازعات", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/079.mp3" },
  { "id": 80, "name": "عبس", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/080.mp3" },
  { "id": 81, "name": "التكوير", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/081.mp3" },
  { "id": 82, "name": "الإنفطار", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/082.mp3" },
  { "id": 83, "name": "المطففين", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/083.mp3" },
  { "id": 84, "name": "الإنشقاق", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/084.mp3" },
  { "id": 85, "name": "البروج", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/085.mp3" },
  { "id": 86, "name": "الطارق", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/086.mp3" },
  { "id": 87, "name": "الأعلى", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/087.mp3" },
  { "id": 88, "name": "الغاشية", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/088.mp3" },
  { "id": 89, "name": "الفجر", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/089.mp3" },
  { "id": 90, "name": "البلد", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/090.mp3" },
  { "id": 91, "name": "الشمس", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/091.mp3" },
  { "id": 92, "name": "الليل", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/092.mp3" },
  { "id": 93, "name": "الضحى", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/093.mp3" },
  { "id": 94, "name": "الشرح", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/094.mp3" },
  { "id": 95, "name": "التين", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/095.mp3" },
  { "id": 96, "name": "العلق", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/096.mp3" },
  { "id": 97, "name": "القدر", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/097.mp3" },
  { "id": 98, "name": "البينة", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/098.mp3" },
  { "id": 99, "name": "الزلزلة", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/099.mp3" },
  { "id": 100, "name": "العاديات", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/100.mp3" },
  { "id": 101, "name": "القارعة", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/101.mp3" },
  { "id": 102, "name": "التكاثر", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/102.mp3" },
  { "id": 103, "name": "العصر", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/103.mp3" },
  { "id": 104, "name": "الهمزة", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/104.mp3" },
  { "id": 105, "name": "الفيل", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/105.mp3" },
  { "id": 106, "name": "قريش", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/106.mp3" },
  { "id": 107, "name": "الماعون", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/107.mp3" },
  { "id": 108, "name": "الكوثر", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/108.mp3" },
  { "id": 109, "name": "الكافرون", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/109.mp3" },
  { "id": 110, "name": "النصر", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/110.mp3" },
  { "id": 111, "name": "المسد", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/111.mp3" },
  { "id": 112, "name": "الإخلاص", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/112.mp3" },
  { "id": 113, "name": "الفلق", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/113.mp3" },
  { "id": 114, "name": "الناس", "url": "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/114.mp3" }
]
