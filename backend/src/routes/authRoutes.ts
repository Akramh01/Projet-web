import express from 'express';
import { register, login } from '../controllers/authController';
import { authenticateUser } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Routes protégées
router.get("/profile", authenticateUser, (req, res) => {
    res.json({ message: "Profil sécurisé", userId: req.body.userId });
});
// Route réservée aux administrateurs
router.get('/admin', authenticateUser, requireRole('admin'), (req, res) => {
    res.json({ message: "Bienvenue, administrateur !" });
  });
  
  // Route réservée aux modérateurs
  router.get('/moderator', authenticateUser, requireRole('moderator'), (req, res) => {
    res.json({ message: "Bienvenue, modérateur !" });
  });
  
  // Route accessible à tous les utilisateurs authentifiés
  router.get('/user', authenticateUser, (req, res) => {
    res.json({ message: "Bienvenue, utilisateur !" });
  });


export default router;