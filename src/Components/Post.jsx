import React from 'react'
import { formatISO9075, format } from 'date-fns'
import { Link } from 'react-router-dom';


const Post = (props) => {

    // console.log(props.post.cover);
    

    const { content, summary, title, createdAt, updatedAt, cover, author, _id } = props?.post;

    return (

        <div>

            <Link to={`/post/${_id}`}>
                <div className="shadow-md h-[300px] flex mt-[15px] transition duration-200 hover:bg-gray-100">
                    <div className="border-md w-[40%] h-full overflow-hidden">
                        <img
                            src={`${props.post.cover}`}
                            className="h-full w-full object-cover object-center transition duration-200 hover:scale-105"
                        />
                    </div>
                    <div className="  w-[60%] h-full px-[20px] pt-[25px] overflow-auto ">
                        <h1 className="text-2xl font-bold">
                            {title}
                        </h1>
                        <h1 className='mt-[5px] font-semibold'>{author.username} <span className='ml-[10px] text-blue-600'>{format(new Date(createdAt), 'MMM d , yyyy HH:mm')}</span> </h1>
                        <h1 className="text-lg mt-[5px]">
                            {summary}
                        </h1>
                    </div>
                </div>
            </Link>
        </div>

    )
}

export default Post
