import React from "react";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white">
      
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-red-500 to-orange-500 bg-clip-text text-transparent">
          Adudu Kuasa 7 Elemental
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          Penguasa tujuh elemen kekuatan alam. Mengendalikan api, air, angin,
          tanah, petir, cahaya, dan kegelapan dalam satu kekuatan absolut.
        </p>

        <button className="mt-8 px-8 py-3 bg-orange-500 hover:bg-orange-600 transition duration-300 rounded-full font-semibold shadow-lg hover:scale-105">
          Jelajahi Kekuatan
        </button>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-6 bg-slate-900/60 backdrop-blur">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-yellow-400">Tentang Saya</h2>
          <p className="mt-6 text-gray-300 leading-relaxed">
            Saya adalah Adudu, entitas dengan kekuatan 7 elemen utama.
            Dengan keseimbangan energi semesta, saya menjaga harmoni antara
            kekuatan destruktif dan penciptaan.
          </p>
        </div>
      </section>

      {/* POWERS SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-orange-400">
            7 Elemen Kekuatan
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              "🔥 Api",
              "💧 Air",
              "🌪️ Angin",
              "🌍 Tanah",
              "⚡ Petir",
              "🌟 Cahaya",
              "🌑 Kegelapan",
            ].map((element, index) => (
              <div
                key={index}
                className="bg-slate-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
              >
                <h3 className="text-xl font-semibold">{element}</h3>
                <p className="mt-3 text-gray-400 text-sm">
                  Kekuatan elemen {element.split(" ")[1]} yang berada dalam
                  kendali penuh.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center bg-black/40 text-gray-400">
        © {new Date().getFullYear()} Adudu Kuasa 7 Elemental. All rights reserved.
      </footer>
    </div>
  );
}