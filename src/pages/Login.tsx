import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from 'react-router-dom';
import { FieldValues, useForm } from "react-hook-form";
import z from "zod";
import styled from "styled-components";
import LoginBckgImg from "../images/loginbckg.jpg";

const loginSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, "Password must contain at least 6 characters."),
})

type FormData = z.infer<typeof loginSchema>


function LoginForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(loginSchema) })

    const onSubmit = (data: FieldValues) => {
        console.log("on submit")
        console.log(data)
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
                <Text>
                    <p>First time? <Link to="/register">Register</Link></p>
                </Text>
            </Form>
        </LoginCard>    
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