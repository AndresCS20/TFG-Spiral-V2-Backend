import { addCommentToPublicationController, deleteCommentFromPublicationController } from "@controllers/comment.controller";
import { createPublicationController, deletePublicationController, getAllPublicationsController, getFollowingPublicationsController, getOnePublicationController, updatePublicationController } from "@controllers/publication.controller";
import { addReactionToPublicationController, deleteReactionFromPublicationController } from "@controllers/reaction.controller";
import { Router } from "express";

const router = Router();

router
    .get('/:username/following', getFollowingPublicationsController)
    .get('/:communityId?', getAllPublicationsController)
    .get('/:publicationId', getOnePublicationController)
    .post('/', createPublicationController)
    .patch('/:publicationId', updatePublicationController)
    .delete("/:publicationId", deletePublicationController)

    // Endpoints para comentarios
    .post("/:publicationId/comments", addCommentToPublicationController)
    .delete("/:publicationId/comments/:commentId", deleteCommentFromPublicationController)
    
    // Endpoints para reacciones
    .post("/:publicationId/reactions", addReactionToPublicationController)
    .delete("/:publicationId/reactions/:reactionId", deleteReactionFromPublicationController)
    

export { router };