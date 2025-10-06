import React from "react";
import tablet from "../../assets/tablet.jpg"; // tu peux changer l'image

const services = [
  {
    icon: "📁",
    title: "Archivage & Gestion",
    desc: "Classement et suivi des documents essentiels des fournisseurs et partenaires.",
  },
  {
    icon: "🖥️",
    title: "Outils numériques",
    desc: "Mise à disposition de plateformes et logiciels pour le suivi des projets.",
  },
  {
    icon: "📊",
    title: "Suivi des projets",
    desc: "Contrôle régulier de l’avancement et de la conformité des activités.",
  },
  {
    icon: "🤝",
    title: "Accompagnement personnalisé",
    desc: "Soutien aux partenaires pour garantir la bonne exécution des projets.",
  },
  {
    icon: "💡",
    title: "Optimisation des procédures",
    desc: "Proposer des améliorations pour rendre la gestion plus efficace.",
  },
  {
    icon: "🌐",
    title: "Coordination & planification",
    desc: "Assurer la communication et la planification entre tous les acteurs.",
  },
];

const OurServices = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row items-center px-6 md:px-20 py-16 overflow-x-hidden">
      {/* Colonne gauche */}
      <div className="flex-1 md:pr-12">
        <h1 className="text-4xl md:text-4xl font-extrabold text-gray-800 mb-10">
          Ce que nous proposons
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex items-start space-x-3">
              <span className="text-3xl">{service.icon}</span>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {service.title}
                </h2>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Colonne droite (image) */}
      <div className="flex-1 mt-10 md:mt-0">
        <img
          src={tablet}
          alt="Nos services"
          className="rounded-2xl shadow-lg w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default OurServices;
