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
        try{
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
            if (axios.isAxiosError(e)) {
                const serverResponse = e.response;
                if (serverResponse && serverResponse.data) {
                    handleAlert(false, serverResponse.data)
                } else {
                    handleAlert(false, "")
                }
            }
        }
    }
    return(
        <RegisterBackground>
            <UserDetailsForm title="Register" user={null} cardClassname="card border-light mb-3"
                actionButtonTxt = "Register" onSubmitFunc={createUser} />
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