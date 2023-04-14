import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static async getStatus(req, res) {
    res.status(200).send(JSON.stringify({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    }));
  }

  static async getStats(req, res) {
    res.status(200).send(JSON.stringify({
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    }));
  }
}

export default AppController;
