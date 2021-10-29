import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Nav from '../components/FBCNav'
import UserProfile from '../components/UserProfile'
import { MdThumbUpOffAlt, MdThumbUp } from 'react-icons/md';

import 'bootstrap/dist/css/bootstrap.min.css';

export function Profile() {

    const Router = useRouter()
    var jwt = Cookies.get('token')
    var uid = Cookies.get('uid')

    var likeList = []

    var [outputs, setOutputs] = useState({
        id: '',
        username: '',
        email: '',
        First: '',
        Last: ''
    });

    var [lfarr, setLfarr] = useState([{}])
    var [ltarr, setLtarr] = useState([{}])
    //if(isLiked === true) {
    //    var [thumbsUp, setThumbsUp] = useState(<MdThumbUp onClick={handleUnlike}/>)
    //} if(isLiked === false) {
    //    var [thumbsUp, setThumbsUp] = useState(<MdThumbUpOffAlt onClick={handleLike}/>)
    //}


    async function findMe() {
        const { data } = await axios.get(
            'http://localhost:1337/users/' + uid,
            {
                headers: {
                    Authorization:
                        'Bearer ' + jwt
                },
            });
        //readdat = JSON.stringify(data, null, 4)
        //console.log('Profile Info: \n' + readdat)

        setOutputs(data)
        setLfarr(data.user_likes_from)
        setLtarr(data.user_likes_to)
    }

    function handleLikes() {
        lfarr.forEach((e) => {
            likeList.push(e.username)
        })
    }

    function handleClick() {
        readdat = JSON.stringify(lfarr, null, 4)
        console.log('Outputs: ' + readdat)
        alert('Likes: \n' + likeList)
    }

    async function handleLike() {
        if (isLiked === true) {
            const farr = lfarr
            const tarr = ltarr
            farr.splice(fIndex, 1)
            tarr.splice(tIndex, 1)
            readdat = JSON.stringify(farr, null, 4)
            console.log('farr: ' + readdat)
            readdat = JSON.stringify(tarr, null, 4)
            console.log('tarr: ' + readdat)
            await axios.put(
                'http://localhost:1337/users/' + uid,
                {
                    id: outputs.id,
                    username: outputs.username,
                    email: outputs.email,
                    user_likes_from: farr,
                    user_likes_to: tarr
                },
                {
                    headers: {
                        Authorization:
                            'Bearer ' + jwt
                    }
                });
            alert('You have unliked this profile')
            Router.reload()
        } if (isLiked === false) {
            const { data } = await axios.get('http://localhost:1337/users/me',
                {
                    headers: {
                        Authorization:
                            'Bearer ' + jwt
                    },
                });
            data.role = data.role.id
            const farr = lfarr
            const tarr = ltarr
            tarr.push(data)
            farr.push(data)
            readdat = JSON.stringify(farr, null, 4)
            console.log('farr: ' + readdat)
            readdat = JSON.stringify(tarr, null, 4)
            console.log('tarr: ' + readdat)
            await axios.put(
                'http://localhost:1337/users/' + uid,
                {
                    id: outputs.id,
                    username: outputs.username,
                    email: outputs.email,
                    user_likes_from: farr,
                    user_likes_to: tarr
                },
                {
                    headers: {
                        Authorization:
                            'Bearer ' + jwt
                    }
                });
            alert('You have liked this profile')
            Router.reload()
        }
    }

    //function handleLike() {
    //    setThumbsUp(<MdThumbUp onClick={handleUnlike}/>)
    //}
    //function handleUnlike() {
    //    setThumbsUp(<MdThumbUpOffAlt onClick={handleLike}/>)
    //}

    //if(isLiked === true && thumbsUp === <MdThumbUpOffAlt onClick={handleLike}/>); {
    //    setThumbsUp(<MdThumbUp onClick={handleUnlike}/>)
    //} if (isLiked === false && thumbsUp === <MdThumbUp onClick={handleUnlike}/>) {
    //    setThumbsUp(<MdThumbUpOffAlt onClick={handleLike}/>)
    //} else {
    //    return
    //}

    useEffect(() => {
        
        const ffound = lfarr.find((e) =>
            e.id === outputs.id
        )
        const tfound = ltarr.find((e) =>
            e.id === outputs.id
        )

        const fIndex = lfarr.indexOf(ffound);
        const tIndex = ltarr.indexOf(tfound);

        if (ffound) {
            isLiked = true
        } if (ffound === undefined || ffound === null) {
            isLiked = false
        }


        readdat = JSON.stringify(isLiked, null, 4)
        console.log('log: \n' + readdat)
    })


    if (outputs.id === '') {
        findMe()
    }

    if (likeList.length < lfarr.length) {
        handleLikes()
    }


    return (
        <div className={styles.authenticatedcontainer}>
            <Nav jwtprops={jwt} />

            <main className={styles.main}>

                <h2>
                    Your Profile
                </h2>

                <div className={styles.regcard}>

                    <div className={styles.profilehead}>
                        <h5 className={styles.description}>
                            {outputs.First} {outputs.Last}
                        </h5>
                        <div style={{ marginLeft: 1.5 + 'rem', marginTop: 0.4 + 'rem' }}>
                            <MdThumbUpOffAlt onClick={handleLike} /> <span> </span>
                            <span onClick={handleClick}>{likeList.length} </span>
                        </div>
                    </div>

                    <UserProfile userData={outputs} />

                </div>
            </main>

        </div>
    )
}

export default Profile