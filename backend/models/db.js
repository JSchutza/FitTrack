const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');

// Use MONGO_URI for local development, otherwise use Atlas URI
dotenv.config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@jschutzacluster.vzcgxea.mongodb.net/fittrackdb?retryWrites=true&w=majority&appName=jschutzaCluster`;

const isLocalDev = process.env.NODE_ENV === 'development';
const connectionString = isLocalDev ? process.env.MONGO_URI : uri;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let cachedClient = null;

async function connectDB() {
  if (cachedClient) { return cachedClient; }

  try {
    // Updated to avoid potential issues if topology is undefined
    if (!client.topology || !(client.topology?.isConnected?.())) {
      await client.connect();
      cachedClient = client;
      // Use the same database you specified in the URI
      const db = client.db('fittrackdb');
      await db.command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    return cachedClient;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
    return null;
  }
}

module.exports = connectDB;