import { Request, Response } from "express";
import {
  getFollowingPublicationsSvc,
  getAllPublicationsSvc,
  getOnePublicationSvc,
  createPublicationSvc,
  updatePublicationSvc,
  deletePublicationSvc,
  getUserPublicationsSvc,
  getNonFollowingPublicationsSvc,
  getUserCommunitiesPublicationsSvc,
  getFollowingPublicationsPaginatedSvc,
  getAllPublicationsPaginatedSvc,
} from "@services/publication.services"
import { handleHttp } from "../utils/error.handle";
import { Publication } from "@interfaces/publication.interface";
import { getCommunitySvc } from "@services/community.services";


const getUserCommunitiesPublications = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const { page = '1', limit = '10' } = req.query; // Valores predeterminados para la paginación

    const currentPage = parseInt(String(page), 10);
    const pageSize = parseInt(String(limit), 10);

    const {publications, totalPublications} = await getUserCommunitiesPublicationsSvc(username, currentPage, pageSize);
    
    const totalPages = Math.ceil(totalPublications / pageSize);

    const paginationInfo = {
      currentPage,
      pageSize,
      totalPages,
      previousPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: currentPage < totalPages ? currentPage + 1 : null
    };

    return res.status(200).json({
      status: 'success',
      body: publications,
      pagination: paginationInfo
    }); 
  } catch (error) {
    handleHttp(res, "ERROR_GET_USER_COMMUNITIES_PUBLICATIONS", error);
  }

}

const getNonFollowingPublicationsController = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const currentPage = parseInt(String(page), 10);
    const pageSize = parseInt(String(limit), 10);

    const result = await getNonFollowingPublicationsSvc(username, currentPage, pageSize);
    if (!result) {
      return res.status(500).json({
        status: 'error',
        error: 'Error al obtener las publicaciones no seguidas',
      });
    }

    const { nonFollowingPublications, totalPublications } = result;
    const totalPages = Math.ceil(totalPublications / pageSize);

    const paginationInfo = {
      currentPage,
      pageSize,
      totalPages,
      previousPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: currentPage < totalPages ? currentPage + 1 : null
    };

  return res.status(200).json({
      status: 'success',
      body: nonFollowingPublications,
      pagination: paginationInfo
    });
  } catch (error) {
    handleHttp(res, "ERROR_GET_NON_FOLLOWING_PUBLICATIONS", error);
  }
};

// const getNonFollowingPublicationsController = async (req: Request, res: Response) => {
//   try {
//     const { username } = req.params;
//     const nonFollowingPublications = await getNonFollowingPublicationsSvc(username);
    
//     return res.status(200).json({
//       status: 'success',
//       body: nonFollowingPublications,
//     }); 
//   } catch (error) {
//     handleHttp(res, "ERROR_GET_NON_FOLLOWING_PUBLICATIONS", error);
//   }
// }

const getFollowingPublicationsControllerPaginated = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const { page = '1', limit = '10' } = req.query; // Valores predeterminados para la paginación

    const currentPage = parseInt(String(page), 10);
    const pageSize = parseInt(String(limit), 10);

    const { publications, totalPublications } = await getFollowingPublicationsPaginatedSvc(username, currentPage, pageSize);

    const totalPages = Math.ceil(totalPublications / pageSize);

    const paginationInfo = {
      currentPage,
      pageSize,
      totalPages,
      previousPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: currentPage < totalPages ? currentPage + 1 : null
    };

    return res.status(200).json({
      status: 'success',
      body: publications,
      pagination: paginationInfo
    });
  } catch (error) {
    handleHttp(res, "ERROR_GET_FOLLOWING_PUBLICATIONS", error);
  }
};

// Obtener todas las publicaciones de los usuarios seguidos
// * Controlador sin paginacion
const getFollowingPublicationsController = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const followingPublications = await getFollowingPublicationsSvc(username);
    return res.status(200).json({
      status: 'success',
      body: followingPublications,
    }); 
  } catch (error) {
    handleHttp(res, "ERROR_GET_FOLLOWING_PUBLICATIONS", error);
  }
};

