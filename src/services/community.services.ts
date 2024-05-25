import CommunityModel from "@models/community.model";
import { Community } from "@interfaces/community.interface";
import mongoose from "mongoose";

import { joinCommunityUserSvc, leaveCommunityUserSvc } from "./user.services";

const insertCommunitySvc = async (community: Community) => {
  try {
    const responseInsert = await CommunityModel.create(community);
    return responseInsert;
  } catch (error) {
    console.error('Error inserting community:', error);
    throw new Error('Error inserting community');
  }
};

const getCommunitiesSvc = async () => {
  try {
    //Orden de más antiguo a más reciente
    const responseItem = await CommunityModel.find({}).sort({ createdAt: 1 });
    return responseItem;
  } catch (error) {
    console.error('Error retrieving communities:', error);
    throw new Error('Error retrieving communities');
  }
};

const getCommunitySvc = async (shortname: string) => {
  try {
    const responseItem = await CommunityModel.findOne({ shortname: shortname })
      .populate('members.user', 'fullname username profile_picture banner_picture profile_picture_frame')
      .populate('owner', 'fullname username profile_picture profile_picture_frame');
    
    if (!responseItem) {
      throw new Error('Community not found');
    }
    return responseItem;
  } catch (error) {
    console.error('Error retrieving community:', error);
    throw new Error('Error retrieving community');
  }
};

const updateCommunitySvc = async (shortname: string, data: Community) => {
  try {
    const responseItem = await CommunityModel.updateOne(
      { shortname: shortname },
      data,
      {
        new: true,
      }
    );
    
    if (responseItem.modifiedCount === 0) {
      throw new Error('Community not updated');
    }
    return responseItem;
  } catch (error) {
    console.error('Error updating community:', error);
    throw new Error('Error updating community');
  }
};

const deleteCommunitySvc = async (shortname: string) => {
  try {
    const responseItem = await CommunityModel.deleteOne({ shortname: shortname });
    
    if (responseItem.deletedCount === 0) {
      throw new Error('Community not deleted');
    }
    return responseItem;
  } catch (error) {
    console.error('Error deleting community:', error);
    throw new Error('Error deleting community');
  }
};

const removeUserFromCommunitySvc = async (shortname: string, userId: string) => { 

 try {
   const community = await CommunityModel.findOne({ shortname: shortname }) as Community;
 
     if(!community){
         return null;
     }
     const user = new mongoose.Types.ObjectId(userId);
 
     const responseItem = await CommunityModel.updateOne(
         { shortname: shortname },
         { $pull: { members: { user: user } } },
         { new: true }
     );
 
     console.log(responseItem)
 
     if(responseItem.modifiedCount===0){
         return false;
     }
     const communityId = community._id;
     const responseItem2 = await leaveCommunityUserSvc(userId, communityId);
 
     if(responseItem2.modifiedCount===0){
         return "ERROR_REMOVE_USER_COMMUNITY";
     }
     else{
       return responseItem;
   }
 } catch (error) {
   console.error(error);
   throw error;
 }

}



// const insertCommunitySvc = async (community: Community) => {
//   const responseInsert = await CommunityModel.create(community);
//   return responseInsert;
// };

// const getCommunitiesSvc = async () => {
//   //Orden de más antiguo a más reciente
//   const responseItem = await CommunityModel.find({}).sort({ createdAt: 1 });
//   return responseItem;
// };

// const getCommunitySvc = async (shortname: string) => {
//   const responseItem = await CommunityModel.findOne({ shortname: shortname })
//   .populate('members.user', 'fullname username profile_picture banner_picture profile_picture_frame')
//   .populate('owner', 'fullname username profile_picture profile_picture_frame');
//   return responseItem;
// };

// const updateCommunitySvc = async (shortname: string, data: Community) => {
//   const responseItem = await CommunityModel.updateOne(
//     { shortname: shortname },
//     data,
//     {
//       new: true,
//     }
//   );
//   return responseItem;
// };

// const deleteCommunitySvc = async (shortname: string) => {
//   const responseItem = await CommunityModel.deleteOne({ shortname: shortname });
//   return responseItem;
// };

// const removeUserFromCommunitySvc = async (shortname: string, userId: string) => { 

//   const community = await CommunityModel.findOne({ shortname: shortname }) as Community;

//     if(!community){
//         return null;
//     }
//     const user = new mongoose.Types.ObjectId(userId);

//     const responseItem = await CommunityModel.updateOne(
//         { shortname: shortname },
//         { $pull: { members: { user: user } } },
//         { new: true }
//     );

//     console.log(responseItem)

//     if(responseItem.modifiedCount===0){
//         return false;
//     }
//     const communityId = community._id;
//     const responseItem2 = await leaveCommunityUserSvc(userId, communityId);

//     if(responseItem2.modifiedCount===0){
//         return "ERROR_REMOVE_USER_COMMUNITY";
//     }
//     else{
//       return responseItem;
//   }

// }

const addUserToCommunitySvc = async (shortname: string, userId: string) => {
  try {

    const community = await CommunityModel.findOne({ shortname: shortname }) as Community;

    if (!community) {
        return null; // La comunidad no existe
    }
    else{

      const user = new mongoose.Types.ObjectId(userId);
      const checkUser = await CommunityModel.findOne({ 
          shortname: shortname, 
          members: { $elemMatch: { user: user } } 
      });
      console.log("checkuser",checkUser);
      if(checkUser){
          return false;
      } else {

          const communityId = community._id;
          console.log("communityId",communityId)
          const responseItem = await CommunityModel.updateOne(
              { shortname: shortname },
              { $push: { members: { user: user, date: Date.now() } } },
              { new: true }
          );

          const responseItem2 = await joinCommunityUserSvc(userId, communityId);

          if(responseItem2.modifiedCount===0){
              return "ERROR_INSERT_USER_COMMUNITY";
          }
          else{
            return responseItem;
        }
      }
    }
  } catch (error) {
      console.log(error);
      return null;
  }
}


const checkUserIsOwnerSvc = async (shortname: string, userId: string) => {

    try {
      const community = await CommunityModel.findOne({ shortname: shortname }) as Community;
      if(!community){
          return null;
      }

      const responseItem = await CommunityModel.findOne({ shortname: shortname, owner: userId });
  
      if(!responseItem){
        return false;
      }
      console.log(responseItem);

      
      return responseItem
      
    } catch (error) {
      console.log(error);
      return null;
    }

}

const getCommunityMembersSvc = async (shortname: string) => {

    const responseItem = await CommunityModel.findOne({ shortname: shortname }).populate('members.user');

    return responseItem;

}

const checkUserIsMemberSvc = async (shortname: string, userId: string) => {
  const community = await CommunityModel.findOne({ shortname: shortname }) as Community;
  if (!community) {
      return null; // La comunidad no existe
  }

  const isMember = community.members.some(member => member.user.toString() === userId);
  return isMember; // true si el usuario es miembro, false si no lo es
}

export {
    insertCommunitySvc,
    getCommunitiesSvc,
    getCommunitySvc,
    updateCommunitySvc,
    deleteCommunitySvc,
    removeUserFromCommunitySvc,
    addUserToCommunitySvc,
    checkUserIsOwnerSvc,
    getCommunityMembersSvc,
    checkUserIsMemberSvc
};
