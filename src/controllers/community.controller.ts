import { insertCommunitySvc, getCommunitiesSvc, getCommunitySvc, updateCommunitySvc, deleteCommunitySvc, removeUserFromCommunitySvc, addUserToCommunitySvc, checkUserIsOwnerSvc, getCommunityMembersSvc, checkUserIsMemberSvc } from "@services/community.services";
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

const isUserMemberOfCommunity = async (req: Request, res: Response) => {
    try {
        const { shortname } = req.params;
        const { userId } = req.body;

        const response = await checkUserIsMemberSvc(shortname, userId);
        switch (response) {
            case null:
                res.status(404).send({ message: 'Comunidad no encontrada' });
            break;
            case false:
                res.status(404).send({ message: 'No eres miembro de la comunidad' });
            break;    
        
            default:
                res.status(200).send({ message: 'Eres miembro de la comunidad' });
            break;
        }
    } catch (e) {
        handleHttp(res, "ERROR_MEMBER_COMMUNITY");
    }
}

const isUserOwnerOfCommunity = async (req: Request, res: Response) => {

    try {
        const { shortname } = req.params;
        const { userId } = req.body;

        const response = await checkUserIsOwnerSvc(shortname, userId);

        switch (response) {
            case null:
                res.status(404).send({ message: 'Comunidad no encontrada' });
            break;
            case false:
                res.status(404).send({ message: 'No eres el dueño de la comunidad' });
            break;    
        
            default:
                res.status(200).send({ message: 'Eres el propietario de la comunidad' });
            break;
        }

    } catch (e) {
        handleHttp(res, "ERROR_OWNER_COMMUNITY");
    }

}

const joinCommunity = async (req: Request, res: Response) => {  
    try {
        const { shortname } = req.params;
        const { userId } = req.body;
        const response = await addUserToCommunitySvc(shortname, userId);

        switch (response) {
            case null:
                res.status(404).send({ message: 'Comunidad no encontrada' });
            break;
            case false:
                res.status(404).send({ message: 'Ya eres miembro de la comunidad' });
            break;   
            
            case "ERROR_INSERT_USER_COMMUNITY":
                res.status(404).send({ message: 'Error al insertar la comunidad en el usuario' });
            break; 
        
            default:
                res.status(200).send(response);
            break;
        }

    } catch (e) {
        handleHttp(res, "ERROR_JOIN_COMMUNITY");
    }
}

const leaveCommunity = async (req: Request, res: Response) => { 
    try {
        const { shortname } = req.params;
        const { userId } = req.body;
        const response = await removeUserFromCommunitySvc(shortname, userId);

        switch (response) {
            case null:
                res.status(404).send({ message: 'Comunidad no encontrada' });
            break;
            case false:
                res.status(404).send({ message: 'No eres miembro de la comunidad' });
            break;    
            case "ERROR_REMOVE_USER_COMMUNITY":
                res.status(404).send({ message: 'Error al eliminar la comunidad en el usuario' });
            break; 
            default:
                res.status(200).send(response);
            break;
        }

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

const deleteCommunity = async (req: Request, res: Response) => { //TODO: Eliminar la comunidad de la lista de comunidades del usuario

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


const getUserCommunities = async (req: Request, res: Response) => {} //TODO DUDA: ¿Este metodo debe estar en este controlador o en el de usuario?


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