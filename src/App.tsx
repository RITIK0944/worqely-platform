import React, {
  useState,
  createContext,
  useContext,
  Suspense,
  lazy,
} from "react";

// Lazy load components to prevent initial load timeout
const Homepage = lazy(() =>
  import("./components/Homepage").then((module) => ({
    default: module.Homepage,
  })),
);
const CustomerLogin = lazy(() =>
  import("./components/CustomerLogin").then((module) => ({
    default: module.CustomerLogin,
  })),
);
const CustomerSignup = lazy(() =>
  import("./components/CustomerSignup").then((module) => ({
    default: module.CustomerSignup,
  })),
);
const WorkerLogin = lazy(() =>
  import("./components/LaborLogin").then((module) => ({
    default: module.LaborLogin,
  })),
);
const WorkerSignup = lazy(() =>
  import("./components/LaborSignup").then((module) => ({
    default: module.LaborSignup,
  })),
);
const CustomerDashboard = lazy(() =>
  import("./components/CustomerDashboard").then((module) => ({
    default: module.CustomerDashboard,
  })),
);
const WorkerDashboard = lazy(() =>
  import("./components/WorkerDashboard").then((module) => ({
    default: module.WorkerDashboard,
  })),
);
const AdminPanel = lazy(() =>
  import("./components/AdminPanel").then((module) => ({
    default: module.AdminPanel,
  })),
);

export type UserType = "customer" | "worker" | "admin";

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface User {
  id: string;
  fullName: string;
  email?: string;
  mobile: string;
  type: UserType;
  aadhaarNumber: string;
  profilePhoto?: string;
  address?: Address;
  dateOfBirth?: string;
  signupMethod?: "self" | "cyber-cafe";

  // Worker specific fields
  workCategory?: string;
  experience?: string;
  shiftType?:
    | "full-time"
    | "half-time"
    | "part-time"
    | "task-based";
  isPremium?: boolean;
  premiumExpiry?: string;
  totalEarnings?: number;
  rating?: number;
  completedJobs?: number;
  availability?: "available" | "busy" | "offline";
  hourlyRate?: number;
  skills?: string[];
  isOnline?: boolean;
}

export interface Task {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  category: string;
  location: string;
  budget: number;
  urgency: "low" | "medium" | "high";
  createdAt: string;
  deadline?: string;
  status:
    | "posted"
    | "assigned"
    | "in-progress"
    | "completed"
    | "cancelled";
  assignedWorkerId?: string;
  requirements?: string[];
  contactInfo?: {
    phone: string;
    email?: string;
  };
}

