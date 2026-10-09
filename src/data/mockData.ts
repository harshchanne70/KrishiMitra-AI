import { Region, WeatherDay, AdvisoryAlert, DiseaseRecord, MandiPriceItem, Language } from '../types';

export const AGRICULTURAL_REGIONS: Region[] = [
  {
    id: 'punjab-ludhiana',
    name: 'Ludhiana, Punjab',
    state: 'Punjab',
    agroZone: 'Trans-Gangetic Plains Region (Zone VI)',
    lat: 30.9010,
    lng: 75.8573,
    primarySoil: 'Alluvial',
    majorCrops: ['Wheat', 'Rice (Paddy)', 'Cotton', 'Mustard', 'Maize']
  },
  {
    id: 'mh-nashik',
    name: 'Nashik, Maharashtra',
    state: 'Maharashtra',
    agroZone: 'Western Plateau & Hills (Zone IX)',
    lat: 19.9975,
    lng: 73.7898,
    primarySoil: 'Black',
    majorCrops: ['Onion', 'Tomato', 'Grapes', 'Soybean', 'Cotton']
  },
  {
    id: 'mp-indore',
    name: 'Indore, Madhya Pradesh',
    state: 'Madhya Pradesh',
    agroZone: 'Central Plateau & Hills (Zone VIII)',
    lat: 22.7196,
    lng: 75.8577,
    primarySoil: 'Black',
    majorCrops: ['Soybean', 'Wheat', 'Gram (Chickpea)', 'Garlic', 'Potato']
  },
  {
    id: 'up-varanasi',
    name: 'Varanasi, Uttar Pradesh',
    state: 'Uttar Pradesh',
    agroZone: 'Middle Gangetic Plains (Zone IV)',
    lat: 25.3176,
    lng: 82.9739,
    primarySoil: 'Alluvial',
    majorCrops: ['Rice (Paddy)', 'Wheat', 'Mustard', 'Pigeon Pea', 'Tomato']
  },
  {
    id: 'gj-rajkot',
    name: 'Rajkot, Gujarat',
    state: 'Gujarat',
    agroZone: 'Gujarat Plains & Hills (Zone XIII)',
    lat: 22.3039,
    lng: 70.8022,
    primarySoil: 'Black',
    majorCrops: ['Groundnut', 'Cotton', 'Cumin', 'Wheat', 'Castor']
  },
  {
    id: 'ap-guntur',
    name: 'Guntur, Andhra Pradesh',
    state: 'Andhra Pradesh',
    agroZone: 'Southern Plateau & Hills (Zone X)',
    lat: 16.3067,
    lng: 80.4365,
    primarySoil: 'Red',
    majorCrops: ['Chilli', 'Cotton', 'Paddy', 'Tobacco', 'Maize']
  },
  {
    id: 'ka-shimoga',
    name: 'Shivamogga, Karnataka',
    state: 'Karnataka',
    agroZone: 'West Coast Plains & Ghats (Zone XII)',
    lat: 13.9299,
    lng: 75.5681,
    primarySoil: 'Red',
    majorCrops: ['Arecanut', 'Paddy', 'Maize', 'Ginger', 'Sugarcane']
  },
  {
    id: 'hr-karnal',
    name: 'Karnal, Haryana',
    state: 'Haryana',
    agroZone: 'Trans-Gangetic Plains (Zone VI)',
    lat: 29.6857,
    lng: 76.9905,
    primarySoil: 'Alluvial',
    majorCrops: ['Basmati Paddy', 'Wheat', 'Sugarcane', 'Mustard', 'Sunflower']
  }
];

export const MOCK_WEATHER_FORECASTS: Record<string, WeatherDay[]> = {
  'punjab-ludhiana': [
    {
      date: '2026-10-09',
      dayName: 'Today',
      tempMax: 31,
      tempMin: 19,
      condition: 'Sunny & Clear',
      icon: 'sunny',
      precipProb: 5,
      humidity: 58,
      windSpeed: 11,
      uvIndex: 7,
      soilMoisture: 42,
      advisoryNote: 'Optimal weather for pre-sowing seedbed preparation and leveling.'
    },
    {
      date: '2026-10-10',
      dayName: 'Tomorrow',
      tempMax: 32,
      tempMin: 20,
      condition: 'Partly Cloudy',
      icon: 'partly-cloudy',
      precipProb: 15,
      humidity: 62,
      windSpeed: 14,
      uvIndex: 6,
      soilMoisture: 40,
      advisoryNote: 'Favorable for herbicide application. Keep irrigation mild.'
    },
    {
      date: '2026-10-11',
      dayName: 'Saturday',
      tempMax: 29,
      tempMin: 18,
      condition: 'Scattered Showers',
      icon: 'rainy',
      precipProb: 75,
      humidity: 82,
      windSpeed: 22,
      uvIndex: 4,
      soilMoisture: 65,
      advisoryNote: 'Heavy showers expected. Hold off chemical spraying & fertilizer top-dressing.'
    },
    {
      date: '2026-10-12',
      dayName: 'Sunday',
      tempMax: 27,
      tempMin: 17,
      condition: 'Cloudy with Breezes',
      icon: 'cloudy',
      precipProb: 35,
      humidity: 78,
      windSpeed: 18,
      uvIndex: 5,
      soilMoisture: 72,
      advisoryNote: 'Inspect drainage channels in standing paddy & cotton fields to prevent stagnation.'
    },
    {
      date: '2026-10-13',
      dayName: 'Monday',
      tempMax: 30,
      tempMin: 18,
      condition: 'Sunny Intervals',
      icon: 'partly-cloudy',
      precipProb: 10,
      humidity: 60,
      windSpeed: 12,
      uvIndex: 7,
      soilMoisture: 58,
      advisoryNote: 'Soil drying up nicely. Resume intercultural operations.'
    },
    {
      date: '2026-10-14',
      dayName: 'Tuesday',
      tempMax: 31,
      tempMin: 19,
      condition: 'Clear Sky',
      icon: 'sunny',
      precipProb: 5,
      humidity: 55,
      windSpeed: 10,
      uvIndex: 8,
      soilMoisture: 48,
      advisoryNote: 'Excellent conditions for harvesting mature kharif crops.'
    },
    {
      date: '2026-10-15',
      dayName: 'Wednesday',
      tempMax: 32,
      tempMin: 20,
      condition: 'Sunny',
      icon: 'sunny',
      precipProb: 5,
      humidity: 52,
      windSpeed: 9,
      uvIndex: 8,
      soilMoisture: 44,
      advisoryNote: 'Ideal period for sowing early mustard and toria varieties.'
    }
  ],
  'mh-nashik': [
    {
      date: '2026-10-09',
      dayName: 'Today',
      tempMax: 30,
      tempMin: 21,
      condition: 'Mild Humid',
      icon: 'partly-cloudy',
      precipProb: 20,
      humidity: 72,
      windSpeed: 12,
      uvIndex: 6,
      soilMoisture: 55,
      advisoryNote: 'Moderate humidity. Keep vigilance on downy mildew in grape orchards.'
    },
    {
      date: '2026-10-10',
      dayName: 'Tomorrow',
      tempMax: 29,
      tempMin: 20,
      condition: 'Thunderstorm Warning',
      icon: 'storm',
      precipProb: 80,
      humidity: 86,
      windSpeed: 26,
      uvIndex: 3,
      soilMoisture: 78,
      advisoryNote: 'High risk of tomato fruit rot and onion purple blotch due to excess moisture.'
    },
    {
      date: '2026-10-11',
      dayName: 'Saturday',
      tempMax: 28,
      tempMin: 19,
      condition: 'Overcast & Drizzle',
      icon: 'rainy',
      precipProb: 65,
      humidity: 84,
      windSpeed: 16,
      uvIndex: 4,
      soilMoisture: 80,
      advisoryNote: 'Ensure clear runoff in nursery beds. Postpone foliar micronutrient sprays.'
    },
    {
      date: '2026-10-12',
      dayName: 'Sunday',
      tempMax: 31,
      tempMin: 20,
      condition: 'Clearing Up',
      icon: 'partly-cloudy',
      precipProb: 20,
      humidity: 65,
      windSpeed: 11,
      uvIndex: 7,
      soilMoisture: 68,
      advisoryNote: 'Spray systemic fungicide once leaf surface dries completely.'
    },
    {
      date: '2026-10-13',
      dayName: 'Monday',
      tempMax: 32,
      tempMin: 21,
      condition: 'Sunny',
      icon: 'sunny',
      precipProb: 10,
      humidity: 58,
      windSpeed: 10,
      uvIndex: 8,
      soilMoisture: 55,
      advisoryNote: 'Ideal for onion seedling transplanting and drip system flushing.'
    },
    {
      date: '2026-10-14',
      dayName: 'Tuesday',
      tempMax: 33,
      tempMin: 22,
      condition: 'Bright Sunshine',
      icon: 'sunny',
      precipProb: 5,
      humidity: 52,
      windSpeed: 9,
      uvIndex: 8,
      soilMoisture: 48,
      advisoryNote: 'Normal scheduled fertigation can proceed.'
    },
    {
      date: '2026-10-15',
      dayName: 'Wednesday',
      tempMax: 33,
      tempMin: 21,
      condition: 'Sunny',
      icon: 'sunny',
      precipProb: 5,
      humidity: 50,
      windSpeed: 10,
      uvIndex: 8,
      soilMoisture: 44,
      advisoryNote: 'Check solar insect traps and yellow sticky sheets.'
    }
  ]
};

