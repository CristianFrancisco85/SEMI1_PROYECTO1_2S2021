import React from 'react'
import { Modal,Form,Button,FormGroup,FormControl,FormCheck} from 'react-bootstrap'

const UploadModal = (props) =>{

    const visibleProp= props.visible
    const setVisibleHandler = props.handler

    const handleUpload = (event) =>{

    }

    return(
        <Modal show={visibleProp} onHide={() => setVisibleHandler(false)}>

        <Modal.Header closeButton>
            <Modal.Title>Subir Archivo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form onSubmit={(e)=>handleUpload(e)}>
                <FormGroup className="mb-3">
                    <FormControl type="file"/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Nombre de Archivo</Form.Label>
                    <FormControl required type="text" name="name"/>
                </FormGroup> 

                <FormGroup>
                    <Form.Label>Contraseña</Form.Label>
                    <FormControl required type="password" name="password"/>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Visibilidad</Form.Label>
                    <br></br>
                    <FormCheck required inline type="radio" label='Publico' name='visibility' value='0'></FormCheck>
                    <FormCheck required inline type="radio" label='Privado' name='visibility'value='1'></FormCheck>
                </FormGroup>
                <hr></hr>
                <Button variant="primary" type="submit">
                    Subir
                </Button>
            </Form>
        </Modal.Body>

        </Modal>
    )
}

export default UploadModal