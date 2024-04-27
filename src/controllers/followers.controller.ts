import { handleHttp } from "@utils/error.handle";
import { Request, Response } from "express";
import { insertFollowSvc, deleteFollowSvc, isFollowingUser } from "@services/follows.services";

const followUser = async ({ body }: Request, res: Response) => {
    try {
      const userId = body.userId;
      const followId = body.followId;
  
      // Verificar si los usuarios ya se están siguiendo
      const isFollowing: boolean = await isFollowingUser(userId, followId);
  
      if (isFollowing) {
        res.status(400).send({ message: 'Los usuarios ya se están siguiendo' });
        return;
      }
  
      const responseItem = await insertFollowSvc(userId, followId);
      res.status(201).send(responseItem);
    } catch (e) {
      handleHttp(res, "ERROR_POST_USER", e);
    }
  }


  
const unFollowUser = async ({ body }: Request, res: Response) => {
  
    try {
        console.log(body);
        const userId = body.userId;
        const followId = body.followId;
        const response = await deleteFollowSvc(userId, followId);
        const data = response || "NOT_FOUND";
        res.status(200);
        res.send(data);
    } catch (e) {
        handleHttp(res, "ERROR_DELETE_FOLLOW", e);
    }
}

export { followUser, unFollowUser}