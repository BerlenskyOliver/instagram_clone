import React, {useState, useEffect} from 'react'
import {Button, Input} from "@material-ui/core"
import { auth } from '../../config/firebase';
import Modalform from "../tools/Modalform"

function Header({user, changeUser}) {

    const [open, setOpen] = useState(false)
    const [openSignIn, setOpenSignin] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                changeUser(authUser)
               
                // if(authUser.displayName){

                // }else{
                //   return authUser.updateProfile({
                //     displayName: username,
                //   })
                // }
            } else {
                changeUser(null)
            }
        })
        return () => {
            unsubscribe()
        }

    }, [changeUser])

    const signUp = (e) => {
        e.preventDefault()
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((err) => alert(err.message))

        setOpen(false)

    }
    const signIn = (e) => {
        e.preventDefault()
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((err) => alert(err.message))

        setOpenSignin(false)
    }

    
    return (
        <div>
            <Modalform open={open} onClose={() => setOpen(false)} action={signUp} name="Sign Up">
                <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </Modalform>
            <Modalform open={openSignIn} onClose={() => setOpenSignin(false)} action={signIn} name="Sign In">
                <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                
            </Modalform>

            <div className="app_header">
                <img
                className="app_headerImage"
                src="https:/www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
                />
                {user ? (
                    <Button onClick={() => auth.signOut()}>LogOut</Button>
                    ) : (
                    <div className="login_container">
                        <Button onClick={() => setOpenSignin(true)}>Sign In</Button>
                        <Button onClick={() => setOpen(true)}>Sign up</Button>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default Header
