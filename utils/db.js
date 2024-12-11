const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // Get environment variables or use default values
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Create the connection URL
    const url = `mongodb://${host}:${port}`;

    // Initialize MongoClient with the URL and options
    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    this.databaseName = database;
    this.db = null;

    // Connect to the database
    this.client.connect()
      .then(() => {
        this.db = this.client.db(this.databaseName);
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
      });
  }

  // Function to check if the connection to MongoDB is alive
  isAlive() {
    return this.client && this.client.isConnected();
  }

  // Asynchronous function to get the number of documents in the 'users' collection
  async nbUsers() {
    if (!this.db) {
      console.error('Database connection is not established.');
      return null;
    }
    try {
      const usersCollection = this.db.collection('users');
      return await usersCollection.countDocuments();
    } catch (error) {
      console.error('Error getting number of users:', error);
      return null;
    }
  }

  // Asynchronous function to get the number of documents in the 'files' collection
  async nbFiles() {
    if (!this.db) {
      console.error('Database connection is not established.');
      return null;
    }
    try {
      const filesCollection = this.db.collection('files');
      return await filesCollection.countDocuments();
    } catch (error) {
      console.error('Error getting number of files:', error);
      return null;
    }
  }
}

// Create an instance of DBClient and export it
const dbClient = new DBClient();
module.exports = dbClient;
