import express from "express";
import { authRouter } from "./routes/auth.routes.js";
import { productRouter } from "./routes/product.routes.js";
import { albumRouter } from "./routes/album.routes.js";
import { mongooseConnectionInstance } from "./database/mongo.cnx.js";

const app = express();

const PORT = process.env.PORT || 3004;
const HOST = process.env.HOST || "127.0.0.1";

// Middleware para parsear JSON
app.use(express.json());

// Rutas de autenticación
app.use("/api/auth", authRouter);
// Rutas de productos
app.use("/api", productRouter);
// Rutas de álbumes CSV
app.use("/api", albumRouter);

// Conectar a la base de datos de MongoDB
mongooseConnectionInstance.connect().then(() => {
  console.log("MongoDB conectado.");
}).catch(err => {
  console.error("Error al conectar a MongoDB:", err);
  process.exit(1); // Salir si la conexión falla
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});

export default app;