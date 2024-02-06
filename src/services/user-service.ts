// import { CredentialResponse } from "@react-oauth/google"
import apiClient from "./client-api"

export interface IUser {
    email: string,
    password?: string,
    imgUrl?: string,
    _id?: string,
    accessToken?: string,
    refreshToken?: string
}

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
}

export const registrUser = (user: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log("Registering user...")
        console.log(user)
        apiClient.post("/auth/register", user).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const loginUser =  (user: IUser) => {
    return new Promise<IAuthResponse>((resolve, reject) => {
        console.log("Login user...")
        console.log(user)
        apiClient.post("/auth/login", user).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
  };
  
// export const googleSignin = (credentialResponse: CredentialResponse) => {
//     return new Promise<IUser>((resolve, reject) => {
//         console.log("googleSignin ...")
//         apiClient.post("/auth/google", credentialResponse).then((response) => {
//             console.log(response)
//             resolve(response.data)
//         }).catch((error) => {
//             console.log(error)
//             reject(error)
//         })
//     })
// }