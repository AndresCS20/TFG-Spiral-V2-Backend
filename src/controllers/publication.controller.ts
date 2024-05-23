import { Request, Response } from "express";
import {
  getFollowingPublicationsSvc,
  getAllPublicationsSvc,
  getOnePublicationSvc,
  createPublicationSvc,
  updatePublicationSvc,
  deletePublicationSvc,
  getUserPublicationsSvc,
} from "@services/publication.services"
import { handleHttp } from "../utils/error.handle";
import { Publication } from "@interfaces/publication.interface";
import { getCommunitySvc } from "@services/community.services";

// Obtener todas las publicaciones de los usuarios seguidos
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
    const publications = await getUserPublicationsSvc(username);
    return res.status(200).json({
      status: 'success',
      body: publications,
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
  getPublicationsOfUser,
  getFollowingPublicationsController,
  getAllPublicationsController,
  getOnePublicationController,
  createPublicationController,
  updatePublicationController,
  deletePublicationController,
};



// import { Request, Response } from "express"
// import { handleHttp } from "../utils/error.handle"
// import { deletePublicationSvc } from "@services/publication.services"

// const getFollowingPublications = async ({ params }: Request, res: Response) => {}
// const getAllPublications = async ({ params }: Request, res: Response) => {}
// const getOnePublication = async ({ params }: Request, res: Response) => {}
// const createPublication = async ({ params }: Request, res: Response) => {}
// const updatePublication = async ({ params }: Request, res: Response) => {}
// const deletePublication = async ({ params }: Request, res: Response) => {

//     try {
        
//         const { id } = params;

//         const response = await deletePublicationSvc(id);

//         res.status(200).send(response)



//     } catch (error) {
//         handleHttp(res, "ERROR_DELETE_PUBLICATION", error);
//     }


// }



// export{  
//     getFollowingPublications,
//     getAllPublications,
//     getOnePublication,
//     createPublication,
//     updatePublication,
//     deletePublication
// }