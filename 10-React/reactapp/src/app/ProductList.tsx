// ProductList.tsx
import React, { FC, useState } from 'react';
import ProductItem from './ProductItem';

interface Product {
  id: number;
  title: string;
  brand: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: FC<ProductListProps> = ({ products }) => {
  const [filter, setFilter] = useState<string>('');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1>List of products</h1>
      <label>
        Filter by product title: 
        <input type="text" value={filter} onChange={handleFilterChange} />
      </label>
      <ul>
        {products.filter(product => product.title.includes(filter)).map(product => (
          <ProductItem key={product.id} id={product.id} title={product.title} brand={product.brand} />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;