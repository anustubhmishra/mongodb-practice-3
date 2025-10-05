const mongoose = require('mongoose');
const { Product } = require('../schema/productSchema');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

// ============================================
// MONGOOSE QUERY FUNCTIONS
// ============================================

// Connect to database
async function connectDB() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');
}

// 1. Retrieve all products
async function getAllProducts() {
  const products = await Product.find();
  console.log('All Products:', JSON.stringify(products, null, 2));
  return products;
}

// 2. Filter products by category
async function getProductsByCategory(category) {
  const products = await Product.find({ category });
  console.log(\`Products in \${category}:\`, JSON.stringify(products, null, 2));
  return products;
}

// 3. Filter by variant color
async function getProductsByColor(color) {
  const products = await Product.find({ 'variants.color': color });
  console.log(\`Products with \${color} variants:\`, JSON.stringify(products, null, 2));
  return products;
}

// 4. Project specific variant details
async function getProductsWithSpecificVariant(color) {
  const products = await Product.find(
    { 'variants.color': color },
    { name: 1, price: 1, category: 1, variants: { $elemMatch: { color } } }
  );
  console.log(\`Products with \${color} variant details:\`, JSON.stringify(products, null, 2));
  return products;
}

// 5. Find products with low stock
async function getLowStockProducts(threshold = 10) {
  const products = await Product.find({
    'variants': { $elemMatch: { stock: { $lt: threshold } } }
  });
  console.log(\`Products with stock < \${threshold}:\`, JSON.stringify(products, null, 2));
  return products;
}

// 6. Get products by size
async function getProductsBySize(size) {
  const products = await Product.find({ 'variants.size': size });
  console.log(\`Products with size \${size}:\`, JSON.stringify(products, null, 2));
  return products;
}

// 7. Add new variant to product
async function addVariantToProduct(productName, variant) {
  const product = await Product.findOneAndUpdate(
    { name: productName },
    { $push: { variants: variant } },
    { new: true }
  );
  console.log('Updated product:', JSON.stringify(product, null, 2));
  return product;
}

// 8. Update variant stock
async function updateVariantStock(productName, color, newStock) {
  const product = await Product.findOneAndUpdate(
    { name: productName, 'variants.color': color },
    { $set: { 'variants.$.stock': newStock } },
    { new: true }
  );
  console.log('Updated product:', JSON.stringify(product, null, 2));
  return product;
}

// 9. Get aggregated stock information
async function getTotalStockPerProduct() {
  const result = await Product.aggregate([
    { $unwind: '$variants' },
    {
      $group: {
        _id: '$name',
        totalStock: { $sum: '$variants.stock' },
        variantCount: { $sum: 1 }
      }
    }
  ]);
  console.log('Total stock per product:', JSON.stringify(result, null, 2));
  return result;
}

// 10. Search products by name
async function searchProducts(searchTerm) {
  const products = await Product.find({
    $text: { $search: searchTerm }
  });
  console.log(\`Search results for "\${searchTerm}":\`, JSON.stringify(products, null, 2));
  return products;
}

// Example usage
async function runQueries() {
  try {
    await connectDB();

    console.log('\\n=== 1. All Products ===');
    await getAllProducts();

    console.log('\\n=== 2. Electronics Category ===');
    await getProductsByCategory('Electronics');

    console.log('\\n=== 3. Products with Blue Variants ===');
    await getProductsByColor('Blue');

    console.log('\\n=== 4. Specific Blue Variant Details ===');
    await getProductsWithSpecificVariant('Blue');

    console.log('\\n=== 5. Low Stock Products ===');
    await getLowStockProducts(10);

    console.log('\\n=== 6. Total Stock Summary ===');
    await getTotalStockPerProduct();

  } catch (error) {
    console.error('Error running queries:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\\n👋 Database connection closed');
  }
}

// Export functions
module.exports = {
  connectDB,
  getAllProducts,
  getProductsByCategory,
  getProductsByColor,
  getProductsWithSpecificVariant,
  getLowStockProducts,
  getProductsBySize,
  addVariantToProduct,
  updateVariantStock,
  getTotalStockPerProduct,
  searchProducts,
  runQueries
};

// Run if called directly
if (require.main === module) {
  runQueries();
}
