import { addCommentToPublicationController, deleteCommentFromPublicationController } from "@controllers/comment.controller";
import { createPublicationController, deletePublicationController, getAllPublicationsController, getFollowingPublicationsController, getOnePublicationController, getPublicationsOfUser, updatePublicationController } from "@controllers/publication.controller";
import { addReactionToPublicationController, deleteReactionFromPublicationController } from "@controllers/reaction.controller";
import { Router } from "express";

const router = Router();

router
    .get('/user/:username', getPublicationsOfUser)
    .get('/:username/following', getFollowingPublicationsController)
    .get('/:shortname/communities', getPublicationsOfUser) //TODO: 23/05/2024 Hay que hacer el controlador y servicio
    .get('/:communityShortname?', getAllPublicationsController)
    .get('/one/:publicationId', getOnePublicationController)
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