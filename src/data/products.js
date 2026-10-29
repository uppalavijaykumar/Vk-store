const products = [
  {
    id: 1,
    name: 'Air Fryer 5L',
    price: 7999,
    originalPrice: 9499,
    discount: 20,
    rating: 4.5,
    reviews: 128,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1626509653291-18d9a934b9db?w=400&h=400&fit=crop',
    description: 'Cook healthier meals with this powerful 5L air fryer. Features rapid air technology for crispy results with up to 80% less oil.',
    features: [
      '5L Large Capacity',
      'Rapid Air Technology',
      'Digital Touch Screen',
      '8 Preset Programs',
      'Non-stick Basket',
      'Auto Shut-off'
    ],
    specifications: {
      'Capacity': '5 Liters',
      'Power': '1500W',
      'Temperature Range': '80°C - 200°C',
      'Timer': '60 Minutes',
      'Weight': '4.5 kg',
      'Warranty': '2 Years'
    },
    inStock: true
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 2999,
    originalPrice: 3499,
    discount: 15,
    rating: 4.6,
    reviews: 89,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop',
    description: 'Stay connected, track your fitness, and live smarter with this feature-packed smartwatch. With advanced fitness tracking, heart rate monitoring, and a long battery life, it\'s the perfect companion for your daily activities.',
    features: [
      'Heart Rate Monitor',
      'Sleep Tracking',
      'IP68 Water Resistant',
      '7 Days Battery Life',
      'High-resolution display',
      'Multiple sports modes',
      'Bluetooth calling',
      'Compatible with Android & iOS'
    ],
    specifications: {
      'Display': '1.85" AMOLED',
      'Battery': '380mAh',
      'Water Resistance': 'IP68',
      'Connectivity': 'Bluetooth 5.2',
      'Sensors': 'Heart Rate, SpO2, Accelerometer',
      'Compatibility': 'Android 5.0+ / iOS 10+'
    },
    inStock: true
  },
  {
    id: 3,
    name: 'Backpack',
    price: 1699,
    originalPrice: 2199,
    discount: 20,
    rating: 4.4,
    reviews: 56,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    description: 'A versatile and stylish backpack perfect for daily commute, travel, or college. Features multiple compartments and water-resistant fabric.',
    features: [
      'Water-resistant Material',
      'Laptop Compartment (15.6")',
      'Multiple Pockets',
      'Padded Shoulder Straps',
      'USB Charging Port',
      'Anti-theft Design'
    ],
    specifications: {
      'Material': 'Polyester',
      'Capacity': '30L',
      'Laptop Size': 'Up to 15.6"',
      'Dimensions': '45 x 30 x 15 cm',
      'Weight': '0.7 kg',
      'Color': 'Navy Blue'
    },
    inStock: true
  },
  {
    id: 4,
    name: 'Skincare Set',
    price: 1799,
    originalPrice: 2499,
    discount: 25,
    rating: 4.7,
    reviews: 94,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
    description: 'Complete skincare routine in one set. Includes cleanser, toner, serum, and moisturizer for glowing, healthy skin.',
    features: [
      'Natural Ingredients',
      'Suitable for All Skin Types',
      'Paraben Free',
      'Cruelty Free',
      'Dermatologically Tested'
    ],
    specifications: {
      'Includes': 'Cleanser, Toner, Serum, Moisturizer',
      'Skin Type': 'All Skin Types',
      'Size': '4 x 50ml',
      'Shelf Life': '24 Months',
      'Origin': 'India'
    },
    inStock: true
  },
  {
    id: 5,
    name: 'Wireless Earbuds',
    price: 1999,
    originalPrice: 2999,
    discount: 10,
    rating: 4.6,
    reviews: 91,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop',
    description: 'Premium wireless earbuds with active noise cancellation, crystal clear sound, and up to 30 hours of total playtime.',
    features: [
      'Active Noise Cancellation',
      'Bluetooth 5.3',
      '30 Hours Total Playtime',
      'IPX5 Water Resistant',
      'Touch Controls',
      'Fast Charging'
    ],
    specifications: {
      'Driver': '12mm Dynamic',
      'Bluetooth': '5.3',
      'Battery (Buds)': '6 Hours',
      'Battery (Case)': '24 Hours',
      'Charging': 'USB-C',
      'Weight': '5g per bud'
    },
    inStock: true
  },
  {
    id: 6,
    name: 'T-shirt',
    price: 799,
    originalPrice: null,
    discount: 0,
    rating: 4.3,
    reviews: 84,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: 'Premium cotton t-shirt with a comfortable fit. Perfect for everyday casual wear with a modern design.',
    features: [
      '100% Premium Cotton',
      'Comfortable Fit',
      'Pre-shrunk Fabric',
      'Reinforced Stitching',
      'Multiple Colors Available'
    ],
    specifications: {
      'Material': '100% Cotton',
      'Fit': 'Regular',
      'Sizes': 'S, M, L, XL, XXL',
      'Care': 'Machine Washable',
      'Origin': 'India'
    },
    inStock: true
  },
  {
    id: 7,
    name: 'Kitchen Organizer',
    price: 1299,
    originalPrice: null,
    discount: 0,
    rating: 4.4,
    reviews: 72,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    description: 'Keep your kitchen neat and organized with this multi-tier kitchen organizer. Durable stainless steel construction.',
    features: [
      'Multi-tier Design',
      'Stainless Steel',
      'Easy Assembly',
      'Anti-slip Base',
      'Space Saving'
    ],
    specifications: {
      'Material': 'Stainless Steel',
      'Tiers': '3',
      'Dimensions': '40 x 25 x 50 cm',
      'Weight Capacity': '15 kg per tier',
      'Color': 'Silver'
    },
    inStock: true
  },
  {
    id: 8,
    name: 'Makeup Kit',
    price: 1499,
    originalPrice: null,
    discount: 0,
    rating: 4.2,
    reviews: 51,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
    description: 'Professional makeup kit with everything you need for a flawless look. Includes eyeshadow palette, lipsticks, brushes, and more.',
    features: [
      '24 Color Eyeshadow Palette',
      '6 Lipstick Shades',
      '12 Brush Set',
      'Compact Mirror',
      'Travel Case Included'
    ],
    specifications: {
      'Includes': 'Eyeshadow, Lipsticks, Brushes, Mirror',
      'Palette Colors': '24',
      'Brush Material': 'Synthetic',
      'Case': 'Faux Leather',
      'Cruelty Free': 'Yes'
    },
    inStock: true
  },
  {
    id: 9,
    name: 'Sling Bag',
    price: 999,
    originalPrice: null,
    discount: 0,
    rating: 4.5,
    reviews: 68,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    description: 'Compact and stylish sling bag perfect for outings. Lightweight design with adjustable strap and multiple pockets.',
    features: [
      'Lightweight Design',
      'Adjustable Strap',
      'Multiple Compartments',
      'Water Resistant',
      'Secure Zipper'
    ],
    specifications: {
      'Material': 'Nylon',
      'Dimensions': '25 x 18 x 8 cm',
      'Strap': 'Adjustable',
      'Closure': 'Zipper',
      'Weight': '0.3 kg'
    },
    inStock: true
  },
  {
    id: 10,
    name: 'Yoga Mat',
    price: 1099,
    originalPrice: null,
    discount: 0,
    rating: 4.5,
    reviews: 98,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    description: 'Premium quality yoga mat with excellent grip and cushioning. Perfect for yoga, pilates, and floor exercises.',
    features: [
      'Non-slip Surface',
      'Extra Thick (6mm)',
      'Eco-friendly Material',
      'Carrying Strap Included',
      'Easy to Clean'
    ],
    specifications: {
      'Material': 'TPE',
      'Thickness': '6mm',
      'Dimensions': '183 x 61 cm',
      'Weight': '0.8 kg',
      'Color': 'Blue/Grey'
    },
    inStock: true
  },
  {
    id: 11,
    name: 'Bluetooth Speaker',
    price: 1899,
    originalPrice: 2499,
    discount: 15,
    rating: 4.3,
    reviews: 67,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    description: 'Portable Bluetooth speaker with deep bass and 360° surround sound. Perfect for parties, outdoor adventures, and everyday listening.',
    features: [
      '360° Surround Sound',
      'IPX7 Waterproof',
      '12 Hours Playtime',
      'Built-in Microphone',
      'TWS Pairing'
    ],
    specifications: {
      'Output': '20W',
      'Bluetooth': '5.0',
      'Battery': '4000mAh',
      'Range': '10m',
      'Charging': 'USB-C',
      'Weight': '540g'
    },
    inStock: true
  },
  {
    id: 12,
    name: 'Face Serum',
    price: 699,
    originalPrice: 999,
    discount: 30,
    rating: 4.8,
    reviews: 142,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    description: 'Vitamin C face serum for bright, glowing skin. Formulated with natural ingredients for visible results in 2 weeks.',
    features: [
      'Vitamin C + Hyaluronic Acid',
      'Natural Ingredients',
      'Visible Results in 2 Weeks',
      'Suitable for All Skin Types',
      'Paraben Free'
    ],
    specifications: {
      'Volume': '30ml',
      'Key Ingredient': 'Vitamin C 15%',
      'Skin Type': 'All',
      'Usage': 'Twice Daily',
      'Shelf Life': '12 Months'
    },
    inStock: false
  }
]

export const collections = [
  {
    name: 'Home & Kitchen',
    totalItems: 45,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
  },
  {
    name: 'Fashion',
    totalItems: 72,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop'
  },
  {
    name: 'Beauty',
    totalItems: 36,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop'
  }
]

export const categories = ['All Products', 'Home & Kitchen', 'Fashion', 'Beauty']

export default products
