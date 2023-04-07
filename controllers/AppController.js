import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static async getStatus() {
    return { redis: redisClient.isAlive(), db: dbClient.isAlive() };
  }

  static async getStats() {
    return {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
  }
}

export default AppController;
