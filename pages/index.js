import Head from 'next/head'
import Image from 'next/image'
import mongoose from 'mongoose'
import { Inter } from '@next/font/google'
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import Card from '@/components/card';
import product from '@/models/product'

const inter = Inter({ subsets: ['latin'] })

const Home = ({ Tshirts, Hoodies, Stickers, Mugs }) => {

  const slideContent = [
    {
      image: 'tshirts.jpeg'
    },
    {
      image: 'hoodies.webp',
    },
    {
      image: 'mugs.jpg',
    },
    {
      image: 'stickers.jpg'
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


      {/* slider  */}
      <section className="h-screen relative overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="relative"
        >

          {
            slideContent.map((slide) => {
              return (
                <SwiperSlide>
                  <div className="w-full !important flex items-center justify-center">
                    <img src={slide.image} alt="" className='w-full !important' />
                  </div>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </section>

      {/* tshirts */}
      <section className="body-font bg-gray-50">
        <div className="container mx-auto px-5 py-24">
          <h4 className="mb-20 text-3xl font-bold text-center text-gray-900 sm:text-5xl">
            Our Premium T-Shirts
          </h4>
          <div className="flex flex-wrap gap-10">
            {Object.keys(Tshirts).map((item, index) => (
              <Card product={Tshirts[item]} />
            ))}
          </div>
        </div>
      </section>


      {/* hoodies */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h4 className="mb-20 text-3xl font-bold text-center text-gray-900 sm:text-5xl">
            Our Premium Hoodies
          </h4>
          <div className="flex flex-wrap -m-4 ">
            {Object.keys(Hoodies).map((item) => {
              return (

                <Card product={Hoodies[item]} />
              )
            })}
          </div>
        </div>
      </section>

      {/* stickers */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h4 className="mb-20 text-3xl font-bold text-center text-gray-900 sm:text-5xl">
            Our Premium Stickers
          </h4>
          <div className="flex flex-wrap -m-4">
            {Object.keys(Stickers).map((item) => {
              return (

                <Card product={Stickers[item]} />
              )
            })}
          </div>
        </div>
      </section>

      {/* mugs */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h4 className="mb-20 text-3xl font-bold text-center text-gray-900 sm:text-5xl">
            Our Premium Mugs
          </h4>
          <div className="flex flex-wrap -m-4">
            {Object.keys(Mugs).map((item) => {
              return (

                <Card product={Mugs[item]} />
              )
            })}
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900 sm:text-5xl">
            What Our Customers Say
          </h2>
          <div className="flex flex-wrap -m-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-4 md:w-1/2 w-full">
                <div className="h-full bg-gray-100 p-8 rounded">
                  <img alt="testimonial" className="w-24 h-24 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src={testimonial.img} />
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

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Wear the code with - CraftCrove.com</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Wear whatever you want? What do you want? you want code? so why not wear the code?</p>
          </div>
          <div className="flex flex-wrap -m-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg transform hover:scale-105 duration-300 ease-in-out">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                    {/* SVG Icons */}
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Dynamic Title</h2>
                  <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}

export default Home

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // Helper function to process products
  const processProducts = (products) => {
    let processedProducts = {};
    for (let item of products) {
      if (item.title in processedProducts) {
        if (!processedProducts[item.title].size.includes(item.size) && item.availableQty > 0) {
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
        } else {
          // Ensure even products with 0 quantity are initialized with empty arrays
          processedProducts[item.title].color = [];
          processedProducts[item.title].size = [];
        }
      }
    }
    return processedProducts;
  };

  // Query for the latest 3 products of each category
  const categories = ['Tshirts', 'Hoodies', 'Stickers', 'Mugs'];
  let results = {};

  for (let category of categories) {
    let products = await product.find({ category: category }).sort({ createdAt: -1 }).limit(3);
    results[category] = processProducts(products);
  }

  // Convert the objects to a format suitable for JSON serialization
  return {
    props: {
      Tshirts: JSON.parse(JSON.stringify(results['Tshirts'])),
      Hoodies: JSON.parse(JSON.stringify(results['Hoodies'])),
      Stickers: JSON.parse(JSON.stringify(results['Stickers'])),
      Mugs: JSON.parse(JSON.stringify(results['Mugs'])),
    },
  };
}


