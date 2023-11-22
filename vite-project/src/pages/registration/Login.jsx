import { Link } from 'react-router-dom'
import Face2Icon from '@mui/icons-material/Face2Sharp';
import { useContext, useState } from 'react';
import myContext from '../../context/data/myContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const contaxt = useContext(myContext);
    const { loading, setLoading } = contaxt;

    const navigate = useNavigate();

    const signin = async () => {
        setLoading(true)
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('user', JSON.stringify(result))
            toast.success("Signin Successfully", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
                navigate('/')
            setLoading(false);
        } catch (error) {
            toast.error('Sigin Failed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false);
        }


    }

    return (
        <div className=' flex justify-center items-center h-screen'>
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className='text-center text-white text-xl mb-4 font-bold'>
                    <Face2Icon sx={{ fontSize: 90 }} />
                </div>
                <div>
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input type="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"  
                         value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                <button onClick={signin} className="flex mx-auto w-full justify-center   text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                  {loading ? <TailSpin height={25} color="white" /> : "Login"}
                </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login