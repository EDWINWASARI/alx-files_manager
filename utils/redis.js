// Import the Redis library
const redis = require('redis');

// Define the redis client class
class RedisClient {
    constructor() {
        // Create the Redis client
        this.client = redis.createClient();
        // Handle connection errors
        this.client.on('error', (error) =>{
            console.error('Redis client Error:', error);
        });
        // Log successful connection
        this.client.on('connect', () =>{
            console.log('Connected to Redis Succesfuly');
        });
    }
    // Method to check if Redis Connection is alive
    isAlive () {
        return this.client.connected;
    }
    // Method to get a value by key from Redis
    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });
    }
    // Method to set key-value pair with expiration in Redis
    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, 'EX', duration, (err) =>{
                if (err) {
                    reject (err);
                } else {
                    resolve('OK')
                }
            });
        });
    }
    // Method to delete a key from Redis
    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve('OK');
                }
            });
        });
    },
}
const redisClient = new RedisClient();
module.exports = redisClient;