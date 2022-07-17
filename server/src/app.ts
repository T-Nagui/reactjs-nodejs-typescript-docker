import express, { Application } from 'express';
import cors from 'cors';
import { CalculateController } from './routes/calculate';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/calculate', CalculateController);

export default app;
