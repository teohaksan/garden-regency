/**
 * Garden Regency 芊御 — Project Data
 * Sun Hung Kai Properties | 元朗錦田北
 */
const gardenRegency = {
  // Step 1: Theme
  theme: 'emerald',

  // Step 2: Brand
  brand: {
    propertyName: 'Garden Regency 芊御',
    logo: '/logo.png',
    companyName: '芊御置業顧問',
  },

  // Step 3: Navbar
  nav: {
    items: [
      { id: 'overview', label: '項目概覽', labelEn: 'Overview' },
      { id: 'pillars', label: '建築特色', labelEn: 'Architecture' },
      { id: 'highlights', label: '項目亮點', labelEn: 'Highlights' },
      { id: 'units', label: '單位類型', labelEn: 'Units' },
      { id: 'timeline', label: '項目進程', labelEn: 'Timeline' },
      { id: 'location', label: '位置交通', labelEn: 'Location' },
      { id: 'contact', label: '聯絡我們', labelEn: 'Contact' },
    ],
  },

  // Step 4: Hero
  hero: {
    tagline: '新鴻基地產 傾心鉅獻',
    titleEn: 'Garden Regency',
    titleCn: '芊御',
    // Address shown below the name in the middle of the hero
    address: '新界元朗錦田下高埔村映河路1A號',
    addressNote: '毗鄰爾巒',
    description:
      '元朗錦田北低密度花園豪宅，逾10.6萬平方呎園林及會所空間，48項奢華設施，3.5米特高樓底，締造寫意生活新境界。',
    posterSrc: '/hero-mockup.webp',
    stats: [
      { value: '566', label: '住宅單位', labelEn: 'Residential Units' },
      { value: '3', label: '住宅大樓', labelEn: 'Residential Towers' },
      { value: '10.6', label: '萬平方呎園林及會所', labelEn: 'K sq ft Garden & Club' },
      { value: '33', label: '米園林泳池', labelEn: 'Metre Garden Pool' },
    ],
  },

  // Step 5: Overview (key numbers)
  overview: {
    tagline: '自然與奢華的完美融合',
    title: '項目概覽',
    description:
      '芊御坐落於元朗錦田北，由新鴻基地產精心打造，以近60%園林覆蓋率及逾10.6萬平方呎園林及會所空間，為您呈獻都市中的綠洲生活。',
    columns: 4,
    items: [
      {
        value: '566',
        label: '住宅單位',
        labelEn: 'Residential Units',
        sub: '1房至3房 · 特色戶',
        subEn: '1-3 Bedrooms · Special Units',
        detail: '約70%為兩房設計，迎合不同家庭所需',
        detailEn: 'Approx. 70% two-bedroom design',
      },
      {
        value: '3.5',
        label: '米樓底',
        labelEn: 'Metre Ceiling',
        sub: '特高樓層高度',
        subEn: 'Extra-high Floor Height',
        detail: '極致空間感，營造寬敞居住體驗',
        detailEn: 'Ultimate sense of space',
      },
      {
        value: '48',
        label: '項會所設施',
        labelEn: 'Club Facilities',
        sub: '逾10.6萬平方呎園林及會所',
        subEn: 'Over 106K sq ft Garden & Club',
        detail: '33米園林泳池、健身室、宴會廳等',
        detailEn: '33m Pool, Gym, Banquet Hall & more',
      },
      {
        value: '1.43',
        label: '倍低地積比率',
        labelEn: 'Plot Ratio',
        sub: '低密度規劃',
        subEn: 'Low-density Planning',
        detail: '園林覆蓋率近60%，打造寬敞舒適的居住環境',
        detailEn: 'Garden coverage nearly 60%',
        highlight: true,
      },
    ],
  },

  // Step 6: 項目亮點 (Selling Points — expanded from PDF & news)
  highlights: {
    tagline: 'Why Garden Regency',
    title: '項目亮點',
    titleEn: 'Highlights',
    description:
      '由新鴻基地產傾心打造的低密度花園豪宅，承載「LIVE LUXE GREEN」奢綠生活美學，從園林藝術、智能家居到完善配套，全方位構建新世代理想居所。',
    descriptionEn:
      'A low-density garden residence developed by Sun Hung Kai Properties, carrying the "LIVE LUXE GREEN" luxury green living philosophy. From garden art and smart home to comprehensive facilities, creating your ideal home.',
    items: [
      // Garden Art (4 cards)
      {
        icon: 'Flower',
        title: '御園林（前庭）',
        titleEn: 'Royal Garden (Front Courtyard)',
        description:
          '由頂尖園林設計團隊匠心打造的四時景觀，精選栽種逾60種植物及逾160棵樹木。',
        descriptionEn:
          'Meticulously crafted four-season landscape by top garden design team, featuring over 60 plant species and 160 trees.',
      },
      {
        icon: 'Trees',
        title: '中央草園（中庭）',
        titleEn: 'Central Lawn (Central Courtyard)',
        description:
          '開揚草坪配合寫生及瑜伽空間，綠意盎然層層遞進，營造立體而富層次的景觀。',
        descriptionEn:
          'Open lawn with sketching and yoga spaces, layered greenery creating a rich and dimensional landscape.',
      },
      {
        icon: 'Footprints',
        title: '盛景廊（景觀步道）',
        titleEn: 'Scenic Promenade',
        description:
          '沿繁花大道漫步，黃花風鈴木綻放療癒色彩，園內園外綠意相融，四季皆宜的詩意生活。',
        descriptionEn:
          'Stroll along the flower avenue, Golden Poui blooms with healing colors, seamlessly blending indoor and outdoor greenery.',
      },
      {
        icon: 'Sparkles',
        title: '藝術雕塑（蝶舞匯 · 花弦）',
        titleEn: 'Art Sculptures',
        description:
          '蝶舞匯如蝴蝶翩然起舞，寓意生命於蛻變中綻放；花弦如被撥動的琴弦，奏出扣人心弦的生命樂章。',
        descriptionEn:
          'Butterfly Dance symbolizing transformation and hope; Flower String resonating like plucked strings, playing a soul-stirring life melody.',
      },
      // Smart Home (2 cards)
      {
        icon: 'Smartphone',
        title: 'Live e-asy 智能管理',
        titleEn: 'Live e-asy Smart Management',
        description:
          '免觸式門禁配合「Live e-asy」app，支援訪客一次性二維碼登記及即時屋苑通訊。',
        descriptionEn:
          'Touchless access with "Live e-asy" app, supporting one-time QR code visitor registration and real-time estate communication.',
      },
      {
        icon: 'Lock',
        title: 'Lockly 智能門鎖',
        titleEn: 'Lockly Smart Lock',
        description:
          '3D指紋及密碼等多種解鎖方式，保障私隱與安全，告別傳統鑰匙。',
        descriptionEn:
          '3D fingerprint and password multiple unlocking methods, ensuring privacy and security.',
      },
      // Essentials (4 cards)
      {
        icon: 'Waves',
        title: '33米園林泳池',
        titleEn: '33m Garden Pool',
        description:
          '會所設有33米戶外園林泳池，於綠意環抱下暢泳，尊享度假式生活。',
        descriptionEn:
          '33m outdoor garden swimming pool within the club, swimming surrounded by greenery for resort-style living.',
      },
      {
        icon: 'Ruler',
        title: '3.5米特高樓底',
        titleEn: '3.5m Extra-high Ceiling',
        description:
          '罕有特高樓底設計，空間感極致提升，盡顯豪宅氣派。',
        descriptionEn:
          'Rare extra-high ceiling design, maximizing space and showcasing luxury grandeur.',
      },
      {
        icon: 'Home',
        title: '3座低密度大宅',
        titleEn: '3 Low-density Towers',
        description:
          '僅566伙，分布於3座住宅大樓，私密度高，居住環境清幽。',
        descriptionEn:
          'Only 566 units across 3 residential towers, high privacy, tranquil living environment.',
      },
    ],
  },

  // Four Pillars - New Section
  pillars: {
    tagline: 'Core Philosophy',
    title: '四大建築特色',
    titleEn: 'Four Architectural Pillars',
    description:
      '項目融匯四大建築理念，以 Nature 自然綠景、Wellness 身心平衡、Technology 智能科技及 Sustainability 永續發展為核心，全方位構建新世代智慧優雅宅邸。',
    descriptionEn:
      'Integrating four core architectural philosophies: Nature, Wellness, Technology, and Sustainability, creating a smart and elegant residence for a new generation.',
    items: [
      {
        icon: 'Leaf',
        title: 'Nature 自然綠景',
        titleEn: 'Nature',
        description:
          '逾60種植物及160棵樹木精心栽種，御園林與中央草園四時花木更迭，締造立體而富層次的綠意景觀。',
        descriptionEn:
          'Over 60 plant species and 160 trees carefully cultivated. The Royal Garden and Central Lawn offer seasonal flora, creating a rich and layered green landscape.',
      },
      {
        icon: 'Heart',
        title: 'Wellness 身心平衡',
        titleEn: 'Wellness',
        description:
          '秉承「WELL BEING」生活哲學，草地瑜伽空間、水上瑜伽體驗、寫生作畫空間，於自然中釋放靈感、舒展身心。',
        descriptionEn:
          'Embracing the "WELL BEING" philosophy with lawn yoga spaces, water yoga experiences, and sketching areas, allowing residents to release inspiration and relax in nature.',
      },
      {
        icon: 'Zap',
        title: 'Technology 智能科技',
        titleEn: 'Technology',
        description:
          '免觸式門禁配合「Live e-asy」app，Lockly智能電子門鎖支援指紋及密碼解鎖，大型快遞自提櫃全面昇華智慧生活。',
        descriptionEn:
          'Touchless access control with "Live e-asy" app, Lockly smart lock supporting fingerprint and password unlocking, and large parcel lockers for comprehensive smart living.',
      },
      {
        icon: 'Sprout',
        title: 'Sustainability 永續發展',
        titleEn: 'Sustainability',
        description:
          '三合一環保露台、low-e塗層IGU玻璃有效隔音隔熱，全數車位支援7kW中速充電，鼓勵低碳出行。',
        descriptionEn:
          'Tri-functional eco balconies, low-e coated IGU glass for effective sound and heat insulation, all parking spaces supporting 7kW medium-speed EV charging, encouraging low-carbon travel.',
      },
    ],
  },

  // Step 7: 單位類型 (Table format matching official brochure)
  units: {
    tagline: '多元戶型',
    title: '單位類型',
    titleEn: 'Unit Types',
    subtitle: '涵蓋一房至三房，連特色戶',
    subtitleEn: '1 to 3 Bedrooms plus Special Units',
    description:
      '約70%為兩房設計，戶型多元，迎合不同家庭結構與生活所需。',
    descriptionEn:
      'Approx. 70% two-bedroom design with diverse unit types to suit different family needs.',
    columns: ['住宅物業戶型', '實用面積(平方呎)*', '單位百分比'],
    columnsEn: ['Unit Type', 'Saleable Area (sq ft)*', 'Percentage'],
    rows: [
      { cells: ['一房', '約 290', '9%'] },
      { cells: ['兩房', '約 360 - 410', '70%'], highlight: true },
      { cells: ['三房', '約 500', '4%'] },
      { cells: ['三房一套', '約 570', '4%'] },
      { cells: ['平台特色戶 (連平台)', '約 250 - 530', '7%'] },
      { cells: ['天台特色戶 (連天台及平台)', '約 290 - 760', '6%'] },
    ],
    footer:
      '*實用面積包括露台、工作平台及陽台(如有)，並以售樓說明書最終公佈為準。資料來源：Garden Regency 芊御 售樓說明書。',
    footerEn:
      '*Saleable area includes balcony, utility platform and flat roof (if any), subject to the final Sales Brochure. Source: Garden Regency Sales Brochure.',
  },

  // Floorplans
  floorplans: {
    tagline: '空間設計',
    title: '樓層平面圖',
    description: '按座數查看標準層平面圖',
    towers: [
      {
        name: '第1座',
        nameEn: 'Tower 1',
        floorRange: '2/F – 17/F',
        unitsPerFloor: '17 伙 / 層',
        image: {
          large: '/tower-1-12f-1600.webp',
          medium: '/tower-1-12f-1000.webp',
          mobile: '/tower-1-12f-600.webp',
        },
        unitTypes: [
          { label: '1房 290呎', color: '#60A5FA' },
          { label: '2房 359–413呎', color: '#FB923C' },
          { label: '3房 498呎', color: '#4ADE80' },
          { label: '3房+1 570呎', color: '#A78BFA' },
        ],
        notes:
          '第1座標準層共 17 個單位，涵蓋 1 房至 3 房+1 套。18/F 為特色戶樓層，户型面積較大。',
      },
      {
        name: '第2座',
        nameEn: 'Tower 2',
        floorRange: '2/F – 17/F',
        unitsPerFloor: '12 伙 / 層',
        image: {
          large: '/tower-2-12f-1600.webp',
          medium: '/tower-2-12f-1000.webp',
          mobile: '/tower-2-12f-600.webp',
        },
        unitTypes: [
          { label: '1房 289呎', color: '#60A5FA' },
          { label: '2房 360–412呎', color: '#FB923C' },
          { label: '3房 498呎', color: '#4ADE80' },
          { label: '3房+1 568呎', color: '#A78BFA' },
        ],
        notes:
          '第2座標準層共 12 個單位，主打 2 房戶型，適合不同家庭結構。18/F 為特色戶樓層。',
      },
      {
        name: '第3座',
        nameEn: 'Tower 3',
        floorRange: '3/F – 12/F',
        unitsPerFloor: '12 伙 / 層',
        image: {
          large: '/tower-3-12f-1600.webp',
          medium: '/tower-3-12f-1000.webp',
          mobile: '/tower-3-12f-600.webp',
        },
        unitTypes: [
          { label: '1房 290呎', color: '#60A5FA' },
          { label: '2房 360–413呎', color: '#FB923C' },
        ],
        notes:
          '第3座標準層共 12 個單位，以 1 房及 2 房為主，佈局實用。',
      },
    ],
  },

  // Timeline
  timeline: {
    tagline: '項目進程',
    title: '項目進程',
    titleEn: 'Project Timeline',
    backgroundImage: '/location-wallpaper.webp',
    items: [
      { date: '2026 Q2', title: '項目命名', titleEn: 'Project Naming', description: '獲批預售樓花同意書，正式命名芊御', descriptionEn: 'Obtained pre-sale consent, officially named Garden Regency' },
      { date: '2026 Q3', title: '示範單位開放', titleEn: 'Show Flat Opens', description: 'ICC 62/F 示範單位預約參觀', descriptionEn: 'ICC 62/F show flat open for appointment visits' },
      { date: '2026 Q3-Q4', title: '公開發售', titleEn: 'Public Launch', description: '首輪銷售正式啟動', descriptionEn: 'First-round sales officially launched' },
      { date: '2027 Q2', title: '關鍵日期', titleEn: 'Key Date', description: '2027年5月17日', descriptionEn: '17 May 2027' },
    ],
  },

  // Location
  location: {
    tagline: '優越地段',
    title: '位置交通',
    titleEn: 'Location & Transport',
    subtitle: '優越地段',
    subtitleEn: 'Prime Location',
    description:
      '芊御位於元朗錦田北映河路1A號，毗鄰錦田河畔，環境恬靜優美。港鐵屯馬線錦上路站僅數分鐘車程，多條專線小巴及巴士線直達項目門前。',
    descriptionEn:
      'Garden Regency is located at 1A Yinghe Road, Kam Tin North, Yuen Long, adjacent to the Kam Tin River. The environment is serene and beautiful. Yuen Long town centre and MTR station are just a few minutes\' drive away with a comprehensive transport network.',
    googleMapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4000!2d114.0531378!3d22.4422873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m1!1s0x3403f7001af4779f:0x7badb4a64128d505!2z6I6K5b6X!5e0!3m2!1szh-TW!2shk!4v1',
    // 交通亮點
    transportHighlights: [
      {
        icon: '🚇',
        label: '港鐵屯馬線',
        detail: '錦上路站 · 數分鐘車程',
        description: '直達屯門、荃灣西、美孚、南昌、紅磡',
      },
      {
        icon: '🚌',
        label: '專線小巴',
        detail: '601B / 602C / 78A',
        description: '映河路直達錦上路站，班次頻密',
      },
      {
        icon: '✈️',
        label: '機場快線',
        detail: '龍運 A36 / E36',
        description: '錦上路站往返機場及東涌',
      },
      {
        icon: '🌊',
        label: '過海巴士',
        detail: '城巴 969',
        description: '經西隧直達銅鑼灣、中環、金鐘、灣仔',
      },
      {
        icon: '🗼',
        label: '跨境接駁',
        detail: '專線小巴 78 系列',
        description: '直達落馬洲皇巴站，瞬間接通深圳',
      },
      {
        icon: '🚗',
        label: '主要幹道',
        detail: '錦田公路 · 大欖隧道',
        description: '快速接駁元朗公路及三號幹線',
      },
    ],
  },

  // Contact
  contact: {
    title: '預約參觀',
    subtitle: '立即登記，專人回覆',
    waNumber: '+85291010532',
    waPrefill: '你好，我對 Garden Regency 芊御 有興趣，想了解多啲資料。',
    phoneNumber: '+85291010532',
    showWeChat: true,
    weChatId: '家在香港520',
    weChatQRSmall: '/wechat-qr-small-96.webp',
    weChatQRBig: '/wechat-qr-big-224.webp',
    formFields: ['name', 'phone', 'email', 'unitType'],
  },

  // Floating actions
  floating: {
    waNumber: '+85291010532',
    waPrefill: '你好，我對 Garden Regency 芊御 有興趣，想了解多啲資料。',
    phoneNumber: '+85291010532',
    showWeChat: true,
    weChatId: '家在香港520',
    weChatQRSmall: '/wechat-qr-small-96.webp',
    weChatQRBig: '/wechat-qr-big-224.webp',
  },
}

export default gardenRegency
