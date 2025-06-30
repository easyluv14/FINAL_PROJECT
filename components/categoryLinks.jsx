
// Category links without react-router-dom
export const CategoryLinks = {
  // Direct links to categories
  women: '/?category=Women',
  men: '/?category=Men',
  children: '/?category=Children',
  
  // Links to subcategories
  womenClothes: '/?category=Women&subcategory=Clothes',
  womenShoes: '/?category=Women&subcategory=Shoes',
  womenAccessories: '/?category=Women&subcategory=Accessories',
  
  menClothes: '/?category=Men&subcategory=Clothes',
  menShoes: '/?category=Men&subcategory=Shoes',
  menAccessories: '/?category=Men&subcategory=Accessories',
  
  childrenClothes: '/?category=Children&subcategory=Clothes',
  childrenShoes: '/?category=Children&subcategory=Shoes',
  childrenAccessories: '/?category=Children&subcategory=Accessories',
};

// Helper component for creating category links without react-router-dom
export const CategoryLink = ({ category, subcategory, children, className }) => {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (subcategory) params.set('subcategory', subcategory);
  
  const href = params.toString() ? `/?${params.toString()}` : '/';
  
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

export default CategoryLinks;
