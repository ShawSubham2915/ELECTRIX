import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';
import PaymentCheckout from './PaymentCheckout';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';


const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);
    const [totalPayment, setTotalPayment] = useState(0);
    const [check, setCheck] = useState(false);
    const [paymentSucess, setPaymentSucess] = useState(false);
    const [billingAddress, setBillingAddress] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        // country: '',
    });

    const navigate = useNavigate();

    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
        });

        const responseData = await response.json();

        if (responseData.success) {
            setData(responseData.data);
        }
    };

    const handleLoading = async () => {
        await fetchData();
    };

    useEffect(() => {
        setLoading(true);
        handleLoading();
        setLoading(false);
    }, []);

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1,
            }),
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
        }
    };

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1,
                }),
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
            }
        }
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                _id: id,
            }),
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    const handleOpenRazorpay = (data) => {
        const options = {
            key: 'rzp_test_kZVWZbWYZhLj1W', // Change this to your Razorpay test key
            amount: Number(data.amount),
            currency: data.currency,
            name: 'ELECTRIX',
            description: 'Electronic Gadgets',
            order_id: data.id,
            handler: function (response) {
                fetch('http://localhost:8000/api/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ response }),
                })
                    .then((res) => res.json())
                    .then((res) => {
                        setPaymentSucess(true);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handlePayment = async () => {
        // Check if all billing address fields are filled
        if (Object.values(billingAddress).some((field) => field.trim() === '')) {
            toast.error('Please fill the billing address details.');
            return;
        }

        const response = await fetch(SummaryApi.payment.url, {
            method: SummaryApi.payment.method,
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                totalPayment,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                handleOpenRazorpay(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        if (paymentSucess) {
            fetch('http://localhost:8000/api/delete-all-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    setData([]);
                    navigate('/success');
                    context.fetchUserAddToCart();
                });
        }
    }, [paymentSucess]);

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0);

    useEffect(() => {
        setTotalPayment(totalPrice);
    }, [totalPrice]);

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            
            {check ? (
                <PaymentCheckout totalPayment={totalPayment} data={data} />
            ) : (
                <div className='container mx-auto'>
                    <div className='text-center text-lg my-3'>
                        {data.length === 0 && !loading && <p className='bg-white py-5'>Your Cart is empty!</p>}
                    </div>

                    <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                        <div className='w-full max-w-3xl'>
                            {loading ? (
                                loadingCart.map((el, index) => (
                                    <div key={el + 'Add To Cart Loading' + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded' />
                                ))
                            ) : (
                                data.map((product, index) => (
                                    <div key={product?._id + 'Add To Cart Loading'} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                        <div className='w-32 h-32 bg-slate-200'>
                                            <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' alt='product' />
                                        </div>
                                        <div className='px-4 py-2 relative'>
                                            <div className='absolute right-0 text-red-600 rounded-full p-1 mx-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                                <MdDelete />
                                            </div>
                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                            <div className='flex items-center justify-between'>
                                                <p className='font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                                <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-1'>
                                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover=text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decreaseQty(product?._id, product?.quantity)}>
                                                    -
                                                </button>
                                                <span>{product?.quantity}</span>
                                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover=text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => increaseQty(product?._id, product?.quantity)}>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {data && data.length > 0 ? (
                            <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                                {loading ? (
                                    <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'></div>
                                ) : (
                                    <div className='bg-white p-4'>
                                        <h2 className='text-white text-lg rounded font-bold bg-red-600 px-4 py-1 '>Summary</h2>

                                        <div className='p-2 '>
                                            <h3 className='font-medium text-lg text-slate-600'>Billing Address</h3>
                                            <div className='mt-2flex flex-col gap-2'>
                                                <input
                                                    type='text'
                                                    name='name'
                                                    placeholder='Name'
                                                    className='w-full px-2 py-1 border border-gray-300 rounded mt-2'
                                                    value={billingAddress.name}
                                                    onChange={handleBillingChange}
                                                />
                                                <input
                                                    type='text'
                                                    name='address'
                                                    placeholder='Address'
                                                    className='w-full px-2 py-1 border border-gray-300 rounded mt-2'
                                                    value={billingAddress.address}
                                                    onChange={handleBillingChange}
                                                />
                                                <input
                                                    type='text'
                                                    name='city'
                                                    placeholder='City'
                                                    className='w-full px-2 py-1 border border-gray-300 rounded mt-2'
                                                    value={billingAddress.city}
                                                    onChange={handleBillingChange}
                                                />
                                                <div className='flex gap-2'>
                                                <input
                                                    type='text'
                                                    name='state'
                                                    placeholder='State'
                                                    className='w-full px-2 py-1 border border-gray-300 rounded mt-2'
                                                    value={billingAddress.state}
                                                    onChange={handleBillingChange}
                                                />
                                                <input
                                                    type='text'
                                                    name='zip'
                                                    placeholder='ZIP Code'
                                                    className='w-full px-2 py-1 border border-gray-300 rounded mt-2'
                                                    value={billingAddress.zip}
                                                    onChange={handleBillingChange}
                                                />
                                                </div>
                                                {/* <input
                                                    type='text'
                                                    name='country'
                                                    placeholder='Country'
                                                    className='w-full px-2 py-1 border border-gray-300 rounded mt-2'
                                                    value={billingAddress.country}
                                                    onChange={handleBillingChange}
                                                /> */}
                                            </div>
                                        </div>

                                        <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                            <p>Quantity : </p>
                                            <p>{totalQty}</p>
                                        </div>

                                        <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                            <p>Total Price :</p>
                                            <p>{displayINRCurrency(totalPrice)}</p>
                                        </div>

                                        <button className='bg-blue-600 p-2 text-white w-full mt-4 rounded transition-transform transform hover:scale-105' onClick={handlePayment}>
                                            Proceed to Payment
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;
