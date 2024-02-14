import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from 'react-router-dom';
import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import axios from "axios";
import styled from "styled-components";
import LoginBckgImg from "../images/loginbckg.jpg";
import {IUser} from "../services/user-service"
import {useUser} from "../context/user-context"
import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const loginSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, "Password must contain at least 6 characters."),
})

type FormData = z.infer<typeof loginSchema>


function LoginForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(loginSchema) })
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState("")
    const { login } = useUser()
    const { signinViaGoogle } = useUser()
    const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        try {
            await signinViaGoogle(credentialResponse)
            navigate('/'); 
        } catch (e) {
            setAlertMsg("Unexpected error occured. Please try again later.")
            setShowAlert(true)
        }
    }
    
    const onGoogleLoginFailure = async () => {
        setAlertMsg("Google login failed. Please try again later.")
        setShowAlert(true)
    }
    
    const onSubmit = async (data: FieldValues) => {
        if (data.email && data.password) {
            const user: IUser = {
                email: data.email,
                password: data.password
            }
            try{
                await login({...user})
                navigate('/');    
            } catch(e : any){
                if (axios.isAxiosError(e)) {
                    const serverResponse = e.response;
                    if (serverResponse && serverResponse.data) {
                    setAlertMsg(serverResponse.data)
                    setShowAlert(true)
                    }
                }
            }
        }
    }

    return (
    <LoginBackground>
        <LoginCard className="card border-light mb-3">
            <Header className="card-header">Welcome to Treasure!</Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <input {...register("email")} type="text" id="email" className="form-control" />
                    {errors.email && <ErrorMsg className="text-danger">{errors.email.message}</ErrorMsg>}
                </Input>
                
                <Input>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <input {...register("password")} type="password" id="password" className="form-control" />
                    {errors.password && <ErrorMsg className="text-danger">{errors.password.message}</ErrorMsg>}
                </Input>
                <Button type="submit" className="btn btn-primary">Login</Button>
                <p>Or</p>
                {/* <Button className="btn btn-primary" ><i className="bi bi-google"></i></Button> */}
                <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />
                <Text>
                    <p>First time? <Link to="/register">Register</Link></p>
                </Text>
            </Form>
        </LoginCard> 
        <Alert key="alert" variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
            {alertMsg}
        </Alert>       
    </LoginBackground>  
    )
}

export default LoginForm

const LoginCard = styled.div`
    display: flex;
    align-items: center;
    width: 20em;
`

const InputLabel = styled.label`
    font-family: Assistant;
    font-size: 0.9em
`

const Input = styled.div`
    width: 15em;
    margin-top: 1em;
    margin-bottom: 1em;
`
const ErrorMsg = styled.p`
    font-size: 0.7em
`

const Form = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Button = styled.button`
    margin-top: 1em;
    margin-bottom: 1em;
    background: #262626;
    font-family: Assistant;
    width: 6em;
`

const Header = styled.div`
    font-family: Assistant;
    font-size: 1.5em;
`

const LoginBackground = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url(${LoginBckgImg});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
`

const Text = styled.div`
    font-family: Assistant;
    font-size: 1em;
`