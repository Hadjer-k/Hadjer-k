// src/pages/Admin/Defaillants.jsx
import React, { useState } from "react";

const Defaillants = () => {
  const [people, setPeople] = useState([
    {
      id: 1,
      nom: "Ahmed",
      prenom: "Karim",
      dateDeclaration: "2025-08-05",
      etat: "Défaillant",
      email: "ahmed.karim@example.com",
    },
    {
      id: 2,
      nom: "Sara",
      prenom: "Ali",
      dateDeclaration: "2025-08-15",
      etat: "Défaillant",
      email: "sara.ali@example.com",
    },
    {
      id: 3,
      nom: "Yassine",
      prenom: "Hadj",
      dateDeclaration: "2025-09-01",
      etat: "Défaillant",
      email: "yassine.hadj@example.com",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    dateDeclaration: "",
  });
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Supprimer une personne
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette personne ?")) {
      setPeople(people.filter((p) => p.id !== id));
    }
  };

  // Ajouter une personne
  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.nom || !formData.prenom || !formData.email || !formData.dateDeclaration) {
      alert("⚠️ Veuillez remplir tous les champs.");
      return;
    }
    const newPerson = {
      id: people.length + 1,
      ...formData,
      etat: "Défaillant",
    };
    setPeople([...people, newPerson]);
    setFormData({ nom: "", prenom: "", email: "", dateDeclaration: "" });
    setShowForm(false);
  };

  // Voir infos
  const handleView = (person) => {
    setSelectedPerson(person);
  };

  // Envoyer mise en demeure
  const handleMiseEnDemeure = (person) => {
    alert(`📩 Mise en demeure envoyée à ${person.nom} ${person.prenom} (${person.email})`);
  };

  // Filtrage par nom, prénom, email ou date
  const filteredPeople = people.filter(
    (p) =>
      p.nom.toLowerCase().includes(search.toLowerCase()) ||
      p.prenom.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase()) ||
      p.dateDeclaration.includes(search)
  );

  return (
    <div className="flex-1 p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Liste des Défaillants</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#521E9B] text-white px-4 py-2 rounded-lg hover:bg-[#3e1678] transition"
        >
          ➕ Ajouter une personne
        </button>
      </div>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher par nom, prénom, email ou date..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-4 py-2 border rounded-lg w-full"
      />

      {/* Tableau */}
      <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Prénom</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Date Déclaration</th>
              <th className="p-3 text-left">État</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPeople.length > 0 ? (
              filteredPeople.map((person) => (
                <tr key={person.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{person.id}</td>
                  <td className="p-3">{person.nom}</td>
                  <td className="p-3">{person.prenom}</td>
                  <td className="p-3">{person.email}</td>
                  <td className="p-3">{person.dateDeclaration}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-red-200 text-red-600 rounded-lg text-sm">
                      {person.etat}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleView(person)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Voir
                    </button>
                    <button
                      onClick={() => handleDelete(person.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Supprimer
                    </button>
                    <button
                      onClick={() => handleMiseEnDemeure(person)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                      ⚠️ Mise en demeure
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-3 text-center text-gray-500">
                  Aucun défaillant trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Formulaire */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Ajouter une personne</h2>
            <form onSubmit={handleAdd} className="space-y-3">
              <input
                type="text"
                placeholder="Nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="date"
                value={formData.dateDeclaration}
                onChange={(e) => setFormData({ ...formData, dateDeclaration: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#521E9B] text-white rounded-lg hover:bg-[#3e1678]"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Détails */}
      {selectedPerson && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Détails</h2>
            <p><b>Nom :</b> {selectedPerson.nom}</p>
            <p><b>Prénom :</b> {selectedPerson.prenom}</p>
            <p><b>Email :</b> {selectedPerson.email}</p>
            <p><b>Date déclaration :</b> {selectedPerson.dateDeclaration}</p>
            <p><b>État :</b> {selectedPerson.etat}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedPerson(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Defaillants;
