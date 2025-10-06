import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 Ici tu pourras mettre ta logique de vérification (email + mot de passe)
    // Pour l'instant on redirige directement
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-gray-800 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
        {/* Titre */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin <span className="text-indigo-600">Login</span>
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Connectez-vous pour gérer les déclarations et les défaillants.
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@cdi-bouira.dz"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Bouton Login */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Se connecter
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Accès réservé à l’administrateur du CDI Bouira
        </p>
      </div>
    </div>
  );
};

export default Login;
