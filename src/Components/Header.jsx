import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../helper';


const Header = () => {

    const { setUserInfo, userInfo } = useContext(UserContext);
    const navigate = useNavigate();


    async function logout() {

        fetch(`${BASE_URL}/logout`, {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);


    }

    useEffect(() => {

        fetch(`${BASE_URL}/profile`, {
            credentials: 'include',
        }).then((response) => {

            response.json().then(userInfo => {
                // console.log(userInfo);
                setUserInfo(userInfo);

            })
        })

    }, []);




    const username = userInfo?.username;


    return (
        <div className="w-full h-[80px] bg-white shadow-md fixed top-0 z-10">

            <div className='w-[70%] mx-auto h-full flex justify-between items-center'>
                <Link to="/" className="text-3xl font-bold transition duration-200 cursor-pointer text-gray-500 hover:text-sky-400">
                    my<span className='text-blue-600'>Blog</span>
                </Link>

                <nav className=" ">

                    {username && (
                        <div className=' flex justify-between items-center'>
                            
                            <Link to='/create' className='text-lg ml-[20px] font-semibold cursor-pointer text-white transition duration-200'><button className='bg-gray-800 w-[100px] h-[30px] rounded hover:bg-gray-600'>Create + </button> </Link>
                            <Link to={'/'} className='text-lg font-semibold ml-[20px] text-white transition duration-200 ' onClick={logout}><button className='bg-gray-800 w-[100px] h-[30px] rounded hover:bg-gray-600'>Logout</button></Link>
                            <h1 className='text-gray-800 ml-[20px] text-lg font-semibold transition duration-200 hover:text-sky-400 cursor-pointer'>{userInfo.username}</h1>

                        </div>
                    )}

                    {!username && (
                        <div>
                            <Link to='/login' className="text-lg font-semibold text-white">
                                <button className='bg-gray-800 w-[100px] h-[30px] rounded hover:bg-gray-600'>
                                    Login
                                </button>
                            </Link>
                            <Link to="/register" className="text-lg font-semibold ml-[40px] text-white">
                                <button className='bg-gray-800 w-[100px] h-[30px] rounded hover:bg-gray-600'>
                                    Register
                                </button>
                            </Link>
                        </div>
                    )}

                </nav>
            </div>
        </div>
    )
}

export default Header;
