import React, { useState } from "react"
import { useHistory } from "react-router"
import {Col,Row,Container,Card, Button, Form, Image } from "react-bootstrap" 
import { Link } from "react-router-dom"

const Login = () => {

    let history =  useHistory()

    const handleLogIn = async (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        
        history.push('/dashboard')
    }

    return (
        <Container  style={{height: '100%'}}>

            <Row style={{justifyContent:'center',alignItems:'center',height: '30%'}}>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png" style={{height:'10em',width:'10em',marginRight:'2em'}}/>
                <h1>U-Storage</h1>
            </Row>
            
            <Row style={{justifyContent:"center",height: '70%'}}>
                <Card style={{width:'30em',height:'24em'}}  border='secondary'>

                    <Card.Header><Card.Title> Login </Card.Title></Card.Header>
                    <Card.Body>
                        <Form onSubmit={(e)=>handleLogIn(e)}>
                            <Form.Group>
                                <Form.Label>Correo Electronico</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" name="password"/>
                            </Form.Group>
                            

                            <Row fluid className='mt-4'>
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
            </Row>
            
        </Container>
    )
}

export default Login