export type Language =
  | "en"
  | "hi"
  | "bn"
  | "te"
  | "mr"
  | "ta"
  | "gu"
  | "kn"
  | "ml"
  | "pa"
  | "or"
  | "as"
  | "ur";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Comprehensive language translations for all 12 regional Indian languages
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Basic navigation
    welcome: "Welcome",
    customer: "Customer",
    worker: "Worker",
    login: "Login",
    signup: "Sign Up",
    admin: "Admin",
    logout: "Logout",
    
    // Header and navigation
    findWorkers: "Find Workers Now",
    becomeWorker: "Become a Worker",
    contact: "Contact: 8340 315 955",
    email: "Email: worqley@gmail.com",
    about: "About WORQELY",
    services: "Our Services",
    howItWorks: "How It Works",
    testimonials: "What Our Users Say",
    
    // Hero section
    smartPlatform: "Smart Platform",
    connectWithSkilled: "Connect with Skilled Workers",
    instantly: "Instantly",
    heroDescription: "WORQELY revolutionizes how you find skilled workers. Our intelligent platform connects you with verified professionals across 15+ service categories in seconds, available in 12 Indian languages.",
    
    // Trust indicators
    support: "24/7 Support",
    verifiedWorkers: "100% Verified Workers",
    instantMatching: "Instant Matching",
    fairPricing: "Fair Pricing",
    qualityGuarantee: "Quality Guarantee",
    secureAndSafe: "Secure & Safe",
    trustedPlatform: "India's Most Trusted Service Platform",
    
    // Statistics
    trustedByThousands: "Trusted by Thousands",
    joinCommunity: "Join our growing community of satisfied customers and skilled workers",
    verifiedWorkersCount: "Verified Workers",
    jobsCompleted: "Jobs Completed",
    averageRating: "Average Rating",
    citiesCovered: "Cities Covered",
    
    // About section
    aboutDescription: "WORQELY is India's leading intelligent platform that bridges the gap between customers and skilled workers. We leverage cutting-edge technology to ensure instant, reliable connections while maintaining the highest standards of safety and quality.",
    instantMatchingDesc: "Our smart algorithm matches you with the perfect worker in seconds",
    verifiedWorkersDesc: "All workers undergo thorough Aadhaar verification and background checks",
    trustAndSafety: "Trust & Safety",
    trustAndSafetyDesc: "Built-in insurance, secure payments, and 24/7 customer support",
    ourLeadership: "Our Leadership",
    founderInfo: "Founder: Ritik Kumar | Contact: 8340 315 955 | Email: ritiksharma8340031@gmail.com",
    cofounderInfo: "Co-founder: Rishi Jain | Contact: 8769392447 | Email: rishijain09414@gmail.com",
    
    // How it works
    howWorqelyWorks: "How WORQELY Works",
    howWorqelyWorksDesc: "Get connected with skilled workers in just 3 simple steps. Our intelligent platform makes it seamless and efficient.",
    connectInstantly: "Connect Instantly",
    connectInstantlyDesc: "Simply call or use our platform to describe your service needs. Our system understands you in 12 Indian languages.",
    getInstantMatches: "Get Instant Matches",
    getInstantMatchesDesc: "Our system instantly matches you with verified workers in your area based on your requirements and budget.",
    connectAndComplete: "Connect & Complete",
    connectAndCompleteDesc: "Connect directly with workers, schedule your service, and get the job done with complete transparency.",
    
    // Service categories
    ourServiceCategories: "Our Service Categories",
    professionalServices: "Professional services across multiple categories with verified experts",
    viewAllCategories: "View All 15+ Categories",
    electrical: "Electrical",
    electricalDesc: "Wiring, Repairs",
    plumbing: "Plumbing",
    plumbingDesc: "Pipes, Installation",
    construction: "Construction",
    constructionDesc: "Mason, Labor",
    painting: "Painting",
    paintingDesc: "Interior, Exterior",
    cleaning: "Cleaning",
    cleaningDesc: "Deep Clean",
    cooking: "Cooking",
    cookingDesc: "Chef, Home Cook",
    
    // Features
    whyChooseWorqely: "Why Choose WORQELY?",
    experienceFuture: "Experience the future of service booking with our intelligent platform designed for India's diverse workforce",
    smartConnect: "Smart Connect",
    smartConnectDesc: "Intelligent platform that understands your needs in 12 Indian languages and connects you with the right workers instantly.",
    verifiedWorkersTitle: "100% Verified Workers",
    verifiedWorkersFeatureDesc: "All workers undergo thorough Aadhaar verification, background checks, and skill assessments for your safety and peace of mind.",
    fairPricingDesc: "Transparent, competitive pricing with no hidden costs. See upfront rates and choose what works for your budget.",
    quickResponse: "Quick Response",
    quickResponseDesc: "Get matched with available workers within minutes. Our system ensures you're connected to professionals ready to work.",
    qualityGuaranteeDesc: "100% satisfaction guarantee with our quality assurance program. Rate workers and get refunds if not satisfied.",
    supportDesc: "Round-the-clock customer support in multiple languages to help you with any queries, issues, or emergencies.",
    
    // Testimonials
    realStories: "Real stories from satisfied customers and successful workers",
    testimonial1: "WORQELY's platform understood my Hindi perfectly and found me an excellent plumber within 5 minutes. The service was outstanding and the pricing was very fair!",
    testimonial2: "As a worker, WORQELY has transformed my income. I get regular work opportunities, fair payments, and the app is so easy to use. Highly recommended!",
    testimonial3: "The verification process gives me complete confidence. All workers are genuine, skilled, and professional. Best platform for home services in India!",
    customerTitle: "Customer",
    electricianTitle: "Electrician",
    
    // Call to action
    readyToStart: "Ready to Get Started?",
    joinThousands: "Join thousands of satisfied customers and skilled workers on India's most trusted service platform",
    needHelp: "Need help? Contact us:",
    available24x7: "Available 24/7 in 12 Indian languages",
    
    // Footer
    footerDescription: "India's first AI-powered platform connecting customers with skilled workers. Safe, verified, and efficient.",
    forCustomers: "For Customers",
    findWorkersLink: "Find Workers",
    serviceCategoriesLink: "Service Categories",
    pricing: "Pricing",
    safetyGuarantee: "Safety Guarantee",
    forWorkers: "For Workers",
    joinAsWorker: "Join as Worker",
    workerBenefits: "Worker Benefits",
    trainingPrograms: "Training Programs",
    insuranceCoverage: "Insurance Coverage",
    premiumMembership: "Premium Membership",
    helpCenter: "Help Center",
    contactUs: "Contact Us",
    faq: "FAQ",
    reportIssue: "Report Issue",
    privacyPolicy: "Privacy Policy",
    allRightsReserved: "All rights reserved. | Made with ❤️ in India",
    connectingIndia: "Connecting India's workforce through technology",
    
    // Dashboard navigation
    dashboard: "Dashboard",
    profile: "Profile",
    settings: "Settings",
    history: "History",
    payments: "Payments",
    ratings: "Ratings",
    refer: "Refer & Earn",
    issues: "Issues",
    premium: "Premium",
    ecommerce: "E-Commerce",
    
    // Common UI elements
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    apply: "Apply",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    close: "Close",
    back: "Back",
    next: "Next",
    previous: "Previous",
    submit: "Submit",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    information: "Information"
  },
  hi: {
    // Basic navigation
    welcome: "स्वागत",
    customer: "ग्राहक",
    worker: "श्रमिक",
    login: "लॉगिन",
    signup: "साइन अप",
    admin: "एडमिन",
    logout: "लॉगआउट",
    
    // Header and navigation
    findWorkers: "अभी श्रमिक खोजें",
    becomeWorker: "श्रमिक बनें",
    contact: "संपर्क: 8340 315 955",
    email: "ईमेल: worqley@gmail.com",
    about: "WORQELY के बारे में",
    services: "हमारी सेवाएं",
    howItWorks: "यह कैसे काम करता है",
    testimonials: "हमारे उपयोगकर्ता क्या कहते हैं",
    
    // Hero section
    smartPlatform: "स्मार्ट प्लेटफॉर्म",
    connectWithSkilled: "कुशल श्रमिकों से जुड़ें",
    instantly: "तुरंत",
    heroDescription: "WORQELY कुशल श्रमिकों को खोजने के तरीके में क्रांति लाता है। हमारा बुद्धिमान प्लेटफॉर्म आपको सेकंडों में 15+ सेवा श्रेणियों में सत्यापित पेशेवरों से जोड़ता है, 12 भारतीय क्षेत्रीय भाषाओं में उपलब्ध है।",
    
    // Trust indicators
    support: "24/7 सहायता",
    verifiedWorkers: "100% सत्यापित श्रमिक",
    instantMatching: "तत्काल मिलान",
    fairPricing: "उचित मूल्य निर्धारण",
    qualityGuarantee: "गुणवत्ता की गारंटी",
    secureAndSafe: "सुरक्षित और सुरक्षित",
    trustedPlatform: "भारत का सबसे विश्वसनीय सेवा प्लेटफॉर्म",
    
    // Statistics
    trustedByThousands: "हजारों द्वारा भरोसा",
    joinCommunity: "संतुष्ट ग्राहकों और कुशल श्रमिकों के हमारे बढ़ते समुदाय में शामिल हों",
    verifiedWorkersCount: "सत्यापित श्रमिक",
    jobsCompleted: "पूर्ण कार्य",
    averageRating: "औसत रेटिंग",
    citiesCovered: "शहर शामिल",
    
    // About section
    aboutDescription: "WORQELY भारत का अग्रणी बुद्धिमान प्लेटफॉर्म है जो ग्राहकों और कुशल श्रमिकों के बीच की खाई को पाटता है। हम सुरक्षा और गुणवत्ता के उच्चतम मानकों को बनाए रखते हुए तत्काल, विश्वसनीय कनेक्शन सुनिश्चित करने के लिए अत्याधुनिक तकनीक का लाभ उठाते हैं।",
    instantMatchingDesc: "हमारा स्मार्ट एल्गोरिदम आपको सेकंडों में सही श्रमिक से मिलाता है",
    verifiedWorkersDesc: "सभी श्रमिक पूर्ण आधार सत्यापन और पृष्ठभूमि जांच से गुजरते हैं",
    trustAndSafety: "विश्वास और सुरक्षा",
    trustAndSafetyDesc: "अंतर्निहित बीमा, सुरक्षित भुगतान, और 24/7 ग्राहक सहायता",
    ourLeadership: "हमारा नेतृत्व",
    founderInfo: "संस्थापक: रितिक कुमार | संपर्क: 8340 315 955 | ईमेल: ritiksharma8340031@gmail.com",
    cofounderInfo: "सह-संस्थापक: ऋषि जैन | संपर्क: 8769392447 | ईमेल: rishijain09414@gmail.com",
    
    // How it works
    howWorqelyWorks: "WORQELY कैसे काम करता है",
    howWorqelyWorksDesc: "केवल 3 सरल चरणों में कुशल श्रमिकों से जुड़ें। हमारा बुद्धिमान प्लेटफॉर्म इसे निर्बाध और कुशल बनाता है।",
    connectInstantly: "तुरंत कनेक्ट करें",
    connectInstantlyDesc: "बस कॉल करें या अपनी सेवा की जरूरतों का वर्णन करने के लिए हमारे प्लेटफॉर्म का उपयोग करें। हमारा सिस्टम आपको 12 भारतीय भाषाओं में समझता है।",
    getInstantMatches: "तत्काल मैच पाएं",
    getInstantMatchesDesc: "हमारा सिस्टम आपकी आवश्यकताओं और बजट के आधार पर आपको तुरंत आपके क्षेत्र में सत्यापित श्रमिकों से मिलाता है।",
    connectAndComplete: "कनेक्ट करें और पूरा करें",
    connectAndCompleteDesc: "श्रमिकों से सीधे जुड़ें, अपनी सेवा शेड्यूल करें, और पूर्ण पारदर्शिता के साथ काम पूरा करवाएं।",
    
    // Service categories
    ourServiceCategories: "हमारी सेवा श्रेणियां",
    professionalServices: "सत्यापित विशेषज्ञों के साथ कई श्रेणियों में पेशेवर सेवाएं",
    viewAllCategories: "सभी 15+ श्रेणियां देखें",
    electrical: "इलेक्ट्रिकल",
    electricalDesc: "वायरिंग, मरम्मत",
    plumbing: "प्लंबिंग",
    plumbingDesc: "पाइप, स्थापना",
    construction: "निर्माण",
    constructionDesc: "राजमिस्त्री, मजदूर",
    painting: "पेंटिंग",
    paintingDesc: "इंटीरियर, एक्सटीरियर",
    cleaning: "सफाई",
    cleaningDesc: "गहरी सफाई",
    cooking: "खाना बनाना",
    cookingDesc: "शेफ, घरेलू रसोइया",
    
    // Features
    whyChooseWorqely: "WORQELY क्यों चुनें?",
    experienceFuture: "भारत के विविध कार्यबल के लिए डिज़ाइन किए गए हमारे बुद्धिमान प्लेटफॉर्म के साथ सेवा बुकिंग के भविष्य का अनुभव करें",
    smartConnect: "स्मार्ट कनेक्ट",
    smartConnectDesc: "बुद्धिमान प्लेटफॉर्म जो 12 भारतीय भाषाओं में आपकी जरूरतों को समझता है और आपको सही श्रमिकों से तुरंत जोड़ता है।",
    verifiedWorkersTitle: "100% सत्यापित श्रमिक",
    verifiedWorkersFeatureDesc: "सभी श्रमिक आपकी सुरक्षा और मानसिक शांति के लिए पूर्ण आधार सत्यापन, पृष्ठभूमि जांच और कौशल मूल्यांकन से गुजरते हैं।",
    fairPricingDesc: "पारदर्शी, प्रतिस्पर्धी मूल्य निर्धारण बिना किसी छुपी लागत के। अग्रिम दरें देखें और जो आपके बजट के लिए काम करता है उसे चुनें।",
    quickResponse: "त्वरित प्रतिक्रिया",
    quickResponseDesc: "मिनटों में उपलब्ध श्रमिकों से मैच हो जाएं। हमारा सिस्टम सुनिश्चित करता है कि आप काम के लिए तैयार पेशेवरों से जुड़े हों।",
    qualityGuaranteeDesc: "हमारे गुणवत्ता आश्वासन कार्यक्रम के साथ 100% संतुष्टि की गारंटी। श्रमिकों को रेट करें और संतुष्ट नहीं होने पर रिफंड पाएं।",
    supportDesc: "किसी भी प्रश्न, समस्या या आपातकाल में आपकी सहायता के लिए कई भाषाओं में चौबीसों घंटे ग्राहक सहायता।",
    
    // Testimonials
    realStories: "संतुष्ट ग्राहकों और सफल श्रमिकों की वास्तविक कहानियां",
    testimonial1: "WORQELY के प्लेटफॉर्म ने मेरी हिंदी को पूरी तरह से समझा और 5 मिनट में मुझे एक उत्कृष्ट प्लंबर मिल गया। सेवा उत्कृष्ट थी और मूल्य निर्धारण बहुत उचित था!",
    testimonial2: "एक श्रमिक के रूप में, WORQELY ने मेरी आय को बदल दिया है। मुझे नियमित काम के अवसर, उचित भुगतान मिलता है, और ऐप का उपयोग करना बहुत आसान है। अत्यधिक अनुशंसित!",
    testimonial3: "सत्यापन प्रक्रिया मुझे पूर्ण विश्वास देती है। सभी श्रमिक वास्तविक, कुशल और पेशेवर हैं। भारत में गृह सेवाओं के लिए सबसे अच्छा प्लेटफॉर्म!",
    customerTitle: "ग्राहक",
    electricianTitle: "इलेक्ट्रीशियन",
    
    // Call to action
    readyToStart: "शुरू करने के लिए तैयार हैं?",
    joinThousands: "भारत के सबसे विश्वसनीय सेवा प्लेटफॉर्म पर हजारों संतुष्ट ग्राहकों और कुशल श्रमिकों से जुड़ें",
    needHelp: "सहायता चाहिए? हमसे संपर्क करें:",
    available24x7: "12 भारतीय भाषाओं में 24/7 उपलब्ध",
    
    // Footer
    footerDescription: "भारत का पहला AI-संचालित प्लेटफॉर्म जो ग्राहकों को कुशल श्रमिकों से जोड़ता है। सुरक्षित, सत्यापित और कुशल।",
    forCustomers: "ग्राहकों के लिए",
    findWorkersLink: "श्रमिक खोजें",
    serviceCategoriesLink: "सेवा श्रेणियां",
    pricing: "मूल्य निर्धारण",
    safetyGuarantee: "सुरक्षा गारंटी",
    forWorkers: "श्रमिकों के लिए",
    joinAsWorker: "श्रमिक के रूप में जुड़ें",
    workerBenefits: "श्रमिक लाभ",
    trainingPrograms: "प्रशिक्षण कार्यक्रम",
    insuranceCoverage: "बीमा कवरेज",
    premiumMembership: "प्रीमियम सदस्यता",
    helpCenter: "सहायता केंद्र",
    contactUs: "हमसे संपर्क करें",
    faq: "सामान्य प्रश्न",
    reportIssue: "समस्या की रिपोर्ट करें",
    privacyPolicy: "गोपनीयता नीति",
    allRightsReserved: "सभी अधिकार सुरक्षित। | भारत में ❤️ के साथ बनाया गया",
    connectingIndia: "प्रौद्योगिकी के माध्यम से भारत के कार्यबल को जोड़ना",
    
    // Dashboard navigation
    dashboard: "डैशबोर्ड",
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",
    history: "इतिहास",
    payments: "भुगतान",
    ratings: "रेटिंग",
    refer: "रेफर करें और कमाएं",
    issues: "समस्याएं",
    premium: "प्रीमियम",
    ecommerce: "ई-कॉमर्स",
    
    // Common UI elements
    search: "खोजें",
    filter: "फ़िल्टर",
    sort: "सॉर्ट",
    apply: "लागू करें",
    cancel: "रद्द करें",
    save: "सेव करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    view: "देखें",
    close: "बंद करें",
    back: "वापस",
    next: "अगला",
    previous: "पिछला",
    submit: "सबमिट करें",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    warning: "चेतावनी",
    information: "जानकारी"
  },
  bn: {
    welcome: "স্বাগতম",
    customer: "গ্রাহক",
    worker: "শ্রমিক",
    login: "লগইন",
    signup: "সাইন আপ",
    findWorkers: "এখনই শ���রমিক খুঁজুন",
    becomeWorker: "শ্রমিক হয়ে উঠুন",
    contact: "যোগাযোগ: 8340 315 955",
    email: "ইমেইল: worqley@gmail.com",
    about: "WORQELY সম্পর্কে",
    services: "আমাদের সেবাসমূহ",
    howItWorks: "এটি কীভাবে কাজ করে",
    testimonials: "আমাদের ব্যবহারকারীরা কি বলেন",
    support: "২৪/৭ সহায়তা",
    verifiedWorkers: "১০০% যাচাইকৃত শ্রমিক",
    instantMatching: "তাৎক্ষণিক মিলানো",
    fairPricing: "ন্যায্য মূল্য",
    qualityGuarantee: "মানের গ্যারান্টি",
    trustedPlatform: "ভারতের সবচেয়ে বিশ্বস্ত সেবা প্ল্যাটফর্ম",
    founderInfo: "প্রতিষ্ঠাতা: রিতিক কুমার | যোগাযোগ: 8340 315 955 | ইমেইল: ritiksharma8340031@gmail.com",
    cofounderInfo: "সহ-প্রতিষ্ঠাতা: ঋষি জৈন | যোগাযোগ: 8769392447 | ইমেইল: rishijain09414@gmail.com"
  },
  te: {
    welcome: "స్వాగతం",
    customer: "కస్టమర్",
    worker: "కార్మికుడు",
    login: "లాగిన్",
    signup: "సైన్ అప్",
    findWorkers: "ఇప్పుడే కార్మికులను కనుగొనండి",
    becomeWorker: "కార్మికుడు అవ్వండి",
    contact: "సంప్రదింపులు: 8340 315 955",
    email: "ఇమెయిల్: worqley@gmail.com",
    about: "WORQELY గురించి",
    services: "మా సేవలు",
    howItWorks: "ఇది ఎలా పని చేస్తుంది",
    testimonials: "మా వినియోగదారులు ఏమి చెబుతున్నారు",
    support: "24/7 మద్దతు",
    verifiedWorkers: "100% ధృవీకరించబడిన కార్మికులు",
    instantMatching: "తక్షణ మ్యాచింగ్",
    fairPricing: "న్యాయమైన ధర",
    qualityGuarantee: "నాణ్యత హామీ",
    trustedPlatform: "భారతదేశపు అత్యంత విశ్వసనీయ సేవా వేదిక",
    founderInfo: "వ్యవస్థాపకుడు: రితిక్ కుమార్ | సంప్రదింపులు: 8340 315 955 | ఇమెయిల్: ritiksharma8340031@gmail.com",
    cofounderInfo: "సహ-వ్యవస్థాపకుడు: ఋషి జైన్ | సంప్రదింపులు: 8769392447 | ఇమెయిల్: rishijain09414@gmail.com"
  },
  mr: {
    welcome: "स्वागत",
    customer: "ग्राहक",
    worker: "कामगार",
    login: "लॉगिन",
    signup: "साइन अप",
    findWorkers: "आता कामगार शोधा",
    becomeWorker: "कामगार व्हा",
    contact: "संपर्क: 8340 315 955",
    email: "ईमेल: worqley@gmail.com",
    about: "WORQELY बद्दल",
    services: "आमच्या सेवा",
    howItWorks: "हे कसे कार्य करते",
    testimonials: "आमचे वापरकर्ते काय म्हणतात",
    support: "24/7 सहाय्य",
    verifiedWorkers: "100% सत्यापित कामगार",
    instantMatching: "तत्काळ जुळवणी",
    fairPricing: "न्याय्य किंमत",
    qualityGuarantee: "गुणवत्तेची हमी",
    trustedPlatform: "भारताचे सर्वात विश्वसनीय सेवा व्यासपीठ",
    founderInfo: "संस्थापक: रितिक कुमार | संपर्क: 8340 315 955 | ईमेल: ritiksharma8340031@gmail.com",
    cofounderInfo: "सह-संस्थापक: ऋषी जैन | संपर्क: 8769392447 | ईमेल: rishijain09414@gmail.com"
  },
  ta: {
    welcome: "வரவேற்கிறோம்",
    customer: "வாடிக்கையாளர்",
    worker: "தொழிலாளி",
    login: "உள்நுழை",
    signup: "பதிவுசெய்",
    findWorkers: "இப்போதே தொழிலாளர்களைக் கண்டறியுங்கள்",
    becomeWorker: "தொழிலாளியாக மாறுங்கள்",
    contact: "தொடர்பு: 8340 315 955",
    email: "மின்னஞ்சல்: worqley@gmail.com",
    about: "WORQELY பற்றி",
    services: "எங்கள் சேவைகள்",
    howItWorks: "இது எப்படி வேலை செய்கிறது",
    testimonials: "எங்கள் பயனர்கள் என்ன சொல்கிறார்கள்",
    support: "24/7 ஆதரவு",
    verifiedWorkers: "100% சரிபார்க்கப்பட்ட தொழிலாளர்கள்",
    instantMatching: "உடனடி பொருத்தம்",
    fairPricing: "நியாயமான விலை",
    qualityGuarantee: "தர உத்தரவாதம்",
    trustedPlatform: "இந்தியாவின் மிக நம்பகமான சேவை தளம்",
    founderInfo: "நிறுவனர்: ரிதிக் குமார் | தொடர்பு: 8340 315 955 | மின்னஞ்சல்: ritiksharma8340031@gmail.com",
    cofounderInfo: "இணை நிறுவனர்: ரிஷி ஜெயின் | தொடர்பு: 8769392447 | மின்னஞ்சல்: rishijain09414@gmail.com"
  },
  gu: {
    welcome: "સ્વાગત",
    customer: "ગ્રાહક",
    worker: "મજૂર",
    login: "લોગિન",
    signup: "સાઇન અપ",
    findWorkers: "હવે મજૂરો શોધો",
    becomeWorker: "મજૂર બનો",
    contact: "સંપર્ક: 8340 315 955",
    email: "ઇમેઇલ: worqley@gmail.com",
    about: "WORQELY વિશે",
    services: "અમારી સેવાઓ",
    howItWorks: "આ કેવી રીતે કામ કરે છે",
    testimonials: "અમારા વપરાશકર્તાઓ શું કહે છે",
    support: "24/7 સપોર્ટ",
    verifiedWorkers: "100% ચકાસાયેલા મજૂરો",
    instantMatching: "તાત્���ાલિક મેચિંગ",
    fairPricing: "વાજબી કિંમત",
    qualityGuarantee: "ગુણવત્તાની ગેરંટી",
    trustedPlatform: "ભારતનું સૌથી વિશ્વસનીય સેવા પ્લેટફોર્મ",
    founderInfo: "સ્થાપક: રિતિક કુમાર | સંપર્ક: 8340 315 955 | ઇમેઇલ: ritiksharma8340031@gmail.com",
    cofounderInfo: "સહ-સ્થાપક: ઋષિ જૈન | સંપર્ક: 8769392447 | ઇમેઇલ: rishijain09414@gmail.com"
  },
  kn: {
    welcome: "ಸ್ವಾಗತ",
    customer: "ಗ್ರಾಹಕ",
    worker: "ಕಾರ್ಮಿಕ",
    login: "ಲಾಗಿನ್",
    signup: "ಸೈನ್ ಅಪ್",
    findWorkers: "ಈಗ ಕಾರ್ಮಿಕರನ್ನು ಹುಡುಕಿ",
    becomeWorker: "ಕಾರ್ಮಿಕನಾಗಿ",
    contact: "ಸಂಪರ್ಕ: 8340 315 955",
    email: "ಇಮೇಲ್: worqley@gmail.com",
    about: "WORQELY ಬಗ್ಗೆ",
    services: "ನಮ್ಮ ಸೇವೆಗಳು",
    howItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    testimonials: "ನಮ್ಮ ಬಳಕೆದಾರರು ಏನ�� ಹೇಳುತ್ತಾರೆ",
    support: "24/7 ಬೆಂಬಲ",
    verifiedWorkers: "100% ಪರಿಶೀಲಿಸಿದ ಕಾರ್ಮಿಕರು",
    instantMatching: "ತಕ್ಷಣದ ಹೊಂದಾಣಿಕೆ",
    fairPricing: "ನ್ಯಾಯಯುತ ಬೆಲೆ",
    qualityGuarantee: "ಗುಣಮಟ್ಟದ ಗ್ಯಾರಂಟಿ",
    trustedPlatform: "ಭಾರತದ ಅತ್ಯಂತ ವಿಶ್ವಾಸಾರ್ಹ ಸೇವಾ ವೇದಿಕೆ",
    founderInfo: "ಸಂಸ್ಥಾಪಕ: ರಿತಿಕ್ ಕುಮಾರ್ | ಸಂಪರ್ಕ: 8340 315 955 | ಇಮೇಲ್: ritiksharma8340031@gmail.com",
    cofounderInfo: "ಸಹ-ಸಂಸ್ಥಾಪಕ: ಋಷಿ ಜೈನ್ | ಸಂಪರ್ಕ: 8769392447 | ಇಮೇಲ್: rishijain09414@gmail.com"
  },
  ml: {
    welcome: "സ്വാഗതം",
    customer: "ഉപഭോക്താവ്",
    worker: "തൊഴിലാളി",
    login: "ലോഗിൻ",
    signup: "സൈൻ അപ്പ്",
    findWorkers: "ഇപ്പോൾ തൊഴിലാളികളെ കണ്ടെത്തുക",
    becomeWorker: "തൊഴിലാളിയാകുക",
    contact: "ബന്ധപ്പെടുക: 8340 315 955",
    email: "ഇമെയിൽ: worqley@gmail.com",
    about: "WORQELY യെക്കുറിച്ച്",
    services: "ഞങ്ങളുടെ സേവനങ്ങൾ",
    howItWorks: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    testimonials: "ഞങ്ങളുടെ ഉപയോക്താക്കൾ എന്താണ് പറയുന്നത്",
    support: "24/7 പിന്തുണ",
    verifiedWorkers: "100% പരിശോധിച്ച തൊഴിലാളികൾ",
    instantMatching: "തൽക്ഷണ പൊരുത്തം",
    fairPricing: "ന്യായമായ വില",
    qualityGuarantee: "ഗുണനിലവാര ഗ്യാരന്റി",
    trustedPlatform: "ഇന്ത്യയിലെ ഏറ്റവും വിശ്വസനീയമായ സേവന പ്ലാറ്റ്ഫോം",
    founderInfo: "സ്ഥാപകൻ: റിതിക് കുമാർ | ബന്ധപ്പെടുക: 8340 315 955 | ഇമെയിൽ: ritiksharma8340031@gmail.com",
    cofounderInfo: "സഹസ്ഥാപകൻ: ഋഷി ജൈൻ | ബന്ധപ്പെടുക: 8769392447 | ഇമെയിൽ: rishijain09414@gmail.com"
  },
  pa: {
    welcome: "ਸੁਆਗਤ",
    customer: "ਗਾਹਕ",
    worker: "ਮਜ਼ਦੂਰ",
    login: "ਲਾਗਿਨ",
    signup: "ਸਾਇਨ ਅੱਪ",
    findWorkers: "ਹੁਣ ਮਜ਼ਦੂਰ ਲੱਭੋ",
    becomeWorker: "ਮਜ਼ਦੂਰ ਬਣੋ",
    contact: "ਸੰਪਰਕ: 8340 315 955",
    email: "ਈਮੇਲ: worqley@gmail.com",
    about: "WORQELY ਬਾਰੇ",
    services: "ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ",
    howItWorks: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    testimonials: "ਸਾਡੇ ਯੂਜ਼ਰ ਕੀ ਕਹਿੰਦੇ ਹਨ",
    support: "24/7 ਸਹਾਇਤਾ",
    verifiedWorkers: "100% ਤਸਦੀਕਸ਼ੁਦਾ ਮਜ਼ਦੂਰ",
    instantMatching: "ਫੌਰੀ ਮੈਚਿੰਗ",
    fairPricing: "ਨਿਰਪੱਖ ਕੀਮਤ",
    qualityGuarantee: "ਗੁਣਵੱਤਾ ਦੀ ਗਾਰੰਟੀ",
    trustedPlatform: "ਭਾਰਤ ਦਾ ਸਭ ਤੋਂ ਭਰੋਸੇਮੰਦ ਸੇਵਾ ਪਲੇਟਫਾਰਮ",
    founderInfo: "ਸੰਸਥਾਪਕ: ਰਿਤਿਕ ਕੁਮਾਰ | ਸੰਪਰਕ: 8340 315 955 | ਈਮੇਲ: ritiksharma8340031@gmail.com",
    cofounderInfo: "ਸਹਿ-ਸੰਸਥਾਪਕ: ਰਿਸ਼ੀ ਜੈਨ | ਸੰਪਰਕ: 8769392447 | ਈਮੇਲ: rishijain09414@gmail.com"
  },
  or: {
    welcome: "ସ୍ୱାଗତ",
    customer: "ଗ୍ରାହକ",
    worker: "ଶ୍ରମିକ",
    login: "ଲଗଇନ୍",
    signup: "ସାଇନ ଅପ",
    findWorkers: "ବର୍ତ୍ତମାନ ଶ୍ରମିକ ଖୋଜନ୍ତୁ",
    becomeWorker: "ଶ୍ରମିକ ହୁଅନ୍ତୁ",
    contact: "ଯୋଗାଯୋଗ: 8340 315 955",
    email: "ଇମେଲ: worqley@gmail.com",
    about: "WORQELY ବିଷୟରେ",
    services: "ଆମର ସେବାଗୁଡ଼ିକ",
    howItWorks: "ଏହା କିପରି କାମ କରେ",
    testimonials: "ଆମର ଉପଯୋଗକର୍ତ୍ତାମାନେ କ'ଣ କୁହନ୍ତି",
    support: "24/7 ସହାୟତା",
    verifiedWorkers: "100% ଯାଞ୍ଚିତ ଶ୍ରମିକ",
    instantMatching: "ତତକ୍ଷଣାତ ମ୍ୟାଚିଂ",
    fairPricing: "ନ୍ୟାୟ୍ୟ ମୂଲ୍ୟ",
    qualityGuarantee: "ଗୁଣବତ୍ତା ଗ୍ୟାରେଣ୍ଟି",
    trustedPlatform: "ଭାରତର ସର୍ବାଧିକ ବିଶ୍ୱସ୍ତ ସେବା ପ୍ଲାଟଫର୍ମ",
    founderInfo: "ପ୍ରତିଷ୍ଠାତା: ରିତିକ କୁମାର | ଯୋଗାଯୋଗ: 8340 315 955 | ଇମେଲ: ritiksharma8340031@gmail.com",
    cofounderInfo: "ସହ-ପ୍ରତିଷ୍ଠାତା: ଋଷି ଜୈନ | ଯୋଗାଯୋଗ: 8769392447 | ଇମେଲ: rishijain09414@gmail.com"
  },
  as: {
    welcome: "স্বাগতম",
    customer: "গ্ৰাহক",
    worker: "শ্ৰমিক",
    login: "লগিন",
    signup: "চাইন আপ",
    findWorkers: "এতিয়াই শ্ৰমিক বিচাৰি উলিয়াওক",
    becomeWorker: "শ্ৰমিক হ'ব",
    contact: "যোগাযোগ: 8340 315 955",
    email: "ইমেইল: worqley@gmail.com",
    about: "WORQELY ৰ বিষয়ে",
    services: "আমাৰ সেৱাসমূহ",
    howItWorks: "ই কেনেদৰে কাম কৰে",
    testimonials: "আমাৰ ব্যৱহাৰকাৰীয়ে কি কয়",
    support: "24/7 সহায়",
    verifiedWorkers: "100% প্ৰমাণিত শ্ৰমিক",
    instantMatching: "তৎক্ষণাৎ মিলোৱা",
    fairPricing: "ন্যায্য মূল্য",
    qualityGuarantee: "গুণগত নিশ্চয়তা",
    trustedPlatform: "ভাৰতৰ আটাইতকৈ বিশ্বাসযোগ্য সেৱা প্ৰেটফৰ্ম",
    founderInfo: "প্ৰতিষ্ঠাতা: ৰিতিক কুমাৰ | যোগাযোগ: 8340 315 955 | ইমেইল: ritiksharma8340031@gmail.com",
    cofounderInfo: "সহ-প্ৰতিষ্ঠাতা: ঋষি জৈন | যোগাযোগ: 8769392447 | ইমেইল: rishijain09414@gmail.com"
  },
  ur: {
    welcome: "خوش آمدید",
    customer: "گاہک",
    worker: "مزدور",
    login: "لاگ ان",
    signup: "سائن اپ",
    findWorkers: "ابھی مزدور تلاش کریں",
    becomeWorker: "مزدور بنیں",
    contact: "رابطہ: 8340 315 955",
    email: "ای میل: worqley@gmail.com",
    about: "WORQELY کے بارے میں",
    services: "ہماری خدمات",
    howItWorks: "یہ کیسے کام کرتا ہے",
    testimonials: "ہمارے صارفین کیا کہتے ہیں",
    support: "24/7 سپورٹ",
    verifiedWorkers: "100% تصدیق شدہ مزدور",
    instantMatching: "فوری میچنگ",
    fairPricing: "منصفانہ قیمت",
    qualityGuarantee: "کوالٹی کی ضمانت",
    trustedPlatform: "ہندوستان کا سب سے قابل اعتماد سروس پلیٹ فارم",
    founderInfo: "بانی: رتک کمار | رابطہ: 8340 315 955 | ای میل: ritiksharma8340031@gmail.com",
    cofounderInfo: "شریک بانی: رشی جین | رابطہ: 8769392447 | ای میل: rishijain09414@gmail.com"
  },
};

