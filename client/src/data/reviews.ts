export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export const productReviews: Record<string, Review[]> = {
  "bcare-whitening-facewash": [
    {
      id: "r1",
      productId: "bcare-whitening-facewash",
      userName: "Fatima Akter",
      rating: 5,
      comment: "Onek valo product! Amar skin er jonno perfect. 2 week use korar por difference bujhte parlam. Highly recommended!",
      date: "2025-11-28",
      verified: true,
      helpful: 45
    },
    {
      id: "r2",
      productId: "bcare-whitening-facewash",
      userName: "রাহুল হাসান",
      rating: 4,
      comment: "ভালো প্রোডাক্ট। ত্বক অনেক সফট হয়ে গেছে। দাম একটু কম হলে আরো ভালো হতো।",
      date: "2025-11-25",
      verified: true,
      helpful: 32
    },
    {
      id: "r3",
      productId: "bcare-whitening-facewash",
      userName: "Nadia Rahman",
      rating: 5,
      comment: "Best facewash ever used! Oily skin er jonno perfect. Pore size komse noticeably.",
      date: "2025-11-20",
      verified: true,
      helpful: 28
    }
  ],
  "bcare-premium-serum": [
    {
      id: "r4",
      productId: "bcare-premium-serum",
      userName: "সাবরিনা চৌধুরী",
      rating: 5,
      comment: "অসাধারণ! মাত্র ১ মাসে আমার মুখের দাগ অনেক কমে গেছে। সবাইকে recommend করব।",
      date: "2025-11-27",
      verified: true,
      helpful: 67
    },
    {
      id: "r5",
      productId: "bcare-premium-serum",
      userName: "Tanvir Ahmed",
      rating: 4,
      comment: "Good quality serum. Texture onek lightweight, sticky feel nei. Night e use kori, morning e skin glow kore.",
      date: "2025-11-22",
      verified: true,
      helpful: 41
    }
  ],
  "herbal-tea-premium": [
    {
      id: "r6",
      productId: "herbal-tea-premium",
      userName: "মোঃ করিম উদ্দিন",
      rating: 5,
      comment: "চা টা অসাধারণ! প্রতিদিন সকালে খাই। স্বাস্থ্যের জন্য খুবই উপকারী।",
      date: "2025-11-26",
      verified: true,
      helpful: 55
    },
    {
      id: "r7",
      productId: "herbal-tea-premium",
      userName: "Shahana Begum",
      rating: 5,
      comment: "Authentic taste! Deshi cha er moto flavor. Amader puratno bangladesh er taste mone poriye dey.",
      date: "2025-11-24",
      verified: true,
      helpful: 38
    },
    {
      id: "r8",
      productId: "herbal-tea-premium",
      userName: "Imran Hossain",
      rating: 4,
      comment: "Valo cha, natural ingredients. Family te sobai khay. Price reasonable.",
      date: "2025-11-19",
      verified: true,
      helpful: 29
    }
  ],
  "premium-hair-oil": [
    {
      id: "r9",
      productId: "premium-hair-oil",
      userName: "তাসনিম জাহান",
      rating: 5,
      comment: "চুল পড়া অনেক কমে গেছে। প্রতি রাতে ব্যবহার করি। একমাসে result দেখা যাচ্ছে!",
      date: "2025-11-28",
      verified: true,
      helpful: 72
    },
    {
      id: "r10",
      productId: "premium-hair-oil",
      userName: "Kamrul Islam",
      rating: 4,
      comment: "Hair texture improve hoyeche. Natural ingredients diye banano, chemical free. Worth the price!",
      date: "2025-11-23",
      verified: true,
      helpful: 44
    }
  ],
  "vitamin-c-supplement": [
    {
      id: "r11",
      productId: "vitamin-c-supplement",
      userName: "ড. আমিনা খাতুন",
      rating: 5,
      comment: "চমৎকার সাপ্লিমেন্ট। রোগ প্রতিরোধ ক্ষমতা বাড়াতে সাহায্য করে। আমি নিজেও খাই, রোগীদেরও recommend করি।",
      date: "2025-11-27",
      verified: true,
      helpful: 89
    },
    {
      id: "r12",
      productId: "vitamin-c-supplement",
      userName: "Rifat Mahmud",
      rating: 5,
      comment: "Winter e immune system er jonno perfect. Daily ekta kheye nichi, cold lagche na ar.",
      date: "2025-11-21",
      verified: true,
      helpful: 56
    }
  ],
  "organic-honey": [
    {
      id: "r13",
      productId: "organic-honey",
      userName: "সুলতানা রহমান",
      rating: 5,
      comment: "সুন্দরবনের খাঁটি মধু! স্বাদ অসাধারণ। সকালে গরম পানিতে মিশিয়ে খাই।",
      date: "2025-11-26",
      verified: true,
      helpful: 94
    },
    {
      id: "r14",
      productId: "organic-honey",
      userName: "Abdul Karim",
      rating: 5,
      comment: "100% pure modhu. Adulterated na. Taste e bujha jay khati. Family sobai khay.",
      date: "2025-11-22",
      verified: true,
      helpful: 78
    }
  ],
  "salon-hair-gel": [
    {
      id: "r15",
      productId: "salon-hair-gel",
      userName: "রাজিব হোসেন",
      rating: 4,
      comment: "Gel ta strong hold dey. Shoddin thake. Parlour quality gel, ghor e use korte pari.",
      date: "2025-11-25",
      verified: true,
      helpful: 35
    },
    {
      id: "r16",
      productId: "salon-hair-gel",
      userName: "Shakil Ahmed",
      rating: 5,
      comment: "Best gel I've used! Sticky feel nei, natural look dey. Office er jonno perfect.",
      date: "2025-11-20",
      verified: true,
      helpful: 42
    }
  ],
  "premium-coffee": [
    {
      id: "r17",
      productId: "premium-coffee",
      userName: "মিতা দাস",
      rating: 5,
      comment: "কফির গন্ধ অসাধারণ! সকালে এক কাপ খেলে সারাদিন এনার্জি থাকে।",
      date: "2025-11-27",
      verified: true,
      helpful: 61
    },
    {
      id: "r18",
      productId: "premium-coffee",
      userName: "Arif Hasan",
      rating: 4,
      comment: "Rich flavor, imported quality. Price thik ache. Monthly order kori.",
      date: "2025-11-23",
      verified: true,
      helpful: 47
    }
  ],
  "moisturizing-lotion": [
    {
      id: "r19",
      productId: "moisturizing-lotion",
      userName: "নাজমা আক্তার",
      rating: 5,
      comment: "শীতকালে skin dry hoye jay, ei lotion use korar por moisture lock hoy. Best for winter!",
      date: "2025-11-28",
      verified: true,
      helpful: 53
    },
    {
      id: "r20",
      productId: "moisturizing-lotion",
      userName: "Priya Sen",
      rating: 4,
      comment: "Non-greasy texture, quickly absorb hoy. Fragrance o valo. Daily use er jonno perfect.",
      date: "2025-11-24",
      verified: true,
      helpful: 39
    }
  ],
  "anti-aging-cream": [
    {
      id: "r21",
      productId: "anti-aging-cream",
      userName: "শাহানা পারভীন",
      rating: 5,
      comment: "৪০ বছর বয়সে skin ei tight koreche. Fine lines kom hoyeche. Worth every taka!",
      date: "2025-11-26",
      verified: true,
      helpful: 86
    },
    {
      id: "r22",
      productId: "anti-aging-cream",
      userName: "Roksana Akter",
      rating: 5,
      comment: "Imported product local price e. Result dekhte 3 week lage but then magic hoy!",
      date: "2025-11-21",
      verified: true,
      helpful: 71
    }
  ]
};

export function getProductReviews(productId: string): Review[] {
  return productReviews[productId] || [];
}

export function getAverageRating(productId: string): number {
  const reviews = getProductReviews(productId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Number((sum / reviews.length).toFixed(1));
}

export function getTotalReviews(productId: string): number {
  return getProductReviews(productId).length;
}
