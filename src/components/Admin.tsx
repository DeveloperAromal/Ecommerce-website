"use client"


import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const Admin: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data, error: updateError } = await supabase
        .from("Pricehawk_Database")
        .update({ price })
        .eq("id", id);

      if (updateError) {
        throw new Error(updateError.message);
      }

      console.log("Price updated successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
    }
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-black">
      <div className="bg-black shad p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-cyan-500">Update Price</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="id" className="block text-gray-500 font-semibold mb-2">Product ID</label>
            <input
              id="id"
              type="text"
              placeholder="Enter ID"
              value={id}
              onChange={handleIdChange}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-500 font-semibold mb-2">Price</label>
            <input
              id="price"
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={handlePriceChange}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Update Price
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default Admin;
