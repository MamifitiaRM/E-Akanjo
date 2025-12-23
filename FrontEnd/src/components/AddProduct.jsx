import React, { useState } from "react";
import { clothesTypes, productSize } from "../utils/utility";
import useProductStore from "../stores/useProductStore";
import { Loader2 } from "lucide-react";

const AddProduct = () => {
  const { loading, addProduct } = useProductStore();
  const [formData, setFormData] = useState({
    image: [],
    name: "",
    description: "",
    category: "Hommes",
    subCategory: "Haut",
    price: "",
    size: [],
  });

  // const handleImages = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       setFormData({
  //         ...formData,
  //         image: [...formData.image, reader.result],
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImages = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: [...formData.image, file],
    });
  };

  // POUR la selection des tailles M, S, ...
  const handleSelectSize = (actualSize, i) => {
    if (productSize[i] == actualSize) {
      if (formData.size.includes(actualSize)) {
        setFormData({
          ...formData,
          size: formData.size.filter((size) => size !== actualSize),
        });
      } else {
        setFormData({
          ...formData,
          size: [...formData.size, actualSize],
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(formData);
    // setFormData({
    //   image: [],
    //   name: "",
    //   description: "",
    //   category: "Hommes",
    //   subCategory: "Haut",
    //   price: "",
    //   size: [],
    // });
  };

  return (
    <aside className="py-6 px-8">
      <h5 className="font-light text-xl">Uploader images</h5>
      <form className="space-y-3 mt-3" onSubmit={(e) => handleSubmit(e)}>
        <div className="grid grid-cols-4 gap-4">
          <input
            type="file"
            className="border-2 border-secondText bg-gray-400 px-5 py-2 cursor-pointer"
            accept="image/*"
            onChange={(e) => handleImages(e)}
          />
          <input
            type="file"
            className="border-2 border-secondText bg-gray-400 px-5 py-2 cursor-pointer"
            accept="image/*"
            onChange={(e) => handleImages(e)}
          />
          <input
            type="file"
            className="border-2 border-secondText bg-gray-400 px-5 py-2 cursor-pointer"
            accept="image/*"
            onChange={(e) => handleImages(e)}
          />
          <input
            type="file"
            className="border-2 border-secondText bg-gray-400 px-5 py-2 cursor-pointer"
            accept="image/*"
            onChange={(e) => handleImages(e)}
          />
        </div>
        <h5 className="font-light text-xl">Nom du produit</h5>
        <input
          type="text"
          placeholder="Tapez ici"
          className="py-3 px-4 border-gray-400 border-2 w-100"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <h5 className="font-light text-xl">Description du produit</h5>
        <textarea
          placeholder="Entrer la description du produit ici"
          className="py-3 px-4 border-gray-400 border-2 w-100"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <div className="grid grid-cols-3">
          <div>
            <h5 className="font-light text-xl">Catégory du produit</h5>
            <select
              className="py-2 px-3 w-43 mt-2 border-gray-400 border-2"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="Hommes">Hommes</option>
              <option value="Femmes">Femmes</option>
              <option value="Enfants">Enfants</option>
            </select>
          </div>
          <div>
            <h5 className="font-light text-xl">Sous Catégory</h5>
            <select
              className="py-2 px-3 w-43 mt-2 border-gray-400 border-2"
              value={formData.subCategory}
              onChange={(e) =>
                setFormData({ ...formData, subCategory: e.target.value })
              }
            >
              {clothesTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5 className="font-light text-xl">Prix</h5>
            <input
              type="number"
              placeholder="Ex: 4000"
              className="py-2 px-4 border-gray-400 border-2 w-43 mt-2"
              min={0}
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>
        </div>
        <h5 className="font-light text-xl">Taille</h5>
        <div className="flex gap-4">
          {productSize.map((actualSize, i) => (
            <div
              key={actualSize}
              className={` px-4.5 py-2.5 font-semibold cursor-pointer ${
                // sizeSelected.includes(actualSize)
                formData.size.includes(actualSize)
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleSelectSize(actualSize, i)}
            >
              {actualSize}
            </div>
          ))}
        </div>
        <button
          className="text-white bg-black py-2.5 px-3 cursor-pointer hover:scale-105 duration-300 ease-in-out my-2 "
          type="submit"
        >
          <div className="flex gap-4">
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Chargement...
              </>
            ) : (
              "Ajouter"
            )}
          </div>
        </button>
      </form>
    </aside>
  );
};

export default AddProduct;
