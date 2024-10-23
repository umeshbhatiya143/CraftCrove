// components/AddressPopup.js

import React, { useState } from 'react';

const AddressForm = ({ isOpen, onClose, onSave, userId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // console.log("form",userId)

    const handleSubmit = async () => {
        const newAddress = { name, email, phone, address, city, state, country, pincode };

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/address?id=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAddress),
            });

            if (!response.ok) {
                throw new Error('Failed to save address');
            }

            const data = await response.json();
            onSave(data); // Pass the saved address data back to the parent
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white  h-[90vh] overflow-y-scroll p-6 rounded-lg shadow-lg w-11/12 max-w-md">
                <h2 className="text-lg text-center text-pink-600 font-semibold mb-4">Add New Address</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="grid grid-cols-1 gap-4">
                    {[
                        { label: 'Name', value: name, setter: setName, type: 'text' },
                        { label: 'Email', value: email, setter: setEmail, type: 'email' },
                        { label: 'Phone', value: phone, setter: setPhone, type: 'tel' },
                        { label: 'City', value: city, setter: setCity, type: 'text' },
                        { label: 'State', value: state, setter: setState, type: 'text' },
                        { label: 'Country', value: country, setter: setCountry, type: 'text' },
                        { label: 'Pincode', value: pincode, setter: setPincode, type: 'text' },
                    ]
                        .map(({ label, value, setter, type }, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700">{label}</label>
                                <input
                                    type={type}
                                    value={value}
                                    onChange={(e) => setter(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
                                    required
                                />
                            </div>
                        ))}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-pink-500 focus:border-pink-500"
                            rows="3"
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={handleSubmit}
                            className={`bg-pink-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-pink-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Address'}
                        </button>
                        <button
                            onClick={onClose}
                            className="ml-2 text-gray-700 font-semibold py-2 px-4 rounded-md shadow hover:bg-gray-200 transition duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressForm;
