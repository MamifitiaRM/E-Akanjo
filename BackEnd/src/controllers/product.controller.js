import Product from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, size } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    if (
      !name ||
      !description ||
      !price ||
      imageUrl.length == 0 ||
      !subCategory ||
      !category ||
      !size
    ) {
      return res.json({
        status: false,
        message: "Veuillez spécifier les champs obligatoires avant de valider",
      });
    }
    const newProduct = await Product.create({
      name,
      description,
      price,
      image: imageUrl,
      category,
      subCategory,
      size,
      date: Date.now(),
    });
    if (size.length == 0)
      return res.json({
        status: false,
        message: "Veuillez selectionner la taille s'il vous plait",
      });
    res.json({ status: true, newProduct });
  } catch (error) {
    console.log("Il y a eu une erreur dans la controlleur addProduct " + error);
    res.json({ status: false, error: error.message });
  }
};
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ status: true, products });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans la controlleur getAllProduct " + error
    );
    res.json({ status: false, error: error.message });
  }
};
export const getSpecificProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    res.json({ status: true, product });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans la controlleur getSpecificProduct " + error
    );
    res.json({ status: false, error: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    res.json({ status: true, product });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans la controlleur deleteProduct " + error
    );
    res.json({ status: false, error: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    await Product.findByIdAndUpdate(productId, productData);
    res.json({ status: true });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans la controlleur updateProduct " + error
    );
    res.json({ status: false, error: error.message });
  }
};
