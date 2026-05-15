import e from "express";
import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res){

    if(!isAdmin(req)){
        res.status(403).json({
            message: "You are not authorized to create a product"
        })
        return;
    }

    try{
         const productData = req.body;

    const product = new Product(productData);

    await product.save()

    res.json({
        message: "Product created successfully",
        product: product,
    })

    }

    catch(err){
        console.error(err);
        res.status(500).json({
            message: "Error creating product"
        })
    }

}

export async function getProducts(req, res){
    try{
        const products = await Product.find();
        res.json(products);
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message: "Error fetching products"
        })
    }
}

export async function deleteProduct(req, res){

    if(!isAdmin(req)){
        res.status(403).json({
            message: "You are not authorized to delete a product"
        })
        return;
    }
    
    try{
        const productId = req.params.productId;

           
        await Product.deleteOne({
            productId: productId
        });

        res.json({
            message: "Product deleted successfully"
        })

    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "Error deleting product"
        })
    }
}


export async function updateProduct(req, res){

    if(!isAdmin(req)){
        res.status(403).json({
            message: "You are not authorized to update a product"
        })
        return;
    }

    try{
        const productId = req.params.productId;

        const updateData = req.body;

        await Product.updateOne(
            {productId: productId}, 
            updateData
        );

        res.json({
            message: "Product updated successfully"
        })


    } catch(err){
        console.error(err);
        res.status(500).json({
            message: "Error updating product"
        })
    }
}


export async function getProductById(req, res){

    try{
        const productId=req.params.productId;

        const product = await Product.findOne(
            {
                productId: productId
            }
        );

        if(product == null){
            res.status(404).json({
                message: "Product not found"
            })
        }

        else{
            res.json(product);
        }
    }


    catch(err){
        console.error(err);
        res.status(500).json({
            message: "Fail to retrieve product by id"
        });
    }
    
}