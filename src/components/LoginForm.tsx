import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import z from "zod"
import styled from "styled-components"
import LoginBckgImg from "../images/loginbckg.jpg"

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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input>
                    <label htmlFor="email">Email</label>
                    <input {...register("email")} type="text" id="email" className="form-control" />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </Input>
                
                <Input>
                    <label htmlFor="password">Password</label>
                    <input {...register("password")} type="password" id="password" className="form-control" />
                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                </Input>
                <LoginButton type="submit" className="btn btn-primary">Login</LoginButton>
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
    heigh: 30em;
`

const Input = styled.div`
    width: 15em;
    margin-top: 1em;
    margin-bottom: 1em;
`

const Form = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
`

const LoginButton = styled.button`
    margin-top: 1em;
    margin-bottom: 1em;
    background: #262626;

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