import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function Home() {

  const router = useRouter()

  function handleClick(e) {
    router.push(e);
  }

  const [inputs, setInputs] = useState({
    email: '',
    pw: ''
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  async function handleLogin() {
    const { data } = await axios.post(
      'http://localhost:1337/auth/local',
      {
        identifier: inputs.email,
        password: inputs.pw,
      });
    const readdat = JSON.stringify(data, null, 4)
    console.log('log-in successful: \n' + readdat)
    Cookies.set('token', data.jwt)
    Cookies.set('uid', data.user.id)
    router.push('/landing')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>FBC - Log In or Sign Up</title>
        <meta name="description" content="Log In or Sign Up to FBC" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to FBC
        </h1>

        <p className={styles.description}>
          Log In to continue
        </p>

        <div className={styles.card}>
          <form>
            <label>
              Email:
              <input type="text" name="email" value={inputs.email} onChange={handleChange}/>
            </label>
            <label>
              Password:
              <input type="text" name="pw" value={inputs.pw} onChange={handleChange}/>
            </label>
          </form>
          <button type="submit" disabled={inputs.email.length < 6 | inputs.pw.length < 1}
            className={styles.b1} onClick={() => handleLogin()}>
            Log In
          </button>
          <button className={styles.b2} onClick={() => handleClick('/register')}>
            Register
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
