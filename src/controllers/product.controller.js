import { productService } from "../services/product.service.js";

const productController = {
    createProduct: async (req, res) => {
        try {
            const { producto, stockAmount } = req.body; // No extraemos fechaIngreso
            if (!producto || stockAmount === undefined || stockAmount < 0) {
                return res.status(400).json({ statusCode: 400, error: "El nombre del producto y el stockAmount (>= 0) son requeridos." });
            }
            const newProduct = await productService.createProduct({ producto, stockAmount }); // Pasamos solo los campos requeridos
            res.status(201).json({ statusCode: 201, message: "Producto creado exitosamente", product: newProduct });
        } catch (error) {
            res.status(500).json({ statusCode: 500, error: error.message });
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json({ statusCode: 200, data: products }); // Para GET all, se incluye 'data'
        } catch (error) {
            res.status(500).json({ statusCode: 500, error: error.message });
        }
    },

    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id);
            if (!product) {
                return res.status(404).json({ statusCode: 404, error: "Producto no encontrado." });
            }
            res.status(200).json({ statusCode: 200, data: product }); // Para GET by ID, se incluye 'data'
        } catch (error) {
            res.status(500).json({ statusCode: 500, error: error.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const { producto, stockAmount, fechaIngreso } = req.body; // Extraemos todos los campos editables
            const updateData = {};

            if (producto !== undefined) {
                if (typeof producto !== 'string' || producto.trim() === '') {
                    return res.status(400).json({ statusCode: 400, error: "El nombre del producto no puede ser vacío." });
                }
                updateData.producto = producto;
            }

            if (stockAmount !== undefined) {
                if (!Number.isInteger(stockAmount) || stockAmount < 0) {
                    return res.status(400).json({ statusCode: 400, error: "El stockAmount debe ser un número entero mayor o igual a 0." });
                }
                updateData.stockAmount = stockAmount;
            }

            if (fechaIngreso !== undefined) {
                // Opcional: Podrías añadir validación de formato de fecha aquí si es necesario
                updateData.fechaIngreso = fechaIngreso;
            }

            // Si no hay datos para actualizar, no hacemos nada
            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({ statusCode: 400, error: "No se proporcionaron campos válidos para actualizar." });
            }

            // Primero, verifica si el producto existe
            const existingProduct = await productService.getProductById(id);
            if (!existingProduct) {
                return res.status(404).json({ statusCode: 404, error: "Producto no encontrado para actualizar." });
            }

            const updatedProduct = await productService.updateProduct(id, updateData);

            res.status(200).json({ statusCode: 200, message: "Producto actualizado exitosamente", product: updatedProduct });
        } catch (error) {
            res.status(500).json({ statusCode: 500, error: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;

            //Verificar si el producto existe
            const existingProduct = await productService.getProductById(id);
            if (!existingProduct) {
                return res.status(404).json({ statusCode: 404, error: "Producto no encontrado para eliminar." });
            }

            // Si existe, proceder con la eliminación
            await productService.deleteProduct(id);
            res.status(200).json({ statusCode: 200, message: "Producto eliminado con éxito" });
        } catch (error) {
            res.status(500).json({ statusCode: 500, error: error.message });
        }
    },
};

export { productController };
