import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';
import { TrendingUp } from '@mui/icons-material';

const MyState = (props) => {
    const [mode, setMode] = useState('light');
    const [loading, setLoading] = useState(false);

    // function for Dakr and light mode
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'RGB(252, 231, 227)';
        }
    }
    // get prduct data from firebase realtime database 
    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        descripetion: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: 'numeric',
            })

    });

    // AddProduct function
    const addProduct = async () => {
        if (products.title === null || products.price === null || products.imageUrl === null || products.category === null || products.descripetion === null) {
            return toast.error("All filds are required")
        }
        setLoading(true)
        try {
            const productRef = collection(fireDB, "products");
            await addDoc(productRef, products);
            toast.success("PRODUCT ADDED SUCCESSFULLY", {
                position: "top-right",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setLoading(false)
            getProductData();
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800)


        } catch (error) {
            setLoading(false)
            toast.error("Adding Product Failed");

            //   console.log(error)

        }
    }

    const [product, setProduct] = useState([]);

    //Get product function  

    const getProductData = async () => {
        setLoading(true)

        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy("time")
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id })
                })
                setProduct(productArray);
                setLoading(false)
            })
            return () => data;
        } catch (error) {
            //  console.log(error)
            toast.error("Somthing Went's Wrong");
            setLoading(false)

        }
    }
    // use effect is used to rerander the datat on every render
    useEffect(() => {
        getProductData();
    }, []);

    // edit product function

    const edithandle = (item) => {
        setProducts(item)
    }
    // update Product
    const updateProduct = async (item) => {
        setLoading(true)
        try {
            await setDoc(doc(fireDB, "products", products.id), products);
            toast.success("Product Updated successfully", {
                position: "top-right",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            getProductData();
            setLoading(false)

            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800)

        } catch (error) {
            toast.error("Updating Product Fail");
            setLoading(false)
            //  console.log(error)
        }
        setProducts("")
    }


    // Delete product function
    const deleteProduct = async (item) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, "products", item.id))
            toast.success("product Deleted Successfully", {
                position: "top-right",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            getProductData();
            setLoading(false);
        } catch (error) {
            //console.log(error)
            toast.error("product Delete faild")
            setLoading(false);
        }
    }
    
    // Get-Order Details
    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
      setLoading(true)
      try {
        const result = await getDocs(collection(fireDB, "order"))
        const ordersArray = [];
        result.forEach((doc) => {
          ordersArray.push(doc.data());
          setLoading(false)
        });
        setOrder(ordersArray);
      //  console.log( "Orders :-" + ordersArray)
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
   


    // Get User from Firebase database
    const [user, setUser] = useState([]);

    const getUSerData = async () => {
      setLoading(true)
      try {
        const result = await getDocs(collection(fireDB, "users"))
        const usersArray = [];
        result.forEach((doc) => {
          usersArray.push(doc.data());
          setLoading(false)
        });
        setUser(usersArray);
       // console.log( "Orders :-" + ordersArray)
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
   
    useEffect(() => {
        getOrderData()
        getUSerData();
      getProductData();
     
  
    }, []);


    //For filter and Search Operation

    const [searchkey, setSearchkey] =useState("");
    const [filterType, setFilterType] =useState("");
    const [filterPrice, setFilterPrice] =useState("");

    const [login, setLogin] = useState(false);
    const[userName, setUserName] = useState("")

login, setLogin
    return (
        <MyContext.Provider value={{
            mode, toggleMode, loading, setLoading, products, setProducts, addProduct, product, edithandle, updateProduct, deleteProduct, order, user, filterPrice, setFilterPrice, filterType, setFilterType, searchkey, setSearchkey, login, setLogin, userName, setUserName
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState