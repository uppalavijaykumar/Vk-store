const names = [
  'Aarav Sharma', 'Priya Patel', 'Rohan Mehta', 'Sneha Gupta', 'Vikram Malhotra',
  'Ananya Iyer', 'Rahul Verma', 'Pooja Reddy', 'Amitabh Sen', 'Kavita Joshi',
  'Aditya Rao', 'Neha Deshmukh', 'Karan Singhania', 'Ritu Choudhury', 'Manish Bansal',
  'Swati Nair', 'Deepak Tiwari', 'Divya Saxena', 'Suresh Menon', 'Meera Bhatt'
];

const cities = [
  'Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai',
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Chandigarh', 'Kochi', 'Indore', 'Surat', 'Bhopal'
];

const comments = [
  'Best purchase I made this year! Build quality is remarkably premium.',
  'Super fast 2-day delivery to my doorstep. Packaging was top notch.',
  'Value for money is unbeatable. Definitely coming back for more items.',
  'The features and design exceed expectations. 5 stars without doubt!',
  'Customer support team resolved my query within minutes. Very impressive!',
  'Authentic product, completely original with full warranty verified.',
  'Looks even better in reality than on the website. Sleek and durable.',
  'Smooth checkout with PhonePe UPI and instant order tracking updates.',
  'High quality materials. Feels like a luxury brand at a fraction of cost.',
  'Gifted this to my family and they are absolutely in love with it!'
];

const productsBought = [
  'Air Fryer 5L', 'Smart Watch', 'Backpack', 'Skincare Set',
  'Wireless Earbuds', 'T-shirt', 'Kitchen Organizer', 'Makeup Kit',
  'Sling Bag', 'Yoga Mat', 'Bluetooth Speaker', 'Face Serum'
];

export const generateReviews = (count = 200) => {
  const list = [];
  for (let i = 1; i <= count; i++) {
    const name = names[i % names.length] + (i > names.length ? ` ${String.fromCharCode(65 + (i % 26))}.` : '');
    const city = cities[i % cities.length];
    const product = productsBought[i % productsBought.length];
    const comment = comments[i % comments.length];
    const rating = (i % 7 === 0) ? 4.5 : 5.0;
    const timeAgo = `${(i % 28) + 1} days ago`;

    list.push({
      id: i,
      name,
      city,
      product,
      comment,
      rating,
      timeAgo,
      verified: true
    });
  }
  return list;
};

export const reviewsData = generateReviews(200);
