'use client'
import React, { FC } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface ProductDetailsProps {
  products: Product[];
}

const ProductDetails: FC<ProductDetailsProps> = ({ products }) => {
  const { id } = useParams<Record<string, string>>();
  const filteredProducts = products.filter(product => product.id === Number(id));

  if (filteredProducts.length === 0) {
    return null;
  }

  const product = filteredProducts[0];

  return (
    <div>
      <h1>{product.title}</h1>
      Category: {product.category}<br />
      Brand: {product.brand}<br />
      Description: {product.description}<br />
      Price: {product.price}<br />
      <img src={product.thumbnail} alt={product.title} /><br />
      <Link to="/">Back to product list</Link>
    </div>
  );
}

export default ProductDetails;