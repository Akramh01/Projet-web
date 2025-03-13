import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';


const SECRET = process.env.JWT_SECRET!;

// s'inscrire
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.create({ email, password, role: role || 'user' }); 
    res.status(201).json({ message: "Utilisateur enregistré avec succès", user });
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue lors de l'inscription : " + (error as Error).message });
  }
};
  
// se connecter
  export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user: any = await User.findOne({ where: { email } });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({ error: "Identifiants invalides" });
        return;
      }
  
      const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Une erreur est survenue lors de la connexion : " + (error as Error).message });
    }
  };
  