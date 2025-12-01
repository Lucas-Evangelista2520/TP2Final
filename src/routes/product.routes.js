import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const productRouter = Router();

// Las rutas que no requieren auth
productRouter.post("/v1/productos", productController.createProduct);
productRouter.get("/v1/productos", productController.getAllProducts);
productRouter.get("/v1/productos/:id", productController.getProductById);

// Las rutas que requieren auth
productRouter.put("/v1/productos/:id", authMiddleware, productController.updateProduct);
productRouter.delete("/v1/productos/:id", authMiddleware, productController.deleteProduct);

export { productRouter };
