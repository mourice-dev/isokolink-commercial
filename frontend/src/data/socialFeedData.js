// 100% Farming, Agricultural News, Crop Disease Alerts & Soil Status Data for Rwanda (English Language)

export const REGIONAL_CONDITIONS = [
  {
    province: 'Northern Province (Musanze, Gakenke)',
    weather: '🌧️ Heavy Morning Fog & Rain (17°C, 88% Humidity)',
    statusType: 'caution',
    alertTitle: '⚠️ CAUTION: Late Blight (Phytophthora infestans) Outbreak Risk in Irish Potatoes',
    description: 'Continuous damp soil and highland fog are accelerating fungal spore proliferation. Smallholders must apply preventive protective fungicides (certified Ridomil Gold MZ 68 WG or Mancozeb) within 48 hours to avert tuber rot and foliar blight.',
    actionText: 'Explore Blight Antidotes',
    actionTab: 'defense',
    updatedAt: 'Updated 20 mins ago'
  },
  {
    province: 'Eastern Province (Nyagatare, Kayonza)',
    weather: '☀️ High Solar Radiation & Dry Winds (29°C, 35% Humidity)',
    statusType: 'optimal',
    alertTitle: '🌾 CAUTION: Fall Armyworm (Spodoptera frugiperda) Egg Hatching in Young Maize',
    description: 'Warm dry conditions are favorable for corn borer larvae. Scout central leaf whorls for sawdust-like frass and pinholes. Apply Coragen 20 SC or certified bio-larvicides at dusk to protect developing vegetative whorls.',
    actionText: 'View Armyworm Control',
    actionTab: 'defense',
    updatedAt: 'Updated 45 mins ago'
  },
  {
    province: 'Western Province (Rubavu, Rutsiro)',
    weather: '⛅ Lake Breeze Showers (22°C, 75% Humidity)',
    statusType: 'caution',
    alertTitle: '🍌 CAUTION: Banana Xanthomonas Wilt (BXW) Prevention Advisory',
    description: 'Extension agronomists remind all plantain and banana growers to break off male flower buds using wooden forked sticks (never metal knives) and sanitize harvest machetes with a 1:5 sodium hypochlorite disinfectant solution.',
    actionText: 'View BXW Sanitation Kit',
    actionTab: 'defense',
    updatedAt: 'Updated 1 hour ago'
  },
  {
    province: 'Southern Province (Huye, Nyamagabe)',
    weather: '🌦️ Afternoon Hillside Drizzle (20°C, 82% Humidity)',
    statusType: 'caution',
    alertTitle: '☕ CAUTION: Coffee Berry Borer & Acidic Soil Management',
    description: 'Highland soil acidity (pH < 5.0) is restricting nitrogen and phosphorus uptake in Arabica coffee trees. Smallholders are advised to apply agricultural Travertine lime before peak rains and strip-pick overripe berries to eradicate borer nesting.',
    actionText: 'View Soil Liming Solutions',
    actionTab: 'defense',
    updatedAt: 'Updated 30 mins ago'
  },
  {
    province: 'Kigali Central Wholesale (Nyabugogo & Kimironko Markets)',
    weather: '🚚 High Commercial Commodity Demand (25°C)',
    statusType: 'market',
    alertTitle: '📈 Strong Wholesale Demand for Kinigi Potatoes & High-Iron Beans',
    description: 'Commercial hospitality buyers and millers are actively purchasing Kinigi Grade A1 potatoes at 420–510 RWF/kg and biofortified high-iron red beans at 850 RWF/kg. Certified cooperatives can arrange palletized direct truck loading.',
    actionText: 'Supply Farm Harvest',
    actionTab: 'market',
    updatedAt: 'Updated 10 mins ago'
  }
];

