import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPosts, getPosts } from '../actions/post.action';

const CreatePost = ({ userId, displayName }) => {
    const message = useRef();
    const dispatch = useDispatch();

    const handlePost = async (e) => {
        e.preventDefault();

        const data = {
            author: displayName,
            authorId: userId,
            message: message.current.value,
            comments: null,
            date: Date.now()
        };
        await dispatch(addPosts(data));
        message.current.value = "";
        dispatch(getPosts());

        console.log(data);
    };

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