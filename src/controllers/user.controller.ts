import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import {createUserSvc, getOneUserSvc, getAllUsersSvc, updateUserSvc, deleteUserSvc, getFollowersOfUserSvc, getFollowingOfUserSvc } from '@services/user.services'

const getUser = async ({ params }: Request, res: Response) => {
    try {
      const { username } = params;
      const response = await getOneUserSvc(username);
      const data = response ? response : "NOT_FOUND";
      res.status(200).send(data);
    } catch (e) {
      handleHttp(res, "ERROR_GET_USER", e);
    }
  };
  
  const getUsers = async (req: Request, res: Response) => {
    try {
      const response = await getAllUsersSvc();
      res.status(200).send(response);
    } catch (e) {
      handleHttp(res, "ERROR_GET_ITEMS", e);
    }
  };
  
  const updateUser = async ({ params, body }: Request, res: Response) => {
    try {
      const { username } = params;
      const response = await updateUserSvc(username, body);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR_UPDATE_USER", e);
    }
  };
  
  const createUser = async ({ body }: Request, res: Response) => {
    try {
      const responseItem = await createUserSvc(body);
      res.status(201).send(responseItem);
    } catch (e) {
      handleHttp(res, "ERROR_POST_USER", e);
    }
  };
  
  const deleteUser = async ({ params }: Request, res: Response) => {
    try {
      const { username } = params;
      const response = await deleteUserSvc(username);
      res.send(response);
    } catch (e) {
      handleHttp(res, "ERROR_DELETE_USER",e);
    }
  };
  

  const getUserFollowers = async ({ params }: Request, res: Response) => {
    try {
      const { username } = params;
      const response = await getFollowersOfUserSvc(username);
      res.status(200).send(response);
    } catch (e) {
      handleHttp(res, "ERROR_GET_FOLLOWERS", e);
    }
  }

  const getUserFollows = async ({ params }: Request, res: Response) => {
    try {
      const { username } = params;
      const response = await getFollowingOfUserSvc(username);
      res.status(200).send(response);
    } catch (e) {
      handleHttp(res, "ERROR_GET_FOLLOWS", e);
    }
  }

  export { getUser, getUsers, createUser, updateUser, deleteUser, getUserFollowers, getUserFollows };