📋 Overview

This project demonstrates how to design and implement a MongoDB data model using nested documents to represent a real-world e-commerce catalog. It showcases MongoDB's flexible document structure, schema design, and handling of complex relationships within a single collection.

## 🎯 Objective

Learn how to:
- Design MongoDB schemas with nested documents
- Handle complex product variants within documents
- Perform queries on nested arrays
- Filter and project specific fields from nested structures

## 🏗️ Data Model

### Product Schema

Each product document includes:
- **_id**: Unique identifier
- **name**: Product name
- **price**: Product base price
- **category**: Product category (Apparel, Electronics, Footwear, etc.)
- **variants**: Array of nested variant objects
  - **color**: Variant color
  - **size**: Variant size
  - **stock**: Available quantity
  - **_id**: Unique variant identifier

## 📁 Project Structure

\`\`\`
ecommerce-mongodb-catalog/
├── README.md
├── schema/
│   └── productSchema.js
├── data/
│   └── sampleProducts.json
├── queries/
│   ├── mongoShellQueries.js
│   └── mongooseQueries.js
├── setup/
│   └── dbSetup.js
└── package.json
\`\`\`

## 🚀 Getting Started

### Prerequisites

- MongoDB installed locally or MongoDB Atlas account
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/ecommerce-mongodb-catalog.git
cd ecommerce-mongodb-catalog
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up MongoDB connection:
   - Update the connection string in \`setup/dbSetup.js\`
   - Default: \`mongodb://localhost:27017/ecommerce\`

4. Run the setup script:
\`\`\`bash
node setup/dbSetup.js
\`\`\`

## 📊 Sample Data

The project includes sample products across different categories:
- **Apparel**: Winter Jacket
- **Electronics**: Smartphone
- **Footwear**: Running Shoes

Each product contains multiple variants with different colors, sizes, and stock levels.

## 🔍 Query Examples

### Retrieve All Products
\`\`\`javascript
db.products.find()
\`\`\`

### Filter by Category
\`\`\`javascript
db.products.find({ category: "Electronics" })
\`\`\`

### Filter by Color (Nested)
\`\`\`javascript
db.products.find({ "variants.color": "Blue" })
\`\`\`

### Project Specific Variant Details
\`\`\`javascript
db.products.find(
  { "variants.color": "Blue" },
  { name: 1, price: 1, "variants.$": 1 }
)
\`\`\`

## 📖 API Reference

See \`queries/mongoShellQueries.js\` for MongoDB shell queries and \`queries/mongooseQueries.js\` for Mongoose implementations.

## 🛠️ Technologies Used

- MongoDB
- Mongoose (ODM)
- Node.js
- JavaScript

## 📸 Expected Output

The queries demonstrate:
1. All products with nested variants
2. Products filtered by category (e.g., Electronics)
3. Products filtered by variant properties (e.g., color: Blue)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Anustubh Mishra - [GitHub Profile](https://github.com/anustubhmishra)

## 🙏 Acknowledgments

- MongoDB Documentation
- Mongoose Documentation
- E-commerce best practices for NoSQL databases`,
