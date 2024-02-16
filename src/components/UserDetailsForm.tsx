import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import {Image } from "react-bootstrap";
import z from "zod"
import {IUser} from "../services/user-service"
import styled from "styled-components";
import { useState } from "react";
import defaultImg from "../images/profile.png";

export interface IUserForm {
    email?: string,
    password?: string,
    confirmPassword?: string,
    imgUrl?: string,
}

function UserDetailsForm({title, user, actionButtonTxt, onSubmitFunc, cardClassname, validationSchema}:
    {title: string, user: IUser | null,
     actionButtonTxt:string, onSubmitFunc:(data: FieldValues) => Promise<void>,
    cardClassname: string, validationSchema: z.ZodSchema<IUserForm>}) {
    type FormData = z.infer<typeof validationSchema>
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(validationSchema) })
    const onSubmit = async (data: FieldValues) => {
        onSubmitFunc(data)
    }
    const [profileImage, setProfileImage] = useState(user?.imgUrl|| defaultImg);
    const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileDomElement = event.target
        // If the file element has files files property and the number of 
        // selected files in more than 0.
        if (fileDomElement.files && fileDomElement.files.length > 0) {
          const file = fileDomElement.files[0];
          setProfileImage(URL.createObjectURL(file));
        }
      };
      
    return (
        <RegisterCard className={cardClassname}>
            <Header className="card-header">{title}</Header>
            <Form  className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <InputDiv>
                    <InputLabel htmlFor="imgUrl">Choose profile image</InputLabel>
                    <ImgInputDiv  className="form-control" >
                        <Input {...register("imgUrl")} type="file" id="imgUrl" onChange={handleProfileImageChange}/>
                        <DesignedImage src={profileImage} roundedCircle/>
                    </ImgInputDiv>
                    {errors.imgUrl && <ErrorMsg className="text-danger">{errors.imgUrl.message as string}</ErrorMsg>}
                </InputDiv>
                <InputDiv >
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input {...register("email")} defaultValue={user?.email} type="text" id="email" className="form-control" />
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
                <RegisterButton type="submit" className="btn btn-primary">{actionButtonTxt}</RegisterButton>
            </Form>
        </RegisterCard>      
    )
}

export default UserDetailsForm

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