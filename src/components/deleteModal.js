import React from 'react'
import { Modal,Form,Button,FormGroup,FormControl,FormCheck} from 'react-bootstrap'

const DeleteModal = (props) =>{

    const visibleProp= props.visible
    const setVisibleHandler = props.handler

    const handleUpload = (event) =>{

    }

    return(
        <Modal show={visibleProp} onHide={() => setVisibleHandler(false)}>

        <Modal.Header closeButton>
            <Modal.Title>Eliminar Archivo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form onSubmit={(e)=>handleUpload(e)}>
                <Form.Group>
                    <Form.Label>Selecciona un Archivo</Form.Label>
                    <Form.Control as="select" name='archivo' custom>
                    <option>prueba1.pdf</option>
                    <option>prueba2.pdf</option>
                    <option>prueba3.pdf</option>
                    </Form.Control>
                </Form.Group>

                <FormGroup>
                    <Form.Label>Contraseña</Form.Label>
                    <FormControl required type="password" name="password"/>
                </FormGroup> 

                <hr></hr>
                <Button variant="danger" type="submit">
                    Eliminar
                </Button>
            </Form>
        </Modal.Body>

        </Modal>
    )
}

export default DeleteModal