export const STORIES_DATA = [
  {
    id: 's-1',
    user: 'My Farm Log',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    isUser: true,
    title: 'Post Farm Update'
  },
  {
    id: 's-2',
    user: 'COOPAMA Musanze',
    avatar: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    title: 'Kinigi Potato Harvest'
  },
  {
    id: 's-3',
    user: 'Dr. Uwera (RAB)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80',
    title: 'Field Disease Scout'
  },
  {
    id: 's-4',
    user: 'AgroPy Rwanda Hub',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
    title: 'Solar Sprayer Demo'
  },
  {
    id: 's-5',
    user: 'Maraba Coffee Union',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    title: 'Arabica Rust Defense'
  },
  {
    id: 's-6',
    user: 'Nyagatare Grain Co-op',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80',
    title: 'PICS Silo Storage'
  },
  {
    id: 's-7',
    user: 'Gakenke Avocado Alliance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    title: 'Hass Export Grading'
  }
];

export const INITIAL_SOCIAL_POSTS = [
  {
    id: 'post-1',
    authorName: 'COOPAMA Musanze Potato Farmers Union',
    authorAvatar: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=200&q=80',
    authorBadge: 'Certified Cooperative (RAB & RICA Accredited)',
    timeAgo: '2 hours ago',
    location: 'Musanze, Northern Province',
    content: '🌾 HARVEST BULLETIN & YIELD REPORT: COOPAMA Musanze has begun harvesting our Grade-A Kinigi Irish Potatoes across the volcanic foothills! This season, cooperative yields grew by 24% following disciplined preventive spraying against Late Blight (Phytophthora infestans) with Ridomil Gold MZ 68 WG during early rains.\n\n📦 Available Inventory: 18.5 Metric Tonnes of washed, size-graded Kinigi tubers suitable for bulk wholesale, institutional catering, and commercial potato crisp processing.\n💰 Farm-gate Cooperative Price: 420 RWF / kg (Zero middleman cut, direct escrow transfer).\n🚚 Delivery Logistics: Palletized loading available for Kigali wholesale transport (Nyabugogo & Kimironko depots).',
    images: [
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80'
    ],
    moreImagesCount: 3,
    likes: 184,
    commentsCount: 32,
    shares: 19,
    hasLiked: false,
    comments: [
      {
        id: 'c-1',
        userName: 'Cedrick Og (Kigali Wholesale Grain & Tuber Buyer)',
        userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        text: 'Thank you COOPAMA! Our distribution warehouse requires 5 metric tonnes of Kinigi potatoes delivered to Nyabugogo by Friday morning. We have just initiated the escrow order via Farmiq.',
        time: '35 mins ago'
      },
      {
        id: 'c-2',
        userName: 'Dr. Uwera Claire (RAB Agronomist & Extension Lead)',
        userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        text: 'Early preventive spraying against late blight has clearly protected tuber flesh integrity. Remember to cure skins for 7–10 days in well-ventilated crates before loading into long-haul trucks to prevent bruising.',
        time: '15 mins ago'
      }
    ],
    tagProduct: {
      title: 'Kinigi Irish Potatoes (420 RWF / kg)',
      action: 'order'
    }
  },
  {
    id: 'post-2',
    authorName: 'Rwanda Agriculture Board (RAB) - Crop Protection Unit',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    authorBadge: 'Official Government Agricultural Agency',
    timeAgo: '4 hours ago',
    location: 'Eastern Province • Nyagatare & Gatsibo Districts',
    content: '⚠️ URGENT PEST ALERT: Fall Armyworm (Spodoptera frugiperda) Scouting Advisory in Young Maize\n\nRoutine entomological inspections across Nyagatare and Gatsibo farming clusters confirm fresh egg masses and early-instar larvae feeding in young maize whorls (V4–V7 vegetative stage).\n\nActionable Agronomic Protocol for Maize Smallholders:\n1. Scouting Routine: Examine 20 consecutive stalks across 5 random field locations. Check for windowpane leaf feeding and sawdust-like frass in central whorls.\n2. Chemical Intervention: Apply certified Coragen 20 SC (5ml per 20L water in knapsack sprayer) or approved bio-pesticides. Direct spray streams straight into the funnel whorl.\n3. Optimal Spraying Window: Apply during early mornings (06:00–08:30) or late afternoons (after 17:00) when caterpillars emerge from shelter and heat stress is low.',
    images: [
      'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80'
    ],
    moreImagesCount: 0,
    likes: 412,
    commentsCount: 56,
    shares: 94,
    hasLiked: true,
    comments: [
      {
        id: 'c-3',
        userName: 'Emmanuel Nsengiyumva (Nyagatare Maize Producers Lead)',
        userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
        text: 'Thank you for this timely advisory. Can farmers confirm whether certified Coragen 20 SC is currently stocked at subsidized rates at the Nyagatare district agro-dealer store?',
        time: '2 hours ago'
      },
      {
        id: 'c-3b',
        userName: 'AgroPy Musanze & Eastern Depot Manager',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        text: 'Yes Emmanuel, 350 sealed bottles of Coragen 20 SC arrived at the Nyagatare depot this morning. Fully registered with RICA batch verification seals.',
        time: '1 hour ago'
      }
    ],
    tagProduct: {
      title: 'Coragen 20 SC Fall Armyworm Bio-Defense (14,200 RWF)',
      action: 'defense'
    }
  },
  {
    id: 'post-3',
    authorName: 'Twitezimbere Avocado Union (Gakenke Terraces)',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    authorBadge: 'GlobalGAP Certified Producer Organization',
    timeAgo: '6 hours ago',
    location: 'Gakenke District, Northern Province',
    content: '🥑 EXPORT QUALITY READY: Selective Harvesting of Hass Avocados on Terraced Orchards\n\nTwitezimbere cooperative members have completed picking this week’s lot of certified Hass avocados. Every fruit is clipped with shears leaving a 4mm stem button to guard against post-harvest anthracnose and fungal entry.\n\n📊 Agronomic Quality Specifications:\n• Fruit Caliber: Sizes 16–22 (220g to 300g per fruit)\n• Dry Matter Percentage: 23.8% (exceeds the 21% international export standard for rich oil content)\n• Pest Inspection: 100% clean of fruit fly punctures and thrips scars\n• Total Volume: 6.2 Metric Tonnes packed in 4kg cartons for cold-chain export and premium domestic supermarkets.',
    images: [
      'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80'
    ],
    moreImagesCount: 0,
    likes: 128,
    commentsCount: 18,
    shares: 8,
    hasLiked: false,
    comments: [
      {
        id: 'c-4',
        userName: 'Valentine Mukarugwiza (Horticulture Export Trader)',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        text: 'The 23.8% dry matter reading is phenomenal. We are booking 3 metric tonnes for our refrigerated air cargo shipment out of Kigali International Airport this weekend.',
        time: '3 hours ago'
      }
    ],
    tagProduct: {
      title: 'Hass Export Avocados (850 RWF / kg)',
      action: 'order'
    }
  },
  {
    id: 'post-4',
    authorName: 'Maraba Specialty Coffee Cooperative (Huye Highlands)',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    authorBadge: 'Fairtrade & Rainforest Alliance Certified',
    timeAgo: '9 hours ago',
    location: 'Huye District, Southern Province',
    content: '☕ SOIL HEALTH & WET MILL PROCESSING: Travertine Lime Application & Bourbon Arabica Cherry Grading\n\nOur cooperative washing station has concluded pulping of 12 metric tonnes of red Bourbon cherries (sugar brix rating 21.5°). To treat persistent hillside soil acidity (pH 4.8), our 600 member farmers are currently broadcasting agricultural Travertine lime (2.5 tonnes/ha) combined with composted coffee cherry pulp.\n\n🌿 Extension Tip for Southern Coffee Growers: De-sucker inner branches now to ensure sun penetration and eliminate humid micro-climates that favor Coffee Berry Disease (CBD).',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80'
    ],
    moreImagesCount: 0,
    likes: 215,
    commentsCount: 29,
    shares: 31,
    hasLiked: true,
    comments: [
      {
        id: 'c-5',
        userName: 'Fidèle Munyaneza (Washing Station Quality Lead)',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        text: 'Soil liming with Travertine has boosted our cherry density and average bean cup scores by 3.5 points over two consecutive crop cycles.',
        time: '4 hours ago'
      }
    ],
    tagProduct: {
      title: 'Agricultural Travertine Lime (Soil pH Balancer - 8,500 RWF / 50kg)',
      action: 'defense'
    }
  },
  {
    id: 'post-5',
    authorName: 'Patrice Rugamba - Rubavu Banana Growers Association',
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    authorBadge: 'Community Plant Health Scout',
    timeAgo: '14 hours ago',
    location: 'Rubavu District, Western Province',
    content: '🍌 BANANA HEALTH MILESTONE: Zero-Tolerance BXW Protocol Maintained Across 120 Hectares!\n\nThrough community peer surveillance, our local smallholder clusters have kept Banana Xanthomonas Wilt completely contained this quarter:\n1. De-budding: Male buds are removed using wooden forked sticks immediately after fruit bunches set, denying stingless bees and insect vectors entrance.\n2. Tool Sanitation: Field machetes are soaked in sodium hypochlorite disinfectant between each clump.\n3. Planting Stock: Replanting is strictly done with tested tissue-culture suckers.\n\nOur Matooke and cooking banana yields have rebounded to 34 tonnes/ha. Fresh bunches are ready for weekly trade.',
    images: [
      'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80'
    ],
    moreImagesCount: 0,
    likes: 176,
    commentsCount: 22,
    shares: 44,
    hasLiked: false,
    comments: [
      {
        id: 'c-6',
        userName: 'Marie Claire Uwera (Horticulture Specialist)',
        userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        text: 'Rubavu stands as a national model for community-led biosecurity. Strict tool sanitation remains the only sure safeguard against bacterial wilt.',
        time: '7 hours ago'
      }
    ],
    tagProduct: {
      title: 'Disinfectant Tool Wash Kit & Wooden Debudders (6,500 RWF)',
      action: 'defense'
    }
  }
];

