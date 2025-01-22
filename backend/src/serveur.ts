import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import employesRoutes from './routes/employesRoutes';
import competenceRoutes from './routes/competenceRoutes';

const app = express();
const port = 3000;

dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/employes', employesRoutes);
//app.use('/competences', competenceRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
