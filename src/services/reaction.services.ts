import PublicationModel from "../models/publication.model";
import { Types } from "mongoose";
import { Reaction, ReactionType, UserReaction } from "@interfaces/publication.interface";

// Agregar una reacción a una publicación
const addReactionToPublication = async (publicationId: string, reactionType:string ,reaction: UserReaction) => {
  try {
    // const updatedPublication = await PublicationModel.findByIdAndUpdate(
    //   publicationId,
    //   { $push: { reactions: reaction } },
    //   { new: true }
    // );
    const updatedPublication = await PublicationModel.findOneAndUpdate(
      { _id: publicationId, 'reactions.type': reactionType },
      { $push: { 'reactions.$.reactions': reaction } },
      { new: true }
    );
    return updatedPublication;
  } catch (error) {
    throw new Error("Error al agregar reacción a la publicación");
  }
};

// Eliminar una reacción de una publicación
// const deleteReactionFromPublication = async (publicationId: string, reactionId: string) => {
//   try {
//     const updatedPublication = await PublicationModel.findByIdAndUpdate(
//       publicationId,
//       { $pull: { reactions: { _id: reactionId } } },
//       { new: true }
//     );

//     return updatedPublication;
//   } catch (error) {
//     throw new Error("Error al eliminar reacción de la publicación");
//   }
// };

const deleteReactionFromPublication = async (publicationId: string, reactionId: string, userId: string) => {
  try {
    // const updatedPublication = await PublicationModel.findOneAndUpdate(
    //   { _id: publicationId, 'reactions._id': reactionId, 'reactions.user': userId },
    //   { $pull: { 'reactions.$[elem].reactions': { user: userId } } },
    //   { arrayFilters: [{ 'elem._id': reactionId }], new: true }
    // );

    console.log(`publicationId: ${publicationId}, reactionId: ${reactionId}, userId: ${userId}`)

    const updatedPublication = await PublicationModel.findOneAndUpdate(
      { _id: publicationId, 'reactions._id': reactionId },
      { $pull: { 'reactions.$.reactions': { user: userId } } },
      { new: true }
    );
    return updatedPublication;
  } catch (error) {
    throw new Error("Error al eliminar la reacción del usuario de la publicación");
  }
};

export { addReactionToPublication, deleteReactionFromPublication };
