import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { routeLinks } from "../utils/utility";
import { assets } from "../../assets/frontend_assets/assets.js";
import { LogOut, MenuIcon } from "lucide-react";
import clientContext from "../appContext/clientContext.js";
import useUserStore from "../stores/useUserStore.js";
import useProductStore from "../stores/useProductStore.js";
import useCartStore from "../stores/useCartStore.js";
import Modal from "./modal.jsx";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { product, setProductForCollections } = useProductStore();
  const { focus, setFocus } = clientContext();

  const { search_icon, profile_icon, cart_icon, cross_icon } = assets;

  const [displaySearchInput, setDisplaySearchInput] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Pour afficher le petit trait en dessous des liens de navigations
  useEffect(() => {
    if (location.pathname.includes("collections")) {
      setVisible(true);
      setProductForCollections(product);
    } else {
      setVisible(false);
    }
  }, [location]);

  // Pour la recherche de produits
  const [inputSearch, setInputSearch] = useState("");
  const handleSearch = () => {
    setDisplaySearchInput(true);
    if (!location.pathname.includes("collections")) {
      navigate("/collections");
      setFocus("Collection");
    }
  };
  useEffect(() => {
    if (inputSearch == "") {
      setProductForCollections(product);
    } else {
      setProductForCollections(
        product.filter((item) =>
          item.name.toLowerCase().includes(inputSearch.toLowerCase())
        )
      );
    }
  }, [inputSearch]);
  // Lors du click sur la bouton X de la recherche
  const hideSearch = () => {
    setDisplaySearchInput(false);
    setInputSearch("");
  };

  // For logout
  // const [validate, setValidate] = useState(false);
  // const handleLogout = () => {
  //   <Modal />;
  //   if (validate) {
  //     logout();
  //     return;
  //   }
  // };
  const handleLogout = () => {
    logout();
  };

  const { cart } = useCartStore();

  // les 3 derniers icones dans le navbar
  const OtherNavLink = () => {
    return (
      <div className={`md:flex lg:gap-6 md:gap-3 hidden items-center`}>
        <div>
          <img
            src={search_icon}
            className="lg:w-6 md:w-4 cursor-pointer w-[26px]"
            onClick={handleSearch}
          />
        </div>
        {user && (
          <Link className="relative cursor-pointer" to="/cart">
            <div>
              <img src={cart_icon} className="lg:w-6 md:w-4 w-[26px]" />
            </div>
            <div className="absolute top-3 left-3 rounded-full bg-black text-white w-5 h-5 text-center text-sm">
              {cart.length}
            </div>
          </Link>
        )}
        {user ? (
          <>
            {user.isAdmin && (
              <Link
                to="/dashboard"
                className="py-2 px-3 bg-black text-white hover:scale-105 duration-300 ease-in-out"
              >
                Dashboard
              </Link>
            )}
            <LogOut className="cursor-pointer" onClick={handleLogout} />
          </>
        ) : (
          <Link to="/login">
            <img src={profile_icon} className="lg:w-6 md:w-4 w-[26px]" />
          </Link>
        )}
      </div>
    );
  };

  return (
    <header className="py-6 z-30">
      <nav className="flex justify-between items-center relative">
        <div className="flex items-center justify-between">
          <Link
            className="lg:text-4xl title text-2xl"
            to="/"
            onClick={() => setFocus("Accueil")}
          >
            E-AKA'NJO
          </Link>
          <MenuIcon
            size={32}
            className="inline md:hidden ml-43"
            onClick={() => setShowMenu((prev) => !prev)}
          />
        </div>
        <ul
          className={`md:flex lg:gap-4 md:gap-3 gap-1 items-center ${
            showMenu
              ? "block absolute backdrop-blur-xl w-full mt-48 py-3 bg-gray-200 z-50"
              : "hidden"
          }`}
        >
          {routeLinks.map((link) => (
            <div
              key={link.text}
              className={`flex flex-col items-center ${
                showMenu ? "space-y-4" : "space-y-2"
              }`}
            >
              <Link
                to={link.href}
                className={`link ${focus === link.text && "text-primaryText"}`}
                onClick={() => setFocus(link.text)}
              >
                {link.text}
              </Link>
              {focus === link.text && (
                <div
                  className={`w-10 h-[4px] bg-primaryText rounded-2xl ${
                    showMenu ? "mt-[-10px]" : "mt-[-7px]"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </ul>
        <OtherNavLink />
      </nav>

      {/* Bar de recherche */}
      {displaySearchInput && visible ? (
        <div className="bg-gray-200 grid mt-5 p-5">
          <div className="mx-auto flex gap-4 items-center">
            <input
              placeholder="rechercher par nom de produit ..."
              className="px-8 border border-secondText rounded-4xl py-2.5 w-150"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <div>
              <img
                src={cross_icon}
                className="cursor-pointer"
                onClick={hideSearch}
              />
            </div>
          </div>
        </div>
      ) : null}
      <hr className="text-gray-300 lg:mt-6 mt-4" />
    </header>
  );
};

export default Navbar;
