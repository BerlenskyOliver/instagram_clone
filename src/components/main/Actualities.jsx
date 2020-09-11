import React, {useState, useEffect} from 'react'
import Post from "./Post"
import InstagramEmbed from 'react-instagram-embed'
import { db } from '../../config/firebase';

function Actualities({user}) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        db.collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})))
        })
        
    }, [])
    
    return (
        <div className="app_posts">
            <div className="app_postLeft">
                {
                    posts.map(({id, post}) => (
                    <Post key={id} postId={id} user={user} mediaType={post.mediaType} mediaUrl={post.mediaUrl} username={post.username} caption={post.caption}/>
                ))}
            </div>
            <div className="app_postRight">
                <InstagramEmbed
                    url="https://www.instagram.com/p/B_uf9dmAGPw/"
                    maxWidth={320}
                    hideCaption={false}
                    containerTagName="div"
                    protocol=""
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
                    />
            </div>
        </div>
    )
}

export default Actualities
