import { handleHttp } from "@utils/error.handle";
import { Request, Response } from "express";
import { insertFollowSvc, deleteFollowSvc } from "@services/follows.services";

//TODO: Añadir status code y mensaje
const followUser = async ({ body }: Request, res: Response) => {
    
    try {
        const userId = body.id;
        const followId = body.followId;
        const responseItem = await insertFollowSvc(userId, followId);
        res.send(responseItem);
      } catch (e) {
        handleHttp(res, "ERROR_POST_USER", e);
      }
  }

  
  //TODO: Añadir status code y mensaje
const unFollowUser = async ({ body }: Request, res: Response) => {
  
    try {
        const userId = body.id;
        const followId = body.followId;
        const response = await deleteFollowSvc(userId, followId);
        const data = response ? response : "NOT_FOUND";
    } catch (e) {
        handleHttp(res, "ERROR_DELETE_FOLLOW");
    }
}

export { followUser, unFollowUser}