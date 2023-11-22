import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext';
import Layout from '../../compoents/layout/Layout';
import Modal from '../../compoents/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cardSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { fireDB } from '../../firebase/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';






function Cart() {

    const context = useContext(myContext)
    const { mode } = context;



    const dispatch = useDispatch();


    const cartItem = useSelector((state) => state.cart);

    // delete the cart item
    const deletCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("item deleted Succcessfully")
    }
    // store the cart item in locAL STORAGE
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItem))
    })

    // for total amount of cart item
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        let temp = 0;
        cartItem.forEach((cartItem) => {
            temp = temp + parseInt(cartItem.price)
        })
        setTotalAmount(temp);
        console.log(temp)
    }, [cartItem])

    const shiping = parseInt(49);
    const grandTotal = shiping + totalAmount;
    console.log(grandTotal);




    // For Rozor Pay Payment function
    const [name, setName] = useState("")
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const buyNow = async () => {
        // validation 
        if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
            return toast.error("All fields are required", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
        const addressInfo = {
            name,
            address,
            pincode,
            phoneNumber,
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }
        console.log(addressInfo)

        var options = {
            key: "rzp_test_tVNe0mm7NVQqOl",
            key_secret: "bXEstZvUwbuKoiffHNUJ6ERb",
            amount: parseInt(grandTotal * 100),
            currency: "INR",
            order_receipt: 'order_rcptid_' + name,
            name: "D-Mart",
            description: "for testing purpose",
            handler: function (response) {

                // console.log(response)
                toast.success('Payment Successful')

                const paymentId = response.razorpay_payment_id
                // store in firebase 
                const orderInfo = {
                    cartItem,
                    addressInfo,
                    date: new Date().toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    ),
                    email: JSON.parse(localStorage.getItem("user")).user.email,
                    userid: JSON.parse(localStorage.getItem("user")).user.uid,
                    paymentId
                }

                try {
                    const oderRef = collection(fireDB, 'order');
                    addDoc(oderRef, orderInfo)
                } catch (error) {
                    console.log(error)
                }
            },

            theme: {
                color: "#3399cc"
            }
        };
        var pay = new window.Razorpay(options);
        pay.open();
        console.log(pay)
    }


    return (
        <Layout >
            {cartItem != "" ? <div className="h-screen bg-gray-100 pt-5 mb-[60%] " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
                    <div className="rounded-lg md:w-2/3 ">

                        {cartItem.map((item, index) => {

                            const { title, price, descripetion, imageUrl } = item;

                            return (<div key={index} className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                                <img src={imageUrl} alt="product-image" className="w-full rounded-lg sm:w-52" />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-end">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg mt-5 mb-5 font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h2>
                                        <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{descripetion}</h2>
                                        <p className="mt-5  text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</p>
                                    </div>
                                    <div onClick={() => deletCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>

                                    </div>
                                </div>
                            </div>)
                        })}

                    </div>

                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
                            {cartItem != "" ? <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{shiping}</p> : "0"}
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between mb-3">
                            <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
                            <div className>
                                {cartItem != "" ? <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{grandTotal}</p> : '0'}
                            </div>
                        </div>
                        {/* <Modal  /> */}
                        <Modal
                            // Props passing
                            name={name}
                            address={address}
                            pincode={pincode}
                            phoneNumber={phoneNumber}
                            setName={setName}
                            setAddress={setAddress}
                            setPincode={setPincode}
                            setPhoneNumber={setPhoneNumber}
                            buyNow={buyNow}
                        />
                    </div>
                </div>
            </div> :

                //for Empty Card image
                <div className=' flex justify-center '>
                    <Link to={"/"}>
                        <img src="https://cdn.dribbble.com/users/839490/screenshots/5255630/attachments/1140383/dribbble_-_shoot.png" alt="empty-cart-image" className=" w-full  px rounded-lg " />
                    </Link>
                </div>
            }
        </Layout>
    )
}

export default Cart