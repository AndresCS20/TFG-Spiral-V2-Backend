import { insertCommunitySvc, getCommunitiesSvc, getCommunitySvc, updateCommunitySvc, deleteCommunitySvc, removeUserFromCommunitySvc, addUserToCommunitySvc, checkUserIsOwnerSvc, getCommunityMembersSvc, checkUserIsMemberSvc } from "@services/community.services";
import { handleHttp } from "@utils/error.handle";
import { Request, Response } from "express";


const getAllCommunities = async (req: Request, res: Response) => {

    try {
        const communities = await getCommunitiesSvc();
        return res.status(200).json({
            status: 'success',
            body: communities,
          });
        // res.status(200).send(communities);
    } catch (e) {
        handleHttp(res, "ERROR_GET_COMMUNITIES", e);
    }
}
const getOneCommunity = async (req: Request, res: Response) => {
    try {
        const { shortname } = req.params;
        const community = await getCommunitySvc(shortname);
        if (!community) {
            return res.status(404).json({
                status: 'error',
                error: 'Comunidad no encontrada',
              });
        }
        return res.status(200).json({
            status: 'success',
            body: community,
          });
    } catch (e) {
        handleHttp(res, "ERROR_GET_COMMUNITY", e);
    }
}

const getCommunityMembers = async (req: Request, res: Response) => {

    try {
        const { shortname } = req.params;
        const community = await getCommunityMembersSvc(shortname);
        if (!community) {
            return res.status(404).json({
                status: 'error',
                error: 'Comunidad no encontrada',
              });
        }
        return res.status(200).json({
            status: 'success',
            body: community.members,
          });
    } catch (e) {
        handleHttp(res, "ERROR_GET_COMMUNITY_MEMBERS", e);
    }

}
const createCommunity = async (req: Request, res: Response) => {
    try {
        const community = req.body;
        console.log(community);
        const response = await insertCommunitySvc(community);
        return res.status(200).json({
            status: 'success',
            body: response,
          });
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
                return res.status(404).json({
                    status: 'error',
                    error: 'Comunidad no encontrada',
                  });            

            case false:
                return res.status(403).json({
                    status: 'error',
                    error: 'No eres miembro de la comunidad',
                  }); 
            default:
                return res.status(200).json({
                    status: 'success',
                    body: 'Eres miembro de la comunidad',
                  });
        }
    } catch (e) {
        handleHttp(res, "ERROR_MEMBER_COMMUNITY",e);
    }
}

const isUserOwnerOfCommunity = async (req: Request, res: Response) => {

    try {
        const { shortname } = req.params;
        const { userId } = req.body;

        const response = await checkUserIsOwnerSvc(shortname, userId);

        switch (response) {
            case null:
                return res.status(404).json({
                    status: 'error',
                    error: 'Comunidad no encontrada',
                  });
            case false:
                return res.status(403).json({
                    status: 'error',
                    error: 'No eres el dueño de la comunidad',
                  });
        
            default:
                return res.status(200).json({
                    status: 'success',
                    body: 'Eres el propietario de la comunidad',
                  });
            break;
        }

    } catch (e) {
        handleHttp(res, "ERROR_OWNER_COMMUNITY",e);
    }

}

const joinCommunity = async (req: Request, res: Response) => {  
    try {
        const { shortname } = req.params;
        const { userId } = req.body;
        const response = await addUserToCommunitySvc(shortname, userId);

        switch (response) {
            case null:
                return res.status(404).json({
                    status: 'error',
                    error: 'Comunidad no encontrada',
                  });            break;
            case false:
                return res.status(404).json({
                    status: 'error',
                    error: 'Ya eres miembros de la comunidad',
                  });
            
            case "ERROR_INSERT_USER_COMMUNITY":
                return res.status(404).json({
                    status: 'error',
                    error: 'Error al insertar la comunidad en el usuario',
                  });        
            default:
                return res.status(200).json({
                    status: 'success',
                    body: response,
                  });
            break;
        }

    } catch (e) {
        handleHttp(res, "ERROR_JOIN_COMMUNITY",e);
    }
}

const leaveCommunity = async (req: Request, res: Response) => { 
    try {
        const { shortname } = req.params;
        const { userId } = req.body;
        const response = await removeUserFromCommunitySvc(shortname, userId);

        switch (response) {
            case null:
                return res.status(404).json({
                    status: 'error',
                    error: 'Comunidad no encontrada',
                  }); 
            case false:
                return res.status(404).json({
                    status: 'error',
                    error: 'No eres miembro de la comunidad',
                  });    
            case "ERROR_REMOVE_USER_COMMUNITY":
                return res.status(404).json({
                    status: 'error',
                    error: 'Error al eliminar la comunidad del usuario',
                  }); 
            default:
                return res.status(200).json({
                    status: 'success',
                    body: response,
                  });
        }

    } catch (e) {
        handleHttp(res, "ERROR_LEAVE_COMMUNITY",e);
    }
}

const updateCommunity = async (req: Request, res: Response) => {
    try {
        const { shortname } = req.params;
        const data = req.body;
        const response = await updateCommunitySvc(shortname, data);
        if(response.modifiedCount === 0){
            return res.status(404).json({
                status: 'error',
                message: 'Comunidad no encontrada',
              });
        }
        return res.status(200).json({
            status: 'success',
            body: response,
          });
    } catch (e) {
        handleHttp(res, "ERROR_UPDATE_COMMUNITY",e);
    }
}

const deleteCommunity = async (req: Request, res: Response) => { //TODO: Eliminar la comunidad de la lista de comunidades del usuario

    try {
        const { shortname } = req.params;
        const response = await deleteCommunitySvc(shortname);
        if(response.deletedCount === 0){
            return res.status(404).json({
                status: 'error',
                message: 'Comunidad no encontrada',
              });
            return;
        }
        return res.status(200).json({
            status: 'success',
            body: response,
          });
    } catch (e) {
        handleHttp(res, "ERROR_DELETE_COMMUNITY",e);
    }

}


export {
    getAllCommunities,
    getOneCommunity,
    getCommunityMembers,
    createCommunity,
    isUserMemberOfCommunity,
    isUserOwnerOfCommunity,
    joinCommunity,
    leaveCommunity,
    updateCommunity,
    deleteCommunity

}