// Default fallback generator if a region's forecast isn't explicitly listed above
export function getForecastForRegion(regionId: string): WeatherDay[] {
  if (MOCK_WEATHER_FORECASTS[regionId]) {
    return MOCK_WEATHER_FORECASTS[regionId];
  }
  return [
    {
      date: '2026-10-09',
      dayName: 'Today',
      tempMax: 32,
      tempMin: 22,
      condition: 'Partly Sunny',
      icon: 'partly-cloudy',
      precipProb: 15,
      humidity: 64,
      windSpeed: 12,
      uvIndex: 7,
      soilMoisture: 50,
      advisoryNote: 'Favorable field conditions. Suitable for weeding and nutrient scouting.'
    },
    {
      date: '2026-10-10',
      dayName: 'Tomorrow',
      tempMax: 33,
      tempMin: 23,
      condition: 'Sunny & Warm',
      icon: 'sunny',
      precipProb: 10,
      humidity: 58,
      windSpeed: 11,
      uvIndex: 8,
      soilMoisture: 45,
      advisoryNote: 'Good window for soil moisture management and drip fertigation.'
    },
    {
      date: '2026-10-11',
      dayName: 'Saturday',
      tempMax: 31,
      tempMin: 21,
      condition: 'Chance of Rain',
      icon: 'rainy',
      precipProb: 55,
      humidity: 76,
      windSpeed: 17,
      uvIndex: 5,
      soilMoisture: 62,
      advisoryNote: 'Rain predicted; delay any scheduled pesticide applications.'
    },
    {
      date: '2026-10-12',
      dayName: 'Sunday',
      tempMax: 30,
      tempMin: 20,
      condition: 'Cloudy',
      icon: 'cloudy',
      precipProb: 30,
      humidity: 70,
      windSpeed: 14,
      uvIndex: 6,
      soilMoisture: 60,
      advisoryNote: 'Inspect plants for early foliar blight symptoms in high moisture pockets.'
    },
    {
      date: '2026-10-13',
      dayName: 'Monday',
      tempMax: 32,
      tempMin: 21,
      condition: 'Clear Sky',
      icon: 'sunny',
      precipProb: 10,
      humidity: 55,
      windSpeed: 10,
      uvIndex: 7,
      soilMoisture: 52,
      advisoryNote: 'High solar radiation. Ideal time for post-harvest sun drying of grains.'
    },
    {
      date: '2026-10-14',
      dayName: 'Tuesday',
      tempMax: 33,
      tempMin: 22,
      condition: 'Sunny',
      icon: 'sunny',
      precipProb: 5,
      humidity: 52,
      windSpeed: 9,
      uvIndex: 8,
      soilMoisture: 46,
      advisoryNote: 'Normal tillage and land preparation for upcoming Rabi planting.'
    },
    {
      date: '2026-10-15',
      dayName: 'Wednesday',
      tempMax: 34,
      tempMin: 23,
      condition: 'Warm Sunshine',
      icon: 'sunny',
      precipProb: 5,
      humidity: 48,
      windSpeed: 8,
      uvIndex: 8,
      soilMoisture: 42,
      advisoryNote: 'Maintain irrigation intervals in early vegetative standing crops.'
    }
  ];
}

