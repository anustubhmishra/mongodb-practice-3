const mongoose = require('mongoose');
const { Product } = require('../schema/productSchema');
const sampleProducts = require('../data/sampleProducts.json');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

async function setupDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(\`✅ Inserted \${insertedProducts.length} sample products\`);

    // Display inserted products
    console.log('\\n📦 Sample Products:');
    insertedProducts.forEach(product => {
      console.log(\`- \${product.name} (\${product.category}) - $\${product.price}\`);
      console.log(\`  Variants: \${product.variants.length}\`);
    });

    console.log('\\n✅ Database setup complete!');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('\\n👋 Database connection closed');
  }
}

// Run setup
setupDatabase();
