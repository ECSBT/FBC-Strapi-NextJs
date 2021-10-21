import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Nav from '../components/FBCNav'
import NotificationsList from '../components/NotificationsList'

import 'bootstrap/dist/css/bootstrap.min.css';

export function Notifications() {

    const router = useRouter()
    var uid = Cookies.get('uid')
    var jwt = Cookies.get('token')

    var notCount = ''

    var readdat = ''

    var [outputs, setOutputs] = useState({
        id: '',
        username: '',
        email: '',
        First: '',
        Last: ''
    })
    var [notifications, setNotifications] = useState([{
        id: ''
    }])

    async function findMe() {
        const { data } = await axios.get(
            'http://localhost:1337/users/' + uid,
            {
                headers: {
                    Authorization:
                        'Bearer ' + jwt
                },
            });
        readdat = JSON.stringify(data, null, 4)
        console.log('findme: \n' + readdat)

        setOutputs(data)
        setNotifications(data.notifications)
    }
    
    if (outputs.id === '') {
        findMe()
    } if (notifications === undefined) {
        notCount = 0
    } if (notifications != undefined) {
        notCount = notifications.length
    }

    useEffect(() => {
        
    })

    return (
        <div className={styles.authenticatedcontainer}>
            <Nav jwtprops={jwt}/>

            <main className={styles.main}>

                <p className={styles.description}>
                    {notCount} Notifications:
                </p>
                <div className={styles.regcard}>
                    <NotificationsList nots={notifications} ncount={notCount}/>
                </div>
            </main>

        </div>
    )
}

export default Notifications