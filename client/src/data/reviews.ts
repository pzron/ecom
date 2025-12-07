export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  language?: "banglish" | "bangla" | "mixed";
}

const banglishReviewTemplates = [
  "Onek valo product! Amar jonno perfect. Highly recommended!",
  "Excellent quality! Price er tulonay onek valo. 100% satisfied.",
  "Ami onek khushi ei product peyee. Fast delivery, good packaging.",
  "Product ta exactly jetarkom chilo website e. No complaints!",
  "Valo maner product. Amake disappoint korenai. Will buy again.",
  "Onek din dhore ei product khujtechilam. Finally peyechi quality version!",
  "Sobkichu thik ache. Delivery on time, product genuine. Thanks!",
  "Trusted seller. Product ta authentic and high quality.",
  "Amar family te sobai use kore, sobai happy. Great product!",
  "Value for money. Ei price e ei quality paoya kothao somvob na.",
  "Duto kinechi, duita-i perfect condition e esheche. Excellent!",
  "Customer service onek valo. Product e problem hoyechilo, solve kore diyeche.",
  "Premium quality product. Exactly as described. Valo lagche use korte.",
  "Genuine product, original packaging. Ami verify korechi. 100% real.",
  "Fast delivery hoyeche. Product packaging onek secure chilo.",
  "Ami 3rd bar order korchi. Ei brand er upor trust ache.",
  "Neighbors dekhe tara o order diyeche. Sobai satisfied!",
  "Office e use kori, colleagues ra o interested hoyeche.",
  "Gift hishebe diyechilam, recipient onek khushi hoyeche.",
  "Onek research korar por ei product kinechilam. Right decision!",
  "Quality te kono compromise nei. Worth every taka spent.",
  "Imported quality, local price. Can't ask for more!",
  "Eta amar 2nd purchase. First ta onek valo chilo tai abar kinlam.",
  "Social media te dekhe order diyechilam. Reality better than expectation!",
  "Comparison korecho other brands er sathe. Eta best!",
  "Durability onek valo. 6 months use korchi, notun er moto ache.",
  "Color exactly as shown. Size perfect. Overall excellent!",
  "Return policy ache tai tension free te order korecho. But return er dorkar hoyni!",
  "Budget er modhye best option. Highly satisfied with purchase.",
  "Packaging premium chilo. Gift worthy presentation.",
  "Ami skeptical chilam online e kinte. But experience amazing!",
  "Product features sob kaje lagtese. Onek useful purchase.",
  "Amar requirements perfectly meet koreche. Happy customer!",
  "First time user. Definitely will become a regular!",
  "Quick delivery, responsive seller, quality product. All boxes ticked!",
  "Ami YouTube e review dekhe kinechilam. Real life e aro valo!",
  "Amar baba ma er jonno kinechilam. Tara onek appreciate koreche.",
  "Kids onek pasond koreche. Safe for children use.",
  "Daily use er jonno perfect. Durable and reliable.",
  "Ami interior designer, client der recommend kori ei products.",
  "Professional quality at consumer price. Impressed!",
  "Competitor products use korechi. Eta clearly superior.",
  "Onek eco-friendly packaging. Environment conscious company!",
  "Ami foreign e thaki, desh e gift pathiyechi. Perfect condition e pohochese!",
  "Texture, finish, everything premium feel. Love it!",
  "Easy to use, easy to maintain. Perfect for busy people.",
  "Ami repeat customer. Never disappointed with this brand.",
  "Installation easy chilo. Instructions clear ache.",
  "Space saving design. Amar small apartment er jonno perfect.",
  "Color matching exactly ta cheyechilam. Got the perfect shade!"
];

