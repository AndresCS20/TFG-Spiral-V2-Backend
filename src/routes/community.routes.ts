import { createCommunity, deleteCommunity, getAllCommunities, getCommunityMembers, getOneCommunity, getUserCommunities, isUserMemberOfCommunity, isUserOwnerOfCommunity, joinCommunity, leaveCommunity, updateCommunity } from "@controllers/community.controller";
import { Request, Response, Router } from "express";

const router = Router();

router
.get('/', getAllCommunities) 
.get('/:shortname', getOneCommunity) 
.get('/:shortname/members', getCommunityMembers) // Obtener los miembros de una comunidad específica
.post('/', createCommunity) 
.patch('/:shortname', updateCommunity) 
.delete("/:shortname", deleteCommunity) 
.get('/user/:username', getUserCommunities) // Obtener las comunidades de un usuario específico
.post('/user/:username/:shortname/ismember', isUserMemberOfCommunity) // Comprobar si un usuario es miembro de una comunidad específica
.post('/user/:shortname/isowner', isUserOwnerOfCommunity) // Comprobar si un usuario es el propietario de una comunidad específica
.post('/user/:username/:shortname/join', joinCommunity) // Unirse a una comunidad específica
.delete('/user/:username/:shortname/leave', leaveCommunity) // Abandonar una comunidad específica

// .get("/", communityController.getAllCommunities)
// .get("/:nombre_comunidad", communityController.getOneCommunity)
// .get("/members/:nombre_comunidad", communityController.getCommunityMembers)
// .get("/user/:username",communityController.getUserCommunities)
// .get("/publications/member/:username",communityPublications.getCommunitiesMemberPublications)
// .get("/publications/community/:nombre_comunidad",communityPublications.getAllPublicationsFromCommunity)
// .post("/publications/create", communityPublications.createPublication)
// .post("/create",  communityController.createCommunity)
// .post("/ismember",communityController.isUserMemberOfCommunity)
// .post("/isstaff",communityController.isUserStaffOfCommunity)
// .post("/joincommunity",communityController.joinCommunity)
// .delete("/leavecommunity",communityController.leaveCommunity)
// .patch("/:id", communityController.updateCommunity)
// .delete("/:id",communityController.deleteCommunity);

export { router };