const LanguageContext = createContext<
  LanguageContextType | undefined
>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguage must be used within a LanguageProvider",
    );
  }
  return context;
};

type Page =
  | "home"
  | "customer-login"
  | "customer-signup"
  | "worker-login"
  | "worker-signup"
  | "customer-dashboard"
  | "worker-dashboard"
  | "admin-panel";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [currentUser, setCurrentUser] = useState<User | null>(
    null,
  );
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return (
      translations[language]?.[key] ||
      translations.en[key] ||
      key
    );
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.type === "customer") {
      navigateTo("customer-dashboard");
    } else if (user.type === "worker") {
      navigateTo("worker-dashboard");
    } else if (user.type === "admin") {
      navigateTo("admin-panel");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo("home");
  };

  const renderCurrentPage = () => {
    const LoadingFallback = () => (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );

    return (
      <Suspense fallback={<LoadingFallback />}>
        {(() => {
          switch (currentPage) {
            case "home":
              return <Homepage onNavigate={navigateTo} />;
            case "customer-login":
              return (
                <CustomerLogin
                  onNavigate={navigateTo}
                  onLogin={handleLogin}
                />
              );
            case "customer-signup":
              return (
                <CustomerSignup
                  onNavigate={navigateTo}
                  onLogin={handleLogin}
                />
              );
            case "worker-login":
              return (
                <WorkerLogin
                  onNavigate={navigateTo}
                  onLogin={handleLogin}
                />
              );
            case "worker-signup":
              return (
                <WorkerSignup
                  onNavigate={navigateTo}
                  onLogin={handleLogin}
                />
              );
            case "customer-dashboard":
              return (
                <CustomerDashboard
                  user={currentUser}
                  onLogout={handleLogout}
                />
              );
            case "worker-dashboard":
              return (
                <WorkerDashboard
                  user={currentUser}
                  onLogout={handleLogout}
                />
              );
            case "admin-panel":
              return (
                <AdminPanel
                  user={currentUser}
                  onLogout={handleLogout}
                />
              );
            default:
              return <Homepage onNavigate={navigateTo} />;
          }
        })()}
      </Suspense>
    );
  };

  const languageContextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <div className="min-h-screen bg-background">
        {renderCurrentPage()}
      </div>
    </LanguageContext.Provider>
  );
}