import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { BsCloudUpload } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/assets/loader.gif'
import Image from 'next/image';

export default function TourPackageForm() {
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [hotels, setHotels] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        slug: 0,
        price: 0,
        discount: 0,
        datesAvailable: [],
        destinations: [],
        itinerary: [],
        inclusions: [],
        exclusions: [],
        hotels: [],
        transportation: '',
        images: [],
        rating: '',
        reviews: [],
        numberOfBookingsMade: 0,
        availableSpots: 0,
        cancellationPolicy: '',
        paymentOptions: [],
        minimumGroupSize: 0,
        maximumGroupSize: 0,
        ageRestrictions: 0,
        healthAndSafetyMeasures: '',
        specialOffers: '',
        tagsKeywords: [],
    });

    const toastOptions = {
        position: "top-right",
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    }

    const fetchHotelData = async () => {

        try {
            // Construct URL with query parameters
            const url = new URL(`${process.env.NEXT_PUBLIC_HOST}/api/hotels/names`);
            //   const params = { fields: 'name,profilePicture,gender,dob,pincode,state,country,address' }; // Define fields you want to fetch
            //   url.search = new URLSearchParams(params).toString();

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setHotels(data);

        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    const handleImageUpdate = async (selectedFile) => {
        // return new Promise(async (resolve, reject) => {
        //   if (!selectedFile) {
        //     resolve();
        //     return;
        //   }
        const formData = new FormData();
        formData.append('photo', selectedFile[0]);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/images/upload-image`, {
                method: 'POST',
                body: formData,
            });
            // if (!response.ok) throw new Error('Failed to upload image');
            const { imageUrl } = await response.json();
            return imageUrl;  // Resolve the promise with the new image URL
        } catch (error) {
            console.error(error.message);
            toast.error('Error uploading image', toastOptions);
            // reject(error);
        }
        // });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true)

        try {
            const imgs = await Promise.all(imageURLs.map(async (imag) => {
                return handleImageUpdate(imag);
            }));

            const updatedData = {
                ...formData,
                images: imgs
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/packages/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error('Failed to add package');
            toast.success('Package added successfully', toastOptions);
        } catch (error) {
            console.error(error.message);
            toast.error('Failed to add package', toastOptions);
        } finally {
            setIsLoading(false)
            setFormData({
                title: '',
                description: '',
                slug: 0,
                price: 0,
                discount: 0,
                datesAvailable: [],
                destinations: [],
                itinerary: [],
                inclusions: [],
                exclusions: [],
                hotels: [],
                transportation: '',
                images: [],
                rating: '',
                reviews: [],
                numberOfBookingsMade: 0,
                availableSpots: 0,
                cancellationPolicy: '',
                paymentOptions: [],
                minimumGroupSize: 0,
                maximumGroupSize: 0,
                ageRestrictions: 0,
                healthAndSafetyMeasures: '',
                specialOffers: '',
                tagsKeywords: [],
            })
            setInputValue('')
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prevState => ({
            ...prevState,
            datesAvailable: [...prevState.datesAvailable, date]
        }));
    };

    // Function to handle removing a selected date
    const handleRemoveDate = (dateToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            datesAvailable: formData.datesAvailable.filter(date => date !== dateToRemove)
        }));
    };

    //destinations
    const handleInputChange = (e) => {
        setInputValue(e.target.textContent);
    };

    const handleDestinationsKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addDestination();
        }
    };

    const addDestination = () => {
        const destination = inputValue.trim();
        if (destination) {
            setFormData(prevState => ({
                ...prevState,
                destinations: [...prevState.destinations, destination]
            }));
            setInputValue('');
        }
    };

    const removeDestination = (indexToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            destinations: prevState.destinations.filter((_, index) => index !== indexToRemove)
        }));
    };


    //itinerary
    const handleItineraryKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addItineraryItem();
        }
    };

    const addItineraryItem = () => {
        const item = inputValue.trim();
        if (item) {
            setFormData(prevState => ({
                ...prevState,
                itinerary: [...prevState.itinerary, item]
            }))
            setInputValue('');
        }
    };

    const removeItineraryItem = (indexToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            itinerary: prevState.itinerary.filter((_, index) => index !== indexToRemove)
        }));
    };

    //inclusions
    const handleInclusionsKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addInclusionsItem();
        }
    };

    const addInclusionsItem = () => {
        const item = inputValue.trim();
        if (item) {
            setFormData(prevState => ({
                ...prevState,
                inclusions: [...prevState.inclusions, item]
            }))
            setInputValue('');
        }
    };

    const removeInclusionsItem = (indexToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            inclusions: prevState.inclusions.filter((_, index) => index !== indexToRemove)
        }));
    };

    //exclusions
    const handleExclusionsKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addExclusionsItem();
        }
    };

    const addExclusionsItem = () => {
        const item = inputValue.trim();
        if (item) {
            setFormData(prevState => ({
                ...prevState,
                exclusions: [...prevState.exclusions, item]
            }))
            setInputValue('');
        }
    };

    const removeExclusionsItem = (indexToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            exclusions: prevState.exclusions.filter((_, index) => index !== indexToRemove)
        }));
    };

    //keywords
    const handleKeywordsKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addKeywordsItem();
        }
    };

    const addKeywordsItem = () => {
        const item = inputValue.trim();
        if (item) {
            setFormData(prevState => ({
                ...prevState,
                tagsKeywords: [...prevState.tagsKeywords, item]
            }))
            setInputValue('');
        }
    };

    const removeKeywordsItem = (indexToRemove) => {
        setFormData(prevState => ({
            ...prevState,
            tagsKeywords: prevState.tagsKeywords.filter((_, index) => index !== indexToRemove)
        }));
    };


    //hotels
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleHotelSelect = (hotelId) => {
        if (!formData.hotels.includes(hotelId)) {
            setFormData(prevState => ({
                ...prevState,
                hotels: [...prevState.hotels, hotelId]
            }));
        }
    };

    const handleRemoveHotel = (hotelId) => {
        setFormData(prevState => ({
            ...prevState,
            hotels: prevState.hotels.filter((id) => id !== hotelId)
        }));
    };


    //images
    function onImageChange(e) {
        e.preventDefault()

        setImageURLs(prevState => [...prevState, e.target.files]);

        const file = e.target.files[0];

        // Get the first selected file
        const reader = new FileReader();

        reader.onload = function (event) {
            const imageUrl = event.target.result;
            setImages(prevState => [...prevState, imageUrl])
        };

        // Read the selected file as a data URL
        reader.readAsDataURL(file);
    }

    function deleteImage(index) {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        setImageURLs(updatedImages)
    }

    useEffect(() => {
        console.log(formData)
    })

    useEffect(() => {
        fetchHotelData()
    }, [])

    return (
        <div className="mx-auto px-4 py-12 bg-gray-200">
            {/* <div className="relative w-full flex justify-end">
                <span
                    onClick={() => setIsShowPackageForm(!isShowPackageForm)}
                    className="absolute -right-10 -top-10 z-1 p-2 flex justify-center items-center rounded-lg transition-all slug-300 bg-gray-100 hover:bg-dark-cyan hover:text-white cursor-pointer">
                    <RxCross2 size={20} />
                </span>
            </div> */}
            <h1 className="text-3xl text-center font-bold mb-10">Add Product form</h1>
            <form action='' onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="slug" className="block text-gray-700 font-bold mb-2">Slug:</label>
                    <input type="number" id="slug" name="slug" value={formData.slug} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="discount" className="block text-gray-700 font-bold mb-2">Discount (in %):</label>
                    <input type="number" id="discount" name="discount" value={formData.discount} onChange={handleChange} className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                
                {!isLoading ? (<button type="submit" className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">Submit</button>)
                    :
                    (
                        <div className="w-20 h-20 relative">
                            <Image src={Loader} alt="Loading..." layout="fill" objectFit="cover" />
                        </div>
                    )}
            </form >

            <ToastContainer />
        </div >
    );
}