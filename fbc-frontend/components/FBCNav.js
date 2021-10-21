import React from "react";
import { Nav, Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios'
import { IoIosContact, IoMdNotifications } from 'react-icons/io';

import 'bootstrap/dist/css/bootstrap.min.css';

const FBCNav = (props) => {

    const jwt = props.jwtprops;

    async function findUsers() {
        const { data } = await axios.get(
            'http://localhost:1337/users',
            {
                headers: {
                    Authorization:
                        'Bearer ' + jwt
                },
            }
        );
        console.log(jwt)
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/landing">FBC</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/profile">
                                <IoIosContact style={{ marginRight: 0.25 + 'rem' , marginBottom: 0.25 + 'rem'}} />
                                Profile
                            </Nav.Link>
                            <Nav.Link href="/notifications">
                                <IoMdNotifications style={{ marginRight: 0.25 + 'rem' , marginBottom: 0.25 + 'rem'}} />
                                Notifications
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search FBC Users"
                                    className="mr-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success" onClick={() => findUsers()}>Search</Button>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default FBCNav;