import React, { useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap'; // Import ListGroup
import { IPost, IComment } from '../utils/types';
import { IUser } from '../services/user-service';
import { commentOnPost } from '../services/post-service';

interface CommentDialogProps {
  post: IPost;
  userPost: string | undefined;
  onClose: () => void;
  handlePostChange: () => void;
}

const CommentDialog: React.FC<CommentDialogProps> = ({ post, userPost, onClose, handlePostChange}) => {
  const [newComment, setNewComment] = useState('');
  const [viewPost, setViewPost] = useState<IPost>(post);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    const commentObj: IComment = { user: userPost || '', comment: newComment, postId: post._id };
    await commentOnPost(commentObj);

    const updatedComments = [...post.comments, commentObj]; 
    setViewPost({...post, comments: updatedComments});
    setNewComment('');

    handlePostChange();
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {viewPost.comments.map((comment: IComment, index: number) => (
            <ListGroup.Item key={index}>
              <div className="d-flex justify-content-between align-items-center">
                <span>{comment.comment}</span>
                <span className="text-muted">{comment.user}</span>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Form.Control
          type="text"
          placeholder="Add a comment"
          value={newComment}
          onChange={handleCommentChange}
        />
        <Button variant="primary" onClick={handleCommentSubmit}>
          Add Comment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentDialog;