const banglaReviewTemplates = [
  "অসাধারণ পণ্য! আমি খুবই সন্তুষ্ট। সবাইকে রেকমেন্ড করব।",
  "দারুণ কোয়ালিটি! দাম অনুযায়ী ভ্যালু অনেক ভালো।",
  "পণ্যটি ঠিক যেমন দেখিয়েছে তেমনই এসেছে। ধন্যবাদ!",
  "আমার পরিবারের সবাই খুশি এই পণ্য পেয়ে। দারুণ!",
  "অনেক দিন ধরে খুঁজছিলাম এই পণ্যটি। অবশেষে পেয়ে গেলাম!",
  "ডেলিভারি ফাস্ট ছিল এবং প্যাকেজিং অনেক ভালো।",
  "বিশ্বস্ত বিক্রেতা। পণ্যটি অরিজিনাল এবং উচ্চমানের।",
  "এই দামে এই কোয়ালিটি পাওয়া সত্যিই অসাধারণ।",
  "আমি তৃতীয়বার অর্ডার করছি। প্রতিবারই সন্তুষ্ট!",
  "প্রিমিয়াম কোয়ালিটি। হতাশ হইনি। দারুণ পণ্য!",
  "জেনুইন প্রোডাক্ট। অরিজিনাল প্যাকেজিং। ভেরিফাইড!",
  "কাস্টমার সার্ভিস অনেক ভালো। সমস্যা সমাধান করে দিয়েছে।",
  "ফ্যামিলিতে সবাই ব্যবহার করে। সবাই খুশি!",
  "অনেক রিসার্চ করার পর এই পণ্য কিনেছি। সঠিক সিদ্ধান্ত!",
  "গিফট হিসেবে দিয়েছিলাম। রিসিপিয়েন্ট অনেক খুশি!",
  "ডুরাবিলিটি অনেক ভালো। মাসের পর মাস ব্যবহার করছি।",
  "কালার এক্জ্যাক্টলি যেমন দেখানো হয়েছে। পারফেক্ট!",
  "বাজেটের মধ্যে সেরা অপশন। হাইলি স্যাটিসফাইড!",
  "ইম্পোর্টেড কোয়ালিটি, লোকাল দাম। চমৎকার!",
  "প্রোডাক্ট ফিচার্স সব কাজে লাগছে। খুবই ইউজফুল!",
  "আমার রিকোয়ারমেন্টস পারফেক্টলি মিট করেছে। হ্যাপি!",
  "প্রথমবার ইউজার। অবশ্যই রেগুলার হবে!",
  "কুইক ডেলিভারি, রেসপন্সিভ সেলার। অসাধারণ!",
  "বাবা-মায়ের জন্য কিনেছিলাম। তারা অনেক এপ্রিসিয়েট করেছে।",
  "ডেইলি ইউজের জন্য পারফেক্ট। ডিউরেবল এবং রিলায়েবল!",
  "প্রফেশনাল কোয়ালিটি কনজিউমার প্রাইসে। ইমপ্রেসড!",
  "ইকো-ফ্রেন্ডলি প্যাকেজিং। এনভায়রনমেন্ট কনশাস কোম্পানি!",
  "টেক্সচার, ফিনিশ সবকিছু প্রিমিয়াম ফিল। লাভ ইট!",
  "ইজি টু ইউজ, ইজি টু মেইনটেইন। পারফেক্ট!",
  "আমি রিপিট কাস্টমার। কখনো হতাশ হইনি এই ব্র্যান্ডে!",
  "ইনস্টলেশন সহজ ছিল। ইন্সট্রাকশন ক্লিয়ার আছে।",
  "স্পেস সেভিং ডিজাইন। ছোট অ্যাপার্টমেন্টের জন্য পারফেক্ট!",
  "কালার ম্যাচিং এক্জ্যাক্টলি চেয়েছিলাম। পেয়ে গেলাম!",
  "অনলাইনে কিনতে ভয় পেতাম। কিন্তু এক্সপেরিয়েন্স অসাধারণ!",
  "সোশ্যাল মিডিয়ায় দেখে অর্ডার দিয়েছিলাম। রিয়্যালিটি আরো ভালো!",
  "কম্পেরিজন করেছি অন্যান্য ব্র্যান্ডের সাথে। এটা বেস্ট!",
  "রিটার্ন পলিসি আছে তাই টেনশন ফ্রি অর্ডার। কিন্তু রিটার্নের দরকার হয়নি!",
  "ইউটিউবে রিভিউ দেখে কিনেছিলাম। রিয়েল লাইফে আরো ভালো!",
  "বাচ্চারা অনেক পছন্দ করেছে। সেফ ফর চিলড্রেন!",
  "কম্পিটিটর প্রোডাক্টস ইউজ করেছি। এটা স্পষ্টতই সুপিরিয়র!",
  "বিদেশে থাকি, দেশে গিফট পাঠিয়েছি। পারফেক্ট কন্ডিশনে পৌঁছেছে!",
  "অফিসে ইউজ করি। কলিগরাও ইন্টারেস্টেড হয়েছে!",
  "প্রথম বারের মতো অর্ডার করলাম। চমৎকার অভিজ্ঞতা!",
  "পণ্যের মান অসাধারণ। আশা করেছিলাম তার চেয়ে ভালো পেয়েছি।",
  "সময়মতো ডেলিভারি হয়েছে। প্যাকেজিং সুন্দর ছিল।",
  "এই ব্র্যান্ডের উপর আমার পূর্ণ বিশ্বাস আছে।",
  "দীর্ঘদিন ব্যবহার করার উপযোগী পণ্য। সন্তুষ্ট!",
  "মূল্য অনুযায়ী মান চমৎকার। ধন্যবাদ বিক্রেতাকে!",
  "সবাইকে এই পণ্যটি কেনার জন্য সুপারিশ করছি।",
  "আমার প্রত্যাশা পূরণ হয়েছে। আবার কিনব!"
];

