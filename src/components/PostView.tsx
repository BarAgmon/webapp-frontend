import React, { useState } from 'react';
import { Card, Button, Form, ButtonGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { IPost } from '../utils/types';
import { IUser } from '../services/user-service';
import {updatePost, deletePost, likePost} from '../services/post-service';
import { useUser } from '../context/user-context';
import CommentDialog from './CommentDialog';
import {Image } from "react-bootstrap";
import { uploadPhoto } from "../services/file-service";
import { useNavigate } from 'react-router-dom';

interface PostViewProps {
  post: IPost;
  handlePostChange?: () => void;
}

const PostView: React.FC<PostViewProps> = ({ post, handlePostChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const { user } = useUser();
  const [showComments, setShowComments] = useState(false);
  const [image, setImage] = useState<File | null>(null); 
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [postView, setPostView] = useState<IPost>(post);
  const [isLiked, setIsLiked] = useState(postView.like.includes(user?._id || ''));

  const navigate = useNavigate();

const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const fileDomElement = event.target;
  if (fileDomElement.files && fileDomElement.files.length > 0) {
    const file = fileDomElement.files[0];
    setImage(file); // Store the File object

    // Read the file and convert it to a data URL
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImageUrl(dataUrl); // Store the data URL in state
    };
    reader.readAsDataURL(file);
  }
};

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(post.content);
  };

  const handleSaveEdit = async () => {
  if (image) { 
    const url = await uploadPhoto(image); 
    await updatePost({imgUrl: url, content: editedContent, postId: post._id});
    setPostView({...postView, imgUrl: url, content: editedContent});
  } else {
    await updatePost({imgUrl: post.imgUrl, content: editedContent, postId: post._id});
    setPostView({...postView, content: editedContent});
  }
  setIsEditing(false);
  if (handlePostChange) handlePostChange();
};

const handleLikeClick = async () => {
  setIsLiked(!isLiked); // Toggle like status
  const updatedLikes = isLiked
    ? postView.like.filter((userId) => userId !== (user?._id || '')) 
    : [...postView.like, user?._id || '']; 

  setPostView((prevPostView) => ({
    ...prevPostView,
    like: updatedLikes,
  }));

  likePost(postView._id || '');
  if (handlePostChange) handlePostChange();
};
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(post._id || '');
      if (handlePostChange) handlePostChange();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  };

const handleCommentClick = () => {
  navigate(`/comments/${post._id}`);
};

  return (
    <Card style={{ width: '25rem' }}>
      <Card.Header as="h5">{postView.userName}</Card.Header>
      {postView.imgUrl && <Card.Img variant="top" src={postView.imgUrl} />}
      <UserInfoContainer style={{paddingLeft:'10px'}}>
        <Card.Subtitle>{formatDate(postView.createdAt)}</Card.Subtitle>
        <ButtonGroup>
          {user?._id === postView.user && !isEditing && (
            <Button style={{ margin: '6px' }} variant="light" size="sm" onClick={handleEditClick}>Edit</Button>
          )}
          {user?._id === postView.user && !isEditing && (
            <Button style={{ margin: '6px' }} variant="danger" size="sm" onClick={handleDeletePost}>Delete</Button>
          )}
        </ButtonGroup>
      </UserInfoContainer>
      
      {isEditing ? (
        <CardContent>
          <Form>
            <Form.Group controlId="editedPostContent">
              <Form.Control
                as="textarea"
                rows={3}
                value={editedContent}
                onChange={handleContentChange}
              />
              <InputDiv>
                <InputLabel htmlFor="imgUrl">Choose image</InputLabel>
                 <ImgInputDiv className="form-control">
                  <Input type="file" id="imgUrl" onChange={handleImageChange}/>
                    {imageUrl && <DesignedImage src={imageUrl} roundedCircle/>}
                  </ImgInputDiv>
                </InputDiv>
            </Form.Group>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </Form>
        </CardContent>
      ) : (
        <CardContent>
          <Card.Text>{postView.content}</Card.Text>
        </CardContent>
      )}
       <Card.Footer>
        <FooterLeft>
          {postView.like.length} {postView.like.length === 1 ? 'like' : 'likes'}
        </FooterLeft>
        <Button variant={isLiked ? 'success' : 'outline-success'} onClick={handleLikeClick}>
          {isLiked ? 'Unlike' : 'Like'}
        </Button>
        <CommentsButton onClick={handleCommentClick}>{postView.comments.length} comments</CommentsButton>
      </Card.Footer>
      {/* {showComments && (
        <CommentDialog post={postView} userPost={postView.userName} onClose={handleCloseComments} handlePostChange={handlePostChange}/> */}
      {/* )} */}
    </Card>
  );
};

export default PostView;

const StyledCard = styled(Card)`
  margin-bottom: 20px;
  position: relative;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center; /* Align items vertically */
  justify-content: space-between;
`;

const UserInfoText = styled.div`
  font-weight: bold;
  font-size: 18px; /* Adjust font size as needed */
`;

const CommentsButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const CardContent = styled(Card.Body)``;

const CardFooter = styled(Card.Footer)`
  display: flex;
  justify-content: space-between;
`;

const FooterLeft = styled.div``;

const InputDiv = styled.div`
    width: 15em;
    margin-top: 0.02em;
    margin-bottom: 0.02em;
`
const ImgInputDiv = styled.div`
    width: 15em;
    margin-top: 0.02em;
    margin-bottom: 0.02em;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items:center;
`
const Input = styled.input`
    height: 3em;
    font-family: Assistant;
    font-size: 0.8em;
`

const RegisterButton = styled.button`
    margin-top: 0.8em;
    margin-bottom: 0.2em;
    background: #262626;
`


const ErrorMsg = styled.p`
    font-size: 0.7em
`

const InputLabel = styled.label`
    font-family: Assistant;
    font-size: 0.9em;
`
const DesignedImage = styled(Image)`
    width: 3em;
    height: 3em;
    border-radius: 50%;
    `
