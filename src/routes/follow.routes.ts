import { followUser, unFollowUser } from "@controllers/followers.controller";
import { Router } from "express";

const router = Router();

router
    .post('/', followUser)
    .delete("/", unFollowUser)


export { router };