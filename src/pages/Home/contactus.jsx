import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row items-center px-6 md:px-20 py-16">
      {/* Colonne gauche : infos */}
      <div className="flex-1 md:pr-12 mb-12 md:mb-0">
        <h1 className="text-4xl md:text-4xl font-extrabold text-gray-800 mb-6">
          Contactez <span className="text-gray-800">Nous</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Vous avez une question, une suggestion ou besoin d’informations ?  
          N’hésitez pas à nous écrire ou à nous rendre visite.
        </p>

        <div className="space-y-4">
          <p className="text-gray-700">
            📍 <span className="font-semibold">Adresse :</span> CDI Bouira, Algérie
          </p>
          <p className="text-gray-700">
            📞 <span className="font-semibold">Téléphone :</span> +213 555 123 456
          </p>
          <p className="text-gray-700">
            ✉️ <span className="font-semibold">Email :</span> contact@cdi-bouira.dz
          </p>
        </div>
      </div>

      {/* Colonne droite : formulaire */}
      <div className="flex-1 w-full">
        <form className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Nom complet
            </label>
            <input
              type="text"
              placeholder="Votre nom"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Votre email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Écrivez votre message..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
