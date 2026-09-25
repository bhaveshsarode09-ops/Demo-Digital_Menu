import { MenuItem, RestaurantInfo } from '../types';

import butterChickenImg from '../assets/images/dish_butter_chicken_1790362103037.jpg';
import saffronBiryaniImg from '../assets/images/dish_saffron_biryani_1790362116360.jpg';
import paneerRoyaleImg from '../assets/images/dish_paneer_royale_1790362129271.jpg';
import tandooriPrawnsImg from '../assets/images/dish_tandoori_prawns_1790362140054.jpg';
import mangoCheesecakeImg from '../assets/images/dish_mango_cheesecake_1790362152227.jpg';

export const restaurantInfo: RestaurantInfo = {
  name: "Saffron House",
  monogram: "SH",
  tagline: "Taste, presented differently.",
  location: "Mayfair, London",
  fullAddress: "18 Curzon Street, Mayfair, London W1J 7TR",
  googleMapsUrl: "https://maps.google.com/?q=18+Curzon+Street+Mayfair+London",
  phone: "+918956528026",
  displayPhone: "+91 89565 28026",
  whatsappNumber: "918956528026",
  displayWhatsApp: "+91 89565 28026",
  instagramUrl: "https://instagram.com/saffronhouse.official",
  instagramHandle: "@saffronhouse.official",
  currency: "GBP",
  currencySymbol: "£",
  lunchHours: "12:00 — 15:00",
  dinnerHours: "17:30 — 23:00",
  daysOpen: "Tuesday to Sunday (Closed Mondays)",
  chefName: "Devansh Kapoor",
  chefTitle: "Executive Culinary Director",
  qualityPillars: [
    {
      title: "Grade-A Kashmiri Mongra",
      description: "Direct-harvested saffron stigmas from Pampore, offering deep honeyed floral aromatics and natural crimson hue."
    },
    {
      title: "Artisanal Charcoal Tandoor",
      description: "Custom hand-molded clay kilns fired with beechwood lump charcoal at 480°C for authentic smoky blistered char."
    },
    {
      title: "Small-Batch Dairy & Paneer",
      description: "Crafted twice daily in-house from organic Jersey whole milk for silky tender texture without preservatives."
    },
    {
      title: "48-Hour Slow Extraction",
      description: "Our signature makhani bases and Awadhi stocks simmer patiently over gentle embers to extract nuanced spices."
    }
  ],
  reviews: [
    {
      quote: "Saffron House treats regional Indian cooking like high watchmaking—deliberate, luminous, and remarkably refined.",
      publication: "Tatler Dining Awards",
      author: "Gourmet Edition",
      rating: "Top 10 New Openings"
    },
    {
      quote: "The Signature Butter Chicken is a masterclass in balance: smoked tomato velvet without an ounce of heaviness.",
      publication: "The Evening Standard",
      author: "Jimi Famurewa",
      rating: "5 / 5 Stars"
    },
    {
      quote: "An uncompromising celebration of ancient fire and contemporary elegance in the heart of Mayfair.",
      publication: "Michelin Guide Review",
      author: "Inspectors' Note",
      rating: "Selected 2026"
    }
  ]
};

export const menuCategories = [
  { id: 'all', label: 'All Creations' },
  { id: 'signature', label: 'Signature Dishes' },
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Main Course' },
  { id: 'biryani', label: 'Rice & Biryani' },
  { id: 'breads', label: 'Artisan Breads' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'beverages', label: 'Beverages' },
] as const;

