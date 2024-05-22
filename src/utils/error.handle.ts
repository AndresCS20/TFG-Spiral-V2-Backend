import { Response } from "express";

const handleHttp = (res: Response, error: string, errorRaw: any, statusCode: number = 500) => {
    console.error(errorRaw); // Registrar el error completo en la consola para depuración

    return res.status(statusCode).json({
        status: 'error',
        error: { error: error, detalle: errorRaw.message },
      });  
    res.status(statusCode).json({ error: error, detalle: errorRaw.message });
    // Enviar una respuesta JSON con el mensaje de error y detalles al cliente
}

export { handleHttp };
