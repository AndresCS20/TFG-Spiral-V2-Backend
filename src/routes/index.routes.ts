/**
 * Elimina la extensión de un nombre de archivo dado.
 * @param fileName - El nombre del archivo.
 * @returns El nombre del archivo sin la extensión.
 */
import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

/**
 * Elimina la extensión de un nombre de archivo dado.
 * @param fileName - El nombre del archivo.
 * @returns El nombre del archivo sin la extensión.
 */
const cleanFileName = (fileName: string) => {
    // Elimina la extensión
    const file = fileName.split(".").shift();
    return file;
};

/**
 * Lee el directorio e importa módulos de rutas de forma dinámica.
 */
readdirSync(PATH_ROUTER).filter((fileName) => {
    const cleanName = cleanFileName(fileName);
    if (cleanName !== "index") {
        import(`./${cleanName}.routes`).then((moduleRouter) => {
            console.log(`Cargando ruta: ${cleanName}.routes`);
            router.use(`/${cleanName}`, moduleRouter.router);
        });
    }
});


export { router };