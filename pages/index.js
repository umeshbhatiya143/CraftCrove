import Head from 'next/head'
import Image from 'next/image'
import mongoose from 'mongoose'
import { Inter } from '@next/font/google'
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import Card from '@/components/card';
import Product from '@/models/product'
import { Typewriter } from 'react-simple-typewriter'
import Jeans from './jeans';

const inter = Inter({ subsets: ['latin'] })

const Home = ({ Tshirts = {}, Hoodies = {}, Jeans = {}, Caps = {}, Shoes = {} }) => {

  const slideContent = [
    {
      image: '/tshirts.webp' // Add a leading slash
    },
    {
      image: '/hoodies.webp', // Add a leading slash
    },
    {
      image: '/shoes.jpg', // Add a leading slash
    },
    {
      image: '/jeans.png' // Add a leading slash
    },
    {
      image: '/caps.jpg' // Add a leading slash
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Jane Doe',
      position: 'Creative Director',
      comment: 'Absolutely love the quality of their products! Customer service was outstanding.',
      img: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 2,
      name: 'John Smith',
      position: 'Marketing Lead',
      comment: 'The delivery was fast, and the product exceeded my expectations. Highly recommend!',
      img: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    // Add more testimonials as needed
  ];

  return (
    <>
      <Head>
        <title>CraftCrove.com - wear the code</title>
        <meta name="description" content="CraftCrove.com - Wear the code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* hero section  */}
      <section className="relative overflow-hidden w-full h-full">
        {/* Swiper Component */}
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="relative w-full lg:h-[92vh] h-[45vh]" // Adjusted height for mobile
        >
          {slideContent.map((slide, index) => (
            <SwiperSlide key={index} className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={slide.image}
                  alt="slider image"
                  layout="fill"
                  objectFit="cover" // Cover for large screens
                  className="lg:object-cover sm:object-contain" // Contain for small screens
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Description Section */}
        <div className='absolute z-10 top-0 w-full h-[45vh] lg:h-screen flex justify-center items-center'>
          <div className="flex flex-col items-center text-center gap-2 lg:gap-6 justify-center -mt-10 w-[350px] h-[200px] lg:w-[550px] lg:h-[300px] text-white bg-glassy px-6 rounded-lg shadow-md 
     md:w-[450px] md:h-[250px] sm:w-[350px] sm:h-[220px] sm:gap-4 sm:px-4">
            <h2 className="text-2xl lg:text-4xl font-black mb-2 lg:mb-4">Welcome to Your Fashion Destination</h2>
            <span className="text-[16px] md:text-[18px] lg:text-[20px] h-[40px] font-bold text-pink-600">
              <Typewriter
                words={[
                  'Discover the latest trends in fashion.',
                  'Elevate your style with exclusive collections.',
                  'Find your perfect fit with our curated selections.',
                  'Fashion-forward apparel and accessories just for you.',
                ]}
                loop={true}
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
            <p className="text-[12px] lg:text-[16px] mb-2 lg:mb-4">Explore a premium collection of t-shirts, jeans, hoodies, caps, and shoes designed for the modern you.</p>
          </div>
        </div>
      </section>

      <hr />

      {/* tshirts */}
      <section className="body-font bg-gray-50">
        <div className="container mx-auto px-5 py-24">
          <h4 className="mb-20 text-3xl font-bold text-center text-pink-500 sm:text-5xl">
            Our Premium T-Shirts
          </h4>
          <div className="flex flex-wrap gap-10">
            {Object.keys(Tshirts).length > 0 ? Object.keys(Tshirts).map((item, index) => (
              <Card product={Tshirts[item]} key={index} />
            )) : <p>No T-Shirts available</p>}
          </div>
        </div>
      </section>
      <hr />

      {/* hoodies */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h4 className="mb-20 text-3xl font-bold text-center text-pink-500 sm:text-5xl">
            Our Premium Hoodies
          </h4>
          <div className="flex flex-wrap -m-4 ">
            {Object.keys(Hoodies).length > 0 ? Object.keys(Hoodies).map((item, index) => (
              <Card product={Hoodies[item]} key={index} />
            )) : <p>No Hoodies available</p>}
          </div>
        </div>
      </section>

      <hr />

      {/* jeans */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h4 className="mb-20 text-3xl font-bold text-center text-pink-500 sm:text-5xl">
            Our Premium Jeans
          </h4>
          <div className="flex flex-wrap -m-4">
            {Object.keys(Jeans).length > 0 ? Object.keys(Jeans).map((item, index) => (
              <Card product={Jeans[item]} key={index} />
            )) : <p>No Jeans available</p>}
          </div>
        </div>
      </section>

      <hr />

      {/* caps */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h4 className="mb-20 text-3xl font-bold text-center text-pink-500 sm:text-5xl">
            Our Premium Caps
          </h4>
          <div className="flex flex-wrap -m-4">
            {Object.keys(Caps).length > 0 ? Object.keys(Caps).map((item, index) => (
              <Card product={Caps[item]} key={index} />
            )) : <p>No Caps available</p>}
          </div>
        </div>
      </section>
      <hr />

      {/* shoes */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h4 className="mb-20 text-3xl font-bold text-center text-pink-500 sm:text-5xl">
            Our Premium Shoes
          </h4>
          <div className="flex flex-wrap -m-4">
            {Object.keys(Shoes).length > 0 ? Object.keys(Shoes).map((item, index) => (
              <Card product={Shoes[item]} key={index} />
            )) : <p>No Shoes available</p>}
          </div>
        </div>
      </section>

      <hr />

      {/* Testimonials */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900 sm:text-5xl">
            What Our Customers Say
          </h2>
          <div className="flex flex-wrap -m-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-4 md:w-1/2 w-full">
                <div className="h-full bg-gray-100 p-8 rounded">
                  <Image
                    alt="testimonial"
                    src={testimonial.img}
                    width={96}
                    height={96}
                    className="w-24 h-24 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  />
                  <p className="leading-relaxed mb-6">{testimonial.comment}</p>
                  <a className="inline-flex items-center">
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-gray-900">{testimonial.name}</span>
                      <span className="text-gray-500 text-sm">{testimonial.position}</span>
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // Helper function to process products
  const processProducts = (products) => {
    let processedProducts = {};
    for (let item of products) {
      if (item.title in processedProducts) {
        if (!processedProducts[item.title].color.includes(item.color) && item.availableQty > 0) {
          processedProducts[item.title].color.push(item.color);
        }
        if (!processedProducts[item.title].size.includes(item.size) && item.availableQty > 0) {
          processedProducts[item.title].size.push(item.size);
        }
      } else {
        processedProducts[item.title] = JSON.parse(JSON.stringify(item));
        if (item.availableQty > 0) {
          processedProducts[item.title].color = [item.color];
          processedProducts[item.title].size = [item.size];
        }
      }
    }
    return processedProducts;
  };

  const tshirts = await Product.find({ category: "Tshirts" });
  const hoodies = await Product.find({ category: "Hoodies" });
  const jeans = await Product.find({ category: "Jeans" });
  const caps = await Product.find({ category: "Caps" });
  const shoes = await Product.find({ category: "Shoes" });

  return {
    props: {
      Tshirts: processProducts(tshirts),
      Hoodies: processProducts(hoodies),
      Jeans: processProducts(jeans),
      Caps: processProducts(caps),
      Shoes: processProducts(shoes),
    },
  };
}