const mixedReviewTemplates = [
  "Ami onek দিন ধরে ei product খুঁজছিলাম। Finally পেয়ে গেলাম! Super happy!",
  "Quality অসাধারণ! Amar expectations exceed করে দিয়েছে।",
  "Fast delivery, packaging secure, product জেনুইন। All good!",
  "প্রথমে skeptical ছিলাম online কেনাকাটায়। But experience amazing!",
  "Office তে সবাই impressed হয়েছে এই product দেখে।",
  "দাম একটু বেশি, but quality র জন্য worth it!",
  "আমার wife এর জন্য কিনেছিলাম। She loves it! Perfect gift।",
  "Durability test করলাম, passed with flying colors!",
  "সত্যি বলতে, better option আর নেই market এ।",
  "First order ছিল এই seller থেকে। Definitely will order again!",
  "বাংলাদেশে এই quality পাওয়া rare। Highly impressed!",
  "Installation করতে help লাগলে YouTube tutorial আছে।",
  "আমার বাচ্চারা use করে। Totally safe and durable!",
  "Price কমে গেলে আরো কয়েকটা কিনব। Great product anyway!",
  "Original product, verified করেছি brand website থেকে।",
  "এত smooth delivery আগে কখনো পাইনি। Excellent service!",
  "Comparison করেছি অনেক brands এর সাথে। This is the winner!",
  "আমি interior designer, clients কে recommend করি always।",
  "Premium feel আছে। Looks expensive, price reasonable!",
  "Return করার দরকার হয়নি। Product exactly as expected!",
  "Weekend এ order দিয়েছিলাম, Monday তে পেয়ে গেছি। Fast!",
  "অনেক research করার পর এটা select করেছি। No regrets!",
  "বিদেশ থেকে order দিয়েছিলাম দেশে পাঠাতে। Smooth process!",
  "Customer support অনেক helpful। Query solve করে দিয়েছে।",
  "Packaging এতটাই সুন্দর ছিল, gift wrap লাগেনি!",
  "মা-বাবা use করেন। They are very happy with it!",
  "Authentic product। Hologram sticker verified করেছি।",
  "Second purchase হচ্ছে এটা। First টা ছিল gift এর জন্য।",
  "Daily use এ কোনো issue নেই। Running smoothly!",
  "Color সত্যিই beautiful। Photo তে যেমন real life এও তেমন!"
];

const userNames = [
  "Fatima Akter", "রাহুল হাসান", "Nadia Rahman", "সাবরিনা চৌধুরী", "Tanvir Ahmed",
  "মোঃ করিম উদ্দিন", "Shahana Begum", "Imran Hossain", "তাসনিম জাহান", "Kamrul Islam",
  "ড. আমিনা খাতুন", "Rifat Mahmud", "সুলতানা রহমান", "Abdul Karim", "রাজিব হোসেন",
  "Shakil Ahmed", "মিতা দাস", "Arif Hasan", "নাজমা আক্তার", "Priya Sen",
  "শাহানা পারভীন", "Roksana Akter", "মোহাম্মদ আলী", "Tahmina Khatun", "ফারহানা ইসলাম",
  "Sadia Islam", "আব্দুল্লাহ আল মামুন", "Monirul Haque", "রুমানা আক্তার", "Jahangir Alam",
  "শামীমা নাসরীন", "Habibur Rahman", "ফাতেমা জান্নাত", "Mizanur Rahman", "সালমা বেগম",
  "Nazmul Huda", "আয়েশা সিদ্দিকা", "Shariful Islam", "মাহমুদা খাতুন", "Rafiqul Islam",
  "জাহানারা বেগম", "Moktar Hossain", "নাফিসা রহমান", "Kamal Uddin", "শিরিন আক্তার",
  "Badrul Alam", "মোসাম্মৎ রোকেয়া", "Shafiqul Islam", "তাহমিনা সুলতানা", "Nazrul Islam",
  "ফারজানা হক", "Aminul Islam", "রেহানা পারভীন", "Delwar Hossain", "সাবিনা ইয়াসমিন",
  "Mahbubur Rahman", "নাসরীন জাহান", "Anisur Rahman", "ফেরদৌসী রহমান", "Shamsul Alam",
  "জেসমিন আক্তার", "Lutfor Rahman", "মুনিরা বেগম", "Hasanuzzaman", "শাহনাজ পারভীন",
  "Mostafizur Rahman", "আফরোজা সুলতানা", "Nurul Huda", "সাফিয়া খাতুন", "Mahfuzur Rahman",
  "রুবিনা আক্তার", "Golam Rabbani", "তাসলিমা নাসরীন", "Shohidul Islam", "ফারহানা আক্তার",
  "Motaleb Hossain", "নাজিয়া সুলতানা", "Asaduzzaman", "শামীমা আক্তার", "Zahirul Islam",
  "মাজেদা বেগম", "Harunur Rashid", "সুফিয়া বেগম", "Alamgir Hossain", "নূরজাহান বেগম",
  "Faruque Ahmed", "জোবায়দা খাতুন", "Monir Hossain", "হাসিনা বেগম", "Iqbal Hossain",
  "আমেনা খাতুন", "Rezaul Karim", "সাজেদা আক্তার", "Shahadat Hossain", "ফিরোজা বেগম",
  "Kazi Nazrul", "লাইলা আরজুমান্দ", "Obaidur Rahman", "রোজিনা আক্তার", "Sohel Rana"
];

