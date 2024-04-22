import { insertCommunitySvc, getCommunitiesSvc, getCommunitySvc, updateCommunitySvc, deleteCommunitySvc, removeUserFromCommunitySvc, addUserToCommunitySvc, checkUserIsOwnerSvc, getCommunityMembersSvc } from "@services/community.services";
import { handleHttp } from "@utils/error.handle";
import { Request, Response } from "express";


const getAllCommunities = async (req: Request, res: Response) => {

    try {
        const communities = await getCommunitiesSvc();
        res.status(200).send(communities);
    } catch (e) {
        handleHttp(res, "ERROR_GET_COMMUNITIES", e);
    }
}
const getOneCommunity = async (req: Request, res: Response) => {
    try {
        const { shortname } = req.params;
        const community = await getCommunitySvc(shortname);
        if (!community) {
            res.status(404).send({ message: 'Comunidad no encontrada' });
            return;
        }
        res.status(200).send(community);
    } catch (e) {
        handleHttp(res, "ERROR_GET_COMMUNITY", e);
    }
}

const getCommunityMembers = async (req: Request, res: Response) => {

    try {
        const { shortname } = req.params;
        const community = await getCommunityMembersSvc(shortname);
        if (!community) {
            res.status(404).send({ message: 'Comunidad no encontrada' });
            return;
        }
        res.status(200).send(community.members);
    } catch (e) {
        handleHttp(res, "ERROR_GET_COMMUNITY_MEMBERS", e);
    }

}
const createCommunity = async (req: Request, res: Response) => {
    try {
        const community = req.body;
        const response = await insertCommunitySvc(community);
        res.status(201).send(response);
    } catch (e) {
        handleHttp(res, "ERROR_CREATE_COMMUNITY", e);
    }
}
const getUserCommunities = async (req: Request, res: Response) => {} //DUDA: ¿Este metodo debe estar en este controlador o en el de usuario?
const isUserMemberOfCommunity = async (req: Request, res: Response) => {}

//TODO Revisar que funciona bien este metodo | NO ESTA TERMINADO
const isUserOwnerOfCommunity = async (req: Request, res: Response) => {

    try {
        const { shortname } = req.params;
        const { userId } = req.body;

        const response = await checkUserIsOwnerSvc(shortname, userId);
        console.log(response);

        res.status(200).send({ message: 'Eres el propietario de la comunidad' });
    } catch (e) {
        handleHttp(res, "ERROR_OWNER_COMMUNITY");
    }

}

//TODO Revisar que funciona bien este metodo. Comprobar a unirse con un usuario que no esta en la comunidad y volver a unirse
const joinCommunity = async (req: Request, res: Response) => {
    try {
        const { shortname } = req.params;
        const { userId } = req.body;
        const response = await addUserToCommunitySvc(shortname, userId);
        if((response as any).message){
            res.status(400).send(response);
            return;
        }
        res.status(200).send(response);
    } catch (e) {
        handleHttp(res, "ERROR_JOIN_COMMUNITY");
    }
}

const leaveCommunity = async (req: Request, res: Response) => {
    try {
        const { shortname } = req.params;
        const { userId } = req.body;
        const response = await removeUserFromCommunitySvc(shortname, userId);
        if(response.modifiedCount === 0){
            res.status(404).send({ message: 'Comunidad no encontrada' });
            return;
        }
        res.status(200).send(response);
    } catch (e) {
        handleHttp(res, "ERROR_LEAVE_COMMUNITY");
    }
}

const updateCommunity = async (req: Request, res: Response) => {
    try {
        const { shortname } = req.params;
        const data = req.body;
        const response = await updateCommunitySvc(shortname, data);
        if(response.modifiedCount === 0){
            res.status(404).send({ message: 'Comunidad no encontrada' });
            return;
        }
        res.status(200).send(response);
    } catch (e) {
        handleHttp(res, "ERROR_UPDATE_COMMUNITY");
    }
}

const deleteCommunity = async (req: Request, res: Response) => {

    try {
        const { shortname } = req.params;
        const response = await deleteCommunitySvc(shortname);
        if(response.deletedCount === 0){
            res.status(404).send({ message: 'Comunidad no encontrada' });
            return;
        }
        res.status(200).send(response);
    } catch (e) {
        handleHttp(res, "ERROR_DELETE_COMMUNITY");
    }

}




export {
    getAllCommunities,
    getOneCommunity,
    getCommunityMembers,
    createCommunity,
    getUserCommunities,
    isUserMemberOfCommunity,
    isUserOwnerOfCommunity,
    joinCommunity,
    leaveCommunity,
    updateCommunity,
    deleteCommunity

}