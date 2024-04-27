import { deleteUser, getUser, getUserFollowers, getUserFollows, getUsers, updateUser } from "@controllers/user.controller"
import { Router } from "express";

const router = Router();

router
    .get('/', getUsers)
    .get('/:username', getUser)
    .get('/:username/followers', getUserFollowers)
    .get('/:username/following', getUserFollows)

    // .post('/', createUser)
    .patch('/:username', updateUser)
    .delete("/:username", deleteUser)


export { router };