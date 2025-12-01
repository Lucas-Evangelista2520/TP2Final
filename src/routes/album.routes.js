import { Router } from "express";
import { albumController } from "../controllers/album.controller.js";

const albumRouter = Router();

albumRouter.get("/v1/albums/csv", albumController.getAlbumsCsv);

export { albumRouter };
