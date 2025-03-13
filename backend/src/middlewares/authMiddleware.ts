import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user";

dotenv.config();
const SECRET = process.env.JWT_SECRET as string;

// Middleware pour authentifier l'utilisateur
// Vérifie si un token est fourni dans le header de la requête
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");
  
    if (!token) {
      res.status(401).json({ error: "Accès refusé. Aucun token fourni." });
        return;
    }
  
    try {
      const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET) as { userId: number };
      const user = await User.findByPk(decoded.userId); 
  
      if (!user) {
        res.status(404).json({ error: "Utilisateur non trouvé." });
      }
  
      req.body.userId = user.id; // Ajoute l'ID utilisateur à la requête
      req.body.userRole = user.role; // Ajoute le rôle de l'utilisateur à la requête
      next(); 
    } catch (error) {
      res.status(403).json({ error: "Token invalide ou expiré." });
    }
};

// Middleware pour vérifier le rôle de l'utilisateur
// Vérifie si le rôle de l'utilisateur correspond à celui attendu
export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.body.userRole; // Le rôle de l'utilisateur est ajouté à la requête par le middleware d'authentification

    if (userRole !== role) {
      res.status(403).json({ error: "Accès refusé. Vous n'avez pas les permissions nécessaires." });
    }

    next(); 
  };
};
