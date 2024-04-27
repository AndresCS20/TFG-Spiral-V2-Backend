import PublicationModel from "../models/publication.model";
import { Types } from "mongoose";
import { Comment } from "@interfaces/publication.interface";

// Agregar un comentario a una publicación
const addCommentToPublication = async (publicationId: string, comment: Comment) => {
  try {
    const updatedPublication = await PublicationModel.findByIdAndUpdate(
      publicationId,
      { $push: { comments: comment } },
      { new: true }
    ).populate("comments.user", "username");

    return updatedPublication;
  } catch (error) {
    throw new Error("Error al agregar comentario a la publicación");
  }
};

// Eliminar un comentario de una publicación
const deleteCommentFromPublication = async (publicationId: string, commentId: string) => {
  try {
    const updatedPublication = await PublicationModel.findByIdAndUpdate(
      publicationId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    ).populate("comments.user", "username");


    return updatedPublication;
  } catch (error) {
    throw new Error("Error al eliminar comentario de la publicación");
  }
};

export { addCommentToPublication, deleteCommentFromPublication };
