import React from 'react';
import Link from 'next/link';

const Card = ({ product }) => {
  return (
    <Link href={`/product/${product.slug}`} legacyBehavior>
      <a className="group block w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="relative overflow-hidden bg-no-repeat bg-cover" style={{ height: '38vh' }}>
          <img src={product.img} alt="ecommerce" className="object-cover object-center w-full h-full" />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-in-out"></div>
        </div>
        <div className="p-4">
          <h3 className="mt-2 text-lg font-medium text-center text-gray-800 md:text-left">{product.title}</h3>
          <div className="flex items-center justify-between mt-3">
            <h3 className="text-gray-500 text-xs uppercase">{product.category}</h3>
            <span className="text-gray-500 text-xs">${product.price}</span>
          </div>
          <div className="flex justify-center md:justify-start gap-2 mt-2">
            {product.size.map((size, index) => (
              <span key={index} className='px-2 py-1 text-xs text-gray-600 bg-gray-200 rounded-full'>{size}</span>
            ))}
          </div>
          <div className="flex justify-center md:justify-start gap-2 mt-2">
            {product.color.map((color, index) => (
              <span key={index} className={`h-6 w-6 rounded-full inline-block border-2 border-gray-300`} style={{ backgroundColor: color }}></span>
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
