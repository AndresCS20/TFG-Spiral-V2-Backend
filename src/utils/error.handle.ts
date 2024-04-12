import { Response } from "express";

const handleHttp = (res: Response, error: String, errorRaw?: any) => {
    
    console.log(errorRaw);
    
    res.status(500);
    res.send({error: error, detalle: errorRaw.message})
}

export { handleHttp };