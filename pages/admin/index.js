import React, { useState , useEffect} from 'react';
import AddProduct from '../../components/admin/addProduct'
import AllProducts from '../../components/admin/allProducts'
import Dashboard from '../../components/admin/dashboard'
import { useRouter } from 'next/router';
// import Header from '@/Components/admin/header';


const AdminDashboard = () => {
    const router = useRouter();

    const [selectedPage, setSelectedPage] = useState('dashboard')


    const renderPage = () => {
        switch (selectedPage) {
            case 'dashboard':
                return <Dashboard />
            case 'allProducts':
                return <AllProducts />;
            case 'addProduct':
                return <AddProduct />;
        }
    };

    useEffect(()=>{
        console.log(selectedPage)
    },[selectedPage])

    // useEffect(()=>{
    //     const isLoggedIn = localStorage.getItem("adminLogin");
    //     console.log(isLoggedIn);
    //     if(isLoggedIn===""){
    //       router.push('/admin/login');
    //     }
    //   })

    return (
        <>
        {/* <Header/> */}
            <div className='w-full h-screen overflow-hidden flex gap-4 scroll-bar'>
                <div className="w-80 flex flex-col gap-6 h-screen p-6 pt-10 bg-gray-400">
                    <h1 className="text-2xl font-bold text-deep-purple text-center rounded-md bg-white p-2 shadow-md mb-4">Admin Panel</h1>
                    <ul className="text-white">
                        <li
                            onClick={() => setSelectedPage('dashboard')}
                            className="mb-2 border-b-2 transition-all duration-700 hover:bg-pink-500 bg-opacity-50 p-3 rounded-md hover:text-yellow-300 cursor-pointer">Dashboard</li>
                        <li
                            onClick={() => setSelectedPage('allProducts')}
                            className="mb-2 border-b-2 transition-all duration-700 hover:bg-pink-500 bg-opacity-50 p-3 rounded-md hover:text-yellow-300 cursor-pointer">Products</li>
                        <li
                            onClick={() => setSelectedPage('addProduct')}
                            className="mb-2 border-b-2 transition-all duration-700 hover:bg-pink-500 bg-opacity-50 p-3 rounded-md hover:text-yellow-300 cursor-pointer">Add Product</li>
                    </ul>
                </div>

                {/* component */}
                <div className="h-[90vh] w-full overflow-scroll pt-4 pb-4" style={{ scrollbarWidth: "none" }}>
                    {renderPage()}
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
