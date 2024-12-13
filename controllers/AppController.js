const redisClient = require('redis');
const dbClient = require('mongodb');

// GET /status
exports.getStatus = async (req, res) => {
  try {
    const redisStatus = await redisClient.ping();
    const dbStatus = await dbClient.ping();

    return res.status(200).json({
      redis: redisStatus === 'PONG',
      db: dbStatus === 'PONG',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error checking the status of Redis or DB',
    });
  }
};

// GET /stats
exports.getStats = async (req, res) => {
  try {
    const userCount = await dbClient.collection('users').countDocuments();
    const fileCount = await dbClient.collection('files').countDocuments();

    return res.status(200).json({
      users: userCount,
      files: fileCount,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving statistics',
    });
  }
};
