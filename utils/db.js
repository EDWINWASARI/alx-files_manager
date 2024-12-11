import { MongoClient } from 'mongodb';

class DBClient {
    constructor () {
        // Get environment variables or user default values
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';
        // create connection url
        const url = `mongodb://${host}:${port}`;
        // Initialize mongoClient with url & options
        this.client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
        this.databaseName = database;
        this.db = null;
    }
     // Function to check if the connection to MongoDB is alive
    async isAlive () {
        try{
            // attempt to ping the database
            await this.client.connect ();
            console.log('connected to MongoDB');
            this.db = this.client.db(this.databaseName);
            return true
        } catch (error) {
            console.error('Failed to connect to MongoDb:', error);
            return false;
        }
    }
    // Asynchronous function to get the number of documents in the "users" connection
    async nbUsers () {
        if (!this.db) {
            console.error('Database connection is not established');
            return null;
        }
        try {
            const usersCollection = this.db.collection('users');
            const count = await usersCollection.countDocuments();
            return count;
        } catch (error) {
            console.error('Error getting number of users:', error);
            return null;
        }
    }
}
const dbClient = new DBClient();
module.exports = dbClient;