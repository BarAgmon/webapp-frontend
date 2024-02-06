import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function UserProfile() {
    const [userDetails, setUserDetails] = useState(null);
    return(
        <div>
            <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
            >
            <Modal.Dialog>
                <Modal.Header>
                    <Image src="holder.js/300x180" roundedCircle/>
                </Modal.Header>
                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Edit</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
            </div>

        </div>
    );
}

export default UserProfile;