export const FRIEND_REQUESTS_DATA = [
  {
    id: 'fr-1',
    name: 'Jean-Baptiste Hakizimana',
    role: 'Kinigi Potato Cooperative Chairman',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    mutual: 'Musanze Agro-Alliance • 18 Mutual Farmers',
    time: '2d ago'
  },
  {
    id: 'fr-2',
    name: 'Marie Claire Uwera',
    role: 'Organic Horticulture Agronomist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    mutual: 'RAB Soil Health Network • 6 Mutual Agronomists',
    time: '3d ago'
  },
  {
    id: 'fr-3',
    name: 'Fidèle Munyaneza',
    role: 'Huye Specialty Coffee Washing Station',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    mutual: 'NAEB Coffee Exporters • 9 Mutual Producers',
    time: '1w ago'
  },
  {
    id: 'fr-4',
    name: 'Solange Nyiransabimana',
    role: 'Bugesera Biofortified Bean Growers Lead',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    mutual: 'Eastern Seed Producers • 12 Mutual Farmers',
    time: '1w ago'
  },
  {
    id: 'fr-5',
    name: 'Dr. Juvenal Kayiranga',
    role: 'Plant Pathologist & Seed Inspector',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    mutual: 'RICA Inspectorate • 15 Mutual Agronomists',
    time: '2w ago'
  }
];

