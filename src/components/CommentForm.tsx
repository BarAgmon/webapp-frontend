import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { commentOnPost } from '../services/post-service'; 
import { IComment } from '../utils/types';
import { useUser } from '../context/user-context';
import styled from 'styled-components';

interface CommentFormProps {
  postId: string | undefined;
  onSubmit: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onSubmit }) => {
  const [comment, setComment] = useState('');
  const { user } = useUser();

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const commentObj: IComment = { user: user?.email.split('@')[0] || '', comment: comment, postId:  postId};
      await commentOnPost(commentObj);
      setComment(''); // Clear input after submitting
      onSubmit();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <Container>
      <h2>Add a Comment</h2>
      <StyledForm>
        <Form.Control
          type="text"
          placeholder="Write your comment here..."
          value={comment}
          onChange={handleCommentChange}
        />
        <Button style={{marginTop: '6px'}} onClick={handleCommentSubmit}>Submit</Button>
      </StyledForm>
    </Container>
  );
};

export default CommentForm;

const Container = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const StyledForm = styled(Form)`
  margin-top: 10px;
`;

