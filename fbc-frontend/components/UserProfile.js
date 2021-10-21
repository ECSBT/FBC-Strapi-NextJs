import React from "react";
import styles from '../styles/Home.module.css'

import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfile = (props) => {
    const user = props.userData

    var readdat = JSON.stringify(user, null, 4)

    return (
        <>
            <div className={styles.profilecard}>
                <div className={styles.profilelcard}>
                    <p> Email: <br /> {user.email} </p> <br />
                    <p> Website: <br /> {user.Website} </p> <br />
                    <p> Phone: <br /> {user.Phone} </p> <br />
                    <p> Birthday: <br /> {user.Birthday} </p> <br />
                </div>
                <div className={styles.profilercard}>
                    <p> Bio: <br /> {user.Bio} </p>
                </div>
            </div>
        </>
    );
};

export default UserProfile;