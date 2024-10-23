import React from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';

const Card = ({ product }) => {
  // console.log("card", product)
  const product1 = {
    slug: product.slug,
    img: product.img,
    title: product.title,
    price: product.price, // original price
    discount: 30, // discount percentage (this can vary)
    size: product.size,
    color: product.color, // color options
    rating: 4, // rating out of 5
    reviewCount: 120, // total number of reviews
    seller:"CraftCrove"
  };

  const discountedPrice = (product1.price * (1 - product1.discount / 100)).toFixed(2);

  // Function to handle adding to wishlist
  const addToWishlist = async () => {
    try {
      // Simulate an API call to add to wishlist
      await fetch('/api/wishlist', {
        method: 'POST',
        body: JSON.stringify({ slug: product1.slug }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success(`${product1.title} added to wishlist!`);
    } catch (error) {
      toast.error('Failed to add to wishlist.');
    }
  };

  return (
    // <Link href={`/product/${product1.slug}`} legacyBehavior>
    <div className="group border mb-1 sm:mb-10 block min-h-[40vh] lg:min-h-[58vh] w-full max-w-[13rem] sm:min-w-[15rem] mx-auto overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="relative cursor-pointer h-full max-h-[25vh] lg:max-h-[40vh] overflow-hidden bg-no-repeat bg-cover">
        {/* Product Image */}
        <Link href={`/product/${product1.title}`} legacyBehavior>
          <img
            src={product1.img}
            alt={product1.title}
            className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent link navigation
            addToWishlist();
          }}
          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-200 transition duration-300"
        >
          <FaHeart className="text-red-600" />
        </button>

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
        {/* <div className="absolute inset-0 bg-black opacity-20 transition-opacity duration-300 ease-in-out"></div> */}
      </div>

      <div className="p-2 h-full"> {/* Reduced padding here */}
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
                <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
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
    </div>

  );
};

export default Card;
