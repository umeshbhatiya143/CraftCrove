import React from 'react';
import Link from 'next/link';

const Card = ({ product }) => {
  const product1 = {
    slug: product.slug,
    img: product.img,
    title: product.title,
    price: 39.99, // original price
    discount: 30, // discount percentage (this can vary)
    size: ['S', 'M', 'L'],
    color: ['#FF0000', '#00FF00', '#0000FF'], // color options
    rating: 4, // rating out of 5
    reviewCount: 120, // total number of reviews
  };

  const discountedPrice = (product1.price * (1 - product1.discount / 100)).toFixed(2);

  return (
    <Link href={`/product1/${product1.slug}`} legacyBehavior>
      <a className="group block w-full max-w-[13rem] sm:max-w-[15rem] mx-auto overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="relative overflow-hidden bg-no-repeat bg-cover" style={{ height: '40vh' }}>
          {/* Product Image */}
          <img 
            src={product1.img} 
            alt={product1.title} 
            className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105" 
          />

          {/* Discount Badge on Image */}
          {product1.discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-full z-10">
              {product1.discount}% OFF
            </span>
          )}

          {/* Colors at the Bottom of the Image */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-10">
            {product1.color.map((color, index) => (
              <span 
                key={index} 
                className="h-5 w-5 rounded-full border-2 border-white transition-transform duration-300 transform hover:scale-110" 
                style={{ backgroundColor: color }} 
              />
            ))}
          </div>

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-black opacity-20 transition-opacity duration-300 ease-in-out"></div>
        </div>

        <div className="p-2"> {/* Reduced padding here */}
          {/* Product Title */}
          <h3 className="text-md font-semibold text-center text-gray-800">{product1.title}</h3>

          {/* Pricing Section */}
          <div className="flex justify-center mt-1 space-x-2">
            {/* Original Price with Strikethrough */}
            <span className="text-gray-400 line-through text-xs">{product1.price.toFixed(2)}</span>
            {/* Discounted Price */}
            <span className="text-pink-600 font-bold text-md">${discountedPrice}</span> {/* Reduced font size */}
          </div>

          {/* Rating Section */}
          <div className="flex items-center justify-center mt-1">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <svg 
                  key={index} 
                  className={`w-3 h-3 ${index < product1.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"/>
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-500">({product1.reviewCount} reviews)</span>
          </div>

          {/* Size Section */}
          <div className="flex justify-center gap-1 mt-2">
            {product1.size.map((size, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs text-white bg-pink-600 rounded-full"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
