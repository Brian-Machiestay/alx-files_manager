import express from 'express';
import AppController from '../controllers/AppController';

const app = express();

app.use(express.json());

app.get('/status', (req, res) => {
  AppController.getStatus(req, res);
});

app.get('/stats', (req, res) => {
  AppController.getStats(req, res);
});

export default app;
