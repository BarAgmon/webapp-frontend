import { FieldValues } from "react-hook-form";
import UserDetailsForm from "../components/UserDetailsForm";
import { Button, Card, Modal, Image } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";
import { useUser } from '../context/user-context';

function Profile() {
    const updateDetails = async (data: FieldValues) => {
        console.log(data)
    }
    const { user } = useUser(); 
    console.log(user)
    const [showUpdateModal, setShowUpdateModal] = useState(true)
    return(
        <PagePosition>
            
             <DesignedCard>
                <Card.Title>
                    <DesignedImage src="http://localhost:3000/public/1707227443178.jpg" roundedCircle/>
               </Card.Title>
               <Card.Body>
                <Button onClick={()=> setShowUpdateModal(true)}>Edit</Button>
               </Card.Body>
            </DesignedCard>
            <Modal
            aria-labelledby="contained-modal-title-vcenter"
            show={showUpdateModal}
            onHide={() => setShowUpdateModal(false)}
            fullscreen="md-down"
            centered >
                <Modal.Header closeButton/>
                <Modal.Body>
                    <StyledDiv>
                        <UserDetailsForm actionButtonTxt="Save" 
                        title="Update Profile" user={null} 
                        onSubmitFunc={updateDetails}
                        cardClassname="card border-dark mb-3"/>
                    </StyledDiv>
                </Modal.Body>     
            </Modal>
        </PagePosition>   
    );
}

export default Profile;

const PagePosition = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
`

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const DesignedImage = styled(Image)`
    width: 15em;
    height: 15em;
    border-radius: 50%;
`
const DesignedCard = styled(Card)`
  width: 40em;
  display: flex;
  align-items: center;
  justify-content: center;
` 