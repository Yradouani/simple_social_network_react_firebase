import { onAuthStateChanged } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../actions/post.action';

const CommentPost = ({ post, user }) => {
    // const [user, setUser] = useState(null);
    const answerComment = useRef();
    const dispatch = useDispatch();

    // onAuthStateChanged(auth, (currentUser) => {
    //     setUser(currentUser);
    // });

    const handleComment = (e) => {
        e.preventDefault();

        let data = [];

        if (!post.comments) {
            data = [
                {
                    commentAuthor: user.displayName,
                    text: answerComment.current.value,
                }
            ];
        } else {
            data = [
                ...post.comments,
                {
                    commentAuthor: user.displayName,
                    text: answerComment.current.value,
                },
            ];
        }


        dispatch(addComment(post.id, data));
        answerComment.current.value = "";
    };

    return (
        <div className="comment-container">
            <div >
                <h3 className="comment-title">Commentaires</h3>
            </div>
            {post.comments &&
                post.comments
                    .sort((a, b) => b.date - a.date)
                    .map((com) => (
                        <div className='one_comment_container'>
                            <h3>{com.commentAuthor}</h3>
                            <div>{com.text}</div>
                        </div>
                    ))
            }

            {user ? (
                <form onSubmit={(e) => handleComment(e)}>
                    <textarea
                        placeholder='Ecrire un commentaire'
                        ref={answerComment}>
                    </textarea>
                    <input type="submit" value="Envoyer" />
                </form>
            ) : (
                <p>Connectez-vous pour écrire un commentaire</p>
            )}
        </div>
    );
};

export default CommentPost;