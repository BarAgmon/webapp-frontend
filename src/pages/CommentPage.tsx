import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import PostView from '../components/PostView';
import { getPostById } from '../services/post-service'; // Import your post service function
import { IPost } from '../utils/types';
import styled from 'styled-components';

const CommentsPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(postId);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const onSubmit = async () => {
    try {
        const fetchedPost = await getPostById(postId);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
  };

  return (
    <PageContainer>
      <CenteredContainer>
        {post && (
          <PostContainer>
            <h2>Post: </h2>
            <CommentText>{post.content}</CommentText> {/* Adjust font size and color here */}
          </PostContainer>
        )}
        <CommentsContainer>
          <h2>Comments</h2>
          <CommentFormContainer>
            {post && <CommentForm postId={postId} onSubmit={onSubmit}/>} 
          </CommentFormContainer>
          <CommentList>
            {post &&
              post.comments.map((comment, index) => (
                <CommentItem key={index}>
                  <CommentText>{comment.comment}</CommentText>
                  <CommentUser> <LighterText>By: {comment.user}</LighterText></CommentUser>
                </CommentItem>
              ))}
          </CommentList>
        </CommentsContainer>
      </CenteredContainer>
    </PageContainer>
  );
};

export default CommentsPage;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const CenteredContainer = styled.div`
  width: 80%; /* Adjust the width as needed */
  text-align: center;
`;

const PostContainer = styled.div`
  margin-bottom: 20px;
`;

const CommentsContainer = styled.div`
  background-color: #272b2f; /* Adjust the background color */
  padding: 20px;
  border-radius: 8px;
  max-height: 60vh; /* Set maximum height */
  overflow-y: auto; /* Enable vertical scrolling */
`;

const CommentFormContainer = styled.div`
  margin-bottom: 20px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  background-color: ##212529;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px;
`;

const CommentText = styled.p`
  margin: 0;
  font-size: 1.2em; /* Increase font size */
  color: #e9e9ea; /* Set lighter text color */
`;

const CommentUser = styled.p`
  margin-top: 5px;
  font-style: italic;
`;

const LighterText = styled.span`
  color: #777; /* Set lighter text color */
`;
