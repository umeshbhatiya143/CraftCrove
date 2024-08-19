import React, { useState ,useEffect} from 'react';
import { FaFileDownload } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Invoice from '../Invoice';
// import { useSelector } from "react-redux";

const TravelersDetail = ({ travelersDetail, bookingStatus, journeyStatus, totalPrice, packageTitle, paymentDetails, startDate, endDate ,packageId}) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showInvoiceDesc, setShowInvoiceDesc] = useState(false)
    const [bill, setBill] = useState({});
    // const userData = useSelector((state) => state.auth.userData);
    const [name, setName] = useState("");
    const [packageDetails,setpackageDetails]=useState({
       
            title: "",
            description: "",
            duration: 0,
            price: 0,
            discount: 0,
            datesAvailable: [],
            destinations: [],
            itinerary: [],
            inclusions: [],
            exclusions: [],
            hotels: [],
            transportation: "",
            images: [],
            rating: "",
            reviews: [],
            numberOfBookingsMade: 0,
            availableSpots: 0,
            cancellationPolicy: "",
            paymentOptions: [],
            minimumGroupSize: 0,
            maximumGroupSize: 0,
            ageRestrictions: 0,
            healthAndSafetyMeasures: "",
            specialOffers: "",
            tagsKeywords: [],
      
    })

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const fetchUser = async () => {
        // setIsLoading(true)
    
        try {
          const url = new URL(
            `${process.env.NEXT_PUBLIC_HOST}/api/users/${userData.userId}`
          );
          const params = { fields: "name" }; // Define fields you want to fetch
          url.search = new URLSearchParams(params).toString();
    
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
          const data = await response.json();
          setName(data.user.name)
          // console.log(data);
    
        }
        catch (err) {
          console.log(err);
        }
      };

      const fetchPackage = async (packageId) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/packages/${packageId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          setpackageDetails(data.package);
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(()=>{fetchPackage(packageId)},[packageId])
    
    useEffect(() => {
        
        //fetchPackage(packageId)
         
        // Calculate the bill for each package
        const originalPrice = packageDetails.price;
        // const noOfTraveller = parseInt(localStorage.getItem("noOfTraveller")) || 0;
        const discount = packageDetails.discount;
    
        const bill = originalPrice * travelersDetail.length;
        const discountedBill = Math.floor(bill - (bill * discount) / 100);
        const discountAmt = Math.floor((bill * discount) / 100);
        const taxedBill = discountedBill + (discountedBill * 18) / 100;
        const taxAmt = (discountedBill * 18) / 100;
    
        const paymentBill = {
          discount: discount,
          originalPrice: bill,
          discountedPrice: discountedBill,
          taxedPrice: taxedBill,
          discountAmt: discountAmt,
          taxAmt: taxAmt,
        };
    
        // Update the bill state
        setBill(paymentBill);
        //console.log(bill)
        fetchUser();
      }, [packageDetails]);
    
    

    return (
        <div className="p-4 bg-custom-white rounded shadow-lg mb-4">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-deep-purple font-semibold">{packageTitle}</h3>
                    <p className="text-dark-cyan">Total Price: {totalPrice}</p>
                    <p className="text-dark-cyan">Start Date: {startDate}</p>
                    <p className="text-dark-cyan">End Date: {endDate}</p>
                </div>
                <div className="flex items-center">
                    <button className=" text-bg-purple transition-all duration-1000 px-4 py-2 rounded relative">
                        {showInvoiceDesc && <span className='absolute transition-all duration-1000 w-40 bg-deep-purple rounded-md text-custom-white -top-10 -right-10'>Download Invoice</span>}
                       {travelersDetail && travelersDetail.length > 0 &&  <PDFDownloadLink
                            document={<Invoice bookingObj={{
                                ...{
                                    userName:name,
                                    bill:bill,
                                    travelersDetail: travelersDetail,
                                    bookingStatus: bookingStatus,
                                    journeyStatus: journeyStatus,
                                    totalPrice: totalPrice,
                                    packageTitle: packageTitle,
                                    paymentDetails: paymentDetails,
                                    startDate: startDate,
                                    endDate: endDate,
                                    address: {
                                        address_line1: "1234 Main Street",
                                        address_line2: "Apartment 101",
                                        city: "Bangalore",
                                        state: "Karnataka",
                                        postal_code: "560001",
                                        country: "India",
                                    },
                                    gstNo: "GST456763",
                                    gst:18
                                }
                            }} />}
                            fileName="invoice.pdf"
                        >
                            {({ blob, url, loading, error }) =>
                                loading ? "Loading document..." : <span className='flex items-center '> <FaFileDownload
                                    onMouseEnter={() => setShowInvoiceDesc(!showInvoiceDesc)}
                                    onMouseLeave={() => setShowInvoiceDesc(!showInvoiceDesc)} size={20} className="mr-2"
                                /></span>
                            }
                        </PDFDownloadLink> }

                    </button>
                    <button className="text-deep-purple font-semibold mr-2" onClick={toggleDetails}>
                        {showDetails ? (
                            <span className='flex items-center gap-2'>
                                Hide Details <IoIosArrowUp />
                            </span>
                        )
                            : (
                                <span className='flex items-center gap-2'>
                                    Show Details <IoIosArrowDown />
                                </span>
                            )}
                    </button>
                </div>
            </div>
            {showDetails && (
                <div className="mt-4">
                    <h4 className="text-dark-cyan font-semibold">Additional Details:</h4>
                    <p className="text-dark-cyan">Booking Status: {bookingStatus}</p>
                    <p className="text-dark-cyan">Journey Status: {journeyStatus}</p>
                    {travelersDetail && travelersDetail.length > 0 ? (
                        <div className="mt-4">
                            <h4 className="text-dark-cyan font-semibold">Travelers Details:</h4>
                            {travelersDetail.map((traveler, index) => (
                                <div key={index} className="border-b border-gray-300 py-2">
                                    <p className="text-gray-700">Traveller {index + 1}</p>
                                    <p className="text-gray-600">First Name: {traveler.firstName}</p>
                                    <p className="text-gray-600">Last Name: {traveler.lastName}</p>
                                    <p className="text-gray-600">Date of Birth: {new Date(traveler.dob).toLocaleDateString()}</p>
                                    <p className="text-gray-600">Gender: {traveler.gender}</p>
                                    <p className="text-gray-600">Aadhaar Number: {traveler.aadhaarNumber}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-dark-cyan">No travelers details available</p>
                    )}
                    <div className="mt-4">
                        <h4 className="text-dark-cyan font-semibold">Payment Details:</h4>
                        <p className="text-gray-600">Order ID: {paymentDetails.orderId}</p>
                        <p className="text-gray-600">Payment ID: {paymentDetails.paymentId}</p>
                    </div>
                    <div className="mt-4">
                        <button className="bg-deep-purple text-custom-white px-4 py-2 rounded">
{/* 
                            <PDFDownloadLink
                                document={<Invoice bookingOBj={{
                                    ...{
                                        travelersDetail: travelersDetail,
                                        bookingStatus: bookingStatus,
                                        journeyStatus: journeyStatus,
                                        totalPrice: totalPrice,
                                        packageTitle: packageTitle,
                                        paymentDetails: paymentDetails,
                                        startDate: startDate,
                                        endDate: endDate,
                                        address: {
                                            "address1": "House no 12,xyz",
                                            "address2": "line 2 mn",
                                            "city": "abc",
                                            "state": "UP",
                                            "postalCode": "800010",
                                            "country": "India"
                                        },
                                        gstNo: "GST456763"
                                    }
                                }} />}
                                fileName="invoice.pdf"
                            >
                                {({ blob, url, loading, error }) =>
                                    loading ? "Loading document..." : <span className='flex items-center '><FaFileDownload className="mr-2" /> Download Invoice</span>
                                }
                            </PDFDownloadLink> */}

                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TravelersDetail;
