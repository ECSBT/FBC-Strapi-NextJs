import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Nav from '../components/FBCNav'
import ContactCardList from '../components/ContactCardList'

import 'bootstrap/dist/css/bootstrap.min.css';

export function Landing() {

    var readdat = ''

    const router = useRouter()
    var jwt = Cookies.get('token')

    var [outputs, setOutputs] = useState([{
        id: '',
        username: '',
        email: '',
        First: '',
        Last: ''
    }]);
    var [userCount, setUserCount] = useState()

    async function findUserCount() {
        const { data } = await axios.get(
            'http://localhost:1337/users/count',
            {
                headers: {
                    Authorization:
                        'Bearer ' + jwt
                },
            });
        readdat = JSON.stringify(data, null, 4)
        console.log('User Count: \n' + readdat)

        setUserCount(data)
    }

    async function findUsers() {
        const { data } = await axios.get(
            'http://localhost:1337/users',
            {
                headers: {
                    Authorization:
                        'Bearer ' + jwt
                },
            });
        readdat = JSON.stringify(data, null, 4)
        console.log('log-in successful: \n' + readdat)

        setOutputs(data)
        //const readable = returnReadable(outputs)
        //console.log('Outputs: \n' + readable)
    }

    //function returnReadable([{ obj }]) {
    //    obj.forEach(e => {
    //
    //    const readableUser = JSON.stringify({ e }, null, 4)
    //        
    //    });
    //    const userList = JSON.stringify({ obj }, null, 4)
    //    return readable;
    //}

    if (outputs[0].id === '') {
        findUsers()
        findUserCount()
    }

    return (
        <div className={styles.authenticatedcontainer}>
            <Nav jwtprops={jwt}/>

            <main className={styles.main}>

                <h1 className={styles.title}>
                    Welcome Home
                </h1>

                <p className={styles.description}>
                    {userCount} Users:
                </p>
                <div className={styles.regcard}>
                    <ContactCardList users={outputs} />
                </div>
            </main>

        </div>
    )
}

export default Landing