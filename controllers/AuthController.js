import crypto from 'crypto';
import { uuid } from 'uuidv4';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';
/* global atob */

class AuthController {
  static async getConnect(req, res) {
    const auth = req.headers.authorization.split(' ')[1];
    const details = atob(auth).split(':');
    const email = details[0];
    const hash = crypto.createHash('sha1');
    const pass = hash.update(details[1]).digest('hex');
    if (await dbClient.findUser({ email, password: pass }) === 0) {
      res.status(401).send({ error: 'Unauthorized' });
    } else {
      const token = uuid();
      const key = `auth_${token}`;
      await redisClient.set(key, email, 60 * 60 * 24);
      res.send({
        token,
      });
    }
  }

  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];
    const key = `auth_${token}`;
    const getUser = await redisClient.get(key);
    if (getUser === null) {
      res.status(401).send({
        error: 'Unauthorized',
      });
    } else {
      await redisClient.del(key);
      await dbClient.delUser({ email: getUser });
      res.status(204).send();
    }
  }
}

export default AuthController;
