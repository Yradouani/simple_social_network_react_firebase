import React, { useRef } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../utils/firebase.config';

const CreatePost = ({ userId, displayName }) => {
    const message = useRef();

    const handlePost = async (e) => {
        e.preventDefault();

        const data = {
            author: displayName,
            authorId: userId,
            message: message.current.value,
            comments: null,
            date: Date.now()
        };
        await addDoc(
            // L'endroit où doivent être envoyées les données
            collection(db, "posts"),

            // Contenu des données envoyées
            data);
        message.current.value = "";

        console.log(data);
    }

    return (
        <div className='new_post'>
            <form onSubmit={(e) => handlePost(e)}>
                <textarea placeholder='Message...' ref={message}>

                </textarea>
                <input type="submit" value="Envoyer" />
            </form>
        </div>
    );
};

export default CreatePost;