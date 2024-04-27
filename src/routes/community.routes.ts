import { createCommunity, deleteCommunity, getAllCommunities, getCommunityMembers, getOneCommunity, isUserMemberOfCommunity, isUserOwnerOfCommunity, joinCommunity, leaveCommunity, updateCommunity } from "@controllers/community.controller";
import { Router } from "express";

const router = Router();

router
.get('/', getAllCommunities) 
.get('/:shortname', getOneCommunity) 
.get('/:shortname/members', getCommunityMembers) // Obtener los miembros de una comunidad específica
.post('/', createCommunity) 
.patch('/:shortname', updateCommunity) 
.delete("/:shortname", deleteCommunity) 
// .get('/user/:username', getUserCommunities) // Obtener las comunidades de un usuario específico
.post('/user/:shortname/ismember', isUserMemberOfCommunity) 
.post('/user/:shortname/isowner', isUserOwnerOfCommunity) 
.post('/user/:shortname/join', joinCommunity) 
.delete('/user/:shortname/leave', leaveCommunity) 

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