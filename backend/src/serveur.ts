import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import affecterRoutes from './routes/affecterRoutes';
import avoirRoutes from './routes/avoirRoutes';
import competenceRoutes from './routes/competenceRoutes';
import employesRoutes from './routes/employesRoutes';
import missionsRoutes from './routes/missionsRoutes';
import requerirRoutes from './routes/requerirRoutes';
import authRoutes from './routes/authRoutes';
import { initUserModel } from './models/user';
import sequelize from './config/bd';
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());

//enable all origins for cors 
app.use(cors());



// Routes
app.use('/employes', employesRoutes);
app.use('/competences', competenceRoutes);
app.use('/avoir', avoirRoutes);
app.use('/affecter', affecterRoutes);
app.use('/missions', missionsRoutes);
app.use('/requerir', requerirRoutes);
app.use('/auth', authRoutes);

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

sequelize.authenticate().then(async () => {
  await initUserModel();
});

