import React,{useContext, useState} from 'react'
import loginIcons from '../assest/login-animation.gif'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Google-logo';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


const Login = () => {
  const [showPassword,setShowPassword] = useState(false);
  const [data,setData] = useState ({
    email : "",
    password : ""
  })

  const navigate = useNavigate()
  const {fetchUserDetails, fetchUserAddToCart}= useContext(Context)


  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData( (prev) => {
      return {
          ...prev,
          [name] : value
      }
    })

  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const dataResponse = await fetch(SummaryApi.signIn.url,{
      method : SummaryApi.signIn.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/')
        fetchUserDetails()
        fetchUserAddToCart()
    }

    if(dataApi.error){
      toast.error(dataApi.message)
    }
  }

  // sign in with goggle

  const handleGoogleSignIn = () => 
    {
    window.open("http://localhost:8000/auth/google/callback","_self")
    };

  return (
    <section id="login" className='bg-pink-100'>
    <div className="mx-auto container p-4 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto transition-transform transform hover:scale-105">
        <div className="w-20 h-20 mx-auto mb-4">
          <img src={loginIcons} alt="login icon" className="rounded-full" />
        </div>

        <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid">
            <label className="text-gray-700">Email:</label>
            <div className="bg-slate-100 p-3 rounded-lg">
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-700">Password:</label>
            <div className="bg-slate-100 p-3 rounded-lg flex items-center">
              <input
                type= 'password'
                placeholder="Enter password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                className="w-full outline-none bg-transparent"
              />
              {/* <div
                className="cursor-pointer text-xl ml-2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div> */}
            </div>
            {/* <Link
              to="/forgot-password"
              className="block w-fit ml-auto hover:underline text-gray-600 mt-1"
            >
              Forgot Password?
            </Link> */}
          </div>

          <button
            type="submit"
            className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-transform mx-auto block mt-5"
          >
            Login
          </button>

          <p className="m-6 text-center">
          Don't have an account?{' '}
          <Link to="/sign-up" className="text-blue-500 font-semibold hover:text-red-500 underline">
            Sign Up
          </Link>
          <span className='flex justify-center mt-2'>OR</span>
        </p>
          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="bg-white border border-gray-300 text-gray-600 py-2 w-full max-w-[280px] rounded-full flex items-center justify-center hover:shadow-lg hover:bg-slate-300 transition-transform mx-auto block mt-3"
          >
            <Logo />
            Sign in with Google
          </button>
        </form>

        
      </div>
    </div>
  </section>
  )
}

export default Login