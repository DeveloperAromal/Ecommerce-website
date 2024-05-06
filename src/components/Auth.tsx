"use client"

import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation"; // Ensure you import useRouter from next/router

const key = "Robot1";

export default function Auth() {
  const [pass, setPass] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleLogin = (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (key === pass) {
      router.push('/admin'); // Use router.push to navigate to '/admin' if the key matches
    } else {
      alert("Secret key is not valid");
    }
  };

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPass(event.target.value); // Update the pass state as the input value changes
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="bg-black p-8 rounded  w-80 shad">
        <h2 className="text-2xl text-indigo-500 mb-4">Welcome to Admin Panel</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter secret key"
            value={pass}
            onChange={handleInputChange}
            className="w-full py-2 px-3 mb-4 border rounded-md focus:outline-none text-black focus:border-blue-400"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600">Enter</button>
        </form>
      </div>
    </section>
  );
}
