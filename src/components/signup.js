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
        <Container  style={{height: '100%'}}>
        <Row style={{height:'15%'}}></Row>
        <Row style={{justifyContent:'center'}} >
            <Col>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    <h1>Crear Cuenta</h1>
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
            <Col className='mt-5' >

                <Row style={{justifyContent:'center'}}>
                    <h3>Foto de Perfil</h3>
                </Row>

                <Row className='mt-5' style={{justifyContent:'center'}}>
                    <Image src={userImage} style={{height:'12em',width:'12em'}} roundedCircle/>
                </Row>

                <Row className='mt-5' style={{justifyContent:'center'}}>
                    <FormGroup className="mb-3">
                        <FormControl type="file" size="sm" onChange={(e)=>handleUpload(e)}/>
                    </FormGroup>     
                </Row>

            </Col>
        </Row>
        </Container>
    )

    
}

export default SignUp
