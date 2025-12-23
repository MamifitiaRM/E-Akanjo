import Product from "../models/product.model.js";

export const getAllProductCart = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cart } });
    const user = req.user;

    // Ajouter les quantité à chaque produits
    const cartItems = products.map((product) => {
      const item = user.cart.find((cartItem) => cartItem.id === product.id);
      return { ...product.toJSON(), quantity: item.quantity };
    });

    res.json({ status: true, cart: cartItems });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans le controller getAllProductCart " + error
    );
    res.json({ status: false, error: error.message });
  }
};
export const addProductCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push(productId);
    }
    await user.save();
    res.json({ status: true, cart: user.cart });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans le controller addProductCart " + error
    );
    res.json({ status: false, error: error.message });
  }
};
export const removeProductCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cart = [];
    } else {
      user.cart = user.cart.filter((item) => productId !== item.id);
    }
    await user.save();
    res.json({ status: true, cart: user.cart });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans le controller removeProductCart " + error
    );
    res.json({ status: false, error: error.message });
  }
};
export const updateProductCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existingItem = user.cart.find((item) => item.id === productId);
    if (existingItem) {
      if (quantity === 0) {
        user.cart = user.cart.filter((item) => item.id !== productId);
        await user.save();
        return res.json({ status: true, cart: user.cart });
      }
      existingItem.quantity = quantity;
      await user.save();
      return res.json({ status: true, cart: user.cart });
    } else {
      res.status(404).json({ message: "Product not found" });
      return res.json({ status: false });
    }
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans le controller updateProductCart " + error
    );
    res.json({ status: false, error: error.message });
  }
};
