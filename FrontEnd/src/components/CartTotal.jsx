import React from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../stores/useCartStore";

const CartTotal = () => {
  // Composant utilisé dans la page carte

  const navigate = useNavigate();
  const { total } = useCartStore();
  return (
    <div className="ml-70 space-y-3">
      <h2>Totals ~~~~~~</h2>
      <hr />
      <div className="flex gap-20">
        <p className="font-bold">Total</p>
        <div className="font-semibold">Ariary {total}</div>
      </div>
      <hr />
      <button
        className="text-white bg-black py-2.5 px-3 cursor-pointer hover:scale-105 duration-300 ease-in-out my-2 "
        onClick={() => navigate("/place-order")}
      >
        Procéder au payement
      </button>
    </div>
  );
};

export default CartTotal;
