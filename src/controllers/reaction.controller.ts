import { Request, Response } from "express";
import { addReactionToPublication, deleteReactionFromPublication } from "@services/reaction.services";
import { handleHttp } from "../utils/error.handle";
import { Reaction, ReactionType, UserReaction } from "@interfaces/publication.interface";

// Agregar una reacción a una publicación
const addReactionToPublicationController = async (req: Request, res: Response) => {
  try {
    const { publicationId } = req.params;
    const { userId, reactionType } = req.body;

    if (!ReactionType.includes(reactionType)) {
      throw new Error('Invalid reaction type');
    }

    const reaction : UserReaction= {
      user: userId,
      date: new Date(),
    };

    const updatedPublication = await addReactionToPublication(publicationId, reactionType,reaction);
    return res.status(200).json({
      status: 'success',
      body: updatedPublication,
    }); 
  } catch (error) {
    handleHttp(res, "ERROR_ADD_REACTION", error);
  }
};

// Eliminar una reacción de una publicación
const deleteReactionFromPublicationController = async (req: Request, res: Response) => {
  try {
    const { publicationId, reactionId } = req.params;
    const updatedPublication = await deleteReactionFromPublication(publicationId, reactionId);
    return res.status(200).json({
      status: 'success',
      body: updatedPublication,
    }); 
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_REACTION", error);
  }
};

export { addReactionToPublicationController, deleteReactionFromPublicationController };
