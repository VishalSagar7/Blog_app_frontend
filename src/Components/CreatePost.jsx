import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import { BASE_URL } from '../helper';



const  modules  = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ]
};


const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev) {
        ev.preventDefault();

        const data = new FormData();

        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        const response = await fetch(`${BASE_URL}/post`, {
            method: 'POST',
            body: data,
            credentials : 'include',
        });

        if (response.ok) {
            setRedirect(true);
        }
        else {
            console.log('Failed to create post:', response.statusText);
            
        }
        
    }

    if (redirect) {

        return <Navigate to='/' />
        
    }


    return (
        <form className='w-[75%] mx-auto mt-[120px] flex flex-col gap-[15px] mb-[100px]' onSubmit={createNewPost}>

            <input
                type="text"
                placeholder={'Title'} 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-[100%] bg-gray-100 h-[40px] outline-none rounded pl-[15px] border-[2px] border-gray-300 focus:border-[2px] focus:border-sky-400'
            />

            <input
                type="summary"
                placeholder={'summary'} 
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className='w-[100%] bg-gray-100 h-[40px] outline-none rounded pl-[15px] border-[2px] border-gray-300 focus:border-[2px] focus:border-sky-400'
            />

            <input
                type="file" 
                className='pt-[3px] w-[100%] bg-gray-100 h-[40px] outline-none rounded pl-[15px] border-[2px] border-gray-300 focus:border-[2px] focus:border-sky-400'
                onChange={(e) => setFiles(e.target.files)}
            />

            <ReactQuill
                value={content}
                modules={modules}
                onChange={(newValue => setContent(newValue))}
            />

            <button
                className='w-[100%] bg-gray-800 font-semibold text-white border border-gray-500 h-[35px] transition duration-200 rounded hover:bg-white hover:text-gray-700'
            >
                Create post
            </button>

        </form>
    )
}

export default CreatePost;
