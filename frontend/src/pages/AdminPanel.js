import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Role from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(()=> {
        if(user?.role !== Role.ADMIN){
            navigate("/")
        }
    },[user])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className='bg-white min-h-full w-full max-w-64 customShadow'>
            <div className='h-36 bg-slate-300 flex justify-center items-center rounded flex-col'>
                <div className='text-6xl cursor-pointer relative flex justify-center'>
                    {
                        user?.profilePic ? (
                            <img src= {user?.profilePic} className='w-20 h-20 rounded-full' alt = {user?.name} /> 
                        ) : (<FaRegUserCircle />)
                    }
               </div>
               <p className='capitalize text-lg font-semibold'>{user?.name}</p>
               <p className='capitalize text-sm'>{user?.role}</p>
            </div>

            {/**navigation */}

            <div>
                <nav className='grid p-3'>
                    <Link to={"all-users"} className='px-4 py-1 hover:bg-slate-400 rounded-xl'>All Users</Link>
                    <Link to={"all-products"} className='px-4 py-1 hover:bg-slate-400 rounded-xl'>All Products</Link>
                </nav>
            </div>
        </aside>

        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel