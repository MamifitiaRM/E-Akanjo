import React from "react";
import { products } from "../../assets/frontend_assets/assets";
import { Edit, Loader2, LucidePackageX, Trash2Icon } from "lucide-react";
import useProductStore from "../stores/useProductStore";

const ListProducts = () => {
  const { product, deleteProduct, setProduct } = useProductStore();

  const handleDelete = (productId) => {
    deleteProduct(productId);
    setProduct(product.filter((product) => product._id !== productId));
  };

  if (product?.length == 0) {
    return (
      <div className="min-h-screen flex flex-col items-center space-y-4">
        <LucidePackageX size={100} className="mt-55" />
        <h2 className="font-semibold">Vous n'avez pas de produit</h2>;
      </div>
    );
  }

  return (
    <aside className="py-6 px-8 space-y-3">
      <header className="flex items-center justify-end gap-3">
        <h5 className="font-light text-xl">Filtrer par catégiorie</h5>
        <select className="py-2 px-3 w-43 border-gray-400 border-2">
          <option>Hommes</option>
          <option>Femmes</option>
          <option>Enfants</option>
        </select>
        <input
          type="text"
          placeholder="Rechercher par nom..."
          className="py-2 px-4 border-gray-400 border-2 w-80"
        />
      </header>
      <h5 className="font-light text-xl">Tous les produits</h5>
      <table className="min-w-full divide-y divide-gray-700 ">
        <thead className="bg-gray-300 mb-2">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
              Nom
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
              Catégorie
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
              Prix
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {product?.map((product) => (
            <tr className="border-2 border-gray-400" key={product._id}>
              <td className="px-5 py-2 whitespace-nowrap w-20">
                <img src={product.image[0]} />
              </td>
              <td className="px-6 py-2 whitespace-nowrap">{product.name}</td>
              <td className="px-6 py-2 whitespace-nowrap">
                {product.category}
              </td>
              <td className="px-6 py-2 whitespace-nowrap">{product.price}</td>
              <td className="px-6 py-6 whitespace-nowrap flex justify-center">
                <Trash2Icon
                  className="text-red-600 cursor-pointer hover:scale-110"
                  size={23}
                  onClick={() => handleDelete(product._id)}
                />
                <Edit
                  className="text-green-500 cursor-pointer hover:scale-110"
                  size={23}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
};

export default ListProducts;
