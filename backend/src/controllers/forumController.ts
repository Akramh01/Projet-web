import { Request, Response } from "express";
import { Discussion } from "../models/discussion";
import { Message } from "../models/message";

// Créer une discussion (utilisateur authentifié uniquement)
export const createDiscussion = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const userId = req.body.userId;

    const discussion = await Discussion.create({ title, userId });
    res.status(201).json(discussion);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Récupérer toutes les discussions
export const getDiscussions = async (req: Request, res: Response) => {
  try {
    const discussions = await Discussion.findAll({ include: "author" });
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Modifier une discussion (seul l'auteur ou admin/modérateur)
export const updateDiscussion = async (req: Request, res: Response) => {
  try {
    const discussion = await Discussion.findByPk(req.params.id);

    if (!discussion) {
        res.status(404).json({ message: "Discussion non trouvée" });
        return;
      }

    if (req.body.userRole !== "admin" && req.body.userRole !== "moderator" && discussion.userId !== req.body.userId) {
      res.status(403).json({ message: "Accès interdit" });
      return;
    }

    await discussion.update(req.body);
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Supprimer une discussion (admin/modérateur uniquement)
export const deleteDiscussion = async (req: Request, res: Response) => {
  try {
    const discussion = await Discussion.findByPk(req.params.id);

    if (!discussion) {
        res.status(404).json({ message: "Discussion non trouvée" });
        return;
      }

    if (req.body.userRole !== "admin" && req.body.userRole !== "moderator") {
    res.status(403).json({ message: "Accès interdit" });
      return;
    }

    await discussion.destroy();
    res.json({ message: "Discussion supprimée" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Ajouter un message dans une discussion
export const createMessage = async (req: Request, res: Response) => {
  try {
    const { content, userId } = req.body;
    const discussionId = parseInt(req.params.id, 10); 

    if (isNaN(discussionId)) {
      res.status(400).json({ error: "ID de discussion invalide" });
      return;
    }

    const message = await Message.create({ content, userId, discussionId });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};


// Récupérer les messages d’une discussion
export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.findAll({ where: { discussionId: req.params.id }, include: "author" });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Supprimer un message (admin/modérateur ou auteur)
export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) {
        res.status(404).json({ message: "Message non trouvé" });
        return;
    }

    if (req.body.userRole !== "admin" && req.body.userRole !== "moderator" && message.userId !== req.body.userId) {
      res.status(403).json({ message: "Accès interdit" });
    }

    await message.destroy();
    res.json({ message: "Message supprimé" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
}};
