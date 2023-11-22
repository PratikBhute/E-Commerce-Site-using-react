import React, { useContext, useEffect } from 'react'
import myContext from '../../context/data/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addToCart } from '../../redux/cardSlice'
import { TailSpin, ThreeDots } from 'react-loader-spinner'

function ProductCard() {
    const context = useContext(myContext)
    const { mode, loading, setLoading, product, filterType, setFilterType, filterPrice, setFilterPrice, searchkey, setSearchkey } = context

    const dispatch = useDispatch()
    const cartItem = useSelector((state) => state.cart);
    console.log(cartItem)

    const addCart = (product) => {
        setLoading(true)
        dispatch(addToCart(product));
        toast.success("Item Added Successfully", {
            position: "top-center",
            autoClose: 10,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,

            theme: "colored",
        })
        setLoading(false)
    }
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItem))
    }, [cartItem])
    return (
        <section className=" bg-pink-100 text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
                    <div className="h-1 w-20 bg-pink-600 rounded"></div>
                </div>
                {loading ? (<div className="flex  justify-center ">
                    {" "}
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="green" />
                </div>) : (<div className=" flex flex-wrap -m-4">
                    {product.filter((obj) => obj.title.toLowerCase().includes(searchkey)).filter((obj) => obj.category.toLowerCase().includes(filterType)).filter((obj) => obj.price.toLowerCase().includes(filterPrice)).slice(0, 8).map((item, index1) => {
                        const { title, price, imageUrl, id } = item;
                        return (
                            <div className="p-4 md:w-1/4  drop-shadow-lg " >
                                <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                    <div onClick={() => window.location.href = `/productinfo/${id}`} className="flex justify-center cursor-pointer" >
                                        <img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={imageUrl} alt="blog" />
                                    </div>
                                    <div className="p-5 border-t-2">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>E-Bharat</h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{title}</h1>
                                        {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
                                        <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>₹ {price}</p>
                                        <div className=" flex justify-center">
                                            <button onClick={() => addCart(item)} type="button" className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2">{loading ? <TailSpin height={25} color="white" /> : "Add to Card"} Cart</button>

                                        </div>
                                    </div>

                                </div>
                            </div>)
                    })}
                </div>)}


            </div>
        </section >

    )
}

export default ProductCard