const dotenv = require('dotenv');
dotenv.config();

const { connectDB } = require('./db');
const app = require('./app');

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`WMIS backend listening on port ${PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server:', err);
  process.exit(1);
});

