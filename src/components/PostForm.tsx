import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Image } from "react-bootstrap";
import { uploadPhoto } from "../services/file-service";
import { createPost } from '../services/post-service';
import { useUser } from '../context/user-context';
import { IPost } from '../utils/types';

interface PostFormProps {
  onCancel: () => void;
  onSubmit: (post: IPost) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onCancel, onSubmit }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { user } = useUser();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileDomElement = event.target;
    if (fileDomElement.files && fileDomElement.files.length > 0) {
      const file = fileDomElement.files[0];
      setSelectedPhoto(file); // Store the File object

      // Read the file and convert it to a data URL
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setImageUrl(dataUrl); // Store the data URL in state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, including content and photo
    const formData = new FormData();
    formData.append('content', postContent);
    if (selectedPhoto) {
      const url = await uploadPhoto(selectedPhoto);
      formData.append('photo', url);
    }

    const user_id = user ? user._id || '' : '';

    const newPost: IPost = {
      user: user_id,
      createdAt: new Date(),
      content: formData.get('content') as string || '',
      imgUrl: formData.get('photo') as string || '',
      like: [],
      dislike: [],
      comments: []
    };

    await createPost(newPost);
    onSubmit(newPost);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="postContent">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write your post..."
            value={postContent}
            onChange={handleContentChange}
          />
        </Form.Group>
        <Form.Group controlId="postPhoto">
          <InputDiv>
            <InputLabel htmlFor="imgUrl">Choose image</InputLabel>
            <ImgInputDiv className="form-control">
              <Input type="file" id="imgUrl" onChange={handleImageChange} />
              {imageUrl && <DesignedImage src={imageUrl} roundedCircle />}
            </ImgInputDiv>
          </InputDiv>
        </Form.Group>
        <ButtonContainer>
          <Button variant="primary" type="submit">
            Post
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default PostForm;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const InputDiv = styled.div`
  width: 40em;
  margin-top: 0.02em;
  margin-bottom: 0.02em;
`;

const ImgInputDiv = styled.div`
  width: 20em;
  margin-top: 0.02em;
  margin-bottom: 0.02em;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  height: 3em;
  font-family: Assistant;
  font-size: 0.8em;
`;

const RegisterButton = styled.button`
  margin-top: 0.8em;
  margin-bottom: 0.2em;
  background: #262626;
`;

const ErrorMsg = styled.p`
  font-size: 0.7em;
`;

const InputLabel = styled.label`
  font-family: Assistant;
  font-size: 0.9em;
`;

const DesignedImage = styled(Image)`
  width: 3em;
  height: 3em;
  border-radius: 50%;
`;
