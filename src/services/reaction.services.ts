import PublicationModel from "../models/publication.model";
import { Types } from "mongoose";
import { Reaction } from "@interfaces/publication.interface";

// Agregar una reacción a una publicación
const addReactionToPublication = async (publicationId: string, reaction: Reaction) => {
  try {
    const updatedPublication = await PublicationModel.findByIdAndUpdate(
      publicationId,
      { $push: { reactions: reaction } },
      { new: true }
    );

    return updatedPublication;
  } catch (error) {
    throw new Error("Error al agregar reacción a la publicación");
  }
};

// Eliminar una reacción de una publicación
const deleteReactionFromPublication = async (publicationId: string, reactionId: string) => {
  try {
    const updatedPublication = await PublicationModel.findByIdAndUpdate(
      publicationId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    );

    return updatedPublication;
  } catch (error) {
    throw new Error("Error al eliminar reacción de la publicación");
  }
};

export { addReactionToPublication, deleteReactionFromPublication };
