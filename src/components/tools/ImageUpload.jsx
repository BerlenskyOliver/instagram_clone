import React, {useState} from 'react'
import "../../css/ImageUpload.css"
import {Button} from "@material-ui/core"
import {storage, db} from "../../config/firebase"
import firebase from "firebase"

function ImageUpload({username}) {

    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState('')
    const [type, setType] = useState('')
    // image/jpeg
    // video/mp4
    const handleChange = e => {
        if(e.target.files[0])
        {
            setType(e.target.files[0].type)
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            (error) => {
                console.log(error)
                alert(error.message)
            },
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        mediaUrl: url,
                        username: username,
                        mediaType: type
                    })

                    setProgress(0)
                    setCaption("")
                    setImage(null)

                })
            }

        )
    }   

    return (
        <div className="image_upload">
            <progress className="progress" value={progress} max="100" />
            <input type="text" placeholder="Enter a caption" onChange={e => setCaption(e.target.value)} value={caption}/>
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload} >Upload</Button>
        </div>
    )
}

export default ImageUpload;
