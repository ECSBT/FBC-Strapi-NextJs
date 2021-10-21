import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'


export function Register() {

  const router = useRouter()

  const [inputs, setInputs] = useState({
    fname: '',
    lname: '',
    uname: '',
    email: '',
    pw: ''
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  async function handleSubmit() {
    const { data } = await axios.post(
      'http://localhost:1337/auth/local/register',
      {
        First: inputs.fname,
        Last: inputs.lname,
        username: inputs.uname,
        email: inputs.email,
        password: inputs.pw,
      },
      {
        headers: {},
      }
    );
    console.log('new user created: \n' + data);
    router.back();
  }

  console.log(inputs)

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Register
        </h1>

        <p className={styles.description}>
          Register with FBC
        </p>

        <div className={styles.regcard}>
          <form>
            <label>
              First Name:
              <input type="text" name="fname" value={inputs.fname} onChange={handleChange} />
              <br />
            </label>
            <label>
              Last Name:
              <input type="text" name="lname" value={inputs.lname} onChange={handleChange} />
              <br />
            </label>
            <label>
              Username:
              <input type="text" name="uname" value={inputs.uname} onChange={handleChange} />
              <br />
            </label>
            <label>
              Email:
              <input type="text" name="email" value={inputs.email} onChange={handleChange} />
              <br />
            </label>
            <label>
              Password:
              <input type="text" name="pw" value={inputs.pw} onChange={handleChange} />
              <br />
            </label>
            <label>
              Confirm Password:
              <input type="text" name="cpw" value={inputs.cpw} onChange={handleChange} />
              <br />
            </label>
          </form>
          <button className={styles.backb} onClick={() => router.back()}>
            ᐊ Back
          </button>
          <button type="submit"
            disabled={inputs.pw.length < 1 | inputs.fname.length < 1 | inputs.lname.length < 1 | inputs.uname.length < 1 | inputs.email.length < 1 | inputs.cpw != inputs.pw}
            className={styles.b1} onClick={() => handleSubmit()}>
            Submit
          </button>
        </div>
      </main>

    </div>
  )
}

export default Register