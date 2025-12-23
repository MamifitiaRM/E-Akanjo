import React, { useEffect, useState } from "react";
import clientContext from "../appContext/clientContext";
import useUserStore from "../stores/useUserStore";
import {
  ChartNoAxesCombined,
  LogOut,
  NotepadTextDashedIcon,
  PlusCircleIcon,
  ShoppingBasket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { clothesTypes, productSize } from "../utils/utility";
import AddProduct from "../components/AddProduct";
import ListProducts from "../components/ListProducts";
import OrderProduct from "../components/OrderProduct";
import useProductStore from "../stores/useProductStore";

const DasboardPage = () => {
  // Pour cahcher le navBar et le footer quand on est dans le dashboard
  const { setAdminConnected } = clientContext();
  const { logout } = useUserStore();
  const { setFocus } = clientContext();
  useEffect(() => {
    setAdminConnected(true);
  }, []);

  const handleLogout = () => {
    logout();
  };
  // Charger tous les produits
  const { getAllProduct } = useProductStore();
  useEffect(() => {
    getAllProduct();
  }, []);

  const [selectedPage, setSelectedPage] = useState("analytics");

  return (
    <div className="py-6">
      <header className="border-b-2 border-secondText flex justify-between items-center">
        <div>
          <Link
            className="lg:text-4xl title text-2xl"
            to="/"
            onClick={() => setFocus("Accueil")}
          >
            E-AKA'NJO
          </Link>
          <h3>Dashboard</h3>
        </div>
        <div
          className="relative hover:scale-105 duration-300 ease-in-out"
          onClick={handleLogout}
        >
          <button className="py-2.5 pl-11 pr-3 bg-black text-white cursor-pointer">
            Se déconnecter
          </button>
          <LogOut
            className="absolute top-2 text-white left-2 cursor-pointer"
            size={28}
          />
        </div>
      </header>

      <section className="grid" style={{ gridTemplateColumns: "300px 1fr" }}>
        <aside className="space-y-6 border-r-2 border-secondText py-6 pl-3 pr-0">
          <div
            className={`relative hover:translate-x-[-10px] duration-300 ease-in-out border-2 border-r-0 border-secondText hover:border-r-8 cursor-pointer ${
              selectedPage == "analytics" && "bg-gray-300"
            }`}
            onClick={() => setSelectedPage("analytics")}
          >
            <button className="py-2.5 pl-11 pr-3  text-primaryText cursor-pointer">
              Analyses
            </button>
            <ChartNoAxesCombined
              className="absolute top-2 text-primaryText  left-2 cursor-pointer"
              size={28}
            />
          </div>
          <div
            className={`relative hover:translate-x-[-10px] duration-300 ease-in-out border-2 border-r-0 border-secondText hover:border-r-8 cursor-pointer ${
              selectedPage == "add" && "bg-gray-300"
            }`}
            onClick={() => setSelectedPage("add")}
          >
            <button className="py-2.5 pl-11 pr-3  text-primaryText cursor-pointer">
              Ajouter un nouveau produit
            </button>
            <PlusCircleIcon
              className="absolute top-2 text-primaryText  left-2 cursor-pointer"
              size={28}
            />
          </div>

          <div
            className={`relative hover:translate-x-[-10px] duration-300 ease-in-out border-2 border-r-0 border-secondText hover:border-r-8 cursor-pointer ${
              selectedPage == "products" && "bg-gray-300"
            }`}
            onClick={() => setSelectedPage("products")}
          >
            <button className="py-2.5 pl-11 pr-3  text-primaryText cursor-pointer">
              Listes de tous les produits
            </button>
            <NotepadTextDashedIcon
              className="absolute top-2 text-primaryText  left-2 cursor-pointer"
              size={28}
            />
          </div>

          <div
            className={`relative hover:translate-x-[-10px] duration-300 ease-in-out border-2 border-r-0 border-secondText hover:border-r-8 cursor-pointer ${
              selectedPage == "order" && "bg-gray-300"
            }`}
            onClick={() => setSelectedPage("order")}
          >
            <button className="py-2.5 pl-11 pr-3  text-primaryText cursor-pointer">
              Commandes
            </button>
            <ShoppingBasket
              className="absolute top-2 text-primaryText  left-2 cursor-pointer"
              size={28}
            />
          </div>
        </aside>
        {selectedPage == "add" && <AddProduct />}
        {selectedPage == "products" && <ListProducts />}
        {selectedPage == "order" && <OrderProduct />}
      </section>
    </div>
  );
};

export default DasboardPage;