export const REALTIME_ALERTS: AdvisoryAlert[] = [
  {
    id: 'alert-rain-48h',
    severity: 'critical',
    title: 'Heavy Rain Warning (IMD Alert) in Next 48 Hours',
    description: 'A low-pressure disturbance is triggering isolated heavy rain (40-65mm) and gusty winds across northern & central agricultural belts.',
    affectedCrops: ['Cotton', 'Paddy (Harvesting)', 'Soybean', 'Vegetables'],
    action: 'Postpone all chemical spraying and Urea top-dressing. Open farm drainage trenches immediately to prevent root inundation.',
    timestamp: 'Updated 2 hours ago'
  },
  {
    id: 'alert-fungal-rh',
    severity: 'warning',
    title: 'High Fungal Blast & Rust Inoculum Risk',
    description: 'Relative humidity (>82%) combined with 28-31°C canopy temperature creates prime conditions for leaf blast and sheath blight multiplication.',
    affectedCrops: ['Basmati Paddy', 'Maize', 'Tomato'],
    action: 'Scout lower leaf sheaths for spindle-shaped lesions. Keep Tricyclazole 75 WP or Azoxystrobin on standby for prophylactic spray once leaves dry.',
    timestamp: 'Updated 4 hours ago'
  },
  {
    id: 'alert-sowing-rabi',
    severity: 'info',
    title: 'Optimal Sowing Window: Rabi Season 2026',
    description: 'Soil temperature has dropped into the ideal 20°C - 23°C range for high-germination seed emergence of Wheat, Mustard, and Chickpea.',
    affectedCrops: ['Wheat (HD-2967, PBW-550)', 'Mustard (Pusa Bold)', 'Gram'],
    action: 'Complete seed treatment with Trichoderma viride (4g/kg) and Rhizobium culture before direct seeding.',
    timestamp: 'Updated 1 day ago'
  }
];

export const CROP_DATABASE = [
  {
    name: 'Wheat (गेहूं)',
    scientificName: 'Triticum aestivum',
    idealSeason: 'Rabi',
    soilTypes: ['Alluvial', 'Clay', 'Black'],
    nRange: [100, 150],
    pRange: [50, 70],
    kRange: [40, 60],
    phRange: [6.0, 7.5],
    waterType: ['Canal', 'Well', 'Sprinkler'],
    expectedYield: '20 - 24 Quintals/Acre',
    sowingWindow: 'Oct 25 - Nov 20',
    harvestDuration: '125 - 140 days',
    waterRequirement: '400 - 450 mm (4-6 irrigations)',
    profitPotential: 'High' as const,
    estimatedNetReturn: '₹38,000 - ₹52,000 / Acre',
    seedRate: '40 - 45 kg / Acre',
    npkRatio: '120:60:40 kg/ha',
    criticalIrrigations: 'CRI (21 days), Tillering, Booting, Grain filling'
  },
  {
    name: 'Basmati Paddy (बासमती धान)',
    scientificName: 'Oryza sativa',
    idealSeason: 'Kharif',
    soilTypes: ['Clay', 'Alluvial', 'Black'],
    nRange: [110, 160],
    pRange: [45, 65],
    kRange: [40, 60],
    phRange: [5.5, 7.2],
    waterType: ['Canal', 'Well'],
    expectedYield: '18 - 22 Quintals/Acre',
    sowingWindow: 'Jun 15 - Jul 10',
    harvestDuration: '135 - 150 days',
    waterRequirement: '1100 - 1300 mm',
    profitPotential: 'Very High' as const,
    estimatedNetReturn: '₹48,000 - ₹68,000 / Acre',
    seedRate: '8 - 10 kg / Acre (Transplanted)',
    npkRatio: '100:50:50 kg/ha',
    criticalIrrigations: 'Continuous 3-5cm till panicle initiation'
  },
  {
    name: 'Mustard / Rapeseed (सरसों)',
    scientificName: 'Brassica juncea',
    idealSeason: 'Rabi',
    soilTypes: ['Alluvial', 'Sandy', 'Black'],
    nRange: [60, 90],
    pRange: [30, 50],
    kRange: [20, 40],
    phRange: [6.0, 8.0],
    waterType: ['Rainfed', 'Well', 'Sprinkler', 'Canal'],
    expectedYield: '9 - 13 Quintals/Acre',
    sowingWindow: 'Oct 01 - Oct 25',
    harvestDuration: '110 - 125 days',
    waterRequirement: '250 - 350 mm (2-3 irrigations)',
    profitPotential: 'High' as const,
    estimatedNetReturn: '₹32,000 - ₹46,000 / Acre',
    seedRate: '1.5 - 2.0 kg / Acre',
    npkRatio: '80:40:20 kg/ha + Sulphur 20kg',
    criticalIrrigations: 'Pre-flowering (30 DAS) & Pod fill (60 DAS)'
  },
  {
    name: 'Chickpea / Gram (चना)',
    scientificName: 'Cicer arietinum',
    idealSeason: 'Rabi',
    soilTypes: ['Black', 'Alluvial', 'Red'],
    nRange: [20, 40], // Legume fixes N
    pRange: [40, 65],
    kRange: [20, 40],
    phRange: [6.0, 8.2],
    waterType: ['Rainfed', 'Sprinkler', 'Well'],
    expectedYield: '8 - 11 Quintals/Acre',
    sowingWindow: 'Oct 15 - Nov 10',
    harvestDuration: '100 - 115 days',
    waterRequirement: '200 - 300 mm (1-2 irrigations)',
    profitPotential: 'High' as const,
    estimatedNetReturn: '₹30,000 - ₹44,000 / Acre',
    seedRate: '25 - 30 kg / Acre',
    npkRatio: '20:50:20 kg/ha + Rhizobium',
    criticalIrrigations: 'Branching & Pod development'
  },
  {
    name: 'Cotton (कपास)',
    scientificName: 'Gossypium hirsutum',
    idealSeason: 'Kharif',
    soilTypes: ['Black', 'Alluvial', 'Red'],
    nRange: [90, 140],
    pRange: [45, 65],
    kRange: [50, 75],
    phRange: [6.5, 8.5],
    waterType: ['Drip', 'Canal', 'Well'],
    expectedYield: '10 - 15 Quintals/Acre',
    sowingWindow: 'Apr 20 - May 25',
    harvestDuration: '150 - 180 days',
    waterRequirement: '600 - 800 mm',
    profitPotential: 'Very High' as const,
    estimatedNetReturn: '₹45,000 - ₹65,000 / Acre',
    seedRate: '2 packets (900g Bt cotton) / Acre',
    npkRatio: '120:60:60 kg/ha',
    criticalIrrigations: 'Squaring, Flowering & Boll development'
  },
  {
    name: 'Soybean (सोयाबीन)',
    scientificName: 'Glycine max',
    idealSeason: 'Kharif',
    soilTypes: ['Black', 'Alluvial'],
    nRange: [30, 50],
    pRange: [60, 80],
    kRange: [30, 50],
    phRange: [6.2, 7.5],
    waterType: ['Rainfed', 'Well', 'Sprinkler'],
    expectedYield: '10 - 14 Quintals/Acre',
    sowingWindow: 'Jun 20 - Jul 10',
    harvestDuration: '95 - 110 days',
    waterRequirement: '450 - 550 mm',
    profitPotential: 'Moderate' as const,
    estimatedNetReturn: '₹26,000 - ₹38,000 / Acre',
    seedRate: '25 - 30 kg / Acre',
    npkRatio: '30:60:40 kg/ha',
    criticalIrrigations: 'Flowering & Pod elongation'
  },
  {
    name: 'Maize / Corn (मक्का)',
    scientificName: 'Zea mays',
    idealSeason: 'Kharif',
    soilTypes: ['Alluvial', 'Red', 'Black'],
    nRange: [110, 150],
    pRange: [50, 70],
    kRange: [40, 60],
    phRange: [5.8, 7.5],
    waterType: ['Well', 'Canal', 'Drip', 'Rainfed'],
    expectedYield: '28 - 35 Quintals/Acre',
    sowingWindow: 'Jun 15 - Jul 05 / Feb 15 - Mar 10',
    harvestDuration: '90 - 115 days',
    waterRequirement: '500 - 650 mm',
    profitPotential: 'High' as const,
    estimatedNetReturn: '₹34,000 - ₹48,000 / Acre',
    seedRate: '7 - 8 kg / Acre',
    npkRatio: '120:60:50 kg/ha',
    criticalIrrigations: 'Knee-high, Tasseling & Silking'
  },
  {
    name: 'Tomato (टमाटर)',
    scientificName: 'Solanum lycopersicum',
    idealSeason: 'Zaid',
    soilTypes: ['Red', 'Alluvial', 'Black', 'Sandy'],
    nRange: [90, 130],
    pRange: [60, 80],
    kRange: [60, 90],
    phRange: [6.0, 7.0],
    waterType: ['Drip', 'Well'],
    expectedYield: '120 - 180 Quintals/Acre',
    sowingWindow: 'Round the year (Oct-Nov for winter, Jul-Aug for rainy)',
    harvestDuration: '110 - 140 days',
    waterRequirement: '400 - 600 mm',
    profitPotential: 'Very High' as const,
    estimatedNetReturn: '₹75,000 - ₹1,40,000 / Acre',
    seedRate: '50 - 60 g (Hybrid) / Acre',
    npkRatio: '100:60:60 kg/ha with fertigation',
    criticalIrrigations: 'Frequent light drip irrigation'
  },
  {
    name: 'Onion (प्याज)',
    scientificName: 'Allium cepa',
    idealSeason: 'Rabi',
    soilTypes: ['Black', 'Alluvial', 'Red'],
    nRange: [80, 110],
    pRange: [40, 60],
    kRange: [50, 75],
    phRange: [6.5, 7.8],
    waterType: ['Drip', 'Well', 'Canal'],
    expectedYield: '100 - 140 Quintals/Acre',
    sowingWindow: 'Nov 01 - Dec 10 (Transplanting)',
    harvestDuration: '120 - 135 days',
    waterRequirement: '350 - 550 mm',
    profitPotential: 'Very High' as const,
    estimatedNetReturn: '₹60,000 - ₹1,20,000 / Acre',
    seedRate: '3.5 - 4.0 kg / Acre',
    npkRatio: '100:50:50 kg/ha',
    criticalIrrigations: 'Bulb formation and enlargement'
  },
  {
    name: 'Potato (आलू)',
    scientificName: 'Solanum tuberosum',
    idealSeason: 'Rabi',
    soilTypes: ['Sandy', 'Alluvial'],
    nRange: [120, 160],
    pRange: [70, 90],
    kRange: [80, 110],
    phRange: [5.2, 6.8],
    waterType: ['Well', 'Sprinkler', 'Canal'],
    expectedYield: '100 - 140 Quintals/Acre',
    sowingWindow: 'Oct 15 - Nov 05',
    harvestDuration: '90 - 110 days',
    waterRequirement: '450 - 550 mm',
    profitPotential: 'High' as const,
    estimatedNetReturn: '₹55,000 - ₹90,000 / Acre',
    seedRate: '12 - 15 Quintals / Acre (Tubers)',
    npkRatio: '150:80:100 kg/ha',
    criticalIrrigations: 'Stolon formation & Tuber bulking'
  }
];

