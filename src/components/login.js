import React, { useState } from "react"
import { useHistory } from "react-router"
import {Col,Row,Container,Card, Button, Form, Image } from "react-bootstrap" 
import { Link } from "react-router-dom"
import { loginUser } from "../dataService"
import { useLoggedUser } from "../contexts/globalContext"

const Login = () => {

    let history =  useHistory()
    const [user,setUser] = useLoggedUser()

    const handleLogIn = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        await loginUser(formData.get('username'),formData.get('password')).then((res)=>{
        if(res.length==0){
            alert('Credenciales Invalidos')
        }
        else{
            console.log(res[0]);
            setUser(res[0])
            window.sessionStorage.setItem('user',JSON.stringify(res[0]))
            history.push('/dashboard')
        }})
    }

    return (
        <Container fluid>

            <Row className='mt-4 align-items-center justify-content-center' >
                <Image src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png" style={{height:'10em',width:'10em',marginRight:'2em'}}/>
                <h1>U-Storage</h1>
            </Row>
            
            <Row className='mt-5 justify-content-center'>
                <Col lg={5}>
                    <Card border='secondary'>
                        <Card.Header><Card.Title> Login </Card.Title></Card.Header>
                        <Card.Body>
                            <Form onSubmit={async (e)=> await handleLogIn(e)}>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" name="username"/>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" name="password"/>
                                </Form.Group>
                                
                                <Row className='mt-4'>
                                    <Col className='col-8'>
                                        <Button variant="primary" type="submit">
                                            Entrar
                                        </Button>
                                    </Col>
                                    <Col className='col-4'>
                                        <Card.Link as={Link} to="/signup">
                                            Registrarse
                                        </Card.Link> 
                                    </Col>
                                </Row>      
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            Seminario 1 - Pareja X
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            
        </Container>
    )
}

export default Login