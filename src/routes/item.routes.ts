import { Request, Response, Router } from "express";
import { postItem } from "../controllers/item.controller";

const router = Router();

router
    .get('/', (_req: Request, res: Response) => res.send({item: 'PONG'}))
    .post('/', postItem);


export { router };