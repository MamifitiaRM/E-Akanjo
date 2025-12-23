import React from "react";

const Modal = () => {
  return (
    <div className="bg-white text-black absolute top-20 z-50">
      <header>Se déconnecter</header>
      <section>Vous voulez vous déconnecter ?</section>
      <div className="flex">
        <button className="bg-black text-white uppercase py-3.5 px-4 text-[16px] cursor-pointer">
          Oui
        </button>
        <button className="bg-black text-white uppercase py-3.5 px-4 text-[16px] cursor-pointer">
          Non
        </button>
      </div>
    </div>
  );
};

export default Modal;
