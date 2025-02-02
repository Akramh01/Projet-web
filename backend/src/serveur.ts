import express, { Request, Response, NextFunction } from 'express';
import employesRoutes from './routes/employesRoutes';
import competenceRoutes from './routes/competenceRoutes';
import { errorHandler } from './middlewares/errorHandler';
import avoirRoutes from './routes/avoirRoutes';

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.use('/employes', employesRoutes);
app.use('/competences', competenceRoutes);
app.use('/avoir', avoirRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Middleware pour les erreurs 404 (si aucune route ne correspond)
app.use((req, res, next) => {
  const error = new Error('Route introuvable.');
  (error as any).status = 404;
  next(error);
});

// Middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

