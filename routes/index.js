import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const app = express();

app.use(express.json());

app.get('/status', (req, res) => {
  AppController.getStatus().then((val) => {
    res.send(val);
  });
});

app.get('/stats', (req, res) => {
  AppController.getStats().then((val) => {
    res.send(val);
  });
});

app.post('/users', (req, res) => {
  UsersController.postNew(req, res);
});

app.get('/connect', (req, res) => {
  AuthController.getConnect(req, res);
});

app.get('/disconnect', (req, res) => {
  AuthController.getDisconnect(req, res);
});

app.get('/users/me', (req, res) => {
  UsersController.getMe(req, res);
});

export default app;