function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function generateReviewDate(random: () => number): string {
  const now = new Date();
  const daysAgo = Math.floor(random() * 90);
  const reviewDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return reviewDate.toISOString().split('T')[0];
}

function generateReviewsForProduct(productId: string, productIndex: number): Review[] {
  const random = seededRandom(productIndex * 1000 + 42);
  const reviewCount = Math.floor(random() * 4) + 2;
  const reviews: Review[] = [];
  
  for (let i = 0; i < reviewCount; i++) {
    const languageChoice = random();
    let comment: string;
    let language: "banglish" | "bangla" | "mixed";
    
    if (languageChoice < 0.35) {
      comment = banglishReviewTemplates[Math.floor(random() * banglishReviewTemplates.length)];
      language = "banglish";
    } else if (languageChoice < 0.7) {
      comment = banglaReviewTemplates[Math.floor(random() * banglaReviewTemplates.length)];
      language = "bangla";
    } else {
      comment = mixedReviewTemplates[Math.floor(random() * mixedReviewTemplates.length)];
      language = "mixed";
    }
    
    const rating = random() > 0.15 ? (random() > 0.3 ? 5 : 4) : (random() > 0.5 ? 3 : 2);
    
    reviews.push({
      id: `r${productIndex}-${i}`,
      productId: productId,
      userName: userNames[Math.floor(random() * userNames.length)],
      rating: rating,
      comment: comment,
      date: generateReviewDate(random),
      verified: random() > 0.1,
      helpful: Math.floor(random() * 150) + 5,
      language: language
    });
  }
  
  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const preGeneratedReviews: Record<string, Review[]> = {};

for (let i = 1; i <= 10000; i++) {
  const productId = `p${i}`;
  preGeneratedReviews[productId] = generateReviewsForProduct(productId, i);
}

export const productReviews: Record<string, Review[]> = preGeneratedReviews;

export function getProductReviews(productId: string): Review[] {
  if (productReviews[productId]) {
    return productReviews[productId];
  }
  
  const numericId = parseInt(productId.replace(/\D/g, '')) || 1;
  return generateReviewsForProduct(productId, numericId);
}

export function getAverageRating(productId: string): number {
  const reviews = getProductReviews(productId);
  if (reviews.length === 0) return 4.5;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Number((sum / reviews.length).toFixed(1));
}

export function getTotalReviews(productId: string): number {
  return getProductReviews(productId).length;
}

export function getReviewsByLanguage(productId: string, language: "banglish" | "bangla" | "mixed"): Review[] {
  const reviews = getProductReviews(productId);
  return reviews.filter(r => r.language === language);
}

export function getMostHelpfulReviews(productId: string, limit: number = 3): Review[] {
  const reviews = getProductReviews(productId);
  return [...reviews].sort((a, b) => b.helpful - a.helpful).slice(0, limit);
}

export function getRecentReviews(productId: string, limit: number = 5): Review[] {
  const reviews = getProductReviews(productId);
  return [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
}

export function getVerifiedReviews(productId: string): Review[] {
  const reviews = getProductReviews(productId);
  return reviews.filter(r => r.verified);
}

export function getRatingDistribution(productId: string): Record<number, number> {
  const reviews = getProductReviews(productId);
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach(r => {
    distribution[r.rating] = (distribution[r.rating] || 0) + 1;
  });
  return distribution;
}

export const reviewStats = {
  totalReviews: Object.values(productReviews).reduce((sum, reviews) => sum + reviews.length, 0),
  averageRating: 4.5,
  totalProducts: Object.keys(productReviews).length,
  languageBreakdown: {
    banglish: "35%",
    bangla: "35%",
    mixed: "30%"
  }
};
