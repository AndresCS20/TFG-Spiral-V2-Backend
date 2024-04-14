import "dotenv/config";
import express from 'express';
import cors from 'cors';
import { router } from './routes/index.routes';
import dbConnect from "./config/mongo";
import { Error } from "mongoose";

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: "http://localhost:4200",
    credentials: true
}

/**
 * Habilita el middleware CORS con las opciones especificadas.
 * Analiza los cuerpos JSON como middleware.
 * Analiza los cuerpos codificados en URL como middleware.
 */
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    session({
      secret: process.env.JWT_SECRET || '35SADASDASDQEQWEQWE',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }, // Ajusta esta configuración según tu entorno
    })
  );

/**
 * Conecta a la base de datos de MongoDB.
 * @returns {Promise<void>} Una promesa que se resuelve cuando la conexión es exitosa.
 * @throws {Error} If there is an error connecting to the database.
 */
dbConnect()
    .then(()=> console.log("Conexión exitosa a la base de datos"))
    .catch((error : Error) => {
        console.error(`Error de conexión a la base de datos: ${error}`);
    }
)

/**
 * Establece la ruta base para todas las rutas.
 */
app.use("/api",router)

/**
 * Inicia el servidor en el puerto especificado.
 */
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})


function session(arg0: { secret: string; resave: boolean; saveUninitialized: boolean; cookie: { secure: boolean; }; }): any {
    throw new Error("Function not implemented.");
}
  