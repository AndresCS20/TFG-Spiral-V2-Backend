import { Request, Response } from "express";
import { addCommentToPublication, deleteCommentFromPublication } from "@services/comment.services";
import { handleHttp } from "../utils/error.handle";

// Agregar un comentario a una publicación
const addCommentToPublicationController = async (req: Request, res: Response) => {
  try {
    const { publicationId } = req.params;
    const { userId, content } = req.body;

    const comment = {
      user: userId,
      content: content,
      date: new Date(),
    };

    const updatedPublication = await addCommentToPublication(publicationId, comment);
    res.status(200).send(updatedPublication);
  } catch (error) {
    handleHttp(res, "ERROR_ADD_COMMENT", error);
  }
};

// Eliminar un comentario de una publicación
const deleteCommentFromPublicationController = async (req: Request, res: Response) => {
  try {
    const { publicationId, commentId } = req.params;
    const updatedPublication = await deleteCommentFromPublication(publicationId, commentId);
    res.status(200).send(updatedPublication);
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_COMMENT", error);
  }
};

export { addCommentToPublicationController, deleteCommentFromPublicationController };
