import { albumService } from "../services/album.service.js";
import path from 'path';

const albumController = {
    getAlbumsCsv: async (req, res) => {
        try {
            const { csvContent, filePath } = await albumService.processAlbumsToCsv();

            // Opción 1: Devolver el CSV directamente en la respuesta
            res.header('Content-Type', 'text/csv');
            res.attachment(path.basename(filePath)); // Establece el nombre del archivo para la descarga
            res.status(200).send(csvContent);

            // Opción 2: Devolver JSON con enlace a descarga local (si se prefiere, pero la consigna sugiere devolver el CSV)
            // res.status(200).json({ statusCode: 200, message: "CSV de álbumes generado y guardado", downloadLink: `/downloads/${path.basename(filePath)}` });

        } catch (error) {
            res.status(500).json({ statusCode: 500, error: error.message });
        }
    },
};

export { albumController };
