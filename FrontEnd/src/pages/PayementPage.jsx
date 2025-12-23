import React from "react";
import CartTotal from "../components/CartTotal";

const PayementPage = () => {
  return (
    <div className="mt-12 grid grid-cols-2 gap-20">
      <div>
        <h2 className="mb-8">
          <span className="text-secondText">Information</span> de livraison
          ~~~~~~
        </h2>
        <form className="grid space-y-3">
          <div className="flex gap-4">
            <input type="text" className="pl-3 py-2 w-full" placeholder="Nom" />
            <input
              type="text"
              className="pl-3 py-2 w-full"
              placeholder="Prenom"
            />
          </div>
          <div>
            <input
              type="text"
              className="pl-3 py-2 w-full"
              placeholder="Adresse email"
            />
          </div>
          <div>
            <input
              type="text"
              className="pl-3 py-2 w-full"
              placeholder="Rue *"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              className="pl-3 py-2 w-full"
              placeholder="Ville"
            />
            <input type="text" className="pl-3 py-2 w-full" placeholder="Lot" />
          </div>
          <div>
            <input
              type="text"
              className="pl-3 py-2 w-full"
              placeholder="Adresse email"
            />
          </div>
          <div>
            <input
              type="text"
              className="pl-3 py-2 w-full"
              placeholder="Numero de téléphone"
            />
          </div>
        </form>
      </div>
      <div className="flex flex-col ">
        <div>
          <div className="ml-50 space-y-3">
            <h2>Totals ~~~~~~</h2>
            <hr />
            <div className="flex gap-20">
              <p className="font-bold">Total</p>
              <div className="font-semibold">Ariary 4000</div>
            </div>
            <hr />
          </div>
        </div>
        <div className="mt-10 ml-50">
          <h3 className="pb-2">
            <span className="text-secondText">Méthode</span> de payement ~~~~~~
          </h3>
          <form className="flex gap-2">
            <div className="border-2 border-gray-400 uppercase px-2 py-1.5 cursor-pointer">
              <input
                type="radio"
                className="mr-2 accent-green-600 cursor-pointer"
                id="paypal"
              />
              <label htmlFor="paypal" className="cursor-pointer">
                PayPal
              </label>
            </div>
            <div className="border-2 border-gray-400 uppercase px-2 py-1.5 cursor-pointer">
              <input
                type="radio"
                className="mr-2 accent-green-600 cursor-pointer"
                id="others"
              />
              <label htmlFor="others" className="cursor-pointer">
                Autres
              </label>
            </div>
            <div className="border-2 border-gray-400 uppercase px-2 py-1.5 cursor-pointer">
              <input
                type="radio"
                className="mr-2 accent-green-600 cursor-pointer"
                id="delivery"
                checked="true"
              />
              <label htmlFor="delivery" className="cursor-pointer">
                Payer au livraison
              </label>
            </div>
          </form>
          <div className="flex justify-end mt-5">
            <button
              className="text-white bg-black py-2.5 px-3 cursor-pointer hover:scale-105 duration-300 ease-in-out my-2"
              onClick={() => navigate("/place-order")}
            >
              Placer la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayementPage;
