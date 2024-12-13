const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class FilesController {
  // PUT /files/:id/publish
  static async putPublish(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const fileId = req.params.id;
    const filesCollection = dbClient.db.collection('files');

    try {
      const file = await filesCollection.findOne({
        _id: dbClient.convertToObjectId(fileId),
        userId: dbClient.convertToObjectId(userId),
      });

      if (!file) {
        return res.status(404).json({ error: 'Not found' });
      }

      await filesCollection.updateOne(
        { _id: dbClient.convertToObjectId(fileId) },
        { $set: { isPublic: true } },
      );

      const updatedFile = await filesCollection.findOne({
        _id: dbClient.convertToObjectId(fileId),
      });

      return res.status(200).json(updatedFile);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid file ID' });
    }
  }

  // PUT /files/:id/unpublish
  static async putUnpublish(req, res) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const fileId = req.params.id;
    const filesCollection = dbClient.db.collection('files');

    try {
      const file = await filesCollection.findOne({
        _id: dbClient.convertToObjectId(fileId),
        userId: dbClient.convertToObjectId(userId),
      });

      if (!file) {
        return res.status(404).json({ error: 'Not found' });
      }

      await filesCollection.updateOne(
        { _id: dbClient.convertToObjectId(fileId) },
        { $set: { isPublic: false } },
      );

      const updatedFile = await filesCollection.findOne({
        _id: dbClient.convertToObjectId(fileId),
      });

      return res.status(200).json(updatedFile);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid file ID' });
    }
  }
}

module.exports = FilesController;
