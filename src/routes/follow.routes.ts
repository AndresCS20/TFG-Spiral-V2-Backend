import { followUser, isFollowing, unFollowUser } from "@controllers/followers.controller";
import { Router } from "express";

const router = Router();

router
    .post('/isfollowing', isFollowing)
    .post('/', followUser)
    .delete("/", unFollowUser)


export { router };