export const menuItems: MenuItem[] = [
  // 1. Signature Butter Chicken
  {
    id: 'dish-1',
    name: 'Signature Butter Chicken',
    hindiName: 'Makhani Murgh Royale',
    category: 'signature',
    price: 24.50,
    description: 'Corn-fed chicken chargrilled in the tandoor, folded into slow-cooked velvety tomato gravy, infused with fenugreek and cultured churned butter.',
    editorialStory: 'Our flagship creation honors the classic Old Delhi heritage elevated through modern culinary precision. Free-range chicken spends 24 hours in a Greek yogurt and degi mirch marinade before encountering 480°C charcoal heat.',
    ingredients: ['Free-range British chicken', 'San Marzano plum tomatoes', 'Organic cultured butter', 'Kashmiri degi mirch', 'Wild hand-rubbed kasoori methi', 'Single-origin green cardamom'],
    allergens: ['Dairy (Milk, Butter, Cream)'],
    spiceLevel: 1,
    isVegetarian: false,
    isGlutenFree: true,
    isSignature: true,
    isChefsSelection: true,
    chefQuote: 'The secret is our 36-hour slow tomato reduction paired with cold-smoked clarified butter.',
    calories: '680 kcal',
    serves: 'Serves 1–2',
    prepTime: 'Freshly prepared',
    floatingSpecs: ["Chef's Special", "48h Reduction", "Cultured Butter", "Popular Choice"],
    image: butterChickenImg,
    accentHue: '#E26421'
  },

  // 2. Royal Saffron Lamb Biryani
  {
    id: 'dish-2',
    name: 'Royal Saffron Lamb Biryani',
    hindiName: 'Awadhi Dum Gosht Biryani',
    category: 'biryani',
    price: 28.00,
    description: 'Tender Welsh lamb shank slow-braised in aromatic bone broth, layered with 2-year aged basmati and steeped in pure Kashmiri saffron threads.',
    editorialStory: 'Prepared in the centuries-old Awadhi Dum Pukht style. Sealed with artisanal wholewheat dough to trap every wisp of saffron vapor until broken at your table.',
    ingredients: ['Welsh lamb shank', '2-Year aged Royal Dehradun basmati rice', 'Kashmiri Mongra saffron', 'Ghee-crisped shallots', 'Rose water', 'Mace and green cardamom'],
    allergens: ['Dairy (Ghee)'],
    spiceLevel: 2,
    isVegetarian: false,
    isGlutenFree: true,
    isSignature: true,
    isChefsSelection: true,
    chefQuote: 'We seal each copper handi with dough so the saffron steam permeates every single grain of aged rice.',
    calories: '820 kcal',
    serves: 'Serves 1–2',
    prepTime: '25 min dum rest',
    floatingSpecs: ["Chef's Special", "Dum Pukht Sealed", "Pampore Saffron", "Aged Basmati"],
    image: saffronBiryaniImg,
    accentHue: '#C29E65'
  },

  // 3. Paneer Tikka Royale
  {
    id: 'dish-3',
    name: 'Paneer Tikka Royale',
    hindiName: 'Kesar Malai Paneer',
    category: 'starters',
    price: 19.50,
    description: 'House-churned Jersey milk paneer marinated in saffron, yellow chili, and royal cumin, charred over live beechwood embers.',
    editorialStory: 'Crafted fresh twice daily in our prep kitchen. The delicate curd yields an exceptionally creamy texture with a blistered exterior that melts on the tongue.',
    ingredients: ['Fresh Jersey milk cottage cheese', 'Hung curd', 'Yellow chili powder', 'Pampore saffron', 'Pounded coriander seed', 'Mint emulsion'],
    allergens: ['Dairy (Milk, Yogurt)'],
    spiceLevel: 1,
    isVegetarian: true,
    isGlutenFree: true,
    isSignature: true,
    isChefsSelection: false,
    chefQuote: 'Most paneer is rubbery; our house-made curd has the delicate yield of a warm burrata.',
    calories: '490 kcal',
    serves: 'Serves 1–2',
    prepTime: 'Freshly prepared',
    floatingSpecs: ["Artisanal Curd", "Live Charcoal", "Fresh Daily", "Vegetarian"],
    image: paneerRoyaleImg,
    accentHue: '#D8B781'
  },

  // 4. Tandoori Jumbo Prawns
  {
    id: 'dish-4',
    name: 'Tandoori Jumbo Prawns',
    hindiName: 'Jheenga Angara',
    category: 'starters',
    price: 26.50,
    description: 'Wild Atlantic tiger prawns steeped in roasted ajwain, smoked mustard oil, and lime zest, flash-roasted in the intense tandoor heat.',
    editorialStory: 'Sourced directly from sustainable coastal waters. The quick high-heat roast locks in delicate oceanic sweetness while bestowing a seductive smoky jacket.',
    ingredients: ['Wild jumbo tiger prawns', 'Cold-pressed mustard oil', 'Bishop’s weed (Ajwain)', 'Crushed tellicherry peppercorn', 'Charred lime juice'],
    allergens: ['Crustaceans', 'Mustard'],
    spiceLevel: 2,
    isVegetarian: false,
    isGlutenFree: true,
    isSignature: true,
    isChefsSelection: true,
    chefQuote: 'Seventy seconds in a 480-degree clay oven yields a brittle crackle and succulent sweet meat.',
    calories: '340 kcal',
    serves: 'Serves 1',
    prepTime: 'Freshly prepared',
    floatingSpecs: ["Wild Atlantic", "Flash Roasted", "Low Carb", "Smoky Char"],
    image: tandooriPrawnsImg,
    accentHue: '#E26421'
  },

  // 5. Mango Saffron Cheesecake
  {
    id: 'dish-5',
    name: 'Mango Saffron Cheesecake',
    hindiName: 'Aam Kesar Mithai Tart',
    category: 'desserts',
    price: 13.50,
    description: 'Alphonso mango mirror glaze over cold-set saffron mascarpone cream, resting on a toasted pistachio-cardamom sablé crust with 24k gold leaf.',
    editorialStory: 'A modern ode to seasonal Indian summer feasts. Ratnagiri Alphonso mango pulp provides pure tropical sweetness balanced by the floral cadence of green cardamom.',
    ingredients: ['Ratnagiri Alphonso mango puree', 'Saffron-infused Italian mascarpone', 'Toasted Bronte pistachio', 'Hand-churned butter sablé', 'Edible 24k gold leaf'],
    allergens: ['Dairy (Mascarpone, Butter)', 'Nuts (Pistachio)', 'Gluten (Wheat)'],
    spiceLevel: 0,
    isVegetarian: true,
    isSignature: true,
    isChefsSelection: false,
    calories: '420 kcal',
    serves: 'Serves 1',
    prepTime: 'Chilled ready',
    floatingSpecs: ["Ratnagiri Alphonso", "24k Gold Leaf", "House Sablé", "Signature Dessert"],
    image: mangoCheesecakeImg,
    accentHue: '#C29E65'
  },

  // 6. Dal Saffron House (Slow Cooked Black Lentils)
  {
    id: 'dish-6',
    name: 'Dal Saffron House',
    hindiName: 'Maa Ki Dal Bukhara',
    category: 'mains',
    price: 17.00,
    description: 'Urad black lentils simmered for 36 hours over low charcoal embers with vine tomatoes, ginger, and hand-churned white butter.',
    editorialStory: 'Our kitchen’s ultimate labor of love. The pot never leaves the embers, yielding a rich, naturally emulsified velvety texture without heavy cream additions.',
    ingredients: ['Slow-simmered whole urad lentils', 'Heritage tomato coulis', 'White artisanal butter', 'Kashmiri chili', 'Ginger julienne'],
    allergens: ['Dairy (Butter)'],
    spiceLevel: 1,
    isVegetarian: true,
    isGlutenFree: true,
    calories: '480 kcal',
    serves: 'Serves 1–2',
    prepTime: '36h Simmered',
    floatingSpecs: ["36-Hour Embers", "Rich Velvet", "Vegetarian", "Heritage Recipe"],
    image: butterChickenImg,
    accentHue: '#171B22'
  },

  // 7. Malabar Coast Cod Curry
  {
    id: 'dish-7',
    name: 'Malabar Coast Cod Curry',
    hindiName: 'Meen Moilee Royale',
    category: 'mains',
    price: 25.50,
    description: 'Pan-seared Atlantic line-caught cod poached in a fragrant sauce of freshly pressed coconut milk, curry leaves, green chilies, and kokum.',
    editorialStory: 'Inspired by the spice coast of Kerala. We press fresh coconuts daily to create a naturally light, aromatic broth with a delicate sour tang from dried kokum fruit.',
    ingredients: ['Day-boat Atlantic cod loin', 'Fresh coconut milk extract', 'Crisp curry leaves', 'Dried kokum pods', 'Mustard seeds', 'Ginger'],
    allergens: ['Fish', 'Mustard'],
    spiceLevel: 2,
    isVegetarian: false,
    isGlutenFree: true,
    calories: '510 kcal',
    serves: 'Serves 1',
    prepTime: 'Freshly prepared',
    floatingSpecs: ["Day-Boat Fish", "Fresh Coconut Milk", "Wild Kokum", "Gluten Free"],
    image: tandooriPrawnsImg,
    accentHue: '#D8B781'
  },

  // 8. Smoked Truffle Lamb Seekh
  {
    id: 'dish-8',
    name: 'Smoked Truffle Lamb Seekh',
    hindiName: 'Kakori Truffle Seekh',
    category: 'starters',
    price: 21.00,
    description: 'Hand-minced prime Welsh lamb infused with aromatic marrow, rose petal powder, and black Périgord winter truffle oil.',
    editorialStory: 'Based on the historic melt-in-mouth Kakori tradition where the mince is ground twenty-one times for impossible silkiness before hitting the skewer.',
    ingredients: ['Prime Welsh lamb mince', 'Black truffle essence', 'Edible dried rose petals', 'Cloves and cubeb pepper', 'Mint coriander relish'],
    allergens: [],
    spiceLevel: 2,
    isVegetarian: false,
    isGlutenFree: true,
    calories: '540 kcal',
    serves: 'Serves 1–2',
    prepTime: 'Freshly prepared',
    floatingSpecs: ["Perigord Truffle", "Melt-in-Mouth", "Live Charcoal", "Chef Favorite"],
    image: paneerRoyaleImg,
    accentHue: '#E26421'
  },

  // 9. Truffle & Aged Cheddar Naan
  {
    id: 'dish-9',
    name: 'Truffle & Aged Cheddar Naan',
    hindiName: 'Truffle Kulcha Royale',
    category: 'breads',
    price: 8.50,
    description: 'Slow-fermented artisan dough blistered against the tandoor wall, brushed with Italian black summer truffle butter and Montgomery cheddar.',
    editorialStory: 'Our dough undergoes a 48-hour cold fermentation process, creating delicate airy pockets and a tender crumb kissed with blistered char.',
    ingredients: ['Organic unbleached flour', 'Italian summer truffle paste', '18-month cave-aged Montgomery cheddar', 'Ghee glaze'],
    allergens: ['Gluten (Wheat)', 'Dairy (Butter, Cheese)'],
    spiceLevel: 0,
    isVegetarian: true,
    calories: '380 kcal',
    serves: 'Serves 1–2',
    prepTime: 'Baked to order',
    floatingSpecs: ["48h Cold Ferment", "Cave-Aged Cheddar", "Tandoor Blistered", "Addictive"],
    image: paneerRoyaleImg,
    accentHue: '#C29E65'
  },

  // 10. Garlic & Rosemary Roti
  {
    id: 'dish-10',
    name: 'Garlic & Rosemary Roti',
    hindiName: 'Lehsuni Laccha Paratha',
    category: 'breads',
    price: 6.00,
    description: 'Multi-layered flaky wholewheat bread layered with roasted garlic purée, crisp wild rosemary, and sea salt flakes.',
    editorialStory: 'Rolled thin, pleated by hand into spiral layers, and crisped over the tawa before a final kiss of open fire.',
    ingredients: ['Stone-ground Chakki atta', 'Slow-confit garlic', 'English garden rosemary', 'Clarified butter (ghee)'],
    allergens: ['Gluten (Wheat)', 'Dairy (Ghee)'],
    spiceLevel: 0,
    isVegetarian: true,
    calories: '310 kcal',
    serves: 'Serves 1',
    prepTime: 'Baked to order',
    floatingSpecs: ["Flaky Layers", "Confit Garlic", "Whole Grain", "Fresh Baked"],
    image: paneerRoyaleImg,
    accentHue: '#D8B781'
  },

  // 11. Wild Morel & Saffron Pulao
  {
    id: 'dish-11',
    name: 'Wild Morel & Saffron Pulao',
    hindiName: 'Gucchi Kesar Pulao',
    category: 'biryani',
    price: 22.00,
    description: 'Himalayan wild gucchi morel mushrooms stuffed with spiced paneer, folded into saffron-scented aged basmati rice.',
    editorialStory: 'Himalayan morels are hand-foraged in high-altitude pine forests, delivering an intense earthy depth that harmonizes with sweet saffron strands.',
    ingredients: ['Wild Himalayan morels (Gucchi)', 'Aged Dehradun basmati rice', 'Kashmiri saffron', 'Caramelized shallots', 'Ghee'],
    allergens: ['Dairy (Ghee, Paneer)'],
    spiceLevel: 1,
    isVegetarian: true,
    isGlutenFree: true,
    calories: '520 kcal',
    serves: 'Serves 1–2',
    prepTime: 'Freshly prepared',
    floatingSpecs: ["Wild Foraged Morels", "Vegetarian Luxury", "Fragrant Saffron", "Aged Rice"],
    image: saffronBiryaniImg,
    accentHue: '#C29E65'
  },

  // 12. Pistachio & Cardamom Kulfi Pop
  {
    id: 'dish-12',
    name: 'Pistachio & Cardamom Kulfi Pop',
    hindiName: 'Shahi Pista Kulfi',
    category: 'desserts',
    price: 11.50,
    description: 'Dense traditional slow-reduced milk kulfi infused with green cardamom pods and Sicilian pistachios, enrobed in dark chocolate crisps.',
    editorialStory: 'Reduced from full cream milk over 8 hours until caramelised and naturally sweet, then frozen in vintage conical molds.',
    ingredients: ['Slow-caramelised whole milk', 'Bronte pistachios', 'Guatemalan green cardamom', '70% Valrhona dark chocolate shell'],
    allergens: ['Dairy (Milk)', 'Nuts (Pistachio)'],
    spiceLevel: 0,
    isVegetarian: true,
    isGlutenFree: true,
    calories: '340 kcal',
    serves: 'Serves 1',
    prepTime: 'Chilled ready',
    floatingSpecs: ["8h Milk Reduction", "Bronte Pistachios", "Traditional Recipe", "Gluten Free"],
    image: mangoCheesecakeImg,
    accentHue: '#D8B781'
  },

  // 13. Saffron & Rose Petal Spritz
  {
    id: 'dish-13',
    name: 'Saffron & Rose Petal Spritz',
    hindiName: 'Gulab Kesar Sharbat',
    category: 'beverages',
    price: 9.50,
    description: 'Cold-steeped Kashmiri saffron tincture, organic Damask rose water, clarified lemon acid, fever-tree sparkling soda, and silver leaf.',
    editorialStory: 'A luminous, non-alcoholic elixir crafted as an aperitif to awaken the palate before rich tandoor notes.',
    ingredients: ['Kashmiri saffron infusion', 'Organic Damask rose hydrosol', 'Clarified Sicilian lemon', 'Carbonated mineral water', 'Edible silver vark'],
    allergens: [],
    spiceLevel: 0,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    calories: '85 kcal',
    serves: 'Serves 1',
    prepTime: 'Shaken to order',
    floatingSpecs: ["Non-Alcoholic", "Damask Rose", "Cold Brewed", "Palate Cleanser"],
    image: mangoCheesecakeImg,
    accentHue: '#E26421'
  },

  // 14. Smoked Jodhpur Old Fashioned
  {
    id: 'dish-14',
    name: 'Smoked Jodhpur Old Fashioned',
    hindiName: 'Amrut Cask Cocktail',
    category: 'beverages',
    price: 16.00,
    description: 'Single malt Indian whisky stirred with jaggery syrup, toasted clove bitters, and applewood smoke captured under a glass cloche.',
    editorialStory: 'Infused table-side with smoldering applewood chips. The bold peat and tropical fruit notes of Indian malt marry with dark mineral jaggery.',
    ingredients: ['Amrut Indian Single Malt', 'Organic unrefined cane jaggery', 'House-toasted clove and cardamom bitters', 'Applewood smoke'],
    allergens: [],
    spiceLevel: 0,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    calories: '190 kcal',
    serves: 'Serves 1',
    prepTime: 'Smoked table-side',
    floatingSpecs: ["Indian Single Malt", "Applewood Smoke", "House Bitters", "Craft Cocktail"],
    image: saffronBiryaniImg,
    accentHue: '#C29E65'
  }
];
