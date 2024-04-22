import CommunityModel from "@models/community.model";
import { Community } from "@interfaces/community.interface";

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

    const responseItem = await CommunityModel.updateOne(
        { shortname: shortname },
        { $pull: { members: userId } },
        { new: true }
    );
    return responseItem;
}

const addUserToCommunitySvc = async (shortname: string, userId: string) => {

    //Comprobar si el usuario ya está en la comunidad
    const checkUser = await CommunityModel.findOne({ shortname: shortname, members: userId });

    if(checkUser){
        return { message: 'El usuario ya está en la comunidad' };
    }
     else{
        const responseItem = await CommunityModel.updateOne(
            { shortname: shortname },
            { $push: { members: userId } },
            { new: true }
        );
        return responseItem;
     }

}

//TODO NO ESTA TERMINADO
const checkUserIsOwnerSvc = async (shortname: string, userId: string) => {

    const responseItem = await CommunityModel.findOne({ shortname: shortname, owner: userId });

    console.log(responseItem);

    return responseItem;
}

const getCommunityMembersSvc = async (shortname: string) => {

    //Obtener los miembros de la comunidad con su información usando el populate
    const responseItem = await CommunityModel.findOne({ shortname: shortname }).populate('members');

    return responseItem;

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
    getCommunityMembersSvc
};
