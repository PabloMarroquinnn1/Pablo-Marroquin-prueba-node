require('dotenv').config();
const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = process.env.PORT || 3000;

const start = async () => {
  const ok = await testConnection();
  if (!ok) {
    console.error('No se pudo conectar a MySQL. Revisa tu .env');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();
