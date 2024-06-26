import PublicationModel from "../models/publication.model";
import { Publication } from "../interfaces/publication.interface";
import { Types } from "mongoose";
import { getFollowingOfUserSvc, getOneUserSvc } from "./user.services";
import UserModel from "@models/user.model";

// Obtener todas las imágenes de todas las publicaciones de un usuario
const getAllPublicationImagesSvc = async (username: string) => {
  try {
    const user = await UserModel.findOne({ username });
    const userId = user?._id;

    if (!userId) throw new Error("Usuario no encontrado");

    const publications = await PublicationModel.find({
      author: userId,
      // community: { $exists: false }
    });

    const images: string[] = [];

    publications.forEach((publication) => {
      images.push(...publication.images);
    });

    return images;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las imágenes de las publicaciones del usuario");
  }
};

//////////////////////////////////////////////////////////////////////////

const getUserCommunitiesPublicationsSvc = async (username: string, page: number, limit: number) => {
  try {
    const user = await UserModel.findOne({ username });
    if(!user) throw new Error("Usuario no encontrado");
    const communities = user.communities;

    // Calcular el desplazamiento (offset) para la paginación
    const skip = (page - 1) * limit;

    const communitiesIds= communities.map(community => community.community);
    console.log(communitiesIds);
    const [publications, totalPublications] = await Promise.all([
    PublicationModel.find({
      community: { $in: communitiesIds },
    })
      .populate("author", "username fullname profile_picture profile_picture_frame")
      .populate("comments.user", "username fullname profile_picture profile_picture_frame")
      .populate("reactions.reactions.user", "username profile_picture profile_picture_frame")
      .populate("community", "shortname fullname profile_picture")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
      PublicationModel.countDocuments({ community: { $in: communitiesIds } }),
    ]);
    return {publications, totalPublications};
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las publicaciones de las comunidades del usuario");
  }
};

const getNonFollowingPublicationsSvc = async (username: string, page: number, limit: number) => {
  try {
    const user = await UserModel.findOne({ username });
    if (!user) throw new Error("Usuario no encontrado");
    const userId = new Types.ObjectId(user._id);

    const followingList = await getFollowingOfUserSvc(username);
    const followingIds = followingList.map(following => following.user._id);
    followingIds.push(userId);

    const skip = (page - 1) * limit;

    const [nonFollowingPublications, totalPublications] = await Promise.all([
      PublicationModel.find({
        author: { $nin: followingIds },
        community: { $exists: false },
      })
      .populate("author", "username fullname profile_picture profile_picture_frame")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
      PublicationModel.countDocuments({
        author: { $nin: followingIds },
        community: { $exists: false },
      }),
    ]);

    return { nonFollowingPublications, totalPublications };
  } catch (error) {
    console.error(error);
    return { nonFollowingPublications: [], totalPublications: 0 }; // Maneja el caso de error
  }
};

// const getNonFollowingPublicationsSvc = async (username: string) => {
//   try {

//     const user = await UserModel.findOne({ username });
//     if(!user) throw new Error("Usuario no encontrado");
//     const userId = new Types.ObjectId(user._id);
//     // Obtener la lista de usuarios seguidos
//     const followingList = await getFollowingOfUserSvc(username);
//     console.log(followingList);

//     // Extraer solo los IDs de los usuarios seguidos
//     const followingIds = followingList.map(following => following.user._id);
//     followingIds.push(userId);
//     console.log(followingIds);

//     // Buscar las publicaciones de los usuarios que no se siguen
//     const nonFollowingPublications = await PublicationModel.find({
//       author: { $nin: followingIds }, // Filtrar por autores que el usuario no sigue
//       community: { $exists: false },
//     })
//     .populate("author", "username fullname profile_picture profile_picture_frame").sort({ createdAt: -1 });;
    
    
//     return nonFollowingPublications;
//   } catch (error) {
//     console.error(error);
//   }
// };
const getUserPublicationsSvc = async (username: string, page: number, limit: number) => {
  try {

    const user = await UserModel.findOne({ username });
    const userId = user?._id;

    const skip = (page - 1) * limit;

    if(!userId) throw new Error("Usuario no encontrado");

    const [publications, totalPublications] = await Promise.all([
    PublicationModel.find({
      author: userId,
      // community: { $exists: false }
    })
      .populate("author", "username fullname profile_picture profile_picture_frame")
      .populate("comments.user", "username fullname profile_picture profile_picture_frame")
      .populate("reactions.reactions.user", "username profile_picture profile_picture_frame")
      .populate("community", "shortname fullname profile_picture")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
      PublicationModel.countDocuments({ author: userId }),
    ])

    return {publications, totalPublications};
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las publicaciones del usuario");
  }
};

const getFollowingPublicationsPaginatedSvc = async (username: string, page: number, limit: number) => {
  try {
    const user = await UserModel.findOne({ username });
    let userId !: Types.ObjectId;
    if(user){
      userId = new Types.ObjectId(user._id);
    }
    // Obtener la lista de usuarios seguidos
    const followingList = await getFollowingOfUserSvc(username);
    
    // Extraer solo los IDs de los usuarios seguidos
    const followingIds = followingList.map(following => following.user._id);
    if(userId){
      followingIds.push(userId);
    }
    // Calcular el desplazamiento (offset) para la paginación
    const skip = (page - 1) * limit;

    // Buscar las publicaciones de los usuarios seguidos y contar el total
    const [publications, totalPublications] = await Promise.all([
      PublicationModel.find({
        author: { $in: followingIds }, // Filtrar por autores que el usuario sigue
        community: { $exists: false },
      })
        .populate("author", "username fullname profile_picture profile_picture_frame")
        .sort({ createdAt: -1 })
        .skip(skip) // Aplicar el desplazamiento
        .limit(limit), // Limitar el número de resultados
      PublicationModel.countDocuments({
        author: { $in: followingIds },
        community: { $exists: false },
      })
    ]);

    return { publications, totalPublications };
  } catch (error) {
    throw new Error(`Error al obtener las publicaciones de los usuarios seguidos: ${error}`);
  }
};

