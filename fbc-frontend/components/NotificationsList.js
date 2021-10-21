import React from "react";
import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { IoMdNotificationsOutline } from 'react-icons/io';
import styles from '../styles/Home.module.css'

import 'bootstrap/dist/css/bootstrap.min.css';

const NotificationsList = (props) => {
    const nList = props.nots


    //var readdat = JSON.stringify(props, null, 4)
    //console.log(props)

    const NotificationCard = ({ notification }) => {
        return (
            <Container>
                <Row>
                    <Col >
                        <IoMdNotificationsOutline style={{ marginRight: 1 + 'rem' }} />
                        <span className={styles.unamespan}><a href={'/' + notification.id}>@{notification.liked_by}</a> Liked your profile!</span>
                    </Col>
                    <Col>
                        Liked at: {notification.created_at}
                    </Col>
                </Row>
            </Container>
        );
    }

    if (props.ncount === 0) {
        return (
            <div className={styles.contactcard}>
                <Container>
                    <Row>
                        <Col >
                            <IoMdNotificationsOutline style={{ marginRight: 1 + 'rem' }} />
                            <span className={styles.unamespan}> No notifications at this time</span>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    } else {
        return (
            <div>
                {nList.map((e, i) => {
                    return (
                        <div className={styles.contactcard}>
                            <NotificationCard key={i} notification={e} />
                        </div>
                    );
                })}
            </div>
        );
    }
};

export default NotificationsList;