export const PEST_DISEASE_DATA: DiseaseRecord[] = [
  {
    id: 'wheat-yellow-rust',
    crop: 'Wheat',
    cropHindi: 'गेहूं',
    diseaseName: 'Yellow / Stripe Rust (पीला रतुआ)',
    scientificName: 'Puccinia striiformis f. sp. tritici',
    affectedPart: 'Leaves',
    severity: 'High',
    imagePlaceholderColor: '#ca8a04',
    symptoms: [
      'Bright yellow to orange-yellow pustules arranged in linear stripes on the leaf surface.',
      'Fine yellowish powder rubs off easily on fingers when leaf is touched.',
      'Premature leaf senescence and shriveling of grains.'
    ],
    visualIndicators: 'Parallel bright golden-yellow stripes along leaf veins; powder rubs off on touch.',
    favorableConditions: 'Cool humid weather (8°C to 18°C) with persistent night dew and dense morning fog.',
    organicTreatment: [
      'Foliar spray of 5% Neem Seed Kernel Extract (NSKE) at early onset.',
      'Spray sour buttermilk (chaas) @ 50ml/litre fermented with copper utensil.',
      'Application of Trichoderma harzianum @ 5g/litre of water as prophylactic measure.'
    ],
    chemicalTreatment: [
      'Propiconazole 25% EC (Tilt) @ 1 ml/litre of water (200 ml in 200L water per acre).',
      'Tebuconazole 25.9% EC (Folicur) @ 1 ml/litre of water upon first symptom detection.',
      'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/litre for severe infestations.'
    ],
    preventiveMeasures: [
      'Sow recommended resistant varieties like HD-3086, DBW-187 (Karan Vandana), DBW-222, PBW-725.',
      'Avoid late sowing; plant before November 15 in North-Western plains.',
      'Avoid excessive basal and top-dressed Nitrogen fertilizers.'
    ]
  },
  {
    id: 'paddy-blast',
    crop: 'Rice (Paddy)',
    cropHindi: 'धान',
    diseaseName: 'Rice Blast / Leaf Blast (झुलसा रोग)',
    scientificName: 'Magnaporthe oryzae',
    affectedPart: 'Leaves',
    severity: 'High',
    imagePlaceholderColor: '#65a30d',
    symptoms: [
      'Spindle-shaped or eye-shaped lesions with grayish or whitish centers and brown margins on leaf blades.',
      'Lesions coalesce causing large areas of leaves to dry up and blast.',
      'Brown or black rotting at panicle base (Neck Blast) causing empty white heads.'
    ],
    visualIndicators: 'Spindle/diamond shaped spots with ash-gray center and dark reddish-brown borders.',
    favorableConditions: 'High relative humidity (>90%), cloud cover, and moderate night temperature (18-24°C).',
    organicTreatment: [
      'Seed treatment with Pseudomonas fluorescens @ 10g/kg seed.',
      'Foliar spray with Trichoderma viride @ 5g/litre or fermented cow urine (Jeevamrut) 10%.',
      'Spray silicon-based foliar stimulants to strengthen leaf cuticle resistance.'
    ],
    chemicalTreatment: [
      'Tricyclazole 75% WP (Baan) @ 0.6g/litre of water (120g/acre).',
      'Isoprothiolane 40% EC @ 1.5 ml/litre of water.',
      'Kasugamycin 3% SL @ 2 ml/litre of water for bacterial blight and blast complexes.'
    ],
    preventiveMeasures: [
      'Avoid over-application of Nitrogen fertilizer; split Urea into 3-4 doses with Potash.',
      'Maintain intermittent field wetting rather than deep standing water during high humidity.',
      'Burn or compost stubbles from previous infected crop season.'
    ]
  },
  {
    id: 'cotton-pink-bollworm',
    crop: 'Cotton',
    cropHindi: 'कपास',
    diseaseName: 'Pink Bollworm (गुलाबी सुंडी)',
    scientificName: 'Pectinophora gossypiella',
    affectedPart: 'Fruit',
    severity: 'High',
    imagePlaceholderColor: '#dc2626',
    symptoms: [
      'Rosetted flowers that fail to open properly due to larval webbing inside petals.',
      'Small entrance holes on green developing bolls with brown excreta.',
      'Stained discolored lint, premature boll dropping, and hollowed seeds.'
    ],
    visualIndicators: 'Rosette shaped closed flowers; pinkish caterpillars inside dissected green bolls.',
    favorableConditions: 'Continuous cloudy weather with temperatures between 25°C and 32°C during boll formation.',
    organicTreatment: [
      'Install Gossyplure pheromone traps @ 5 traps/acre for monitoring, 10 traps/acre for mass trapping.',
      'Release Trichogramma bactrae egg parasitoids @ 60,000 eggs/acre at weekly intervals.',
      'Spray 5% NSKE (Neem Seed Kernel Extract) or Azadirachtin 10000 ppm @ 2 ml/litre.'
    ],
    chemicalTreatment: [
      'Chlorantraniliprole 18.5% SC (Coragen) @ 0.3 ml/litre (60 ml/acre).',
      'Emamectin Benzoate 5% SG (Proclaim) @ 0.5g/litre of water (100g/acre).',
      'Spinetoram 11.7% SC @ 1 ml/litre during peak flowering and boll formation.'
    ],
    preventiveMeasures: [
      'Strictly avoid extending cotton crop beyond 150-160 days (no ratoon crop).',
      'Destroy crop residue and shreds immediately after final pickings.',
      'Deep summer ploughing to expose hibernating larvae in soil to solar heat.'
    ]
  },
  {
    id: 'tomato-early-blight',
    crop: 'Tomato',
    cropHindi: 'टमाटर',
    diseaseName: 'Early Blight of Tomato (अगेती झुलसा)',
    scientificName: 'Alternaria solani',
    affectedPart: 'Leaves',
    severity: 'Medium',
    imagePlaceholderColor: '#b45309',
    symptoms: [
      'Dark brown to black spots with concentric rings resembling a target board on older leaves.',
      'Yellow halo surrounding the concentric lesions.',
      'Dark sunken leathery spots near the stem end of fruits.'
    ],
    visualIndicators: 'Target-board circular concentric rings on lower leaves surrounded by yellowing.',
    favorableConditions: 'Warm weather (24-29°C) accompanied by frequent dew, overhead irrigation, or light rains.',
    organicTreatment: [
      'Foliar spray with Trichoderma viride @ 5g/litre.',
      'Bordeaux mixture spray (1%) or Copper oxychloride @ 2.5g/litre.',
      'Extract of garlic bulb and ginger cloves (5%) spray.'
    ],
    chemicalTreatment: [
      'Mancozeb 75% WP @ 2.5g/litre of water (500g/acre).',
      'Azoxystrobin 23% SC @ 1 ml/litre of water.',
      'Chlorothalonil 75% WP @ 2g/litre of water.'
    ],
    preventiveMeasures: [
      'Practice crop rotation with non-solanaceous crops for at least 2 seasons.',
      'Mulch soil with silver-black plastic mulch to stop soil splashing onto foliage.',
      'Prune lower leaves touching the soil surface.'
    ]
  },
  {
    id: 'chilli-thrips-mites',
    crop: 'Chilli',
    cropHindi: 'मिर्च',
    diseaseName: 'Chilli Leaf Curl & Murda Complex (मुर्राह रोग / थ्रिप्स)',
    scientificName: 'Scirtothrips dorsalis & Polyphagotarsonemus latus',
    affectedPart: 'Leaves',
    severity: 'High',
    imagePlaceholderColor: '#15803d',
    symptoms: [
      'Upward curling of leaves in boat shape (caused by Thrips).',
      'Downward inverted cup curling of leaves (caused by Yellow Mites).',
      'Crinkled, brittle, stunted leaves and severe flower dropping.'
    ],
    visualIndicators: 'Boat-shaped upward curling or inverted cup leaf deformities; stunted tips.',
    favorableConditions: 'Dry, warm weather with temperatures above 30°C and low relative humidity.',
    organicTreatment: [
      'Install 15-20 blue and yellow sticky traps per acre.',
      'Spray Neem oil (10,000 ppm) @ 2 ml/litre mixed with liquid soap.',
      'Agniastra or Dashparni ark organic herbal concoction @ 30ml/litre.'
    ],
    chemicalTreatment: [
      'Fipronil 5% SC @ 1.5 - 2 ml/litre for thrips control.',
      'Diafenthiuron 50% WP (Pegasus) @ 1.25g/litre of water.',
      'Spiromesifen 22.9% SC (Oberon) @ 1 ml/litre specifically targeting yellow mites.'
    ],
    preventiveMeasures: [
      'Plant two border rows of tall Maize or Sorghum as a live insect barrier.',
      'Avoid excessive Nitrogen which promotes soft vegetative growth preferred by sucking pests.',
      'Use drip irrigation instead of flood irrigation to moderate canopy microclimate.'
    ]
  },
  {
    id: 'potato-late-blight',
    crop: 'Potato',
    cropHindi: 'आलू',
    diseaseName: 'Late Blight of Potato (पछेती झुलसा)',
    scientificName: 'Phytophthora infestans',
    affectedPart: 'Leaves',
    severity: 'High',
    imagePlaceholderColor: '#475569',
    symptoms: [
      'Water-soaked irregular pale-green spots quickly turning into dark purplish-black blighted areas.',
      'Delicate white fungal downy growth visible on the undersides of lesions during humid mornings.',
      'Rotting foul-smelling foul odor in field under severe outbreak.'
    ],
    visualIndicators: 'Water-soaked purplish-brown lesions with white downy mildew fluff on leaf underside in morning.',
    favorableConditions: 'Temperature 10-20°C with persistent relative humidity above 90% and rainy/cloudy weather.',
    organicTreatment: [
      'Copper Hydroxide 77% WP @ 2g/litre as preventative shield.',
      'Trichoderma viride seed tuber dip before cold storage planting.',
      'Application of fermented bio-potash formulations.'
    ],
    chemicalTreatment: [
      'Cymoxanil 8% + Mancozeb 64% WP (Curzate) @ 2.5g/litre of water.',
      'Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2g/litre.',
      'Dimethomorph 50% WP @ 1g/litre + Mancozeb 2g/litre tank mix.'
    ],
    preventiveMeasures: [
      'Plant certified disease-free tubers from registered cold stores.',
      'High earthing-up of soil around plant base prevents spores from washing down to tubers.',
      'Dehaulm (cut and destroy haulms) 10-12 days before tuber harvest.'
    ]
  },
  {
    id: 'soybean-yellow-mosaic',
    crop: 'Soybean',
    cropHindi: 'सोयाबीन',
    diseaseName: 'Yellow Mosaic Virus (पीला मोज़ेक वायरस)',
    scientificName: 'Mungbean yellow mosaic India virus (MYMIV)',
    affectedPart: 'Leaves',
    severity: 'High',
    imagePlaceholderColor: '#eab308',
    symptoms: [
      'Scattered small yellow specks on young leaves enlarging into bright golden-yellow mosaic patches.',
      'Complete yellowing of foliage while veins remain green (interveinal chlorosis).',
      'Severe stunting, reduced pod set, and small shriveled seeds.'
    ],
    visualIndicators: 'Bright canary yellow mosaic marbling across green leaf surface; vectored by Whiteflies.',
    favorableConditions: 'High temperature with dry spells encouraging rapid Whitefly (Bemisia tabaci) population explosion.',
    organicTreatment: [
      'Install yellow sticky traps @ 12-15 traps/acre to trap vector whiteflies.',
      'Spray Neem oil (3,000 ppm) @ 3-5 ml/litre with sticker.',
      'Rogue out and bury early infected plants immediately to check field spread.'
    ],
    chemicalTreatment: [
      'Thiamethoxam 25% WG @ 0.5g/litre (100g/acre) to control vector whiteflies.',
      'Acetamiprid 20% SP @ 0.4g/litre of water.',
      'Diafenthiuron 50% WP @ 1.2g/litre if whitefly pressure is heavy.'
    ],
    preventiveMeasures: [
      'Seed treatment with Thiamethoxam 30% FS @ 10ml/kg seed before sowing.',
      'Grow resistant or tolerant cultivars (JS-20-29, JS-20-34, NRC-86).',
      'Control weed hosts (like Parthenium and Abutilon) along field bunds.'
    ]
  },
  {
    id: 'maize-fall-armyworm',
    crop: 'Maize',
    cropHindi: 'मक्का',
    diseaseName: 'Fall Armyworm (फॉल आर्मीवर्म)',
    scientificName: 'Spodoptera frugiperda',
    affectedPart: 'Stem',
    severity: 'High',
    imagePlaceholderColor: '#854d0e',
    symptoms: [
      'Pinholes and ragged "shot-hole" elongated windows chewed into whorl leaves.',
      'Large quantities of coarse sawdust-like brown fecal frass in leaf whorls.',
      'Larva boring into tassels, cobs, and growing point causing dead hearts.'
    ],
    visualIndicators: 'Sawdust-like frass in central whorl; larva has 4 dots in square on 8th segment and inverted Y on head.',
    favorableConditions: 'Continuous warm temperatures (24-30°C) with sporadic dry spells.',
    organicTreatment: [
      'Apply handful of fine dry soil/sand mixed with wood ash (9:1) directly into central whorls.',
      'Spray Bacillus thuringiensis (Bt) kurstaki @ 2g/litre.',
      'Metarhizium rileyi or Beauveria bassiana @ 5g/litre foliar spray.'
    ],
    chemicalTreatment: [
      'Chlorantraniliprole 18.5% SC @ 0.4 ml/litre directed directly into whorls.',
      'Spinetoram 11.7% SC @ 0.5 ml/litre of water.',
      'Emamectin Benzoate 5% SG @ 0.4g/litre.'
    ],
    preventiveMeasures: [
      'Deep ploughing to expose pupae to predatory birds.',
      'Intercrop with Cowpea or Pigeon Pea in 2:1 or 4:1 row ratio.',
      'Scout fields twice weekly starting from 7 days after germination.'
    ]
  }
];

