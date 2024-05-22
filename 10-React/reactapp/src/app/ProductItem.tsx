'use client'
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface ProductItemProps {
  id: number;
  title: string;
  brand: string;
}

const ProductItem: FC<ProductItemProps> = ({ id, title, brand }) => {
  return (
    <li>
      <Link to={`/details/${id}`}>{title}</Link> ({brand})
    </li>
  );
}

export default ProductItem;