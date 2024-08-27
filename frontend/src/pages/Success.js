import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 3000);

    // Clear the timeout if the component unmounts before 5 seconds
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='flex justify-center items-center  bg-green-300 w-full max-w-md m-auto h-36 font-semibold text-lg'>
      <p>Payment is Successfully done !</p>
    </div>
  );
};

export default Success;
