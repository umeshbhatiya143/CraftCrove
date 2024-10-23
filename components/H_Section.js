import React, {useState, useEffect} from 'react'
import Card from './card'

const H_Section = ({ sectionData }) => {
    const [sliceLimit, setSliceLimit] = useState(5); // Default slice limit for desktop

    useEffect(() => {
        const handleResize = () => {
            if (window.matchMedia('(max-width: 640px)').matches) {
                setSliceLimit(6); // Mobile view
            } else {
                setSliceLimit(5); // Desktop view
            }
        };

        handleResize(); // Set initial slice limit
        window.addEventListener('resize', handleResize); // Listen for window resize

        return () => {
            window.removeEventListener('resize', handleResize); // Clean up listener on unmount
        };
    }, []);

    return (
        <section className="body-font bg-gray-50">
            <div className="container mx-auto px-[2px] sm:px-5 py-10 sm:py-20">
                <div className="flex flex-col gap-4 items-center justify-center mb-10">
                    <h5 className="tracking-[4px] sm:tracking-[5px] text-blue-600 font-light text-xs uppercase">
                        OUR PREMIUM
                    </h5>
                    <h1 className="text-5xl text-center font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text">
                        {sectionData.name}
                    </h1>
                </div>

                <div className="flex flex-wrap justify-center gap-1">
                    {Object.keys(sectionData.products).length > 0 ? (
                        Object.keys(sectionData.products)
                            .slice(0, sliceLimit) // Adjust slice based on mobile/desktop view
                            .map((item, index) => (
                                <Card product={sectionData.products[item]} key={index} />
                            ))
                    ) : (
                        <p>No {sectionData.name} available</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default H_Section