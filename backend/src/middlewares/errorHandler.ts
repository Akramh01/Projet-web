import { Request, Response, NextFunction } from 'express';

// Middleware de gestion des erreurs
export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Définir le code d'erreur (par défaut 500)
    const statusCode = err.status || 500;

    // Log de l'erreur côté serveur (pour débogage)
    console.error(`Erreur (${statusCode}):`, err.message);

    // Réponses spécifiques selon le code d'erreur
    if (statusCode === 400) {
        res.status(400).json({ error: 'Requête invalide. Vérifiez vos données.' });
    } else if (statusCode === 404) {
        res.status(404).json({ error: 'Ressource introuvable.' });
    } else {
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};
