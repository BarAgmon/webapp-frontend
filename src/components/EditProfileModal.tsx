import { FieldValues } from "react-hook-form";
import UserDetailsForm from "./UserDetailsForm";
import {Modal} from "react-bootstrap";
import styled from "styled-components";
import { useUser } from '../context/user-context';
import { IUser } from "../services/user-service";
import { uploadPhoto } from "../services/file-service";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png"
];
const loginSchema = z.object({
    email: z.string().optional().refine((val) => !val || (val.length > 0 && /\S+@\S+\.\S+/.test(val)), { message: "Invalid email address" }),
    password: z.string().optional().refine((val) => !val || val.length >= 6, {
      message: "Password must contain at least 6 characters.",
    }),
    confirmPassword: z.string().optional(),
    imgUrl: z.any().optional()
}).refine(data => data.password && data.confirmPassword ? data.password === data.confirmPassword : true, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
}).refine(data => data.imgUrl?.[0] ? ACCEPTED_IMAGE_MIME_TYPES.includes(data.imgUrl[0].type) : true, {
    message: "Only .jpeg and .png formats are supported.",
    path: ["imgUrl"]
}).refine(data => data.imgUrl?.[0] ? data.imgUrl[0].size <= MAX_FILE_SIZE : true, {
    message: "Max image size is 5MB.",
    path: ["imgUrl"]
});

function EditProfileModal({show, setShow} : {show:boolean, setShow: Function}) {
    const { updateUserDetails } = useUser()
    const keepOnlyUpdatedFileds = (user:IUser) => {
        const filteredUser = Object.entries(user).reduce((acc : IUser, [key, value]) => {
            if (value !== '') {
                acc[key as keyof IUser] = value;
            }
            return acc;
        }, {} as IUser);
        return filteredUser
    }
    const updateDetails = async (data: FieldValues) => {
        try {
            var isAnyFieldUpdated: boolean = false;
            var user: IUser = {
                email: '',
                password: '',
                imgUrl: ''
            };
            var profileImg = data.imgUrl[0];
            if ( profileImg !== undefined){
                const url = await uploadPhoto(profileImg!);
                user.imgUrl = url;
                isAnyFieldUpdated = true;
            }
            if (data.email != "") {
                user.email = data.email;
                isAnyFieldUpdated = true;
            }
            if(data.password != ""){
                user.password = data.password;
                isAnyFieldUpdated = true;
            }
            if(isAnyFieldUpdated){
                user = keepOnlyUpdatedFileds(user)
                await updateUserDetails(user)
            }
            setShow(false)           
        }
        catch(e : any){
            console.log(e)
            // if (axios.isAxiosError(e)) {
            //     const serverResponse = e.response;
            //     if (serverResponse && serverResponse.data) {
            //         handleAlert(false, serverResponse.data)
            //     } else {
            //         handleAlert(false, "")
            //     }
            // }
        }
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
                    cardClassname="card border-dark mb-3" validationSchema={loginSchema}/>
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