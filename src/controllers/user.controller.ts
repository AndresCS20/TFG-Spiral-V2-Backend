import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import {insertUserSvc, getUserSvc, getUsersSvc, updateUserSvc, deleteUserSvc } from '@services/user.services'

const getUser = async ({ params }: Request, res: Response) => {
    try {
      const { username } = params;
      const response = await getUserSvc(username);
      const data = response ? response : "NOT_FOUND";
      res.send(data);
    } catch (e) {
      handleHttp(res, "ERROR_GET_USER");
    }
  };
  
  const getUsers = async (req: Request, res: Response) => {
    try {
      const response = await getUsersSvc();
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR_GET_ITEMS");
    }
  };
  
  const updateUser = async ({ params, body }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await updateUserSvc(id, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR_UPDATE_USER");
    }
  };
  
  const createUser = async ({ body }: Request, res: Response) => {
    try {
      const responseItem = await insertUserSvc(body);
      res.send(responseItem);
    } catch (e) {
      handleHttp(res, "ERROR_POST_USER", e);
    }
  };
  
  const deleteUser = async ({ params }: Request, res: Response) => {
    try {
      const { id } = params;
      const response = await deleteUserSvc(id);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR_DELETE_USER");
    }
  };
  
  export { getUser, getUsers, createUser, updateUser, deleteUser };