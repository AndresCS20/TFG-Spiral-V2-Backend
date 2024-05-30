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

const getUserCommunitiesPublicationsSvc = async (username: string) => {
  try {
    const user = await UserModel.findOne({ username });
    if(!user) throw new Error("Usuario no encontrado");
    const communities = user.communities;

    const communitiesIds= communities.map(community => community.community);
    console.log(communitiesIds);
    const publications = await PublicationModel.find({
      community: { $in: communitiesIds },
    })
      .populate("author", "username fullname profile_picture profile_picture_frame")
      .populate("comments.user", "username fullname profile_picture profile_picture_frame")
      .populate("reactions.user", "username profile_picture profile_picture_frame")
      .populate("community", "shortname fullname profile_picture");
    return publications;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las publicaciones de las comunidades del usuario");
  }
};

const getNonFollowingPublicationsSvc = async (username: string) => {
  try {

    const user = await UserModel.findOne({ username });
    if(!user) throw new Error("Usuario no encontrado");
    const userId = new Types.ObjectId(user._id);
    // Obtener la lista de usuarios seguidos
    const followingList = await getFollowingOfUserSvc(username);
    console.log(followingList);

    // Extraer solo los IDs de los usuarios seguidos
    const followingIds = followingList.map(following => following.user._id);
    followingIds.push(userId);
    console.log(followingIds);

    // Buscar las publicaciones de los usuarios que no se siguen
    const nonFollowingPublications = await PublicationModel.find({
      author: { $nin: followingIds }, // Filtrar por autores que el usuario no sigue
      community: { $exists: false },
    })
    .populate("author", "username fullname profile_picture profile_picture_frame");
    
    return nonFollowingPublications;
  } catch (error) {
    console.error(error);
  }
};
const getUserPublicationsSvc = async (username: string) => {
  try {

    const user = await UserModel.findOne({ username });
    const userId = user?._id;

    if(!userId) throw new Error("Usuario no encontrado");

    const publications = await PublicationModel.find({
      author: userId,
      // community: { $exists: false }
    })
      .populate("author", "username fullname profile_picture profile_picture_frame")
      .populate("comments.user", "username fullname profile_picture profile_picture_frame")
      .populate("reactions.user", "username profile_picture profile_picture_frame")
      .populate("community", "shortname fullname profile_picture");

    return publications;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las publicaciones del usuario");
  }
};


//Obtener todas las publicaciones de los usuarios seguidos

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
    .populate("author", "username fullname profile_picture profile_picture_frame");
    
    return followingPublications;
  } catch (error) {
    throw new Error(`Error al obtener las publicaciones de los usuarios seguidos: ${error}`);
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
      .populate("reactions.user", "username profile_picture profile_picture_frame")
      .populate("community", "shortname fullname profile_picture")

      return allPublicationsCommunity;
    } else{
      const allPublications = await PublicationModel.find(
        {community: { $exists: false }})
      .populate("author", "username fullname profile_picture profile_picture_frame")
      .populate("comments.user", "username fullname profile_picture profile_picture_frame")
      .populate("reactions.user", "username profile_picture profile_picture_frame")

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
    .populate("comments.user", "username fullname profile_picture profile_picture_frame");
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
  getAllPublicationsSvc,
  getOnePublicationSvc,
  createPublicationSvc,
  updatePublicationSvc,
  deletePublicationSvc,
};
