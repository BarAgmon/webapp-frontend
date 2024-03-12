import apiClient from "./client-api"
import { IComment, IPost, postUpdate } from "../utils/types";


export const createPost = (post: IPost) => {
    return new Promise<IPost>((resolve, reject) => {
        const accessToken = localStorage.getItem('accessToken');
        apiClient.post("/post/create", post, {headers: {'authorization': `Bearer ${accessToken}`}
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
        const accessToken = localStorage.getItem('accessToken');
        apiClient.put("/post/update", post, {headers: {'authorization': `Bearer ${accessToken}`}
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
        const accessToken = localStorage.getItem('accessToken');
        apiClient.put("/post/comment", comment, {headers: {'authorization': `Bearer ${accessToken}`}
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
        const accessToken = localStorage.getItem('accessToken');
        return apiClient.get("/post/myPosts", {headers: {'authorization': `Bearer ${accessToken}`}
        }).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const likePost = (post: string) => {
    const accessToken = localStorage.getItem('accessToken');
    return new Promise<IPost>((resolve, reject) => {
        apiClient.put("/post/like", {
  "postId": post}, {headers: {'authorization': `Bearer ${accessToken}`}
        }).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const getPostById = (id: string | undefined) => {
        const accessToken = localStorage.getItem('accessToken');
        return new Promise<IPost>((resolve, reject) => {
        apiClient.get(`/post/byId?postId=${id}`, {headers: {'authorization': `Bearer ${accessToken}`}
        }).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const deletePost = (post: string) => {
    return new Promise<IPost>((resolve, reject) => {
        const accessToken = localStorage.getItem('accessToken');
        apiClient.delete("/post/delete", {
            headers: {'authorization': `Bearer ${accessToken}`},
            data: {
  "postId": post}
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
        const accessToken = localStorage.getItem('accessToken');
        apiClient.get("/post/fetch", { headers: { 'authorization': `Bearer ${accessToken}` } })
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