import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"

const getItem = (_req: Request, res: Response) =>{
    try {
        
    } catch (error) {
        handleHttp(res, `ERROR_GET_ITEM`, error)
    }
}

const getItems = (_req: Request, res: Response) =>{
      try {
        
    } catch (error) {
        handleHttp(res, `ERROR_GET_ITEMS ${error}`)
    }  
}

const updateItem = (_req: Request, res: Response) =>{
      try {
        
    } catch (error) {
        handleHttp(res, `ERROR_UPDATE_ITEM`, error)
    }  
}
const postItem = async(req: Request, res: Response) =>{
      try {

        const responseItem = await insertItem(req.body);
        res.send(responseItem)
        
    } catch (error) {
        handleHttp(res, `ERROR_POST_ITEM`, error)
    }  
}

const deleteItem = (_req: Request, res: Response) =>{
      try {
        
    } catch (error) {
        handleHttp(res, `ERROR_DELETE_ITEM`, error)
    }  
}

export { getItem, getItems, updateItem, postItem, deleteItem };

function insertItem(body: any) {
    throw new Error("Function not implemented.")
}
