const http = require('http');
const app = require('./app');
const { mongoConnect } = require('./services/mongo')

require('dotenv').config();

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

async function startServer() {
  await mongoConnect();
  
  server.listen(PORT, () => {
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
