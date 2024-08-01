import React, { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../Context/UserContext';
import { BASE_URL } from '../helper';

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { userInfo, setUserInfo } = useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        
        const response = await fetch(`${BASE_URL}/login`, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials : 'include'

        });


        const dataInfo = await response.json();

        if (response.ok) {
            setUserInfo(dataInfo);
            setRedirect(true);
        }
        else {
            alert(dataInfo.message)
        }

        // console.log(dataInfo);

        // const dataInfo = await response.json();
        // console.log(dataInfo);

        // if (response.ok) {
        //     response.json().then(userInfo => {
        //         console.log(userInfo);
        //         setUserInfo(userInfo);
        //         setRedirect(true);
                
        //     })
            
        // }
        // else {
        //     alert("incorrect credentials")
        // }

        // const data = await response.json();
        // console.log(data);

    }

    if (redirect) {
        return <Navigate to={'/'}/>
    }

    return (

        <div className='h-[90vh] text-center mt-[100px]'>

            <h1 className='mt-[40px] mb-[20px] text-4xl font-semibold text-gray-800'>Login</h1>

            <form className='mx-auto w-[450px]  flex flex-col gap-[10px] p-[20px] rounded' onSubmit={login}>

                <input className='w-[100%] bg-gray-100 h-[40px] outline-none rounded pl-[15px] border-[2px] border-gray-300 focus:border-[2px] focus:border-sky-400'
                    type='text'
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input className='w-[100%] bg-gray-100 h-[40px] outline-none rounded pl-[15px] border-[2px] border-gray-300 focus:border-[2px] focus:border-sky-400'
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className='w-[100%] bg-gray-800 font-semibold text-white border border-gray-500 h-[35px] transition duration-200 rounded hover:bg-white hover:text-gray-700'>
                    Login
                </button>

            </form>

        </div>
    )
}

export default LoginPage;
