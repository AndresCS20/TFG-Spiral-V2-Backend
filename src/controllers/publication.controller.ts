import { Request, Response } from "express";
import {
  getFollowingPublicationsSvc,
  getAllPublicationsSvc,
  getOnePublicationSvc,
  createPublicationSvc,
  updatePublicationSvc,
  deletePublicationSvc,
} from "@services/publication.services"
import { handleHttp } from "../utils/error.handle";
import { Publication } from "@interfaces/publication.interface";

// Obtener todas las publicaciones de los usuarios seguidos
const getFollowingPublicationsController = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const followingPublications = await getFollowingPublicationsSvc(username);
    res.status(200).send(followingPublications);
  } catch (error) {
    handleHttp(res, "ERROR_GET_FOLLOWING_PUBLICATIONS", error);
  }
};

// Obtener todas las publicaciones
const getAllPublicationsController = async (req: Request, res: Response) => {
  try {
    const { communityId } = req.params;
    const allPublications = await getAllPublicationsSvc(communityId);
    res.status(200).send(allPublications);
  } catch (error) {
    handleHttp(res, "ERROR_GET_ALL_PUBLICATIONS", error);
  }
};

// Obtener una publicación por su ID
const getOnePublicationController = async (req: Request, res: Response) => {
  try {
    const { publicationId } = req.params;
    const publication = await getOnePublicationSvc(publicationId);
    if (!publication) {
      return res.status(404).send({ message: "Publicación no encontrada" });
    }
    res.status(200).send(publication);
  } catch (error) {
    handleHttp(res, "ERROR_GET_ONE_PUBLICATION", error);
  }
};

// Crear una nueva publicación
const createPublicationController = async (req: Request, res: Response) => {
  try {
    const publication : Publication = req.body;
    const newPublication = await createPublicationSvc(publication);
    res.status(201).send(newPublication);
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
      return res.status(404).send({ message: "Publicación no encontrada" });
    }
    res.status(200).send(updated);
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
      return res.status(404).send({ message: "Publicación no encontrada" });
    }
    res.status(200).send({ message: "Publicación eliminada correctamente" });
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_PUBLICATION", error);
  }
};

export {
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