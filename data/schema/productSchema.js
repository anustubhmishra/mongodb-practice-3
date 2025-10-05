const mongoose = require('mongoose');

// Variant subdocument schema
const variantSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: true });

// Product schema with nested variants
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Apparel', 'Electronics', 'Footwear', 'Accessories', 'Home']
  },
  variants: {
    type: [variantSchema],
    default: []
  }
}, {
  timestamps: true,
  collection: 'products'
});

// Indexes for better query performance
productSchema.index({ category: 1 });
productSchema.index({ 'variants.color': 1 });
productSchema.index({ name: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = { Product, productSchema };`,

    'data/sampleProducts.json': `[
  {
    "name": "Winter Jacket",
    "price": 200,
    "category": "Apparel",
    "variants": [
      {
        "color": "Black",
        "size": "S",
        "stock": 8
      },
      {
        "color": "Gray",
        "size": "M",
        "stock": 12
      }
    ]
  },
  {
    "name": "Smartphone",
    "price": 699,
    "category": "Electronics",
    "variants": []
  },
  {
    "name": "Running Shoes",
    "price": 120,
    "category": "Footwear",
    "variants": [
      {
        "color": "Red",
        "size": "M",
        "stock": 10
      },
      {
        "color": "Blue",
        "size": "L",
        "stock": 5
      }
    ]
  }
]`,

    'setup/dbSetup.js': `const mongoose = require('mongoose');
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
setupDatabase();`,
