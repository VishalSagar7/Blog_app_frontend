import React, { useEffect, useState } from 'react';
import Post from './Post';
import { BASE_URL } from '../helper';
import IndexpageShimmer from './IndexpageShimmer';

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/post`)
      .then((response) => response.json())
      .then((posts) => {
        // console.log(posts);
        setPosts(posts);
      });
  }, []);

  if (posts.length === 0) {
    return <IndexpageShimmer/>
  }

  return (
    <div className='w-[75%] mx-auto mt-[100px] mb-[100px]'>
      {posts.length > 0 && posts.map((post) => (
        <Post
          key={post._id} // Ensure unique key for each Post component
          post={post} // Pass the entire post object as a single prop
        />
      ))}
    </div>
  );
};

export default IndexPage;
