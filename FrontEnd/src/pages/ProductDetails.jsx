import React, { useEffect, useState } from "react";
import { products } from "../../assets/frontend_assets/assets";
import { Link, useNavigate, useParams } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import useUserStore from "../stores/useUserStore";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import useProductStore from "../stores/useProductStore";
import clientContext from "../appContext/clientContext";
import useCartStore from "../stores/useCartStore";

const ProductDetails = () => {
  const { id } = useParams();
  // const specificProduct = products.filter((product) => product._id === id);
  const [imageId, setImageId] = useState(0);
  const { user } = useUserStore();
  const { getSpecificProduct, oneProduct } = useProductStore();
  const [size, setSize] = useState([]);
  const { setFocus } = clientContext();

  const { addProductCart } = useCartStore();

  useEffect(() => {
    getSpecificProduct(id);
    setFocus("Collection");
  }, [id]);

  const handleAddTocart = (product) => {
    if (!user) return toast.error("Veuillez d'abord vous connecté");
    addProductCart(product);
  };

  const navigate = useNavigate();
  return (
    <div>
      <div onClick={() => navigate(-1)} className="w-10">
        <ArrowLeft
          size={35}
          className="hover:scale-115 ease-in-out duration-300 hover:cursor-pointer"
        />
      </div>
      <div
        className="mt-6 mb-15 grid "
        style={{ gridTemplateColumns: "700px 1fr" }}
      >
        <div className="flex gap-x-4 h-[570px]">
          <div className="h-35 space-y-1">
            {oneProduct?.image.map((img) => (
              <img
                key={img}
                src={img}
                className="h-full w-[160px] cursor-pointer"
                onClick={() => setImageId(oneProduct?.image.indexOf(img))}
              />
            ))}
          </div>
          <div>
            <img src={oneProduct?.image[imageId]} className="h-full" />
          </div>
        </div>

        <div className="px-12 pt-12 space-y-6">
          <h4>{oneProduct?.name}</h4>
          <div className="font-semibold text-2xl">
            Ariary {oneProduct?.price}
          </div>
          <p>{oneProduct?.description}</p>
          <div>
            <h5 className="font-mono pb-5">Selectionner la taille</h5>
            <div className="flex gap-4">
              {oneProduct?.size.map((taille) => (
                <div
                  key={taille}
                  className={`bg-gray-200 px-4.5 py-2.5 font-semibold cursor-pointer ${
                    size.includes(taille)
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() =>
                    setSize(
                      size.includes(taille)
                        ? size.filter((size) => size !== taille)
                        : [...size, taille]
                    )
                  }
                >
                  {taille}
                </div>
              ))}
            </div>
          </div>
          <button
            className="bg-black text-white py-2.5 px-5 hover:scale-105 duration-300 ease-in-ou cursor-pointer"
            onClick={() => handleAddTocart(oneProduct)}
          >
            Ajouter à la carte
          </button>
          <hr className="text-gray-300" />
          <div>
            <p>100% Originale</p>
            <p>Remboursable et garantie offerte</p>
          </div>
        </div>
      </div>
      <RelatedProducts />
    </div>
  );
};

export default ProductDetails;
