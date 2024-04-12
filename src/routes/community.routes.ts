import { Request, Response, Router } from "express";

const router = Router();

router.get('/', (_req: Request, res: Response) => {
    console.log('someone pinged me');
    res.send('PONG');
});


export { router };