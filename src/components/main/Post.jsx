import React, {useState, useEffect} from 'react'
import "../../css/Post.css"
import {Avatar} from "@material-ui/core"
import {db} from "../../config/firebase"
import firebase from "firebase"

function Post({username, postId, user,  mediaUrl, mediaType, caption}){
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
                    .collection("posts")
                    .doc(postId)
                    .collection("comments")
                    .orderBy('timestamp', 'desc')
                    .onSnapshot(snapshot => {
                        setComments(snapshot.docs.map((doc) => ({id: doc.id, comment: doc.data()})))
                    })
        }
        return () => { unsubscribe() }
    }, [postId])

    const postComment = (e) => {
        e.preventDefault()
        db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .add({
            username: user.displayName,
            text: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('')
    }
    return (
        <div className="post">
            <div className="post_header">
                <Avatar 
                className="post_avatar"
                alt="Oliverrberlensky"
                src="/static/images/avatar/8.jpg"
                />
                <h3>{username}</h3>
            </div>
            {mediaType === "image/jpeg" ? (
                <img className="post_media" src={mediaUrl} alt=""/>
            ) : (
                <video controls className="post_media" src={mediaUrl} alt=""/>
            )}
            <h4 className="post_text"><strong>{username}</strong>{caption}</h4>
            
            <div className="post_comments">
                {
                    comments.map(({id, comment}) => (
                        <p key={id}>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    ))
                }
            </div>
            {user && (
                <form className="comment_form">
                <input type="text" className="comment_input"
                    placeholder="add a comment .."
                    value={comment} onChange={(e) => setComment(e.target.value)} />
                <button 
                className="comment_button"
                disabled={!comment}
                type="submit"
                onClick={postComment}
                >Post</button>
            </form>
            )}
            
        </div>
    )
}

export default Post