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
import H_Section from '@/components/H_Section';
import Hoodies from './hoodies';
import Testimonials from '@/components/Testimonial';
import Newsletter from '@/components/Newsletter';

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
      <H_Section
        sectionData={{
          name: "T-Shirts",
          products: Tshirts
        }}
      />



      <hr />

      {/* jeans */}
      <H_Section
        sectionData={{
          name: "Jeans",
          products: Jeans
        }}
      />

      <hr />

      {/* hoodies */}
      <H_Section
        sectionData={{
          name: "Hoodies",
          products: Hoodies
        }}
      />


      <hr />

      {/* caps */}
      <H_Section
        sectionData={{
          name: "Caps",
          products: Caps
        }}
      />

      <hr />

      {/* shoes */}
      <H_Section
        sectionData={{
          name: "Shoes",
          products: Shoes
        }}
      />

      <hr />

      {/* Testimonials */}
      <Testimonials/>

      {/* Newsletter */}
      <Newsletter/>

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
        if (!processedProducts[item.title].color.includes(item.color)) {
          processedProducts[item.title].color.push(item.color);
        }
        if (!processedProducts[item.title].size.includes(item.size)) {
          processedProducts[item.title].size.push(item.size);
        }
      } else {
        processedProducts[item.title] = JSON.parse(JSON.stringify(item));
        processedProducts[item.title].color = [item.color];
        processedProducts[item.title].size = [item.size];
      }
    }
    return processedProducts;
  };

  // Fetch only 5 available products from each category
  const tshirts = await Product.find({ category: "Tshirts", availableQty: { $gt: 0 } }).limit(6);
  const hoodies = await Product.find({ category: "Hoodies", availableQty: { $gt: 0 } }).limit(6);
  const jeans = await Product.find({ category: "Jeans", availableQty: { $gt: 0 } }).limit(6);
  const caps = await Product.find({ category: "Caps", availableQty: { $gt: 0 } }).limit(6);
  const shoes = await Product.find({ category: "Shoes", availableQty: { $gt: 0 } }).limit(6);

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
