import React from "react";
import { Book, Laptop, Users, FileText, Lightbulb, Activity } from "lucide-react";

const services = [
  {
    icon: <Book className="w-10 h-10 text-gray-800" />,
    title: "Gestion des documents",
    desc: "Organisation et suivi des documents des fournisseurs et partenaires pour une meilleure gestion des projets.",
  },
  {
    icon: <Laptop className="w-10 h-10 text-gray-800" />,
    title: "Ressources numériques",
    desc: "Mise à disposition des outils numériques pour faciliter le suivi et la coordination des activités.",
  },
  {
    icon: <Users className="w-10 h-10 text-gray-800" />,
    title: "Accompagnement des partenaires",
    desc: "Soutien et conseil pour garantir la bonne exécution des projets et la régularisation des procédures.",
  },
  {
    icon: <FileText className="w-10 h-10 text-gray-800" />,
    title: "Suivi & contrôle",
    desc: "Contrôle régulier des activités et évaluation des performances pour assurer la qualité et la conformité.",
  },
  {
    icon: <Lightbulb className="w-10 h-10 text-gray-800" />,
    title: "Innovation & amélioration",
    desc: "Encourager les bonnes pratiques et l’innovation pour optimiser la gestion des projets.",
  },
  {
    icon: <Activity className="w-10 h-10 text-gray-800" />,
    title: "Coordination & planification",
    desc: "Assurer la coordination entre partenaires et la planification efficace des projets.",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        À propos de nous
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            {service.icon}
            <h2 className="text-xl font-semibold mt-4 mb-2">{service.title}</h2>
            <p className="text-gray-600 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
