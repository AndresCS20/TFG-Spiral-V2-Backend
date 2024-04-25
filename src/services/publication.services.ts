import PublicationModel from "@models/publication.model";
import { Publication } from "@interfaces/publication.interface";

import mongoose from "mongoose";

const createPublicationSvc = async (publication: Publication) => {
    const responseInsert = await PublicationModel.create(publication);
    return responseInsert;
}

const updatePublicationSvc = async (id: string, publication: Publication) => {

    const responseItem = await PublicationModel.updateOne(
        { _id: id },
        publication,
    );

    return responseItem;
}

const deletePublicationSvc = async (id: string) => {   
    const responseItem = await PublicationModel.deleteOne(
        { _id: id }
    );
    return responseItem;
}

export{createPublicationSvc, updatePublicationSvc, deletePublicationSvc}