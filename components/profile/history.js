import React, { useState } from 'react';

const History = () => {
    const [searchHistory, setSearchHistory] = useState([
        { id: 1, itinerary: 'London Trip', date: '2023-05-15' },
        { id: 2, itinerary: 'Paris Adventure', date: '2023-07-20' },
        // Add more search history items as needed
    ]);

    return (
        <div className="w-full p-8 bg-gray-200 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Search History</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Itinerary</th>
                            <th className="px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchHistory.map(item => (
                            <tr key={item.id} className="border-b border-gray-300">
                                <td className="px-4 py-2">{item.itinerary}</td>
                                <td className="px-4 py-2">{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default History;
