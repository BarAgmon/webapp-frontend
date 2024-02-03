import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import z from "zod"
import styled from "styled-components"
import RegisterBckgImg from "../images/register.jpg"

const loginSchema = z.object({
    name: z.string().min(2, "Name must contain at least 2 characters."),
    lastName: z.string().min(2, "Last name must contain at least 2 characters."),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, "Password must contain at least 6 characters."),
    confirmPassword: z.string().min(6, "Password must contain at least 6 characters."),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

type FormData = z.infer<typeof loginSchema>

function RegisterForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(loginSchema) })

    const onSubmit = (data: FieldValues) => {
        console.log("on submit")
        console.log(data)
    }

    return (
    <RegisterBackground>
        <RegisterCard className="card border-light mb-3">
            <Header className="card-header">Register</Header>
            <Form  className="card-body" onSubmit={handleSubmit(onSubmit)}>
                <Input>
                    <InputLabel htmlFor="name">First Name</InputLabel>
                    <input {...register("name")} type="text" id="name" className="form-control" />
                    {errors.name && <ErrorMsg className="text-danger">{errors.name.message}</ErrorMsg>}
                </Input>
                <Input>
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <input {...register("lastName")} type="text" id="lastName" className="form-control" />
                    {errors.lastName && <ErrorMsg className="text-danger">{errors.lastName.message}</ErrorMsg>}
                </Input>
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
                <Input>
                    <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                    <input {...register("confirmPassword")} type="password" id="confirmPassword" className="form-control" />
                    {errors.confirmPassword && <ErrorMsg className="text-danger">{errors.confirmPassword.message}</ErrorMsg>}
                </Input>
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
`

const Header = styled.div`
    font-family: Assistant;
    font-size: 1.5em;
`
const Input = styled.div`
    width: 15em;
    margin-top: 0.2em;
    margin-bottom: 0.2em;
`

const Form = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
`

const RegisterButton = styled.button`
    margin-top: 0.2em;
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
    font-size: 0.9em
`