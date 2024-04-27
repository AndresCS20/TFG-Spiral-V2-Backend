import { Request, Response } from "express";
import { addReactionToPublication, deleteReactionFromPublication } from "@services/reaction.services";
import { handleHttp } from "../utils/error.handle";
import { Reaction, ReactionType } from "@interfaces/publication.interface";

// Agregar una reacción a una publicación
const addReactionToPublicationController = async (req: Request, res: Response) => {
  try {
    const { publicationId } = req.params;
    const { userId, type } = req.body;

    if (!ReactionType.includes(type)) {
      throw new Error('Invalid reaction type');
    }

    const reaction : Reaction= {
      user: userId,
      type: type,
      date: new Date(),
    };

    const updatedPublication = await addReactionToPublication(publicationId, reaction);
    res.status(200).send(updatedPublication);
  } catch (error) {
    handleHttp(res, "ERROR_ADD_REACTION", error);
  }
};

// Eliminar una reacción de una publicación
const deleteReactionFromPublicationController = async (req: Request, res: Response) => {
  try {
    const { publicationId, reactionId } = req.params;
    const updatedPublication = await deleteReactionFromPublication(publicationId, reactionId);
    res.status(200).send(updatedPublication);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_REACTION", error);
  }
};

export { addReactionToPublicationController, deleteReactionFromPublicationController };
