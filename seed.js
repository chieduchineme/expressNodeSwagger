const mongoose = require('mongoose');
const Item = require('./models/Item'); // adjust path if needed

const mongoURI = 'mongodb+srv://NemelumEdu:Bakedbread%4064@cluster0.ihv7ux8.mongodb.net/?retryWrites=true&w=majority&dbName=mernitems';

const items = [
  { name: 'Apples' },
  { name: 'Oranges' },
  { name: 'Bananas' },
  { name: 'Pineapples' },
];

async function seedDB() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB ✅');

    // await Item.deleteMany(); // Clear old data
    console.log('Old items cleared 🧹');

    await Item.insertMany(items);
    console.log('Sample items inserted ✅');

    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDB();
