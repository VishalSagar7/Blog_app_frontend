import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { BASE_URL } from '../helper';
import PostpageShimmer from './PostpageShimmer';

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo, setUserInfo } = useContext(UserContext);
    const params = useParams();
    const id = params.id;

    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        // Fetch post information
        fetch(`${BASE_URL}/post/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setPostInfo(data);
            })
            .catch((error) => {
                console.error('Error fetching post data:', error);
            });

        // Fetch user information if necessary
        // If userInfo is fetched from elsewhere, ensure it is fetched before using it
    }, [id]);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = () => {
        fetch(`${BASE_URL}/delete/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
               
                window.location.href = '/';
            } else {
                console.error('Failed to delete post');
            }
        })
        .catch((error) => {
            console.error('Error deleting post:', error);
        });
        setOpenDialog(false);
    };

    if (!postInfo || !userInfo) {
        return <PostpageShimmer/>;
    }

    // console.log(postInfo.cover);
    

    return (
        <div className=' min-h-[100vh] w-[60%] mx-auto mt-[100px] mb-[100px]'>
            <div className='h-[400px]'>
                <img
                    className='h-full w-full object-cover'
                    src={(`${postInfo.cover}` || '')}
                    // src='https://res.cloudinary.com/deaatlwug/image/upload/v1724920199/iwpaxobwcn3t3xbresrz.jpg'
                    alt={postInfo.title || 'Post Cover'}
                />
            </div>

            {userInfo.id === postInfo.author?._id && (
                <div>
                    <Link to={`/edit/${postInfo._id}`}>
                        <button className='mt-[15px] px-[10px] py-[5px] rounded border border-gray-600 bg-gray-300 transition duration-200 hover:bg-gray-400'>
                            Edit post
                        </button>
                    </Link>

                    <button
                        onClick={handleClickOpenDialog}
                        className='ml-[10px] mt-[15px] bg-red-300 px-[10px] py-[5px] rounded border border-red-400 transition duration-200 hover:bg-red-400'>
                        Delete post
                    </button>

                    <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Confirm Delete"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this post? This action cannot be undone.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                            <Button onClick={handleConfirmDelete} color="primary">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )}

            <div className='mt-[10px]'>
                <h1 className='text-5xl font-semibold'>{postInfo.title}</h1>
                <h1 className='mt-[15px] text-lg font-semibold'>{postInfo.author?.username}</h1>
                <h1 className='mt-[15px] font-semibold text-gray-700'>
                    {new Date(postInfo.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </h1>
            </div>
            <div className='mt-[15px]'>
                <div className='text-lg' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            </div>
        </div>
    );
};

export default PostPage;
