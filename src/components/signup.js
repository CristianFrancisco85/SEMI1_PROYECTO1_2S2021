import React, { useState } from 'react'
import {Form,Image,Container,FormControl,Button,Row, Col,FormGroup} from 'react-bootstrap'
import userIcon from '../images/userIcon.png'


const SignUp = () => {

    const [userImage,setUserImage] = useState(userIcon)
    
    const handleSubmit = (event) =>{
        event.preventDefault()
        alert("Registrado")
    }

    const handleUpload = (event) =>{
        setUserImage(URL.createObjectURL(event.target.files[0]))
    }

    return(
        <Container fluid>

        <Row>
            <Col md={5} className='mt-5' >
                <Row  className=' justify-content-center'>
                    <h2>Foto de Perfil</h2>
                </Row>

                <Row className='mt-5 justify-content-center'>
                    <Image src={userImage} style={{height:'12em',width:'12em'}} roundedCircle/>
                </Row>

                <Row className='mt-5 justify-content-center'>
                    <FormGroup className="mb-3">
                        <FormControl type="file" size="sm" onChange={(e)=>handleUpload(e)}/>
                    </FormGroup>     
                </Row>
            </Col>
            <Col className=' mt-5 justify-content-center align-items-center'>
                <Form onSubmit={(e)=>handleSubmit(e)} >
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <FormControl required type="text" name="username" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Nombre Completo</Form.Label>
                        <FormControl required type="text" name="name" />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <FormControl required type="email" placeholder="Minimo 6 caractares" name="password"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <FormControl required type="password" name="confirmpassword"/>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">Crear Cuenta</Button>
                    </Form.Group>
                </Form>
            </Col>
            
        </Row>
        </Container>
    )

    
}

export default SignUp
