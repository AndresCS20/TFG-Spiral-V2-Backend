import { handleHttp } from "@utils/error.handle";
import { Request, Response } from "express";
import { insertFollowSvc, deleteFollowSvc, isFollowingUserSvc } from "@services/follows.services";

const followUser = async ({ body }: Request, res: Response) => {
    try {
      const userId = body.userId;
      const followId = body.followId;
  
      // Verificar si los usuarios ya se están siguiendo
      const isFollowing: boolean = await isFollowingUserSvc(userId, followId);
  
      if (isFollowing) {
        return res.status(400).json({
          status: 'error',
          error: 'Ya sigues a este usuario',
        });
      }
  
      const responseItem = await insertFollowSvc(userId, followId);
      return res.status(201).json({
        status: 'success',
        body: responseItem,
      });
    } catch (e) {
      handleHttp(res, "ERROR_POST_USER", e);
    }
  }

  const unFollowUser = async (req: Request, res: Response) => {
    try {
        const { userId, followId } = req.body;

        const response = await deleteFollowSvc(userId, followId);

        if (!response) {
            return res.status(404).json({
                status: 'error',
                error: 'No se encontró el seguimiento para eliminar'
            });
        }

        return res.status(200).json({
            status: '200',
            message: 'Seguimiento eliminado con éxito',
            body: response
        });
    } catch (e) {
        handleHttp(res, "ERROR_DELETE_FOLLOW", e);
    }
}

const isFollowing = async (req: Request, res: Response) => {
    try {
        const { userId, followId } = req.body;

        const response = await isFollowingUserSvc(userId, followId);

        if (!response) {
            return res.status(200).json({
                status: 'success',
                result: false,
                message: 'No se encontró el seguimiento'
            });
        }

        return res.status(200).json({
            status: 'success',
            result: true,
            message: 'Seguimiento encontrado',
            body: response
        });
    } catch (e) {
        handleHttp(res, "ERROR_CHECK_FOLLOW", e);
    }
}
  
export { followUser, unFollowUser, isFollowing}