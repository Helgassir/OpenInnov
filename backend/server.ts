import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
app.use(express.json());

// Connexion à MongoDB avec URI depuis .env
const MONGO_URI = process.env.MONGO_URI || '';
if (!MONGO_URI) {
  console.error('⚠️ MONGO_URI non défini dans .env');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Routes d'authentification préfixées par /auth
app.use('/auth', authRoutes);

// Port depuis .env ou fallback 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
