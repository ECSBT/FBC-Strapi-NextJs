import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import Nav from '../components/FBCNav'
import UserProfile from '../components/UserProfile'
import { MdThumbUpOffAlt, MdThumbUp } from 'react-icons/md';

import 'bootstrap/dist/css/bootstrap.min.css';

function idProfile() {
    const router = useRouter()
    let { id } = router.query
    if (!id) return null

    var jwt = Cookies.get('token')
    var uid = Cookies.get('uid')

    var isLiked = false

    var fIndex = ''
    var tIndex = ''

    var readdat = ''

    var [outputs, setOutputs] = useState({
        id: '',
        username: '',
        email: '',
        First: '',
        Last: ''
    });

    var [lfarr, setLfarr] = useState([{}])
    var [ltarr, setLtarr] = useState([{}])

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

        setLtarr(data.user_likes_to)
    }

    async function findUser() {
        const { data } = await axios.get(
            'http://localhost:1337/users/' + id,
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
    }

    function handleClick() {
        readdat = JSON.stringify(lfarr, null, 4)
        console.log('Outputs: ' + readdat)
    }

    async function handleLike() {
        const { data } = await axios.get('http://localhost:1337/users/me',
            {
                headers: {
                    Authorization:
                        'Bearer ' + jwt
                },
            });
        data.role = data.role.id
        if (isLiked === true && id === uid) {
            const farr = lfarr
            const tarr = ltarr
            farr.splice(fIndex, 1)
            tarr.splice(tIndex, 1)
            readdat = JSON.stringify(farr, null, 4)
            console.log('farr: ' + readdat)
            readdat = JSON.stringify(tarr, null, 4)
            console.log('tarr: ' + readdat)
            const { res } = await axios.put(
                'http://localhost:1337/users/' + uid,
                {
                    id: data.id,
                    username: data.username,
                    email: data.email,
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
            router.reload()
        } if (isLiked === true && id != uid) {
            const farr = lfarr
            const tarr = ltarr
            farr.splice(fIndex, 1)
            tarr.splice(tIndex, 1)
            readdat = JSON.stringify(farr, null, 4)
            console.log('farr: ' + readdat)
            readdat = JSON.stringify(tarr, null, 4)
            console.log('tarr: ' + readdat)
            const { res } = await axios.put(
                'http://localhost:1337/users/' + uid,
                {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    user_likes_to: tarr
                },
                {
                    headers: {
                        Authorization:
                            'Bearer ' + jwt
                    }
                });
            const { res2 } = await axios.put(
                'http://localhost:1337/users/' + id,
                {
                    id: outputs.id,
                    username: outputs.username,
                    email: outputs.email,
                    user_likes_from: farr
                },
                {
                    headers: {
                        Authorization:
                            'Bearer ' + jwt
                    }
                });
            alert('You have unliked this profile')
            router.reload()
        } if (isLiked === false && id === uid) {
            data.role = data.role.id
            const farr = lfarr
            const tarr = ltarr
            tarr.push(data)
            farr.push(data)
            readdat = JSON.stringify(farr, null, 4)
            console.log('farr: ' + readdat)
            readdat = JSON.stringify(tarr, null, 4)
            console.log('tarr: ' + readdat)
            const { res } = await axios.put(
                'http://localhost:1337/users/' + uid,
                {
                    id: data.id,
                    username: data.username,
                    email: data.email,
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
            router.reload()
        } if (isLiked === false && id != uid) {
            const farr = lfarr
            const tarr = ltarr
            tarr.push(data)
            farr.push(data)
            readdat = JSON.stringify(farr, null, 4)
            console.log('farr: ' + readdat)
            readdat = JSON.stringify(tarr, null, 4)
            console.log('tarr: ' + readdat)
            const { res } = await axios.put(
                'http://localhost:1337/users/' + uid,
                {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    user_likes_to: tarr
                },
                {
                    headers: {
                        Authorization:
                            'Bearer ' + jwt
                    }
                });
            const { res2 } = await axios.put(
                'http://localhost:1337/users/' + id,
                {
                    id: outputs.id,
                    username: outputs.username,
                    email: outputs.email,
                    user_likes_from: farr
                },
                {
                    headers: {
                        Authorization:
                            'Bearer ' + jwt
                    }
                });
                const { res3 } = await axios.post(
                    'http://localhost:1337/notifications',
                    {
                        user: id,
                        liked_by: data.username,
                        liked_by_id: uid
                    },
                    {
                        headers: {
                            Authorization:
                                'Bearer ' + jwt
                        }
                    });
            alert('You have liked this profile')
            router.reload()
        }
    }

    if (outputs.id === '') {
        findUser()
        findMe()
    }

    useEffect(() => {
        const ffound = lfarr.find((e) =>
            e.id = uid
        )
        const tfound = ltarr.find((e) =>
            e.id = id
        )

        fIndex = lfarr.indexOf(ffound);
        tIndex = ltarr.indexOf(tfound);

        if (fIndex >= 0) {
            isLiked = true
        } if (fIndex < 0) {
            isLiked = false
        }


        readdat = JSON.stringify(isLiked, null, 4)
        console.log('log: \n' + readdat)
    })


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
                            <a onClick={handleClick}>{lfarr.length} </a>
                        </div>
                    </div>

                    <UserProfile userData={outputs} />

                </div>
            </main>

        </div>
    )
}

export default idProfile;