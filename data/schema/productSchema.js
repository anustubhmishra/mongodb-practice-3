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

module.exports = { Product, productSchema };
