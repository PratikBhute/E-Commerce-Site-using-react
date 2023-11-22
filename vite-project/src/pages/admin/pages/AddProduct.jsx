import React, { useContext } from 'react'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import myContext from '../../../context/data/myContext';
import { TailSpin } from 'react-loader-spinner';
function AddProduct() {
    const context = useContext(myContext)
    const { products, setProducts, addProduct, loading } = context;
    return (
        <div>
            <div className=' flex justify-center items-center h-screen'>
                <div className=' bg-gray-800 px-10 py-5 rounded-xl '>

                    <div className='text-center text-white text-xl mb-4 font-bold'>
                        <ProductionQuantityLimitsIcon sx={{ fontSize: 75 }} />
                    </div>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Add Product</h1>
                    </div>
                    <div>
                        <input type="text"
                            name='title'
                            value={products.title}
                            onChange={(e) => setProducts({ ...products, title: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='price'
                            value={products.price}
                            onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product price'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='imageurl'
                            value={products.imageUrl}
                            onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product imageUrl'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='category'
                            value={products.category}
                            onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                        />
                    </div>
                    <div>
                        <textarea cols="30" rows="3"
                            name='description'
                            value={products.descripetion}
                            onChange={(e) => setProducts({ ...products, descripetion: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product Description'>

                        </textarea>
                    </div>
                    <div className=' flex justify-center mb-3'>
                    <button onClick={addProduct} className="flex mx-auto w-full justify-center   text-white bg-yellow-400 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-500 rounded text-lg">
                  {loading ? <TailSpin   height={25} color="white" /> : "Login"}
                </button>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddProduct