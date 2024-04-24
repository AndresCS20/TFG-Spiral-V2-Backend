import CommunityModel from "@models/community.model";
import { Community } from "@interfaces/community.interface";
import mongoose from "mongoose";

import { joinCommunityUserSvc, leaveCommunityUserSvc } from "./user.services";

const insertCommunitySvc = async (community: Community) => {
  const responseInsert = await CommunityModel.create(community);
  return responseInsert;
};

const getCommunitiesSvc = async () => {
  const responseItem = await CommunityModel.find({});
  return responseItem;
};

const getCommunitySvc = async (shortname: string) => {
  const responseItem = await CommunityModel.findOne({ shortname: shortname });
  return responseItem;
};

const updateCommunitySvc = async (shortname: string, data: Community) => {
  const responseItem = await CommunityModel.updateOne(
    { shortname: shortname },
    data,
    {
      new: true,
    }
  );
  return responseItem;
};

const deleteCommunitySvc = async (shortname: string) => {
  const responseItem = await CommunityModel.deleteOne({ shortname: shortname });
  return responseItem;
};

const removeUserFromCommunitySvc = async (shortname: string, userId: string) => { 

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

}

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
