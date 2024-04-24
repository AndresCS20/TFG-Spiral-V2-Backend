import { Router } from "express";
import { deleteItem, getItem, getItems, postItem, updateItem } from "../controllers/item.controller";

const router = Router();

router
    .get('/', getItems)
    .get('/:id', getItem)
    .post('/', postItem)
    .put('/:id', updateItem)
    .delete("/:id", deleteItem)


export { router };