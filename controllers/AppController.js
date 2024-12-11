const dbClient = require('../utils/db');

class AppController {
  static async getStatus(req, res) {
    const redisAlive = true; // Update with Redis connection check if Redis is integrated
    const dbAlive = dbClient.isAlive();
    res.status(200).json({ redis: redisAlive, db: dbAlive });
  }

  static async getStats(req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    res.status(200).json({ users, files });
  }
}

module.exports = AppController;