//Obtener todas las publicaciones de los usuarios seguidos
// * Servicio sin paginacion
const getFollowingPublicationsSvc = async (username: string) => {
  try {
    // Obtener la lista de usuarios seguidos
    const followingList = await getFollowingOfUserSvc(username);
    console.log(followingList);

    // Extraer solo los IDs de los usuarios seguidos
    const followingIds = followingList.map(following => following.user._id);
    console.log(followingIds);

    // Buscar las publicaciones de los usuarios seguidos
    const followingPublications = await PublicationModel.find({
      author: { $in: followingIds }, // Filtrar por autores que el usuario sigue
      community: { $exists: false },
    })
    .populate("author", "username fullname profile_picture profile_picture_frame")
    .sort({ createdAt: -1 });;
    
    return followingPublications;
  } catch (error) {
    throw new Error(`Error al obtener las publicaciones de los usuarios seguidos: ${error}`);
  }
};


const getAllPublicationsPaginatedSvc = async (page: number, limit: number, communityId?: string) => {
  try {
    const skip = (page - 1) * limit;

    let query: any = {};
    if (communityId) {
      const idCommunity = new Types.ObjectId(communityId);
      query = { community: idCommunity };
    } else {
      query = { community: { $exists: false } };
    }

    // Buscar las publicaciones y contar el total
    const [publications, totalPublications] = await Promise.all([
      PublicationModel.find(query)
        .populate("author", "username fullname profile_picture profile_picture_frame")
        .populate("comments.user", "username fullname profile_picture profile_picture_frame")
        .populate("reactions.reactions.user", "username profile_picture profile_picture_frame")
        .populate("community", "shortname fullname profile_picture")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      PublicationModel.countDocuments(query)
    ]);


    return { publications, totalPublications };
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener todas las publicaciones");
  }
};


// Obtener todas las publicaciones 
const getAllPublicationsSvc = async (communityId?: string) => {
  try {

    if(communityId){

      const idCommunity = new Types.ObjectId(communityId);
      const allPublicationsCommunity = await PublicationModel.find({ community: idCommunity})
      .populate("author", "username fullname profile_picture profile_picture_frame")
      .populate("comments.user", "username fullname profile_picture profile_picture_frame")
      .populate("reactions.reactions.user", "username profile_picture profile_picture_frame")
      .populate("community", "shortname fullname profile_picture")
      .sort({ createdAt: -1 });
      
      return allPublicationsCommunity;
    } else{
      const allPublications = await PublicationModel.find(
        {community: { $exists: false }})
      .populate("author", "username fullname profile_picture profile_picture_frame")
      .populate("comments.user", "username fullname profile_picture profile_picture_frame")
      .populate("reactions.reactions.user", "username profile_picture profile_picture_frame")
      .sort({ createdAt: -1 });
      return allPublications;
      }

  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener todas las publicaciones");
  }
};

// Obtener una publicación por su ID
const getOnePublicationSvc = async (publicationId: string) => {
  try {
    const publication = await PublicationModel.findById(publicationId)
    .populate("author", "username fullname profile_picture profile_picture_frame")
    .populate("comments.user", "username fullname profile_picture profile_picture_frame")
    .populate("community", "shortname fullname profile_picture")
    .populate("reactions.reactions.user", "username profile_picture profile_picture_frame");
    return publication;
  } catch (error) {
    throw new Error("Error al obtener la publicación");
  }
};

// Crear una nueva publicación
const createPublicationSvc = async (publication: Publication) => {
  try {
    const newPublication = await PublicationModel.create(publication);
    return newPublication;
  } catch (error) {
    throw new Error("Error al crear la publicación");
  }
};

// Actualizar una publicación existente
const updatePublicationSvc = async (publicationId: string, updatedPublication: Publication) => {
  try {
    const updated = await PublicationModel.findByIdAndUpdate(publicationId, updatedPublication, { new: true });
    return updated;
  } catch (error) {
    throw new Error("Error al actualizar la publicación");
  }
};

// Eliminar una publicación por su ID
const deletePublicationSvc = async (publicationId: string) => {
  try {
    const deletedPublication = await PublicationModel.findByIdAndDelete(publicationId);
    return deletedPublication;
  } catch (error) {
    throw new Error("Error al eliminar la publicación");
  }
};

export {
  getUserCommunitiesPublicationsSvc,
  getUserPublicationsSvc,
  getNonFollowingPublicationsSvc,
  getFollowingPublicationsSvc,
  getFollowingPublicationsPaginatedSvc,
  getAllPublicationsSvc,
  getAllPublicationsPaginatedSvc,
  getOnePublicationSvc,
  createPublicationSvc,
  updatePublicationSvc,
  deletePublicationSvc,
};
