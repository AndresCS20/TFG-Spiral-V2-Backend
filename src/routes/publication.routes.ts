import { addCommentToPublicationController, deleteCommentFromPublicationController } from "@controllers/comment.controller";
import { createPublicationController, deletePublicationController, getAllPublicationsController, getFollowingPublicationsController, getFollowingPublicationsControllerPaginated, getNonFollowingPublicationsController, getOnePublicationController, getPublicationsOfUser, getUserCommunitiesPublications, updatePublicationController } from "@controllers/publication.controller";
import { addReactionToPublicationController, deleteReactionFromPublicationController } from "@controllers/reaction.controller";
import PublicationModel from "@models/publication.model";
import { Router } from "express";
const ObjectId = require('mongodb').ObjectId;

const router = Router();

router
    .get('/user/:username', getPublicationsOfUser)
    .get('/:username/following', getFollowingPublicationsController)
    // .get('/:username/following', getFollowingPublicationsControllerPaginated)
    .get('/:username/communities', getUserCommunitiesPublications) 
    .get('/:username/global', getNonFollowingPublicationsController)
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