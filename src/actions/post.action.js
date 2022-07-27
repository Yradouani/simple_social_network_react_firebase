import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase.config";

export const GET_POSTS = "GET_POSTS";
export const ADD_POSTS = "ADD_POSTS";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_COMMENT = "ADD_COMMENT";

export const getPosts = () => {
    return (dispatch) => {
        return getDocs(collection(db, "posts"))
            .then((res) => {
                dispatch({
                    type: GET_POSTS,
                    payload: res.docs.map(
                        (doc) => ({ ...doc.data(), id: doc.id })
                    )
                })
            })
            .catch((err) => console.log(err));
    };
};

export const addPosts = (data) => {
    return (dispatch) => {
        return addDoc(
            // L'endroit où doivent être envoyées les données
            collection(db, "posts"),
            // Contenu des données envoyées
            data)
            .then((res) => {
                dispatch({ type: ADD_POSTS, payload: data })
            })
            .catch((err) => console.log(err))
    }
}

export const editPost = (data) => {
    return (dispatch) => {
        return updateDoc(doc(db, "posts", data.id), { message: data.editMess })
            .then(() => {
                dispatch({ type: EDIT_POST, payload: { ...data } })
            })
            .catch((err) => console.log(err))
    };
};

export const deletePost = (postId) => {
    return (dispatch) => {
        return deleteDoc(doc(db, "posts", postId))
            .then(() => {
                dispatch({ type: DELETE_POST, payload: { postId } })
            })
            .catch((err) => console.log(err))
    };
};

export const addComment = (postId, data) => {
    return (dispatch) => {
        return updateDoc(doc(db, "posts", postId), { comments: data })
            .then(() => {
                dispatch({ type: ADD_COMMENT, payload: { postId, data } })
            })
            .catch((err) => console.log(err))
    }
}
// export const addLike = (data) => {
//     return (dispatch) => {
//         return axios({
//             method: "put",
//             url: `http://localhost:3000/posts/${data.id}`,
//             data: { ...data }
//         })
//             .then((res) => {
//                 dispatch({ type: ADD_LIKE, payload: { ...data } })
//             })
//             .catch((err) => console.log(err))
//     };
// };

