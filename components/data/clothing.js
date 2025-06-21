// /data/clothing.js

const menNames = [
  'Casual Polo Shirt',
  'Slim Fit Jeans',
  'Leather Jacket',
  'Sports Hoodie',
  'Classic Trousers',
  'Formal Leather Shoes',
  'Cotton Shorts',
  'Graphic Tee',
  'Windbreaker',
  'Denim Jacket',
];

const womenNames = [
  'Floral Summer Dress',
  'High Waist Jeans',
  'Silk Blouse',
  'Knit Cardigan',
  'Maxi Skirt',
  'Wool Coat',
  'Crop Top',
  'Leather Handbag',
  'Platform Heels',
  'Wrap Dress',
];

const childrenNames = [
  'Cartoon Hoodie',
  'Kids Denim Jacket',
  'Colorful T-Shirt',
  'Mini Sneakers',
  'Raincoat',
  'Patterned Leggings',
  'Soft Overalls',
  'Striped Sweater',
  'Canvas Shoes',
  'Playtime Shorts',
];

function getRandomName(category, i) {
  const index = i % 10; // safely cycle through names
  if (category === 'Men') return menNames[index];
  if (category === 'Women') return womenNames[index];
  return childrenNames[index];
}

export const clothingItems = Array.from({ length: 100 }).map((_, i) => {
  const categoryIndex = i % 3;
  const imageIndex = (i % 20) + 1;

  let category = '';
  let image = '';

  if (categoryIndex === 0) {
    category = 'Men';
    image = `/clothing/men${imageIndex}.jpg`;
  } else if (categoryIndex === 1) {
    category = 'Women';
    image = `/clothing/women${imageIndex}.jpg`;
  } else {
    category = 'Children';
    image = `/clothing/children${imageIndex}.jpg`;
  }

  return {
    id: i + 1,
    name: getRandomName(category, i),
    price: (Math.random() * 5000 + 5000).toFixed(0),
    image,
    colors: ['Red', 'Blue', 'Black'],
    category,
  };
});
