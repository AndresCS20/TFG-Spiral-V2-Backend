import PublicationModel from "../models/publication.model";
import { Publication } from "../interfaces/publication.interface";
import { Types } from "mongoose";
import { getFollowingOfUserSvc } from "./user.services";


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
    }).populate("author", "username");
    
    return followingPublications;
  } catch (error) {
    throw new Error(`Error al obtener las publicaciones de los usuarios seguidos: ${error}`);
  }
};

// Obtener todas las publicaciones
const getAllPublicationsSvc = async () => {
  try {
    const allPublications = await PublicationModel.find().populate("author", "username fullname profile_picture");
    return allPublications;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener todas las publicaciones");
  }
};

// Obtener una publicación por su ID
const getOnePublicationSvc = async (publicationId: string) => {
  try {
    const publication = await PublicationModel.findById(publicationId).populate("author", "username fullname profile_picture");
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
  getFollowingPublicationsSvc,
  getAllPublicationsSvc,
  getOnePublicationSvc,
  createPublicationSvc,
  updatePublicationSvc,
  deletePublicationSvc,
};