const getAllPublicationsPaginatedController = async (req: Request, res: Response) => {
  try {
    const { communityShortname } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const currentPage = parseInt(String(page), 10);
    const pageSize = parseInt(String(limit), 10);

    let communityId: string | undefined = undefined;
    if (communityShortname) {
      const community = await getCommunitySvc(communityShortname);
      if (!community) {
        return res.status(404).json({
          status: 'error',
          error: 'Comunidad no encontrada',
        });
      }
      communityId = community._id as string;
      console.log(communityId);
    }
    console.log(communityId);

    const { publications, totalPublications } = await getAllPublicationsPaginatedSvc(Number(page), Number(limit), communityId);
    const totalPages = Math.ceil(totalPublications / Number(limit));

    const paginationInfo = {
      currentPage,
      pageSize,
      totalPages,
      previousPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: currentPage < totalPages ? currentPage + 1 : null
    };

    return res.status(200).json({
      status: 'success',
      body: publications,
      pagination: paginationInfo
    });   
  } catch (error) {
    handleHttp(res, "ERROR_GET_ALL_PUBLICATIONS", error);
  }
};


// Obtener todas las publicaciones
const getAllPublicationsController = async (req: Request, res: Response) => {
  try {
    const { communityShortname } = req.params;
    
    let communityId: string | undefined = undefined;
    if (communityShortname) {
      const community = await getCommunitySvc(communityShortname);
      if (!community) {
        return res.status(404).json({
          status: 'error',
          error: 'Comunidad no encontrada',
        });
      }
      communityId = community._id as string;
      console.log(communityId);
    }
    console.log(communityId);
    const allPublications = await getAllPublicationsSvc(communityId);
    return res.status(200).json({
      status: 'success',
      body: allPublications,
    });   
  } catch (error) {
    handleHttp(res, "ERROR_GET_ALL_PUBLICATIONS", error);
  }
};

const getPublicationsOfUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const { page = '1', limit = '10' } = req.query; // Valores predeterminados para la paginación

    const currentPage = parseInt(String(page), 10);
    const pageSize = parseInt(String(limit), 10);

    const {publications, totalPublications} = await getUserPublicationsSvc(username, currentPage, pageSize);
    
    const totalPages = Math.ceil(totalPublications / pageSize);
    const paginationInfo = {
      currentPage,
      pageSize,
      totalPages,
      previousPage: currentPage > 1 ? currentPage - 1 : null,
      nextPage: currentPage < totalPages ? currentPage + 1 : null
    };
    return res.status(200).json({
      status: 'success',
      body: publications,
      pagination: paginationInfo
    }); 
  } catch (error) {
    handleHttp(res, "ERROR_GET_USER_PUBLICATIONS", error);
  }
}


// Obtener una publicación por su ID
const getOnePublicationController = async (req: Request, res: Response) => {
  try {
    const { publicationId } = req.params;
    const publication = await getOnePublicationSvc(publicationId);
    if (!publication) {
      return res.status(404).json({
        status: 'error',
        error: 'Publicación no encontrada',
      }); 
    }
    return res.status(200).json({
      status: 'success',
      body: publication,
    }); 
  } catch (error) {
    handleHttp(res, "ERROR_GET_ONE_PUBLICATION", error);
  }
};

// Crear una nueva publicación
const createPublicationController = async (req: Request, res: Response) => {
  try {
    const publication : Publication = req.body;
    const newPublication = await createPublicationSvc(publication);
    return res.status(201).json({
      status: 'success',
      body: newPublication,
    }); 
  } catch (error) {
    handleHttp(res, "ERROR_CREATE_PUBLICATION", error);
  }
};

// Actualizar una publicación existente
const updatePublicationController = async (req: Request, res: Response) => {
  try {
    const { publicationId } = req.params;
    const updatedPublication : Publication= req.body;
    const updated = await updatePublicationSvc(publicationId, updatedPublication);
    if (!updated) {
      return res.status(404).json({
        status: 'error',
        error: 'Publicación no encontrada',
      }); 
    }
    return res.status(200).json({
      status: 'success',
      body: updated,
    }); 
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_PUBLICATION", error);
  }
};

// Eliminar una publicación por su ID
const deletePublicationController = async (req: Request, res: Response) => {
  try {
    const { publicationId } = req.params;
    const deletedPublication = await deletePublicationSvc(publicationId);
    if (!deletedPublication) {
      return res.status(404).json({
        status: 'error',
        error: 'Publicación no encontrada',
      }); 
    }
    return res.status(200).json({
      status: 'success',
      body: deletedPublication,
    }); 
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_PUBLICATION", error);
  }
};

export {
  getUserCommunitiesPublications,
  getPublicationsOfUser,
  getNonFollowingPublicationsController,
  getFollowingPublicationsController,
  getFollowingPublicationsControllerPaginated,
  getAllPublicationsController,
  getAllPublicationsPaginatedController,
  getOnePublicationController,
  createPublicationController,
  updatePublicationController,
  deletePublicationController,
};
