"use client";
// import React, { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import { useRouter } from 'next/navigation'; // Changed from 'next/navigation'
// import Image from "next/image";
// import Link from "next/link";

// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// const Landing: React.FC = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [products, setProducts] = useState<
//     Array<{
//       id: number;
//       title: string;
//       price: string | null;
//       image: string | null;
//     }>
//   >([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from("Pricehawk_Database")
//         .select("*");

//       if (error) {
//         throw error;
//       }

//       if (data) {
//         setProducts(data);
//       }
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "An error occurred";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDetailsClick = (id: number) => {
//     router.push(`/details/${id}`);
//   };

//   return (
//     <section>
//       {/* Header code */}
//       <section className="flex justify-center items-center bg-gray-100 py-20">
//         <div className="max-w-4xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {loading && <p>Loading...</p>}
//             {error && <p>{error}</p>}
//             {products.map((product) => (
//               <div key={product.id} className="bg-white shadow-lg rounded-lg p-6">
//                 <div className="flex justify-center mb-4">
//                   <Image
//                     src={product.image || ""}
//                     alt="@"
//                     width={100}
//                     height={100}
//                     className="h-32 w-32 object-cover rounded-full"
//                   />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-indigo-900 mb-2">
//                     {product.title}
//                   </h3>
//                   <p className="text-gray-700">{product.price}</p>
//                   <Link href="/details"><button
//                     onClick={() => handleDetailsClick(product.id)}
//                     className="mt-4 block w-full bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
//                   >
//                     View Details
//                   </button></Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </section>
//   );
// };

// export default Landing;

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Modal from "./Modal"; // Import your modal component
import Link from "next/link";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const Landing: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<
    Array<{
      id: number;
      title: string;
      price: string | null;
      image: string | null;
    }>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("Ecommerce")
        .select("*");

      if (error) {
        throw error;
      }

      if (data) {
        setProducts(data);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsClick = (product: any) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleCopyLink = (productId: number) => {
    const productUrl = `${window.location.origin}/details/${productId}`;
    navigator.clipboard.writeText(productUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <section>
      <section className="flex justify-center items-center bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg p-6"
              >
                <div className="relative top-0 right-0 bg-lime-600 w-8 flex items-center justify-center rounded-md">
                  <h1 className="text-gray-700">{product.id}</h1>
                </div>
                <div className="flex justify-center mb-4">
                  <Image
                    src={product.image || ""}
                    alt="@"
                    width={100}
                    height={100}
                    className="h-32 w-32 object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                    {product.title}
                  </h3>

                  <p className="text-gray-700">{product.price}</p>
                  <Link href={`/details/${product.id}`}>
                    <button
                      onClick={() => handleDetailsClick(product)}
                      className="mt-4 block w-full bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                      View Details
                    </button>
                  </Link>

                  <button
                    onClick={() => handleCopyLink(product.id)}
                    className="mt-2 block w-full bg-gray-300 text-gray-800 text-center py-2 rounded-lg hover:bg-gray-400 transition duration-300"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {selectedProduct && (
        <Modal onClose={handleCloseModal}>
          <div>
            <h2>{selectedProduct.title}</h2>
            <p>{selectedProduct.price}</p>
            <Image
              src={selectedProduct.image || ""}
              alt="@"
              width={200}
              height={200}
              className="object-cover"
            />
            {/* Add other details */}
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Landing;
