"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image"

interface ProductDetails {
  id: string;
  image: string;
  title: string;
  price: string;
}

const Details: React.FC = () => {
  const router = useRouter();
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    id: '',
    image: '',
    title: '',
    price: ''
  });

  useEffect(() => {
    if (router.query) {
      const { id, image, title, price } = router.query;
      setProductDetails({
        id: id as string,
        image: image as string,
        title: decodeURIComponent(title as string),
        price: price as string
      });
    }
  }, [router.query]);

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Product Details</h1>
        {productDetails.image && (
          <Image src={productDetails.image} alt={productDetails.title} className="rounded-lg mb-2" />
        )}
        <h3 className="text-lg font-semibold mb-2">{productDetails.title}</h3>
        <p className="text-gray-700">{productDetails.price}</p>
      </div>
    </section>
  );
};

export default Details;
