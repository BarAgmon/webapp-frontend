import { FieldValues } from "react-hook-form";
import UserDetailsForm from "../components/UserDetailsForm"; 
import RegisterBckgImg from "../images/register.jpg"
import { uploadPhoto } from "../services/file-service";
import { IUser, registrUser } from "../services/user-service";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import styled from "styled-components";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png"
];
const loginSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, "Password must contain at least 6 characters."),
    confirmPassword: z.string().min(6, "Password must contain at least 6 characters."),
    imgUrl: z.any().optional()})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  }).refine((data) =>  (ACCEPTED_IMAGE_MIME_TYPES.includes(data.imgUrl?.[0]?.type)) , {
    message: "Only .jpeg and png formats are supported.",
    path: ["imgUrl"]
}).refine((data) =>  (data.imgUrl?.[0]?.size <= MAX_FILE_SIZE), {
    message: "Max image size is 5MB.",
    path: ["imgUrl"]
});



function Register(){
    const [showAlert, setShowAlert] = useState(false)
    const [alertVariant, setAlertVariant] = useState("")
    const [alertMsg, setAlertMsg] = useState("")
    const navigate = useNavigate();
    
    const handleAlert  = (success: boolean, additionalInfo: string) => {
        setShowAlert(true)
        if(success){
            setAlertVariant("success")
            setAlertMsg("Registered successfuly")
        } else {
            setAlertVariant("danger")
            const genericError = "An error occured while registeration. Please try again later."
            const msg = additionalInfo == "" ? genericError : additionalInfo
            setAlertMsg(msg)
        }
    }
    const createUser = async (data: FieldValues) => {
        try {
            var profileImg = data.imgUrl[0];
            const url = await uploadPhoto(profileImg!);
            if (data.email && data.password) {
                const user: IUser = {
                    email: data.email,
                    password: data.password,
                    imgUrl: url
                }
                const res = await registrUser(user)
                console.log(res)
                handleAlert(true, "")
                navigate('/login');
            }

        }
        catch(e : any){
            console.log(e)
            if (axios.isAxiosError(e)) {
                const serverResponse = e.response;
                if (serverResponse && serverResponse.data) {
                    handleAlert(false, serverResponse.data)
                } else {
                    handleAlert(false, "")
                }
            } else if (e.name === 'MissingField') {
                handleAlert(false, e.message)
            }
        }
    }
    return(
        <RegisterBackground>
            <UserDetailsForm title="Register" user={null} cardClassname="card border-light mb-3"
                actionButtonTxt = "Register" onSubmitFunc={createUser} validationSchema={loginSchema}/>
            <StyledAlert key="alert" variant={alertVariant} show={showAlert} onClose={() => setShowAlert(false)} dismissible>
                {alertMsg}
            </StyledAlert>  
        </RegisterBackground>
    );
}

export default Register;

const StyledAlert = styled(Alert)`
    width: 20em;
`

const RegisterBackground = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url(${RegisterBckgImg});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
`