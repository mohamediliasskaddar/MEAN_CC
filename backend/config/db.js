// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔍 Tentative de connexion via URI:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté');
  } catch (error) {
    console.error(' Erreur de connexion MongoDB :', error);
    process.exit(1);
  }
};

module.exports = connectDB;
