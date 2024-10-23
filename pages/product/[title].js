import { useRouter } from 'next/router';
import { useState } from 'react';
import mongoose from 'mongoose';
import Product from '@/models/product';

const Slug = ({ products, buyNow, addToCart }) => {
  const router = useRouter();
  const { title } = router.query; // Use title as the slug
  const [pin, setPin] = useState('');
  const [service, setService] = useState();
  const [color, setColor] = useState(products[0]?.color); // Initialize with the first product color
  const [size, setSize] = useState(products[0]?.size); // Initialize with the first product size
  const [currentProduct, setCurrentProduct] = useState(products[0]); // Set the first product as current

  const handleCheckPin = async () => {
    let pinFetch = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pinFetch.json();
    if (pinJson.includes(parseInt(pin))) {
      toast.success('Your Pincode is serviceable!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setService(true);
    } else {
      toast.error('Sorry, Your Pincode is not serviceable!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setService(false);
    }
  };

  const handleOnChangePin = (e) => {
    setPin(e.target.value);
  };

  const refreshVariant = (newSize, newColor) => {
    const newProduct = products.find(product => product.color === newColor && product.size === newSize);
    if (newProduct) {
      setCurrentProduct(newProduct);
      setColor(newColor);
      setSize(newSize);
    }
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="mt-4 mb-4 px-5 sm:py-10 mx-auto">
        <div className="lg:w-4/5 h-[80%] flex items-center mx-auto flex flex-wrap justify-center">
          <a className="flex relative w-[50vh] h-[60vh] mx-auto rounded overflow-hidden justify-center">
            <img alt="ecommerce" className="h-full w-full object-contain m-auto md:m-0 block" src={currentProduct?.img} />
          </a>

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 sm:mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{currentProduct.seller}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{currentProduct?.title} ({currentProduct?.size}/{color})</h1>
            {/* Rating Section */}
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <svg
                    key={index}
                    className={`w-3 h-3 ${index < currentProduct.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-500">({currentProduct.reviewCount} reviews)</span>
            </div>
            <p className="leading-relaxed">{currentProduct?.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                {products.map((product) => (
                  <button
                    key={product.color}
                    onClick={() => { refreshVariant(size, product.color) }}
                    className={`border-2 ml-1 rounded-full w-6 h-6 focus:outline-none ${color === product.color ? 'border-black' : 'border-gray-300'}`}
                    style={{ backgroundColor: product.color }} // Use the variant color as background
                  ></button>
                ))}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={size} onChange={(e) => { refreshVariant(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    {products?.map((product, index) => (
                      <option value={product.size} key={index}>{product.size}</option>
                    ))}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {currentProduct?.discount > 0 && (
                <span className="text-lg font-semibold line-through text-gray-500">
                  ${currentProduct.price.toFixed(2)}
                </span>
              )}
              <span className="title-font font-medium text-2xl text-gray-900 ml-2">
                {currentProduct?.discount > 0
                  ? `$${(currentProduct.price * (1 - currentProduct.discount / 100)).toFixed(2)}`
                  : `$${currentProduct.price.toFixed(2)}`}
              </span>
              {currentProduct?.discount > 0 && (
                <span className="ml-2 text-green-600 text-lg font-semibold">
                  {currentProduct.discount}% OFF
                </span>
              )}
              <button onClick={() => { buyNow(currentProduct?.slug, 1, currentProduct?.price, currentProduct?.title, currentProduct?.size, color) }} className="flex ml-4 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded text-sm">Buy now</button>
              <button onClick={() => { addToCart(currentProduct?.slug, 1, currentProduct?.price, currentProduct?.title, currentProduct?.size, color) }} className="flex ml-4 text-white bg-gray-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-gray-600 rounded text-sm">Add to Cart</button>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Check Service Availability</h2>
              <div className="flex mt-2">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  value={pin}
                  onChange={handleOnChangePin}
                  className="border border-gray-300 rounded p-2"
                />
                <button
                  onClick={handleCheckPin}
                  className="ml-2 bg-blue-500 text-white rounded px-4 py-2"
                >
                  Check
                </button>
              </div>
              {service !== undefined && (
                <p className={`mt-2 ${service ? 'text-green-600' : 'text-red-600'}`}>
                  {service ? 'Service is available for this pincode.' : 'Service is not available for this pincode.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Fetch product data server-side
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  const { title } = context.query; // Get title from the query
  const products = await Product.find({ title, availableQty: { $gt: 0 } }); // Fetch products by title

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default Slug;
