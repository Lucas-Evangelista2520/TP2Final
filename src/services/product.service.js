import { Product } from "../models/product.model.js";

class ProductService {
    constructor() {
        // this.supabase = SupaBaseConnection.connect(); // No se usa con Mongoose
        // this.tableName = "products"; // No se usa con Mongoose
    }

    async createProduct(productData) {
        const newProduct = await Product.create(productData);
        return newProduct;
    }

    async getAllProducts() {
        const products = await Product.find();
        return products;
    }

    async getProductById(id) {
        const product = await Product.findById(id);
        return product;
    }

    async updateProduct(id, updateData) {
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        return updatedProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await Product.findByIdAndDelete(id);
        return !!deletedProduct; // Devuelve true si se eliminó, false si no se encontró
    }
}

export const productService = new ProductService();
