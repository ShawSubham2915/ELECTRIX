import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUser from '../components/ChangeUser';


const AllUsers = () => {
    const [allUser,setAllUsers] = useState([])
    const [openRole,setOpenRole] = useState(false)
    const [updateUserDetails,setupdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id : ""

    })


    const fetchAllUsers = async() => {
        const fetchData = await fetch(SummaryApi.allUser.url,{
            method : SummaryApi.allUser.method,
            credentials : 'include'
        })

        const dataResponse = await fetchData.json()

        console.log(dataResponse)

        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

        
    }

    useEffect(() => {
        fetchAllUsers()
    },[])

  return (
    <div className='bg-white pb-4'>
        
    <table className='w-full userTable'>
        <thead>
            <tr className='bg-grey-200 text-black'>
                <th>Sr.</th>
                <th>Name</th>
                <th>E-mail</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody className='bg-slate-200 text-black'>
            {
                allUser.map((el,index) => {
                    return(
                        <tr>
                            <td>{index+1}</td>
                            <td>{el?.name}</td>
                            <td>{el?.email}</td>
                            <td>{el?.role}</td>
                            <td>{moment(el?.createdAt).format('LL')}</td>
                            <td>
                                <button 
                                className='bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-600 hover:text-white'
                                onClick={ () => {
                                setupdateUserDetails(el)
                                setOpenRole(true)}}>
                                    <MdModeEdit />
                                </button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>

    {
        openRole && (
            <ChangeUser 
            onClose={()=>setOpenRole(false)} 
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId = {updateUserDetails._id}
            callFunc={fetchAllUsers}
            />
        )
    }
    
</div>
  )
}

export default AllUsers