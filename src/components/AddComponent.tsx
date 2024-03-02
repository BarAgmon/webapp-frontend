import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

interface IComment {
  user: string;
  comment: string;
}

interface AddCommentFormProps {
  onAddComment: (comment: IComment) => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({ onAddComment }) => {

    //todo: Change to be by default the user that looged in. in the useState.
  const [user, setUser] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.trim() || !comment.trim()) return; // Prevent adding empty comments
    onAddComment({ user, comment });
    setUser('');
    setComment('');

    // todo: call to service to save the comment of the post.
  };

  // TODO: need to change to use the current user that looged in.
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicUser">
        <Form.Label>User</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicComment">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddCommentForm;
