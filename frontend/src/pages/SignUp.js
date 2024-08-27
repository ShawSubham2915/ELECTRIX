import React,{useState} from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye, FaEyeSlash, FaUpload } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const passwordValidation = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
};


const SignUp = () => {

  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data,setData] = useState ({
    email : "",
    password : "",
    name : "",
    confirmPassword : "",
    profilePic : "",
  })

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData( (prev) => {
      return {
          ...prev,
          [name] : value
      }
    })

  }

  const handleUploadpic = async(e) => {
    const file = e.target.files[0]

    const imagePic = await imageTobase64(file)

    setData((prev) => {
      return{
        ...prev,
        profilePic : imagePic
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordValidation(data.password)) {
      toast.error(
        'Password must contain at least one uppercase , one lowercase letter, one digit, and one special character'
      );
      return;
    }
  
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const dataApi = await dataResponse.json();

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
      }

      if(dataApi.error){
        toast.error(dataApi.message)
      }

  
    } else {
      toast.error("Please Check the password and confirm password")
    }
  };
  

  return (
    <section id="signup" className='bg-pink-100'>
    <div className="mx-auto container p-4"> 
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto transition-transform transform hover:scale-105">
        <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full border border-gray-300"> 
          <img src={data.profilePic || loginIcons} alt="profile pic" className="w-full h-full object-cover" />

          <form className="absolute bottom-0 w-full">
            <label className="flex bg items-center justify-center text-sm bg-opacity-80 bg-slate-200 p-2 cursor-pointer">
              <FaUpload className="mr-1" />
              Upload Photo
              <input
                type="file"
                className="hidden"
                onChange={handleUploadpic}
              />
            </label>
          </form>
        </div>

        <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid">
            <label className="text-gray-700">Name:</label>
            <div className="bg-slate-200 p-3 rounded-lg">
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="grid">
            <label className="text-gray-700">Email:</label>
            <div className="bg-slate-200 p-3 rounded-lg">
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-700">Password:</label>
            <div className="bg-slate-200 p-3 rounded-lg flex items-center">
              <input
                type='password'
                placeholder="Enter password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                required
                className="w-full outline-none bg-transparent"
              />
              {/* <div
                className="cursor-pointer text-xl ml-2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div> */}
            </div>
          </div>

          <div>
            <label className="text-gray-700">Confirm Password:</label>
            <div className="bg-slate-200 p-3 rounded-lg flex items-center">
              <input
                type= 'password'
                placeholder="Re-enter password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnChange}
                required
                className="w-full outline-none bg-transparent"
              />
              {/* <div
                className="cursor-pointer text-xl ml-2"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div> */}
            </div>
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 w-full rounded-full transition-transform hover:scale-110 mx-auto block mt-8"
          >
            Sign Up
          </button>

          <p className="my-5 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-red-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  </section>
  )
}

export default SignUp