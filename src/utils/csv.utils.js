import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonToCsv = (items) => {
    if (!items || items.length === 0) {
        return "";
    }

    const columns = ["userId", "id", "title"];
    const csvRows = [];

    // Encabezados
    csvRows.push(columns.join(","));

    // Filas de datos
    for (const item of items) {
        const values = columns.map(column => {
            const escaped = ('' + item[column]).replace( /"/g, '\"' );
            return `\"${escaped}\"`;
        });
        csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
};

const saveCsvToFile = async (csvContent, filename) => {
    const localdataDir = path.join(__dirname, '..', 'localdata');
    await fs.mkdir(localdataDir, { recursive: true }); // Crear la carpeta si no existe
    const filePath = path.join(localdataDir, path.basename(filename)); // Asegurarse de que filename sea solo el nombre del archivo
    await fs.writeFile(filePath, csvContent);
    return filePath;
};

export { jsonToCsv, saveCsvToFile };
