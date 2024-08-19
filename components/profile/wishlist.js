import React, { useState } from 'react';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([
        { id: 1, title: 'Destination 1', description: 'Description of destination 1', imageUrl: '/user.jpg' },
        { id: 2, title: 'Destination 2', description: 'Description of destination 2', imageUrl: '/user.jpg' },
        // Add more wishlist items as needed
    ]);

    return (
        <div className="w-full p-8 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlist.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover object-center" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
