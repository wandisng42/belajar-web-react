import { useState } from "react";

export default function usestate() {
  const [name, setname] = useState("andii");

  return (
    <div className="p-6 max-w-md mx-auto">
      <input
        type="text"
        placeholder="user name"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <p className="mt-4 text-lg">Halo, {name}!</p>
    </div>
  );
}
