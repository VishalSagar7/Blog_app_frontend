import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../helper';

const modules = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
        ['link', 'image', 'video'],
        ['clean'],
    ],
};

const EditPost = () => {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`${BASE_URL}/post/${id}`)
            .then((response) => response.json())
            .then((postInfo) => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
            })
            .catch((error) => console.error('Error fetching post:', error));
    }, [id]);

    async function updatePost(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('title', title);
        data.append('summary', summary);
        data.append('content', content);
        if (files) {
            data.append('file', files[0]);
        }

      

        const response = await fetch(`${BASE_URL}/post/${id}`, {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        
        if (response.ok) {
            setRedirect(true);
        } else {
            console.error('Failed to update post');
        }
        
    }

    if (redirect) {
        return <Navigate to={`/post/${id}`} />;
    }

    return (
        <div className='mt-[120px] mb-[100px]'>
            <form className='w-[75%] mx-auto mt-[50px] flex flex-col gap-[15px]' onSubmit={updatePost}>
                <input
                    type="text"
                    placeholder={'Title'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-[100%] bg-gray-100 h-[40px] outline-none rounded pl-[15px] border-[2px] border-gray-300 focus:border-[2px] focus:border-sky-400'
                />

                <input
                    type="text"
                    placeholder={'Summary'}
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
                    onChange={(newValue) => setContent(newValue)}
                />

                <button
                    className='w-[100%] bg-gray-800 font-semibold text-white border border-gray-500 h-[35px] transition duration-200 rounded hover:bg-white hover:text-gray-700'
                >
                    Update post
                </button>
            </form>
        </div>
    );
};

export default EditPost;