export const SIDEBAR_CONTACTS = [
  { id: 'c-ai', name: 'AI Crop Diagnostic Doctor', role: 'Instant Plant Pathology Bot', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80', online: true, isAi: true },
  { id: 'c-1', name: 'Dr. Uwera Claire (RAB Agronomist)', role: 'Crop Protection Specialist', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80', online: true },
  { id: 'c-2', name: 'Kazzo Eric (COOPAMA Musanze)', role: 'Warehouse & Seed Inspector', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', online: true },
  { id: 'c-3', name: 'AgroPy Musanze Depot Manager', role: 'Certified Agrochemical Supplier', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', online: true },
  { id: 'c-4', name: 'Cedrick Og (Kigali Grain Buyer)', role: 'Commercial Mill Purchaser', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', online: true },
  { id: 'c-5', name: 'Emmanuel Nsengiyumva (Nyagatare)', role: 'Maize & Sorghum Producer', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80', online: true },
  { id: 'c-6', name: 'Chantal Mukamana (Gasabo Veg)', role: 'French Bean Greenhouse Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', online: true },
  { id: 'c-7', name: 'Patrice Rugamba (Rubavu Banana)', role: 'BXW Field Disinfection Lead', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80', online: true },
  { id: 'c-8', name: 'Innocent Gasana (Rwamagana)', role: 'Red Onion Alliance Head', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80', online: true },
];
