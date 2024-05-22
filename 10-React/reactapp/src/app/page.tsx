'use client'
import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';

interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList products={products} />} />
        <Route path="details/:id" element={<ProductDetail products={products} />} />
      </Routes>
    </BrowserRouter>
  );
}