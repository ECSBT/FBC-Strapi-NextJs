import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { IoIosContact } from 'react-icons/io';
import styles from '../styles/Home.module.css'

import 'bootstrap/dist/css/bootstrap.min.css';

const ContactCardList = (props) => {
    const userList = props.users

    console.log(userList)

    const ContactCard = ({ user }) => {
        return (
            <Container>
                <Row>
                    <Col >
                        <IoIosContact style={{ marginRight: 1 + 'rem' }} />
                        <span className={styles.unamespan}><a href={'/' + user.id}>@{user.username} </a></span>
                    </Col>
                    <Col>
                        Email: {user.email}
                    </Col>
                    <Col >
                        First: {user.First}
                    </Col>
                    <Col>
                        Last: {user.Last}
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <div>
            {userList.map((e, i) => {
                return (
                    <div className={styles.contactcard}>
                        <ContactCard key={i} user={e} />
                    </div>
                );
            })}
        </div>
    );
};

export default ContactCardList;