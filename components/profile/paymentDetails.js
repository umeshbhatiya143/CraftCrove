import React, { useState } from 'react';
import { FaCreditCard, FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

const PaymentDetails = () => {
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, cardNumber: '**** **** **** 1234', cardHolder: 'John Doe', expiry: '08/23' },
        { id: 2, cardNumber: '**** **** **** 5678', cardHolder: 'Jane Smith', expiry: '10/24' },
    ]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const handleEdit = (method) => {
        setIsEditing(true);
        setSelectedPaymentMethod(method);
    };

    const handleDelete = (id) => {
        setPaymentMethods(prevMethods => prevMethods.filter(method => method.id !== id));
    };

    const handleCancel = () => {
        setIsEditing(false);
        setSelectedPaymentMethod(null);
    };

    const handleSave = () => {
        // Here you would typically send the update to your server
        setIsEditing(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSelectedPaymentMethod(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="w-full mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-deep-purple mb-4">Payment Methods</h2>
            {paymentMethods.map((method) => (
                <div key={method.id} className="flex justify-between items-center mb-2 p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <FaCreditCard className="text-dark-cyan" />
                        <span className="font-bold">{method.cardNumber}</span>
                        <span className="text-sm text-gray-600">- Expires {method.expiry}</span>
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={() => handleEdit(method)} className="text-dark-cyan hover:text-deep-purple">
                            <FaPencilAlt />
                        </button>
                        <button onClick={() => handleDelete(method.id)} className="text-red-500 hover:text-red-700">
                            <FaTrashAlt />
                        </button>
                    </div>
                </div>
            ))}

            {isEditing && (
                <form className="mt-4 p-4 bg-gray-200 rounded">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">Card Number:</label>
                            <input type="text" name="cardNumber" value={selectedPaymentMethod.cardNumber} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">Card Holder:</label>
                            <input type="text" name="cardHolder" value={selectedPaymentMethod.cardHolder} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-1">Expiry:</label>
                            <input type="text" name="expiry" value={selectedPaymentMethod.expiry} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4 space-x-2">
                        <button onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
                        <button onClick={handleSave} className="bg-dark-cyan text-white px-4 py-2 rounded hover:bg-deep-purple">Save</button>
                    </div>
                </form>
            )}

            {!isEditing && (
                <button onClick={() => {
                    setIsEditing(true);
                    setSelectedPaymentMethod({ cardNumber: '', cardHolder: '', expiry: '' });
                }} className="mt-4 bg-dark-cyan text-white px-4 py-2 rounded hover:bg-deep-purple">
                    Add New Payment Method
                </button>
            )}
        </div>
    );
};

export default PaymentDetails;
