import { createUser, deleteUser, getUser, getUsers, updateUser } from "@controllers/user.controller"
import { Request, Response, Router } from "express";

const router = Router();

router
    .get('/', getUsers)
    .get('/:username', getUser)
    // .post('/', createUser)
    .patch('/:username', updateUser)
    .delete("/:username", deleteUser)


export { router };