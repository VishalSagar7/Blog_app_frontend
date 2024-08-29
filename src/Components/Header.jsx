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
        <div className="w-full h-[80px]  bg-gray-700 fixed top-0 z-10">

            <div className='w-[70%] mx-auto h-full flex justify-between items-center'>
                <Link to="/" className="text-xl font-bold text-white transition duration-200 cursor-pointer hover:text-sky-400">
                    My Blog
                </Link>

                <nav className=" ">

                    {username && (
                        <div className=' flex justify-between items-center'>
                            <h1 className='text-white text-lg font-semibold transition duration-200 hover:text-sky-400 cursor-pointer'>{userInfo.username}</h1>
                            <Link to='/create' className='text-lg ml-[20px] font-semibold cursor-pointer text-white transition duration-200 hover:text-sky-400'>Create + </Link>
                            <Link to={'/'} className='text-lg font-semibold ml-[20px] text-white transition duration-200 hover:text-sky-400' onClick={logout}>Logout</Link>
                        </div>
                    )}

                    {!username && (
                        <div>
                            <Link to='/login' className="text-lg font-semibold text-white">
                                Login
                            </Link>
                            <Link to="/register" className="text-lg font-semibold ml-[50px] text-white">
                                Register
                            </Link>
                        </div>
                    )}

                </nav>
            </div>
        </div>
    )
}

export default Header;
