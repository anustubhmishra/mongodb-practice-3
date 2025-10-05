// MongoDB Shell Queries for E-commerce Catalog

// ============================================
// 1. RETRIEVE ALL PRODUCTS
// ============================================
// Get all products with all fields
db.products.find().pretty();

// Get all products with formatting
db.products.find({}, {
  name: 1,
  price: 1,
  category: 1,
  'variants.color': 1,
  'variants.size': 1
}).pretty();


// ============================================
// 2. FILTER PRODUCTS BY CATEGORY
// ============================================
// Get all Electronics products
db.products.find({ category: "Electronics" }).pretty();

// Get all Apparel products
db.products.find({ category: "Apparel" }).pretty();

// Get all Footwear products
db.products.find({ category: "Footwear" }).pretty();


// ============================================
// 3. FILTER BY VARIANT COLOR
// ============================================
// Find all products with Blue variants
db.products.find({ "variants.color": "Blue" }).pretty();

// Find products with Black variants
db.products.find({ "variants.color": "Black" }).pretty();


// ============================================
// 4. PROJECT SPECIFIC VARIANT DETAILS
// ============================================
// Get products with Blue variants and project only matching variant
db.products.find(
  { "variants.color": "Blue" },
  { 
    name: 1, 
    price: 1, 
    category: 1,
    "variants.$": 1 
  }
).pretty();

// Get all variants for products in Footwear category
db.products.find(
  { category: "Footwear" },
  {
    name: 1,
    variants: 1
  }
).pretty();


// ============================================
// 5. ADVANCED QUERIES
// ============================================
// Find products with stock greater than 10
db.products.find({ "variants.stock": { $gt: 10 } }).pretty();

// Find products with specific size
db.products.find({ "variants.size": "M" }).pretty();

// Count products by category
db.products.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } }
]);

// Get total stock per product
db.products.aggregate([
  { $unwind: "$variants" },
  { 
    $group: { 
      _id: "$name", 
      totalStock: { $sum: "$variants.stock" } 
    } 
  }
]);

// Find products with low stock (< 10)
db.products.find({
  "variants": {
    $elemMatch: { stock: { $lt: 10 } }
  }
}).pretty();


// ============================================
// 6. UPDATE OPERATIONS
// ============================================
// Add a new variant to a product
db.products.updateOne(
  { name: "Winter Jacket" },
  {
    $push: {
      variants: {
        color: "Navy",
        size: "L",
        stock: 15
      }
    }
  }
);

// Update stock for a specific variant
db.products.updateOne(
  { 
    name: "Running Shoes",
    "variants.color": "Blue"
  },
  {
    $set: { "variants.$.stock": 8 }
  }
);


// ============================================
// 7. CREATE INDEXES
// ============================================
// Create index on category for faster filtering
db.products.createIndex({ category: 1 });

// Create index on variant color
db.products.createIndex({ "variants.color": 1 });

// Create text index on name for search
db.products.createIndex({ name: "text" });


// ============================================
// 8. DELETE OPERATIONS
// ============================================
// Remove a specific variant
db.products.updateOne(
  { name: "Running Shoes" },
  {
    $pull: {
      variants: { color: "Red" }
    }
  }
);
