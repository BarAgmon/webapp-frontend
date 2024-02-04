import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import z from "zod"
import styled from "styled-components"
import RegisterBckgImg from "../images/register.jpg"
import { uploadPhoto } from '../services/file-service'
import {registrUser, IUser} from "../services/user-service"
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg"
];
const loginSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, "Password must contain at least 6 characters."),
    confirmPassword: z.string().min(6, "Password must contain at least 6 characters."),
    imgUrl: z.any()})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  }).refine((data) => ACCEPTED_IMAGE_MIME_TYPES.includes(data.imgUrl?.[0]?.type), {
    message: "Only .jpeg format is supported.",
    path: ["imgUrl"]
}).refine((data) => data.imgUrl?.[0]?.size <= MAX_FILE_SIZE, {
    message: "Max image size is 5MB.",
    path: ["imgUrl"]
});

type FormData = z.infer<typeof loginSchema>

function RegisterForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(loginSchema) })
    const onSubmit = async (data: FieldValues) => {
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
        }
        console.log(data)
    }

    return (
    <RegisterBackground>
        <RegisterCard className="card border-light mb-3">
            <Header className="card-header">Register</Header>
            <Form  className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <InputDiv>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input {...register("email")} type="text" id="email" className="form-control" />
                    {errors.email && <ErrorMsg className="text-danger">{errors.email.message}</ErrorMsg>}
                </InputDiv>          
                <InputDiv>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input {...register("password")} type="password" id="password" className="form-control" />
                    {errors.password && <ErrorMsg className="text-danger">{errors.password.message}</ErrorMsg>}
                </InputDiv>
                <InputDiv>
                    <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                    <Input {...register("confirmPassword")} type="password" id="confirmPassword" className="form-control" />
                    {errors.confirmPassword && <ErrorMsg className="text-danger">{errors.confirmPassword.message}</ErrorMsg>}
                </InputDiv>
                <InputDiv>
                    <InputLabel htmlFor="imgUrl">Choose profile image</InputLabel>
                    <Input {...register("imgUrl")} type="file" id="imgUrl" className="form-control" />
                    {errors.imgUrl && <ErrorMsg className="text-danger">{errors.imgUrl.message as string}</ErrorMsg>}
                </InputDiv>
                <RegisterButton type="submit" className="btn btn-primary">Register</RegisterButton>
            </Form>
        </RegisterCard>    
    </RegisterBackground>  
    )
}

export default RegisterForm

const RegisterCard = styled.div`
    display: flex;
    align-items: center;
    width: 25em;
    max-height: 95vh; 
    overflow-y: auto;
`

const Header = styled.div`
    font-family: Assistant;
    font-size: 1.5em;
`
const InputDiv = styled.div`
    width: 15em;
    margin-top: 0.02em;
    margin-bottom: 0.02em;
`

const Input = styled.input`
    height: 3em;
    font-family: Assistant;
    font-size: 0.8em;
`
const Form = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
`

const RegisterButton = styled.button`
    margin-top: 0.8em;
    margin-bottom: 0.2em;
    background: #262626;

`

const RegisterBackground = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${RegisterBckgImg});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
`
const ErrorMsg = styled.p`
    font-size: 0.7em
`

const InputLabel = styled.label`
    font-family: Assistant;
    font-size: 0.9em;
`