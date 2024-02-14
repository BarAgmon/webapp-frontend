import { FieldValues } from "react-hook-form";
import UserDetailsForm from "./UserDetailsForm";
import {Card, Modal, Image } from "react-bootstrap";
import styled from "styled-components";
import { useUser } from '../context/user-context';

function EditProfileModal({show, setShow} : {show:boolean, setShow: Function}) {
    const updateDetails = async (data: FieldValues) => {
        console.log(data)
    }
    const { user } = useUser(); 
    console.log(user)
    return(
        <Modal
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={() => setShow(false)}
        fullscreen="md-down"
        centered >
            <Modal.Header closeButton/>
            <Modal.Body>
                <StyledDiv>
                    <UserDetailsForm actionButtonTxt="Save" 
                    title="Update Profile" user={user} 
                    onSubmitFunc={updateDetails}
                    cardClassname="card border-dark mb-3"/>
                </StyledDiv>
            </Modal.Body>     
        </Modal>
    );
}

export default EditProfileModal;

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`