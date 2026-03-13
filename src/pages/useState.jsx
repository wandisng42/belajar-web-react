import { useState } from "react";

export default function UseState() {
  const [name, setName] = useState(" ");

  return (
    /* pakai lebar/lebar layar penuh supaya flex bisa benar‑benar
       memusatkan konten */
    <div className="flex items-center justify-center w-screen h-screen bg-white -100">
      <div className="p-10 w-full max-w-md bg-red-100 rounded-lg bg-red-500-md">
        <input
          type="text"
          placeholder="user name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-black-300 rounded mb-4"
        />
        <p className="text-lg text-center">Halo, {name}!</p>
      </div>
    </div>
  );
}
