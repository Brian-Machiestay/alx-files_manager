import crypto from 'crypto';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req) {
    const hash = crypto.createHash('sha1');
    const ob = {
      email: req.body.email,
      password: hash.update(req.body.password).digest('hex'),
    };
    const { ops } = await dbClient.insertUser(ob);
    return ({
      id: ops[0]._id,
      email: req.body.email,
    });
  }
}

export default UsersController;
