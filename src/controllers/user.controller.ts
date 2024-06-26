import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import {createUserSvc, getOneUserSvc, getAllUsersSvc, updateUserSvc, deleteUserSvc, getFollowersOfUserSvc, getFollowingOfUserSvc, getNonFollowingUsersSvc } from '@services/user.services'

const getNonFollowingUsers = async (req: Request, res: Response) => {
  
  try {
    const { username } = req.params;
    const nonFollowingUsers = await getNonFollowingUsersSvc(username);
    return res.status(200).json({
      status: 'success',
      body: nonFollowingUsers,
    }); 
  } catch (e) {
    handleHttp(res, "ERROR_GET_NON_FOLLOWING_USERS", e);
  }
}

const getUser = async ({ params }: Request, res: Response) => {
    try {
      const { username } = params;
      const response = await getOneUserSvc(username);
      const data = response ? response : "NOT_FOUND";
      return res.status(200).json({
        status: 'success',
        body: data,
      }); 
    } catch (e) {
      handleHttp(res, "ERROR_GET_USER", e);
    }
  };
  
  const getUsers = async (req: Request, res: Response) => {
    try {
      const response = await getAllUsersSvc();
      return res.status(200).json({
        status: 'success',
        body: response,
      }); 
    } catch (e) {
      handleHttp(res, "ERROR_GET_ITEMS", e);
    }
  };
  
  const updateUser = async ({ params, body }: Request, res: Response) => {
    try {
      const { username } = params;
      const response = await updateUserSvc(username, body);
      return res.status(200).json({
        status: 'success',
        body: response,
      }); 
    } catch (e) {
      handleHttp(res, "ERROR_UPDATE_USER", e);
    }
  };
  
  const createUser = async ({ body }: Request, res: Response) => {
    try {
      const responseItem = await createUserSvc(body);
      return res.status(201).json({
        status: 'success',
        body: responseItem,
      }); 
    } catch (e) {
      handleHttp(res, "ERROR_POST_USER", e);
    }
  };
  
  const deleteUser = async ({ params }: Request, res: Response) => {
    try {
      const { username } = params;
      const response = await deleteUserSvc(username);
      return res.status(200).json({
        status: 'success',
        body: response,
      }); 
    } catch (e) {
      handleHttp(res, "ERROR_DELETE_USER",e);
    }
  };
  

  const getUserFollowers = async ({ params }: Request, res: Response) => {
    try {
      const { username } = params;
      const response = await getFollowersOfUserSvc(username);
      return res.status(200).json({
        status: 'success',
        body: response,
      }); 
    } catch (e) {
      handleHttp(res, "ERROR_GET_FOLLOWERS", e);
    }
  }

  const getUserFollows = async ({ params }: Request, res: Response) => {
    try {
      const { username } = params;
      const response = await getFollowingOfUserSvc(username);
      return res.status(200).json({
        status: 'success',
        body: response,
      }); 
    } catch (e) {
      handleHttp(res, "ERROR_GET_FOLLOWS", e);
    }
  }

  export { getUser, getUsers, createUser, updateUser, deleteUser, getUserFollowers, getUserFollows , getNonFollowingUsers};