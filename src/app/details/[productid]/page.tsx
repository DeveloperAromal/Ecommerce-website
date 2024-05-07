"use client"

import { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function ProductDetails({ params }: { params: { productid: string } }) {
  const { productid } = params;
  const [product, setProduct] = useState<{
    id: number;
    title: string;
    price: string | null;
    image: string | null;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("Ecommerce")
          .select("*")
          .eq("id", parseInt(productid)) // Fetching item with the provided product ID
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setProduct(data);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productid]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error || !product) {
    return <div>Error: {error || "Product not found"}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-center mb-4">
          <Image
            src={product.image || ""}
            alt="@"
            width={200}
            height={200}
            className="h-32 w-32 object-cover rounded-full product_image image-detail"
          />
        </div>
        <div>
          <div className="text-lg font-semibold text-indigo-900 mb-2 title_tag title-detail">
            {product.title}
          </div>
          <div className="text-gray-700 mb-4 price_tag">{product.price}</div>
          <button className="block w-full bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