export const MANDI_PRICES_DATA: MandiPriceItem[] = [
  {
    id: 'wheat-ludhiana',
    commodity: 'Wheat (गेहूं)',
    variety: 'Sharbati / HD-3086',
    market: 'Ludhiana APMC Main',
    district: 'Ludhiana',
    state: 'Punjab',
    modalPrice: 2475,
    minPrice: 2350,
    maxPrice: 2620,
    msp: 2425,
    trend: 'up',
    changePercent: 1.8,
    arrivalTons: 380,
    updatedDate: 'Today, 08:30 AM',
    sevenDayHistory: [2410, 2425, 2430, 2445, 2450, 2460, 2475]
  },
  {
    id: 'basmati-karnal',
    commodity: 'Paddy Basmati (धान 1121)',
    variety: 'Pusa Basmati 1121',
    market: 'Karnal Mandi',
    district: 'Karnal',
    state: 'Haryana',
    modalPrice: 4250,
    minPrice: 3950,
    maxPrice: 4500,
    msp: 2320,
    trend: 'up',
    changePercent: 2.4,
    arrivalTons: 620,
    updatedDate: 'Today, 09:15 AM',
    sevenDayHistory: [4080, 4120, 4150, 4190, 4210, 4220, 4250]
  },
  {
    id: 'cotton-rajkot',
    commodity: 'Cotton (कपास)',
    variety: 'Shankar-6 (Medium Staple)',
    market: 'Rajkot APMC',
    district: 'Rajkot',
    state: 'Gujarat',
    modalPrice: 7480,
    minPrice: 7100,
    maxPrice: 7850,
    msp: 7521,
    trend: 'down',
    changePercent: -1.2,
    arrivalTons: 410,
    updatedDate: 'Today, 10:00 AM',
    sevenDayHistory: [7650, 7600, 7580, 7550, 7510, 7490, 7480]
  },
  {
    id: 'soybean-indore',
    commodity: 'Soybean (सोयाबीन)',
    variety: 'Yellow Grade-A',
    market: 'Indore Mandi',
    district: 'Indore',
    state: 'Madhya Pradesh',
    modalPrice: 4620,
    minPrice: 4380,
    maxPrice: 4850,
    msp: 4892,
    trend: 'stable',
    changePercent: 0.2,
    arrivalTons: 950,
    updatedDate: 'Today, 09:45 AM',
    sevenDayHistory: [4600, 4610, 4590, 4615, 4620, 4618, 4620]
  },
  {
    id: 'onion-lasalgaon',
    commodity: 'Onion (प्याज)',
    variety: 'Red Nashik Medium',
    market: 'Lasalgaon APMC (Nashik)',
    district: 'Nashik',
    state: 'Maharashtra',
    modalPrice: 2850,
    minPrice: 2200,
    maxPrice: 3300,
    msp: 0, // No statutory MSP for perishables
    trend: 'up',
    changePercent: 5.6,
    arrivalTons: 1450,
    updatedDate: 'Today, 11:20 AM',
    sevenDayHistory: [2550, 2600, 2640, 2720, 2760, 2800, 2850]
  },
  {
    id: 'tomato-kolar',
    commodity: 'Tomato (टमाटर)',
    variety: 'Hybrid Sahu',
    market: 'Kolar Mandi',
    district: 'Kolar',
    state: 'Karnataka',
    modalPrice: 1650,
    minPrice: 1200,
    maxPrice: 1950,
    msp: 0,
    trend: 'down',
    changePercent: -3.8,
    arrivalTons: 820,
    updatedDate: 'Today, 08:40 AM',
    sevenDayHistory: [1850, 1800, 1780, 1740, 1710, 1680, 1650]
  },
  {
    id: 'mustard-jaipur',
    commodity: 'Mustard (सरसों)',
    variety: '42% Oil Content',
    market: 'Jaipur APMC',
    district: 'Jaipur',
    state: 'Rajasthan',
    modalPrice: 5820,
    minPrice: 5550,
    maxPrice: 6100,
    msp: 5950,
    trend: 'up',
    changePercent: 1.5,
    arrivalTons: 310,
    updatedDate: 'Today, 10:15 AM',
    sevenDayHistory: [5680, 5700, 5740, 5770, 5790, 5800, 5820]
  },
  {
    id: 'chilli-guntur',
    commodity: 'Red Chilli (लाल मिर्च)',
    variety: 'Teja / S17',
    market: 'Guntur Mirchi Yard',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    modalPrice: 18400,
    minPrice: 16200,
    maxPrice: 21500,
    msp: 0,
    trend: 'up',
    changePercent: 2.1,
    arrivalTons: 240,
    updatedDate: 'Today, 09:30 AM',
    sevenDayHistory: [17600, 17800, 17950, 18100, 18200, 18350, 18400]
  },
  {
    id: 'potato-agra',
    commodity: 'Potato (आलू)',
    variety: 'Kufri Bahar (Chipsona)',
    market: 'Agra Mandi',
    district: 'Agra',
    state: 'Uttar Pradesh',
    modalPrice: 1420,
    minPrice: 1150,
    maxPrice: 1680,
    msp: 0,
    trend: 'stable',
    changePercent: 0.1,
    arrivalTons: 1100,
    updatedDate: 'Today, 10:45 AM',
    sevenDayHistory: [1410, 1420, 1415, 1425, 1420, 1418, 1420]
  },
  {
    id: 'gram-akola',
    commodity: 'Gram / Chana (चना)',
    variety: 'Desi Chana Grade-1',
    market: 'Akola Mandi',
    district: 'Akola',
    state: 'Maharashtra',
    modalPrice: 6150,
    minPrice: 5850,
    maxPrice: 6400,
    msp: 5650,
    trend: 'up',
    changePercent: 1.4,
    arrivalTons: 290,
    updatedDate: 'Today, 09:50 AM',
    sevenDayHistory: [6020, 6050, 6080, 6100, 6120, 6130, 6150]
  }
];

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    appTitle: 'Krishi Sahayak',
    appSubtitle: 'AI-Powered Precision Crop Advisory System',
    navDashboard: 'Dashboard & Weather',
    navCropTool: 'Crop Recommender',
    navPestGuide: 'Pest Diagnosis',
    navFertilizer: 'Fertilizer & Water Calc',
    navMandi: 'Live Mandi Prices',
    navFarmProfile: 'Farm Profile',
    printReport: 'Print Advisory PDF',
    selectLocation: 'Select Agricultural Region',
    autoDetect: 'Auto Detect GPS',
    currentWeather: 'Current Micro-Weather',
    forecast7Days: '7-Day Precision Forecast',
    advisoryAlerts: 'Real-Time Field Alerts',
    actionRequired: 'Action Recommended',
    temp: 'Temperature',
    humidity: 'Humidity',
    wind: 'Wind Speed',
    soilMoisture: 'Soil Moisture',
    uvIndex: 'UV Radiation',
    rainProb: 'Rain Probability',
    kisanHelpline: 'Kisan Call Centre 24x7: 1800-180-1551 (Toll Free)',
    poweredBy: 'Backed by ICAR & Agromet Advisory Guidelines',
    outdoorMode: 'Outdoor High Contrast',
    allCrops: 'All Crops',
    searchPlaceholder: 'Search crops, diseases, markets...',
    generateRecommendation: 'Run AI Crop Recommendation',
    calculateFertilizer: 'Calculate Nutrient Schedule',
    runDiagnostic: 'Diagnose Symptoms'
  },
  hi: {
    appTitle: 'कृषि सहायक',
    appSubtitle: 'एआई-संचालित स्मार्ट फसल सलाह एवं कृषि निर्णय प्रणाली',
    navDashboard: 'डैशबोर्ड एवं मौसम',
    navCropTool: 'फसल सिफारिश',
    navPestGuide: 'कीट एवं रोग निदान',
    navFertilizer: 'उर्वरक एवं सिंचाई कैलकुलेटर',
    navMandi: 'लाइव मंडी भाव',
    navFarmProfile: 'मेरा खेत प्रोफ़ाइल',
    printReport: 'सलाह रिपोर्ट प्रिंट करें',
    selectLocation: 'कृषि क्षेत्र चुनें',
    autoDetect: 'जीपीएस से पता लगाएं',
    currentWeather: 'वर्तमान सूक्ष्म-मौसम',
    forecast7Days: '7 दिवसीय सटीक मौसम पूर्वानुमान',
    advisoryAlerts: 'वास्तविक समय खेत चेतावनी',
    actionRequired: 'सुझाया गया कदम',
    temp: 'तापमान',
    humidity: 'नमी',
    wind: 'हवा की गति',
    soilMoisture: 'मृदा नमी',
    uvIndex: 'यूवी सूचकांक',
    rainProb: 'बारिश की संभावना',
    kisanHelpline: 'किसान कॉल सेंटर 24x7: 1800-180-1551 (टोल फ्री)',
    poweredBy: 'आईसीएआर एवं कृषि मौसम विज्ञान आधारित',
    outdoorMode: 'तेज़ धूप / आउटडोर मोड',
    allCrops: 'सभी फसलें',
    searchPlaceholder: 'फसल, कीट रोग या मंडी खोजें...',
    generateRecommendation: 'फसल सिफारिश शुरू करें',
    calculateFertilizer: 'खाद व पानी की गणना करें',
    runDiagnostic: 'रोग के लक्षणों की जांच करें'
  },
  pa: {
    appTitle: 'ਕ੍ਰਿਸ਼ੀ ਸਹਾਇਕ',
    appSubtitle: 'ਏਆਈ-ਅਧਾਰਿਤ ਸਮਾਰਟ ਫ਼ਸਲ ਸਲਾਹਕਾਰ ਪ੍ਰਣਾਲੀ',
    navDashboard: 'ਡੈਸ਼ਬੋਰਡ ਤੇ ਮੌਸਮ',
    navCropTool: 'ਫ਼ਸਲ ਸਿਫਾਰਸ਼',
    navPestGuide: 'ਕੀੜੇ ਤੇ ਰੋਗ ਜਾਂਚ',
    navFertilizer: 'ਖਾਦ ਤੇ ਸਿੰਚਾਈ ਕੈਲਕੁਲੇਟਰ',
    navMandi: 'ਲਾਈਵ ਮੰਡੀ ਭਾਅ',
    navFarmProfile: 'ਮੇਰਾ ਖੇਤ ਪ੍ਰੋਫਾਈਲ',
    printReport: 'ਰਿਪੋਰਟ ਪ੍ਰਿੰਟ ਕਰੋ',
    selectLocation: 'ਖੇਤੀਬਾੜੀ ਖੇਤਰ ਚੁਣੋ',
    autoDetect: 'ਜੀਪੀਐਸ ਖੋਜੋ',
    currentWeather: 'ਮੌਜੂਦਾ ਮੌਸਮ',
    forecast7Days: '7 ਦਿਨਾਂ ਦਾ ਮੌਸਮ ਅਨੁਮਾਨ',
    advisoryAlerts: 'ਖੇਤ ਚੇਤਾਵਨੀ ਅਲਰਟ',
    actionRequired: 'ਲੋੜੀਂਦੀ ਕਾਰਵਾਈ',
    temp: 'ਤਾਪਮਾਨ',
    humidity: 'ਨਮੀ',
    wind: 'ਹਵਾ ਦੀ ਗਤੀ',
    soilMoisture: 'ਮਿੱਟੀ ਦੀ ਨਮੀ',
    uvIndex: 'ਯੂਵੀ ਇੰਡੈਕਸ',
    rainProb: 'ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ',
    kisanHelpline: 'ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ 24x7: 1800-180-1551 (ਟੋਲ ਫ੍ਰੀ)',
    poweredBy: 'ਪੰਜਾਬ ਖੇਤੀਬਾੜੀ ਯੂਨੀਵਰਸਿਟੀ ਤੇ ਆਈਸੀਏਆਰ ਆਧਾਰਿਤ',
    outdoorMode: 'ਧੁੱਪ / ਆਊਟਡੋਰ ਮੋਡ',
    allCrops: 'ਸਾਰੀਆਂ ਫ਼ਸਲਾਂ',
    searchPlaceholder: 'ਫ਼ਸਲ, ਬਿਮਾਰੀ ਜਾਂ ਮੰਡੀ ਲੱਭੋ...',
    generateRecommendation: 'ਫ਼ਸਲ ਸਿਫਾਰਸ਼ ਕੱਢੋ',
    calculateFertilizer: 'ਖਾਦ ਦਾ ਹਿਸਾਬ ਲਗਾਓ',
    runDiagnostic: 'ਰੋਗ ਦੇ ਲੱਛਣ ਜਾਂਚੋ'
  },
  mr: {
    appTitle: 'कृषी सहाय्यक',
    appSubtitle: 'एआय-आधारित अचूक पीक सल्लागार प्रणाली',
    navDashboard: 'डॅशबोर्ड व हवामान',
    navCropTool: 'पीक शिफारस',
    navPestGuide: 'कीड व रोग निदान',
    navFertilizer: 'खते व पाणी कॅल्क्युलेटर',
    navMandi: 'थेट बाजार भाव (मंडी)',
    navFarmProfile: 'माझे शेत प्रोफाइल',
    printReport: 'सल्ला अहवाल प्रिंट करा',
    selectLocation: 'शेती विभाग निवडा',
    autoDetect: 'जीपीएस स्थान शोधा',
    currentWeather: 'सद्य हवामान',
    forecast7Days: '७ दिवसांचा अचूक अंदाज',
    advisoryAlerts: 'तातडीच्या शेती सूचना',
    actionRequired: 'आवश्यक कृती',
    temp: 'तापमान',
    humidity: 'आर्द्रता',
    wind: 'वाऱ्याचा वेग',
    soilMoisture: 'मातीतील ओलावा',
    uvIndex: 'अतिनील निर्देशांक',
    rainProb: 'पावसाची शक्यता',
    kisanHelpline: 'किसान कॉल सेंटर २४x७: १८००-१८०-१५५१ (विनामूल्य)',
    poweredBy: 'आयसीएआर व कृषी विद्यापीठ प्रमाणित',
    outdoorMode: 'उन्हातील स्पष्ट मोड',
    allCrops: 'सर्व पिके',
    searchPlaceholder: 'पीक, रोग किंवा बाजार समिती शोधा...',
    generateRecommendation: 'पीक शिफारस मिळवा',
    calculateFertilizer: 'खतांचे प्रमाण मोजा',
    runDiagnostic: 'लक्षणे तपासा'
  }
};
