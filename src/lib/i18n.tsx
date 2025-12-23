import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Language = 'en' | 'ar'

type Dict = Record<string, string>

const DICT: Record<Language, Dict> = {
  en: {
    // Global
    'lang.english': 'English',
    'lang.arabic': 'العربية',

    'global.loadingTitle': 'Loading…',
    'global.loadingSubtitle': 'Preparing the experience. Please wait a moment.',
    'global.loadingFooter': 'Optimizing images & animations • Secure-by-design',

    // Map
    'map.locateMe': 'Locate me',
    'map.directions': 'Directions',
    'map.openExternal': 'Open in Maps',
    'map.copyCoords': 'Copy coordinates',
    'map.reset': 'Reset view',
    'map.clearRoute': 'Clear route',
    'map.routeSummary': 'Route',
    'map.copied': 'Copied',
    'map.geoDenied': 'Location permission denied',
    'map.geoUnsupported': 'Geolocation not supported',
    'map.routeFailed': 'Could not build route',
    'map.you': 'You',

    // Navbar
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.requestConsultation': 'Request Consultation',
    'nav.theme': 'Theme',
    'nav.switchToLight': 'Switch to light theme',
    'nav.switchToDark': 'Switch to dark theme',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',

    // Hero
    'hero.slide1.eyebrow': 'Cybersecurity, Professional Training & Digital Solutions',
    'hero.slide1.title': 'Secure. Future‑ready. Built to last.',
    'hero.slide1.cta': 'Explore Services',

    'hero.slide2.eyebrow': 'Cybersecurity Services',
    'hero.slide2.title': 'Stay ahead of evolving cyber threats.',
    'hero.slide2.cta': 'Request Consultation',

    'hero.slide3.eyebrow': 'Professional & Corporate Training',
    'hero.slide3.title': 'Build skills teams can use on day one.',
    'hero.slide3.cta': 'Request Consultation',

    'hero.lead': 'Assess risk. Build securely. Train teams. Deliver with confidence.',
    'hero.learnMore': 'Learn more',
    'hero.mini1.k': 'Security‑first',
    'hero.mini1.v': 'Mindset & delivery',
    'hero.mini2.k': 'Practical training',
    'hero.mini2.v': 'Job‑ready skills',
    'hero.mini3.k': 'Secure products',
    'hero.mini3.v': 'Built to scale',
    'hero.trustedEyebrow': 'Trusted delivery',
    'hero.trustedTitle': 'Secure. Practical. Measurable.',
    'hero.kpi1.n': 'Risk',
    'hero.kpi1.d': 'Assessments',
    'hero.kpi2.n': 'Build',
    'hero.kpi2.d': 'Secure solutions',
    'hero.kpi3.n': 'Train',
    'hero.kpi3.d': 'Upskilling',
    'hero.tip': 'Tip: animations respect',
    'hero.tipStrong': 'Reduced Motion',
    'hero.tipTail': 'settings.',

    // About
    'about.eyebrow': 'ABOUT US',
    'about.title': 'Secure, Resilient, Future‑Ready',
    'about.description':
      'CYBER ERA (CYRA) is a global cybersecurity, professional training, and digital solutions company. We combine international best practice with deep technical expertise to support secure, resilient, and future-ready organisations.',

    'about.card.vision.title': 'Our Vision',
    'about.card.vision.text':
      "CYRA's vision to become a leading global provider of cybersecurity, professional training, and digital solutions, supporting organisations in building secure, resilient, and future-ready digital capabilities.",

    'about.card.mission.title': 'Our Mission',
    'about.card.mission.text':
      "CYRA's mission is to empower organisations and individuals through cybersecurity, professional training, and digital solution.",

    'about.card.whatWeDo.title': 'What We Do',
    'about.card.whatWeDo.text':
      'CYRA enable long-term resilience by assessing needs, implementing robust technologies, monitoring performance and threats, and building practical skills that support sustainable digital capability.',

    'about.card.values.title': 'Our Core Values',
    'about.card.values.text':
      "CYRA's Core Values: Integrity & Trust, Innovation, Quality Excellence, Security-first mindset and Continuous Learning",

    // Services
    'services.eyebrow': 'OUR SERVICES',
    'services.title': 'Digital Security & Growth',
    'services.description': 'Cybersecurity, training, and delivery—built for real-world outcomes.',

    'services.training.title': 'Corporate & Professional Training',
    'services.training.text':
      'CYRA provides professional and corporate training programmes aligned with global certification standards, combining technical depth with practical, job-ready skills.',

    'services.cyber.title': 'Cybersecurity Services',
    'services.cyber.text':
      'CYRA provides end-to-end cybersecurity services to identify vulnerabilities, detect threats, and respond effectively to cyber incidents across complex digital environments.',

    'services.dev.title': 'Software Development',
    'services.dev.text':
      'CYRA designs and delivers secure, scalable digital solutions focused on web and mobile application development, business process automation and secure cloud migration to support enterprise growth.',

    'services.it.title': 'Managed IT & Cloud Services',
    'services.it.text':
      'CYRA delivers managed IT and cloud services that ensure secure, resilient, and high-performing technology environments through proactive support and continuous monitoring.',

    'services.badge': 'Security-first delivery • Clear scope • Measurable results',

    // Consultation
    'consult.title': 'Professional Consultation',
    'consult.text':
      "Ready to strengthen your cybersecurity, upskill your team, or accelerate your digital transformation? Let's discuss how CYRA can support your goals.",
    'consult.cta': 'Request Consultation',

    // Contact
    'contact.eyebrow': 'CONTACT',
    'contact.title': 'Get in touch',
    'contact.description': 'Send us a quick message our team will get back to you shortly.',
    'contact.detailsTitle': 'Contact details',
    'contact.addressLabel': 'Address',
    'contact.phoneLabel': 'Phone',
    'contact.emailLabel': 'Email',
    'contact.formTitle': 'Send a message',
    'contact.formHint': 'Opens your email client.',
    'contact.nameLabel': 'Name',
    'contact.emailFieldLabel': 'Email',
    'contact.subjectLabel': 'Subject',
    'contact.messageLabel': 'Message',
    'contact.namePlaceholder': 'Your name',
    'contact.emailPlaceholder': 'you@company.com',
    'contact.subjectPlaceholder': 'How can we help?',
    'contact.messagePlaceholder': 'Tell us about your goals, timeline, and current setup.',
    'contact.send': 'Send message',
    'contact.openEmail': 'Or open email directly',
    'contact.mailSubject': 'Website enquiry',
    'contact.addressValue': 'P.O BOX: 121, Postal Code: 312, Muscat, Sultanate of Oman',
    'contact.mapAttribution': 'Map data © OpenStreetMap contributors • Tiles © CARTO (dark theme)',

    // Footer
    'footer.tagline': 'Cybersecurity, Professional Training & Digital Solutions.',
    'footer.copyright': 'All Rights Reserved.',
    'footer.addressValue': 'P.O BOX: 121, Postal Code: 312, Muscat, Sultanate of Oman',
  },

  ar: {
    // Global
    'lang.english': 'English',
    'lang.arabic': 'العربية',

    'global.loadingTitle': 'جارٍ التحميل…',
    'global.loadingSubtitle': 'نقوم بتحضير التجربة. يرجى الانتظار قليلاً.',
    'global.loadingFooter': 'تهيئة الصور والحركات • أمانٌ منذ التصميم',

    // Map
    'map.locateMe': 'تحديد موقعي',
    'map.directions': 'الاتجاهات',
    'map.openExternal': 'فتح في الخرائط',
    'map.copyCoords': 'نسخ الإحداثيات',
    'map.reset': 'إعادة الضبط',
    'map.clearRoute': 'مسح المسار',
    'map.routeSummary': 'المسار',
    'map.copied': 'تم النسخ',
    'map.geoDenied': 'تم رفض إذن الموقع',
    'map.geoUnsupported': 'تحديد الموقع غير مدعوم',
    'map.routeFailed': 'تعذر إنشاء المسار',
    'map.you': 'موقعك',

    // Navbar
    'nav.about': 'من نحن',
    'nav.services': 'الخدمات',
    'nav.contact': 'اتصل بنا',
    'nav.requestConsultation': 'طلب استشارة',
    'nav.theme': 'المظهر',
    'nav.switchToLight': 'التبديل إلى المظهر الفاتح',
    'nav.switchToDark': 'التبديل إلى المظهر الداكن',
    'nav.openMenu': 'فتح القائمة',
    'nav.closeMenu': 'إغلاق القائمة',

    // Hero
    'hero.slide1.eyebrow': 'الأمن السيبراني، التدريب المهني وحلول رقمية',
    'hero.slide1.title': 'آمن. جاهز للمستقبل. مبني ليدوم.',
    'hero.slide1.cta': 'استعرض الخدمات',

    'hero.slide2.eyebrow': 'خدمات الأمن السيبراني',
    'hero.slide2.title': 'ابقَ متقدماً على التهديدات السيبرانية المتغيرة.',
    'hero.slide2.cta': 'طلب استشارة',

    'hero.slide3.eyebrow': 'تدريب مهني وتدريب للشركات',
    'hero.slide3.title': 'ابنِ مهارات يمكن للفِرق تطبيقها من اليوم الأول.',
    'hero.slide3.cta': 'طلب استشارة',

    'hero.lead': 'تقييم المخاطر. بناء آمن. تدريب الفرق. تسليم بثقة.',
    'hero.learnMore': 'اعرف المزيد',
    'hero.mini1.k': 'الأمن أولاً',
    'hero.mini1.v': 'فكر وتنفيذ',
    'hero.mini2.k': 'تدريب عملي',
    'hero.mini2.v': 'مهارات جاهزة للعمل',
    'hero.mini3.k': 'منتجات آمنة',
    'hero.mini3.v': 'قابلة للتوسع',
    'hero.trustedEyebrow': 'تنفيذ موثوق',
    'hero.trustedTitle': 'آمن. عملي. قابل للقياس.',
    'hero.kpi1.n': 'المخاطر',
    'hero.kpi1.d': 'التقييمات',
    'hero.kpi2.n': 'البناء',
    'hero.kpi2.d': 'حلول آمنة',
    'hero.kpi3.n': 'التدريب',
    'hero.kpi3.d': 'رفع المهارات',
    'hero.tip': 'ملاحظة: الحركات تراعي إعدادات',
    'hero.tipStrong': 'تقليل الحركة',
    'hero.tipTail': '.',

    // About
    'about.eyebrow': 'من نحن',
    'about.title': 'آمن وجاهز للمستقبل',
    'about.description':
      'CYBER ERA (CYRA) شركة عالمية في الأمن السيبراني والتدريب المهني والحلول الرقمية. نجمع بين أفضل الممارسات العالمية وخبرة تقنية عميقة لدعم مؤسسات آمنة ومرنة وجاهزة للمستقبل.',

    'about.card.vision.title': 'رؤيتنا',
    'about.card.vision.text':
      'رؤية CYRA أن تصبح مزوداً عالمياً رائداً لخدمات الأمن السيبراني والتدريب المهني والحلول الرقمية، بما يدعم المؤسسات في بناء قدرات رقمية آمنة ومرنة وجاهزة للمستقبل.',

    'about.card.mission.title': 'مهمتنا',
    'about.card.mission.text':
      'مهمة CYRA هي تمكين المؤسسات والأفراد من خلال الأمن السيبراني والتدريب المهني والحلول الرقمية.',

    'about.card.whatWeDo.title': 'ماذا نقدم',
    'about.card.whatWeDo.text':
      'تعزز CYRA المرونة طويلة الأمد عبر تقييم الاحتياجات، وتنفيذ تقنيات قوية، ومراقبة الأداء والتهديدات، وبناء مهارات عملية تدعم قدرة رقمية مستدامة.',

    'about.card.values.title': 'قيمنا',
    'about.card.values.text':
      'قيم CYRA: النزاهة والثقة، الابتكار، التميّز في الجودة، عقلية الأمن أولاً، والتعلم المستمر.',

    // Services
    'services.eyebrow': 'الخدمات',
    'services.title': 'الأمن الرقمي والنمو',
    'services.description': 'الأمن السيبراني والتدريب والتنفيذ - بنتائج واقعية.',

    'services.training.title': 'تدريب مهني وتدريب للشركات',
    'services.training.text':
      'تقدم CYRA برامج تدريب مهني وشركات متوافقة مع معايير الشهادات العالمية، تجمع بين العمق التقني والمهارات العملية الجاهزة للعمل.',

    'services.cyber.title': 'خدمات الأمن السيبراني',
    'services.cyber.text':
      'تقدم CYRA خدمات أمن سيبراني شاملة لتحديد الثغرات وكشف التهديدات والاستجابة للحوادث السيبرانية ضمن بيئات رقمية معقدة.',

    'services.dev.title': 'تطوير البرمجيات',
    'services.dev.text':
      'تصمم CYRA وتنفّذ حلولاً رقمية آمنة وقابلة للتوسع، تشمل تطوير تطبيقات الويب والموبايل، وأتمتة العمليات، والهجرة الآمنة إلى السحابة لدعم نمو المؤسسات.',

    'services.it.title': 'خدمات تقنية مُدارة والسحابة',
    'services.it.text':
      'تقدم CYRA خدمات تقنية مُدارة وسحابة تضمن بيئات تقنية آمنة ومرنة وعالية الأداء عبر الدعم الاستباقي والمراقبة المستمرة.',

    'services.badge': 'تنفيذ بأولوية الأمن • نطاق واضح • نتائج قابلة للقياس',

    // Consultation
    'consult.title': 'استشارة احترافية',
    'consult.text':
      'هل أنت مستعد لتعزيز أمنك السيبراني، وتطوير مهارات فريقك، أو تسريع التحول الرقمي؟ دعنا نناقش كيف يمكن لـ CYRA دعم أهدافك.',
    'consult.cta': 'طلب استشارة',

    // Contact
    'contact.eyebrow': 'اتصل بنا',
    'contact.title': 'تواصل معنا',
    'contact.description': 'أرسل رسالة سريعة - وسيعود إليك فريقنا قريباً.',
    'contact.detailsTitle': 'بيانات التواصل',
    'contact.addressLabel': 'العنوان',
    'contact.phoneLabel': 'الهاتف',
    'contact.emailLabel': 'البريد الإلكتروني',
    'contact.formTitle': 'أرسل رسالة',
    'contact.formHint': 'سيفتح عميل البريد لديك.',
    'contact.nameLabel': 'الاسم',
    'contact.emailFieldLabel': 'البريد الإلكتروني',
    'contact.subjectLabel': 'الموضوع',
    'contact.messageLabel': 'الرسالة',
    'contact.namePlaceholder': 'اسمك',
    'contact.emailPlaceholder': 'you@company.com',
    'contact.subjectPlaceholder': 'كيف يمكننا المساعدة؟',
    'contact.messagePlaceholder': 'أخبرنا عن أهدافك والجدول الزمني والوضع الحالي.',
    'contact.send': 'إرسال',
    'contact.openEmail': 'أو افتح البريد مباشرة',
    'contact.mailSubject': 'استفسار عبر الموقع',
    'contact.addressValue': 'ص.ب. 121، الرمز البريدي 312، مسقط، سلطنة عُمان',
    'contact.mapAttribution': 'بيانات الخريطة © مساهمو OpenStreetMap • المربعات © CARTO (الوضع الداكن)',

    // Footer
    'footer.tagline': 'الأمن السيبراني، التدريب المهني وحلول رقمية.',
    'footer.copyright': 'جميع الحقوق محفوظة.',
    'footer.addressValue': 'ص.ب. 121، الرمز البريدي 312، مسقط، سلطنة عُمان',
  },
}

const STORAGE_KEY = 'cyra-lang'

type I18nContextValue = {
  lang: Language
  dir: 'ltr' | 'rtl'
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function getInitialLanguage(): Language {
  const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
  if (stored === 'ar' || stored === 'en') return stored

  if (typeof navigator !== 'undefined') {
    const candidates = [navigator.language, ...(navigator.languages ?? [])].filter(Boolean)
    if (candidates.some((l) => l.toLowerCase().startsWith('ar'))) return 'ar'
  }

  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => getInitialLanguage())

  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr'

  const setLang = useCallback((next: Language) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const t = useCallback(
    (key: string) => {
      const fromLang = DICT[lang][key]
      if (fromLang) return fromLang
      const fallback = DICT.en[key]
      return fallback ?? key
    },
    [lang],
  )

  useEffect(() => {
    // Keep document language + direction in sync (important for Arabic RTL).
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [dir, lang])

  const value = useMemo<I18nContextValue>(() => ({ lang, dir, setLang, t }), [dir, lang, setLang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
