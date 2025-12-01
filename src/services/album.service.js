import fetch from 'node-fetch';
import { jsonToCsv, saveCsvToFile } from '../utils/csv.utils.js';
import fs from 'fs/promises';
import path from 'path';

class AlbumService {
    async processAlbumsToCsv() {
        const API_URL = 'https://jsonplaceholder.typicode.com/albums';
        const FILENAME = 'localdata/albums_15.csv';

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Error al consumir la API: ${response.statusText}`);
            }
            const albums = await response.json();

            const first15Albums = albums.slice(0, 15);

            const csvContent = jsonToCsv(first15Albums);

            const filePath = await saveCsvToFile(csvContent, FILENAME);
            
            // Leer el archivo guardado para devolverlo en la respuesta
            const savedCsvContent = await fs.readFile(filePath, { encoding: 'utf8' });

            return { csvContent: savedCsvContent, filePath };
        } catch (error) {
            throw new Error(`Error en el servicio de álbumes: ${error.message}`);
        }
    }
}

export const albumService = new AlbumService();
