import React from 'react';
import Slider from 'react-slick';

const Testimonials = () => {
  // Array of testimonials
  const testimonials = [
    {
      name: 'John Doe',
      review: 'I had an amazing experience shopping here! The products are top-notch, and the delivery was fast!',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    },
    {
      name: 'Jane Smith',
      review: 'Great customer service! I had an issue with my order, and they resolved it quickly and professionally.',
      rating: 4,
      avatar: 'https://randomuser.me/api/portraits/women/20.jpg',
    },
    {
      name: 'Alice Brown',
      review: 'The variety of products is fantastic! I will definitely shop here again.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    },
    {
      name: 'Michael Lee',
      review: 'Excellent quality and fast delivery. I am so impressed with the product and service!',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
    },
    {
      name: 'Chris Johnson',
      review: 'A very user-friendly platform with a vast selection of products. Highly recommend!',
      rating: 4,
      avatar: 'https://randomuser.me/api/portraits/men/40.jpg',
    },
  ];
  

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className="bg-gradient-to-r from-blue-400 to-purple-600 pt-20 pb-28">
      <div className="container mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col gap-4 items-center justify-center mb-20">
            <h5 className="tracking-[5px] text-white font-light text-xs uppercase">
              Testimonial
            </h5>
            <h1 className="text-4xl sm:text-5xl font-bold text-center text-white">
               What Our Customer Say
            </h1>
          </div>

        {/* Testimonials Slider */}
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-2">
              <div className="bg-white p-4 shadow-md rounded-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
                {/* Avatar */}
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="mx-auto mb-3 w-12 h-12 rounded-full border-2 border-blue-500 shadow-sm"
                />

                {/* Rating */}
                <div className="flex justify-center mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.546 4.764a1 1 0 00.95.69h5.012c.967 0 1.371 1.24.588 1.81l-4.055 2.944a1 1 0 00-.364 1.118l1.546 4.764c.3.921-.755 1.688-1.54 1.118L10 15.347l-4.055 2.944c-.785.57-1.841-.197-1.54-1.118l1.546-4.764a1 1 0 00-.364-1.118L1.532 8.192c-.783-.57-.379-1.81.588-1.81h5.011a1 1 0 00.951-.69L9.05 2.927z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-600 text-sm italic mb-2 px-2">"{testimonial.review}"</p>

                {/* Customer Name */}
                <h3 className="font-bold text-blue-600 text-md">{testimonial.name}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
