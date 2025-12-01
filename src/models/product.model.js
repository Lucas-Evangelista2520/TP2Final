import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    producto: {
        type: String,
        required: true,
    },
    stockAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    fechaIngreso: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false });

const Product = mongoose.model("Product", productSchema);

export { Product };
