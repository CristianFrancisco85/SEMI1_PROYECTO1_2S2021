import React, { useState } from 'react'
import {Form,Image,Container,FormControl,Button,Row, Col,FormGroup} from 'react-bootstrap'
import { createUser, encodeBase64 } from '../dataService'
import userIcon from '../images/userIcon.png'
import { useHistory } from "react-router"


const SignUp = () => {

    const [userImage,setUserImage] = useState(userIcon)
    const [userImage64,setUserImage64] = useState(undefined)
    let history =  useHistory()
    
    const handleSubmit = async (event) =>{
        event.preventDefault()
        let formData = new FormData(event.target);
        if(formData.password!=formData.confirmpassword) {alert('Las contraseñas no coinciden')}
        let response = await createUser(formData.get('email'),formData.get('username'),formData.get('password'),userImage64)
        if(response.ok){
            alert('Registrado')
            history.push('/login')
        }
        else{
            alert('Error')
        }
        
    }

    const handleUpload = async (event) =>{
        setUserImage(URL.createObjectURL(event.target.files[0]))
        let base64=await encodeBase64(event.target.files[0])
        base64 = base64.replace('data:image/png;base64,','')
        base64 = base64.replace('data:image/jpeg;base64,','')

        setUserImage64(base64)
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
                        <FormControl name='image' type="file" size="sm" onChange={async (e)=> await handleUpload(e)}/>
                    </FormGroup>     
                </Row>
            </Col>
            <Col className=' mt-5 justify-content-center align-items-center'>
                <Form onSubmit={async (e)=> await handleSubmit(e)} >
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <FormControl required type="text" name="username" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <FormControl required type="text" name="email" />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <FormControl required type="password" placeholder="Minimo 6 caractares" name="password"/>
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
