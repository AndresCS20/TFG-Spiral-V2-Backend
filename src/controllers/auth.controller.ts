import {Request, Response} from "express"
import { handleHttp } from "@utils/error.handle"


const signup = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, `ERROR_SIGNUP`, error)
    }
}

const loggin = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, `ERROR_SIGNUP`, error)
    }
}


const signout = (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        handleHttp(res, `ERROR_SIGNUP`, error)
    }
}