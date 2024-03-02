import apiClient from "./client-api"
import { IComment, IPost, postUpdate } from "../utils/types";

const refreshToken = localStorage.getItem('refreshToken');

export const createPost = (post: IPost) => {
    return new Promise<IPost>((resolve, reject) => {
        apiClient.post("/post/create", post, {headers: {'authorization': `Bearer ${refreshToken}`}
        }).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const updatePost = (post: postUpdate) => {
    return new Promise<postUpdate>((resolve, reject) => {
        apiClient.put("/post/update", post, {headers: {'authorization': `Bearer ${refreshToken}`}
        }).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const commentOnPost = (comment: IComment) => {
    return new Promise<IComment>((resolve, reject) => {
        apiClient.put("/post/comment", comment, {headers: {'authorization': `Bearer ${refreshToken}`}
        }).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const myPosts = () => {
    return new Promise<IPost>((resolve, reject) => {
        return apiClient.get("/post/myPosts", {headers: {'authorization': `Bearer ${refreshToken}`}
        }).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const likePost = (post: IPost) => {
    return new Promise<IPost>((resolve, reject) => {
        apiClient.put("/post/like", post, {headers: {'authorization': `Bearer ${refreshToken}`}
        }).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const dislikePost = (post: IPost) => {
    return new Promise<IPost>((resolve, reject) => {
        apiClient.put("/post/dislike", post, {headers: {'authorization': `Bearer ${refreshToken}`}
        }).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const deletePost = (post: IPost) => {
    return new Promise<IPost>((resolve, reject) => {
        apiClient.delete("/post/delete", {
            headers: {'authorization': `Bearer ${refreshToken}`},
            data: post
        }).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const fetchPosts = () => {
   return new Promise<IPost[]>((resolve, reject) => {
        apiClient.get("/post/fetch", { headers: { 'authorization': `Bearer ${refreshToken}` } })
            .then((response) => {
                console.log(response)
                const posts: IPost[] = response.data; // Assuming the response contains a field 'posts' which is an array of IPost objects
                if (Array.isArray(posts)) {
                    resolve(posts);
                } else {
                    reject(new Error('Invalid response format: posts field is not an array.'));
                }
            }).catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}