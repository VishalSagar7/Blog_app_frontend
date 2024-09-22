import { useState } from 'react'
import { BASE_URL } from '../helper';

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(ev) {

        ev.preventDefault();

        if (username === "" || password === "") {
            alert("please fill all fields");
            return;
        }

        const response = await fetch(`${BASE_URL}/register`, {

            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },

        });
        // console.log(response.status);

        let dataInfo = await response.json();
        console.log(dataInfo);

        if (response.ok) {
            alert("registration successful")
        } else {
            alert(dataInfo.message)
        }

        const data = await response.json();
        console.log(data);

    }

    return (
        <div className=' text-center mt-[100px] pt-[70px]'>

            <div className='w-[500px] m-auto shadow-md'>
                <h1 className='mt-[40px] mb-[20px] text-4xl font-semibold text-gray-800'>Register</h1>

                <form className='mx-auto w-[450px]  flex flex-col gap-[10px] p-[20px] rounded' onSubmit={register}>

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
                        Register
                    </button>

                </form>
            </div>
        </div>
    )
}

export default RegisterPage;
