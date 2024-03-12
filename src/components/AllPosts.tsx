import React, { useState, useEffect, useCallback } from 'react';
import PostView from './PostView';
import PostForm from './PostForm';
import { fetchPosts } from '../services/post-service';
import { IPost } from '../utils/types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useUser } from '../context/user-context';

const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isNewPost, setIsNewPost] = useState(false); // State for creating a new post
  const [showMyPosts, setShowMyPosts] = useState(false); // State for showing only user's posts
  const { user } = useUser();

const handleSubmitNewpost = useCallback((_: IPost) => {
  setIsNewPost(false);
  handlePostChange();
}, []); 

const fetchAllPosts = async () => {
    try {
      const postsData = await fetchPosts();
      setPosts(postsData);
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
  };

useEffect(() => {
  const fetchAllPosts = async () => {
    try {
      const postsData = await fetchPosts();
      setPosts(postsData);
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
  };
  
  fetchAllPosts();
}, []);
  
const handlePostChange = () =>{ 
  fetchAllPosts();
}


  const handleNewPostClick = () => {
    setIsNewPost(true); // Open the PostForm
  };

  const handleCancelNewPost = () => {
    setIsNewPost(false); // Close the PostForm
  };

  const handleShowMyPosts = () => {
    setShowMyPosts(!showMyPosts);
  };

  return (
    <PostsContainer>
      {isNewPost && <PostForm onCancel={handleCancelNewPost} onSubmit={handleSubmitNewpost}/>} 
        <ButtonsContainer>
          {!isNewPost && (
            <Button onClick={handleNewPostClick} variant="primary">Create New Post</Button>
          )}
          <Button style={{marginLeft:'10px'}} onClick={handleShowMyPosts}>
            {showMyPosts ? "Show All Posts" : "Show My Posts"}
          </Button>
        </ButtonsContainer>
      
      <PostsList style={{ marginBottom: '20px' }}>
  {posts.slice().reverse().map((post) => (
    (!showMyPosts || (user && post.user === user._id)) && (
    user && <PostView key={post._id} post={post} handlePostChange={handlePostChange} />
    )
  ))}
</PostsList>
    </PostsContainer>
  );
};

export default AllPosts;

const PostsContainer = styled.div`
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: calc(100vh - 200px); /* Adjust the max-height based on your layout */
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
`;

const PostsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center the posts horizontally */
  gap: 18px; /* Set the gap between posts */
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
  margin-bottom: 20px;
`;
