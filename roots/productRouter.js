import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);

productRouter.get("/:search", (req, res) =>{
    res.json({
        message: "Searching"
    })
}); // no need this part. Just for learn searching

productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId", updateProduct);
productRouter.get("/:productId",getProductById);


export default productRouter;

