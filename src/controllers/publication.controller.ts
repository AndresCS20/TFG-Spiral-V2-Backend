import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { deletePublicationSvc } from "@services/publication.services"

const getFollowingPublications = async ({ params }: Request, res: Response) => {}
const getAllPublications = async ({ params }: Request, res: Response) => {}
const getOnePublication = async ({ params }: Request, res: Response) => {}
const createPublication = async ({ params }: Request, res: Response) => {}
const updatePublication = async ({ params }: Request, res: Response) => {}
const deletePublication = async ({ params }: Request, res: Response) => {

    try {
        
        const { id } = params;

        const response = await deletePublicationSvc(id);

        res.status(200).send(response)



    } catch (error) {
        handleHttp(res, "ERROR_DELETE_PUBLICATION", error);
    }


}



export{  
    getFollowingPublications,
    getAllPublications,
    getOnePublication,
    createPublication,
    updatePublication,
    deletePublication
}