import React, { useEffect, useState } from "react";
import { products } from "../../assets/frontend_assets/assets";
import { Trash2Icon } from "lucide-react";
import CartTotal from "../components/CartTotal";
import clientContext from "../appContext/clientContext";
import useCartStore from "../stores/useCartStore";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { setFocus } = clientContext();
  const { cart, removeProductCart, updateProductCart } = useCartStore();
  useEffect(() => {
    setFocus("");
  }, []);

  const handleUpdateQuantity = (e, productId, product) => {
    if (e.target.value === "") {
      return;
    }
    updateProductCart(productId, e.target.value);
  };
  const handleRemoveCard = (productId) => {
    if (window.confirm("Vous voulez vraiment supprimer ?")) {
      removeProductCart(productId);
    }
  };

  if (cart.length == 0) {
    return (
      <div className="h-[38vh] space-y-4 flex items-center justify-center flex-col">
        <h4>Vous n'avez aucun produit dans votre carte</h4>
        <Link
          to="/Collections"
          className="text-white bg-black py-2.5 px-3 cursor-pointer hover:scale-105 duration-300 ease-in-out"
        >
          Commencer à acheter
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 h-full">
      <div className="grid grid-cols-2">
        <div className="space-y-6">
          <h2>
            <span className="text-secondText">Vos</span> Cartes ~~~~~~
          </h2>
          {cart.map((product) => (
            <div
              key={product._id}
              className="border-gray-300 border-y-2 flex justify-between p-4 items-center"
            >
              <div className="flex gap-8 items-center justify-center">
                <img src={product.image[0]} className="h-30 w-30" />
                <div className="space-y-4">
                  <p>{product.name}</p>
                  <div className="flex gap-4 items-center">
                    Ariary {product.price}
                    <div className="bg-gray-200 border-2 border-gray-400 px-3 py-2 text-sm">
                      M
                    </div>
                  </div>
                </div>
              </div>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => handleUpdateQuantity(e, product._id, product)}
                className="pl-2 py-2 border-gray-400 border-2 w-20"
              />
              <Trash2Icon
                className="text-primaryText hover:scale-105 duration-300 ease-in-out cursor-pointer"
                onClick={() => handleRemoveCard(product._id)}
              />
            </div>
          ))}
        </div>

        <CartTotal />
      </div>
    </div>
  );
};

export default CartPage;
